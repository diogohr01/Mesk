import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Form, Row, Slider, Space, Tag, Typography } from 'antd';
import { Card, DynamicForm, LoadingSpinner, PaginatedTable } from '../../components';
import {
  CalendarOutlined,
  DeleteOutlined,
  HolderOutlined,
  RollbackOutlined,
  SettingOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import dayjs from 'dayjs';
import { toast } from '../../helpers/toast';
import ConfiguracoesService from '../../services/configuracoesService';
import RecursosProdutivosService from '../../services/recursosProdutivosService';
import { colors } from '../../styles/colors';

const { Text } = Typography;

const Configuracoes = () => {
  const [criterios, setCriterios] = useState([]);
  const total = criterios.reduce((s, c) => s + c.value, 0);
  const [excecoes, setExcecoes] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [showAddExcecao, setShowAddExcecao] = useState(false);
  const [excecaoForm] = Form.useForm();
  const excecoesTableRef = useRef(null);

  useEffect(() => {
    ConfiguracoesService.getCriteriosScore().then((res) => {
      if (res.success && res.data && res.data.data) {
        setCriterios(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    ConfiguracoesService.getExcecoes().then((res) => {
      if (res.success && res.data && res.data.data) {
        setExcecoes(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    RecursosProdutivosService.getAll().then((res) => {
      if (res.success && res.data && res.data.data) {
        setRecursos(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (showAddExcecao) {
      excecaoForm.setFieldsValue({ tipo: 'feriado' });
    } else {
      excecaoForm.resetFields();
    }
  }, [showAddExcecao, excecaoForm]);

  const formConfigExcecao = useMemo(
    () => [
      {
        columns: 2,
        questions: [
          {
            type: 'date',
            id: 'dataInicio',
            label: 'Data início',
            required: true,
            format: 'DD/MM/YYYY',
          },
          {
            type: 'date',
            id: 'dataFim',
            label: 'Data fim (opcional)',
            required: false,
            format: 'DD/MM/YYYY',
          },
          {
            type: 'select',
            id: 'tipo',
            label: 'Tipo',
            options: [
              { value: 'feriado', label: 'Feriado' },
              { value: 'manutencao', label: 'Manutenção' },
              { value: 'outro', label: 'Outro' },
            ],
          },
          {
            type: 'text',
            id: 'descricao',
            label: 'Descrição',
            placeholder: 'Ex.: Carnaval, Manutenção preventiva',
          },
          {
            type: 'multiselect',
            id: 'recursoIds',
            label: 'Recursos (prensas)',
            placeholder: 'Todos se vazio',
            options: recursos.map((r) => ({ value: r.id, label: r.nome })),
          },
        ],
      },
    ],
    [recursos]
  );

  const handleValueChange = useCallback((id, newValue) => {
    setCriterios((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: newValue } : c))
    );
  }, []);

  const handleReset = useCallback(() => {
    ConfiguracoesService.getCriteriosScore().then((res) => {
      if (res.success && res.data && res.data.data) {
        setCriterios(res.data.data);
        toast.success('Pesos resetados', 'Valores restaurados ao padrão.');
      }
    });
  }, []);

  const handleNormalize = useCallback(() => {
    if (total === 0) return;
    const factor = 100 / total;
    setCriterios((prev) => {
      const normalized = prev.map((c) => ({
        ...c,
        value: Math.round(c.value * factor),
      }));
      const sum = normalized.reduce((s, c) => s + c.value, 0);
      const diff = 100 - sum;
      if (diff !== 0 && normalized.length) {
        normalized[0].value += diff;
      }
      return normalized;
    });
    toast.success('Pesos normalizados', 'Total ajustado para 100%.');
  }, [total]);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from === to) return;
    setCriterios((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(to, 0, removed);
      return next;
    });
  }, []);

  const handleCancelExcecao = useCallback(() => {
    setShowAddExcecao(false);
  }, []);

  const handleSaveExcecao = useCallback(
    (values) => {
      const serializeDate = (v) =>
        !v ? null : (dayjs.isDayjs(v) ? v : dayjs(v)).format('YYYY-MM-DD');
      const dataInicio = serializeDate(values.dataInicio);
      if (!dataInicio) {
        toast.error('Data de início obrigatória.');
        return;
      }
      const dataFim = serializeDate(values.dataFim) || dataInicio;
      const recursoIds = values.recursoIds || [];
      const nova = {
        id: `e${Date.now()}`,
        dataInicio,
        dataFim,
        tipo: values.tipo || 'feriado',
        descricao: values.descricao || '',
        recursoIds,
        recursos: recursoIds.map((id) => {
          const r = recursos.find((rec) => rec.id === id);
          return r ? { id: r.id, nome: r.nome } : null;
        }).filter(Boolean),
      };
      setExcecoes((prev) => [...prev, nova]);
      excecaoForm.resetFields();
      setShowAddExcecao(false);
      toast.success('Exceção adicionada', 'A exceção foi registada na lista.');
      setTimeout(() => excecoesTableRef.current?.reloadTable(), 0);
    },
    [recursos, excecaoForm]
  );

  const handleRemoveExcecao = useCallback((id) => {
    setExcecoes((prev) => prev.filter((e) => e.id !== id));
    toast.success('Exceção removida');
    setTimeout(() => excecoesTableRef.current?.reloadTable(), 0);
  }, []);

  const fetchDataExcecoes = useCallback(
    async (page, pageSize) => {
      const start = (page - 1) * pageSize;
      return {
        data: excecoes.slice(start, start + pageSize),
        total: excecoes.length,
      };
    },
    [excecoes]
  );

  const columnsExcecoes = useMemo(
    () => [
      {
        key: 'excecao',
        title: '',
        dataIndex: null,
        render: (_, record) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.backgroundGray}`,
              backgroundColor: colors.background,
            }}
          >
            <Tag
              color={
                record.tipo === 'feriado'
                  ? 'blue'
                  : record.tipo === 'manutencao'
                    ? 'orange'
                    : 'default'
              }
            >
              {record.tipo === 'feriado' ? 'Feriado' : record.tipo === 'manutencao' ? 'Manutenção' : 'Outro'}
            </Tag>
            <Text style={{ flex: '1 1 auto', minWidth: 0 }}>
              {record.descricao || '—'}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.dataInicio && dayjs(record.dataInicio).format('DD/MM/YYYY')}
              {record.dataFim && record.dataFim !== record.dataInicio
                ? ` — ${dayjs(record.dataFim).format('DD/MM/YYYY')}`
                : ''}
            </Text>
            {(record.recursos && record.recursos.length > 0) && (
              <Space size={4} wrap>
                {record.recursos.map((r) => (
                  <Tag key={r.id}>{r.nome}</Tag>
                ))}
              </Space>
            )}
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveExcecao(record.id)}
              title="Remover exceção"
            />
          </div>
        ),
      },
    ],
    [handleRemoveExcecao]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            color: colors.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <SettingOutlined style={{ color: colors.primary }} />
          Configurações
        </h2>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Parâmetros de sequenciamento e integração
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <SlidersOutlined style={{ color: colors.primary }} />
                <span>Motor de Sequenciamento</span>
              </Space>
            }
            extra={
              <Space wrap>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'monospace',
                    padding: '2px 8px',
                    borderRadius: 4,
                    backgroundColor: total === 100 ? 'rgba(82, 196, 26, 0.15)' : 'rgba(255, 77, 79, 0.15)',
                    color: total === 100 ? '#52c41a' : '#ff4d4f',
                  }}
                >
                  Total: {total}%
                </span>
                {total !== 100 && (
                  <Button type="default" size="small" onClick={handleNormalize}>
                    Normalizar
                  </Button>
                )}
                <Button
                  type="text"
                  size="small"
                  icon={<RollbackOutlined />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Space>
            }
            style={{ borderColor: colors.backgroundGray }}
          >
            <Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 12 }}>
              Arraste para reordenar a prioridade. Ajuste os sliders para alterar os pesos.
            </Text>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="criterios">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    {criterios.map((item, index) => (
                      <CriterioRow
                        key={item.id}
                        item={item}
                        index={index}
                        onValueChange={handleValueChange}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Integração ERP TOTVS"
            style={{ borderColor: colors.backgroundGray }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <LinhaStatus
                label="Status da Conexão"
                valor="Conectado"
                badgeSuccess
              />
              <LinhaStatus
                label="Última Sincronização"
                valor="08/02/2026 14:32"
                mono
              />
              <LinhaStatus label="OPs Importadas (hoje)" valor="12" mono />
              <LinhaStatus
                label="Erros de Integração"
                valor="0"
                mono
                last
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <CalendarOutlined style={{ color: colors.primary }} />
            <span>Exceções de Calendário</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
                  onClick={() => setShowAddExcecao((v) => !v)}
          >
            {showAddExcecao ? 'Fechar' : 'Nova Exceção'}
          </Button>
        }
        style={{ borderColor: colors.backgroundGray }}
      >
        <Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 12 }}>
          Feriados, manutenções e dias sem produção; exibidos como blocos no Gantt.
        </Text>

        {showAddExcecao && (
          <div
            style={{
              padding: 16,
              marginBottom: 16,
              borderRadius: 8,
              border: `1px solid ${colors.backgroundGray}`,
              backgroundColor: colors.background,
            }}
          >
            <DynamicForm
              formConfig={formConfigExcecao}
              formInstance={excecaoForm}
              onSubmit={handleSaveExcecao}
              onClose={handleCancelExcecao}
              submitText="Salvar"
              submitOnSide={true}
            />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {excecoes.length === 0 ? (
            <Text type="secondary">Nenhuma exceção registada.</Text>
          ) : (
            <PaginatedTable
              ref={excecoesTableRef}
              fetchData={fetchDataExcecoes}
              columns={columnsExcecoes}
              initialPageSize={10}
              rowKey="id"
              showHeader={false}
              loadingIcon={<LoadingSpinner />}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

function CriterioRow({ item, index, onValueChange }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 6,
            border: `1px solid ${colors.backgroundGray}`,
            backgroundColor: snapshot.isDragging ? colors.backgroundGray : colors.background,
            boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
            userSelect: 'none',
            ...provided.draggableProps.style,
          }}
        >
          <span
            {...provided.dragHandleProps}
            style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}
            title="Arraste para reordenar"
          >
            <HolderOutlined style={{ color: colors.text.secondary, fontSize: 16 }} />
          </span>
          <span
            style={{
              fontSize: 12,
              fontFamily: 'monospace',
              color: colors.text.secondary,
              width: 20,
              flexShrink: 0,
            }}
          >
            {index + 1}.
          </span>
          <span
            style={{
              fontSize: 14,
              color: colors.text.primary,
              width: 140,
              flexShrink: 0,
            }}
          >
            {item.label}
          </span>
          <div
            style={{ flex: 1, minWidth: 0, padding: '0 8px' }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Slider
              min={0}
              max={50}
              value={item.value}
              onChange={(v) => onValueChange(item.id, v)}
              style={{ margin: 0 }}
            />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.primary,
              width: 36,
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            {item.value}%
          </span>
        </div>
      )}
    </Draggable>
  );
}

function LinhaStatus({ label, valor, badgeSuccess, mono, last }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: last ? 'none' : `1px solid ${colors.backgroundGray}`,
      }}
    >
      <Text type="secondary" style={{ fontSize: 14 }}>
        {label}
      </Text>
      {badgeSuccess ? (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: '#52c41a',
            backgroundColor: 'rgba(82, 196, 26, 0.15)',
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          {valor}
        </span>
      ) : (
        <Text
          style={{
            fontSize: 12,
            fontFamily: mono ? 'monospace' : 'inherit',
          }}
        >
          {valor}
        </Text>
      )}
    </div>
  );
}

export default Configuracoes;
