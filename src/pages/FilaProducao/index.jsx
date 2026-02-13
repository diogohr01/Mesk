import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, DatePicker, Layout, message, Row, Slider, Space, Tag, Typography } from 'antd';
import { ThunderboltOutlined, EditOutlined, UnorderedListOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import { ActionButtons, Card, LoadingSpinner, PaginatedTable, ScoreBadge, StatusBadge } from '../../components';
import { useFilterSearchContext } from '../../contexts/FilterSearchContext';
import { useFilaGanttFilterContext } from '../../contexts/FilaGanttFilterContext';
import { getUrgencyLevel, urgencyBarColors, urgencyColors } from '../../helpers/urgency';
import OrdemProducaoService from '../../services/ordemProducaoService';
import SequenciamentoService from '../../services/sequenciamentoService';
import { colors } from '../../styles/colors';
import ModalSequenciarOP from './Modals/ModalSequenciarOP';
import ModalConfirmarOP from './Modals/ModalConfirmarOP';
import ModalGerarOPs from './Modals/ModalGerarOPs';

const { Content } = Layout;
const { Text } = Typography;

/** Mesmo pageSize da tabela para o modo Editar Sequenciamento (paginado) */
const TABLE_PAGE_SIZE = 10;

const FilaProducao = () => {
  const [cenarios, setCenarios] = useState([]);
  const [cenarioAtivo, setCenarioAtivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCenarios, setLoadingCenarios] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [casaPct, setCasaPct] = useState(70);
  const [resumo, setResumo] = useState({ totalCasa: 0, totalCliente: 0, total: 0 });
  const [modoSequenciamento, setModoSequenciamento] = useState(false);
  const [lastFilaData, setLastFilaData] = useState([]);
  const [modalSequenciarOpen, setModalSequenciarOpen] = useState(false);
  const [modalConfirmarOpen, setModalConfirmarOpen] = useState(false);
  const [modalGerarOPsOpen, setModalGerarOPsOpen] = useState(false);
  const tableRef = useRef(null);
  const { searchTerm } = useFilterSearchContext();
  const { setCenarioId: setContextCenarioId, setFiltroTipo: setContextFiltroTipo } = useFilaGanttFilterContext();

  const getSemanaAtual = () => [
    dayjs().startOf('isoWeek'),
    dayjs().endOf('isoWeek'),
  ];

  const [weekRange, setWeekRange] = useState(() => getSemanaAtual());

  useEffect(() => {
    setContextCenarioId(cenarioAtivo ?? (cenarios[0]?.id ?? null));
  }, [cenarioAtivo, cenarios, setContextCenarioId]);

  useEffect(() => {
    setContextFiltroTipo(filtroTipo);
  }, [filtroTipo, setContextFiltroTipo]);

  useEffect(() => {
    let cancelled = false;
    setLoadingCenarios(true);
    SequenciamentoService.getAll({ page: 1, pageSize: 100 })
      .then((res) => {
        if (!cancelled && res.success && res.data?.data) {
          const list = res.data.data;
          setCenarios(list);
          if (list.length && cenarioAtivo == null) setCenarioAtivo(list[0].id);
        }
      })
      .catch(() => {
        if (!cancelled) message.error('Erro ao carregar cenários.');
      })
      .finally(() => {
        if (!cancelled) setLoadingCenarios(false);
      });
    return () => { cancelled = true; };
  }, []);

  const cenarioAtivoId = cenarioAtivo ?? (cenarios[0]?.id ?? null);

  const debouncedReloadTable = useMemo(
    () => debounce(() => { if (tableRef.current) tableRef.current.reloadTable(); }, 300),
    []
  );

  const fetchData = useCallback(
    async (page, pageSize) => {
      setLoading(true);
      try {
        const response = await OrdemProducaoService.getFilaProducao({
          page,
          pageSize,
          search: searchTerm?.trim() || undefined,
          cenarioId: cenarioAtivoId ?? undefined,
          filtroTipo: filtroTipo !== 'todos' ? filtroTipo : undefined,
        });
        const resumoData = response.data?.resumo || {};
        setResumo({ totalCasa: resumoData.totalCasa ?? 0, totalCliente: resumoData.totalCliente ?? 0, total: resumoData.total ?? 0 });
        const data = response.data?.data || [];
        setLastFilaData(data);
        return {
          data,
          total: response.data?.pagination?.totalRecords || 0,
        };
      } catch (error) {
        message.error('Erro ao carregar a fila de produção.');
        console.error(error);
        return { data: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, cenarioAtivoId, filtroTipo]
  );

  const fetchDataForSequenciarModal = useCallback(
    async (page, pageSize, cenarioId, filtroTipoParam) => {
      try {
        const response = await OrdemProducaoService.getFilaProducao({
          page,
          pageSize,
          cenarioId: cenarioId ?? undefined,
          filtroTipo: filtroTipoParam !== 'todos' ? filtroTipoParam : undefined,
        });
        return {
          data: response.data?.data || [],
          total: response.data?.pagination?.totalRecords || 0,
        };
      } catch (error) {
        message.error('Erro ao carregar a fila.');
        console.error(error);
        return { data: [], total: 0 };
      }
    },
    []
  );

  useEffect(() => {
    debouncedReloadTable();
  }, [searchTerm, debouncedReloadTable]);

  useEffect(() => {
    if (cenarioAtivoId != null && tableRef.current) tableRef.current.reloadTable();
  }, [cenarioAtivoId]);

  useEffect(() => {
    if (tableRef.current) tableRef.current.reloadTable();
  }, [filtroTipo]);

  useEffect(() => {
    return () => debouncedReloadTable.cancel?.();
  }, [debouncedReloadTable]);


  const casaReal = resumo.total > 0 ? Math.round((resumo.totalCasa / resumo.total) * 100) : 0;
  const clienteReal = resumo.total > 0 ? 100 - casaReal : 0;
  const desvioProporcao = Math.abs(casaReal - casaPct) > 15;

  const handleSliderChange = (value) => {
    const v = Array.isArray(value) ? value[0] : value;
    setCasaPct(v);
    if (v < 20 || v > 90) {
      message.warning(`Proporção extrema: ${v}% Casa / ${100 - v}% Cliente`);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: '#',
        key: 'posicao',
        width: 56,
        align: 'center',
        render: (_, __, index) => index + 1,
      },
      { title: 'Código', dataIndex: 'codigo', key: 'codigo', width: 90, render: (v) => <Text strong style={{ fontFamily: 'monospace' }}>{v || '-'}</Text> },
        {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 130,
        render: (status) => <StatusBadge status={status} />,
      },
      { title: 'Produto', dataIndex: 'produto', key: 'produto', width: 220, ellipsis: true },
      {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
        width: 90,
        render: (tipo) => {
          const t = tipo || 'cliente';
          return t === 'casa' ? <Tag color="blue">CASA</Tag> : <Tag color="default">CLIENTE</Tag>;
        },
      },

      {
        title: 'Qtd',
        dataIndex: 'quantidade',
        key: 'quantidade',
        width: 80,
        align: 'right',
        render: (v) => (v != null ? Number(v).toLocaleString('pt-BR') : '-'),
      },
      {
        title: 'Data início',
        dataIndex: 'dataInicio',
        key: 'dataInicio',
        width: 100,
        render: (v) => (v ? dayjs(v).format('DD/MM/YYYY') : '-'),
      },
      {
        title: 'Hora prevista',
        dataIndex: 'horaPrevista',
        key: 'horaPrevista',
        width: 100,
        render: (v) => (v || '-'),
      },
      {
        title: 'Entrega',
        dataIndex: 'dataEntrega',
        key: 'dataEntrega',
        width: 110,
        render: (v, record) => {
          const level = getUrgencyLevel(v, record.status);
          const color = urgencyColors[level];
          return <span style={{ color: color || undefined }}>{v ? dayjs(v).format('DD/MM/YYYY') : '-'}</span>;
        },
      },
      { title: 'Recurso', dataIndex: 'recurso', key: 'recurso', width: 110, ellipsis: true },
    
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 80,
        align: 'center',
        render: (score) => <ScoreBadge score={score ?? 0} size="md" />,
      },
      {
        title: 'Ações',
        key: 'acoes',
        width: 100,
        fixed: 'right',
        render: (_, record) => (
          <ActionButtons
            onView={() => {}}
            onEdit={() => {}}
            onCopy={() => {}}
            onActivate={() => {}}
            onDeactivate={() => {}}
            onDelete={() => {}}
            showCopy={false}
            showActivate={false}
            showDeactivate={false}
            showDelete={false}
            size="small"
          />
        ),
      },
    ],
    []
  );

  const handleToggleModoSequenciamento = useCallback(() => {
    if (modoSequenciamento) {
      if (tableRef.current) tableRef.current.reloadTable();
    }
    setModoSequenciamento((v) => !v);
  }, [modoSequenciamento]);

  const onRow = useCallback((record) => ({
    style: urgencyBarColors[getUrgencyLevel(record.dataEntrega, record.status)],
  }), []);

  const handleConfirmarSequenciamento = useCallback(() => {
    setModoSequenciamento(false);
    // Opcional: chamar API para persistir ordem se onReorder estiver implementado
  }, []);

  const handleCancelarSequenciamento = useCallback(() => {
    setModoSequenciamento(false);
    if (tableRef.current) tableRef.current.reloadTable();
  }, []);

  const filtrosNaTitulo = (
    <Space wrap size="small">
       <DatePicker.RangePicker
                    value={weekRange}
                    onChange={(dates) => {
                      if (dates && dates[0] && dates[1]) setWeekRange([dates[0], dates[1]]);
                    }}
                    format="DD/MM/YYYY"
                    placeholder={['Início', 'Fim']}
                    style={{ width: 240 }}
                  />
      <Button
        type={modoSequenciamento ? 'primary' : 'default'}
        icon={<EditOutlined />}
        onClick={handleToggleModoSequenciamento}
      >
        Editar Sequenciamento
      </Button>
      <Button
        icon={<UnorderedListOutlined />}
        onClick={() => setModalSequenciarOpen(true)}
        disabled={modoSequenciamento}
      >
        Sequenciar OP
      </Button>
      {modoSequenciamento && (
        <>
          <Button type="primary" icon={<CheckOutlined />} onClick={handleConfirmarSequenciamento}>
            Confirmar
          </Button>
          <Button icon={<CloseOutlined />} onClick={handleCancelarSequenciamento}>
            Cancelar
          </Button>
        </>
      )}
    </Space>
  );

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              variant="borderless"
              title="Fila de Produção"
              subtitle="Ordenação por cenário de prioridade"
              icon={<ThunderboltOutlined style={{ color: colors.primary }} />}
              extra={filtrosNaTitulo}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Row gutter={16}>
                  <Col xs={24} lg={24}>
                    <div style={{ paddingTop: 8 }}>
                      {modoSequenciamento && (
                        <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
                          Arraste para reordenar (esta página). Confirmar ou Cancelar para sair do modo.
                        </Text>
                      )}
                      <PaginatedTable
                        ref={tableRef}
                        fetchData={fetchData}
                        initialPageSize={TABLE_PAGE_SIZE}
                        columns={columns}
                        rowKey="id"
                        loadingIcon={<LoadingSpinner />}
                        disabled={loading}
                        scroll={{ x: 'max-content' }}
                        onRow={onRow}
                        reorderable={modoSequenciamento}
                      />
                    </div>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
        <ModalSequenciarOP
          open={modalSequenciarOpen}
          onClose={() => setModalSequenciarOpen(false)}
          cenarios={cenarios}
          cenarioAtivoId={cenarioAtivoId}
          setCenarioAtivo={setCenarioAtivo}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
          casaPct={casaPct}
          setCasaPct={setCasaPct}
          columns={columns}
          fetchDataForSequenciarModal={fetchDataForSequenciarModal}
          onRow={onRow}
        />
        <ModalConfirmarOP open={modalConfirmarOpen} onClose={() => setModalConfirmarOpen(false)} />
        <ModalGerarOPs open={modalGerarOPsOpen} onClose={() => setModalGerarOPsOpen(false)} />
      </Content>
    </Layout>
  );
};

export default FilaProducao;
