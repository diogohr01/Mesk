import { Badge, Button, Col, DatePicker, Form, Input, Layout, message, Modal, Row, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineClear, AiOutlineFilter, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { Card, LoadingSpinner, PaginatedTable, ActionButtons } from '../../../components';
import OrdemProducaoService from '../../../services/ordemProducaoService';
import { colors } from '../../../styles/colors';

const { confirm } = Modal;
const { Content } = Layout;
const { Text } = Typography;

const List = ({ onAdd, onEdit, onView }) => {
  const [loading, setLoading] = useState(false);
  const [filterForm] = Form.useForm();
  const tableRef = useRef(null);

  // Função debounced para aplicar filtros
  const debouncedReloadTable = useMemo(
    () => debounce(() => {
      if (tableRef.current) {
        tableRef.current.reloadTable();
      }
    }, 300),
    []
  );

  // Atualiza o fetchData para incluir os filtros
  const fetchData = useCallback(
    async (page, pageSize, sorterField, sortOrder) => {
      setLoading(true);
      try {
        const filters = filterForm.getFieldsValue();
        const requestData = {
          page,
          pageSize,
          sorterField,
          sortOrder,
          ...filters,
        };

        const response = await OrdemProducaoService.getAll(requestData);

        return {
          data: response.data.data || [],
          total: response.data.pagination?.totalRecords || 0
        };
      } catch (error) {
        message.error('Erro ao buscar dados.');
        console.error('Erro ao buscar dados:', error);
        return { data: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    [filterForm]
  );

  const handleEdit = useCallback((record) => {
    onEdit(record);
  }, [onEdit]);

  const handleView = useCallback((record) => {
    onView(record);
  }, [onView]);

  const handleDelete = useCallback((record) => {
    confirm({
      title: 'Confirmar exclusão',
      content: 'Tem certeza de que deseja excluir esta Ordem de Produção?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        setLoading(true);
        try {
          await OrdemProducaoService.delete(record.id);
          message.success('Ordem de Produção excluída com sucesso!');
          if (tableRef.current) {
            tableRef.current.reloadTable();
          }
        } catch (error) {
          message.error('Erro ao excluir Ordem de Produção.');
          console.error('Erro ao excluir:', error);
        } finally {
          setLoading(false);
        }
      },
    });
  }, []);

  const handleCopy = useCallback(async (record) => {
    try {
      setLoading(true);
      const response = await OrdemProducaoService.copiar(record.id);
      if (response.success) {
        message.success('Ordem de Produção copiada com sucesso!');
        if (tableRef.current) {
          tableRef.current.reloadTable();
        }
      }
    } catch (error) {
      message.error('Erro ao copiar Ordem de Produção.');
      console.error('Erro ao copiar:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAtivarDesativar = useCallback(async (record) => {
    try {
      setLoading(true);
      const novoStatus = !record.ativo;
      const response = await OrdemProducaoService.ativarDesativar(record.id, novoStatus);
      if (response.success) {
        message.success(novoStatus ? 'Ordem ativada com sucesso!' : 'Ordem desativada com sucesso!');
        if (tableRef.current) {
          tableRef.current.reloadTable();
        }
      }
    } catch (error) {
      message.error('Erro ao alterar status da Ordem.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para aplicar os filtros e recarregar a tabela
  const handleFilter = useCallback((values) => {
    debouncedReloadTable();
  }, [debouncedReloadTable]);

  // Memoizar colunas para evitar re-renders desnecessários
  const columns = useMemo(() => [
    { 
      title: 'OP ERP', 
      dataIndex: 'numeroOPERP', 
      key: 'numeroOPERP',
      width: 120,
    },
    {
      title: 'Data',
      dataIndex: 'dataOP',
      key: 'dataOP',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-',
      sorter: true,
    },
    {
      title: 'Cliente',
      dataIndex: ['cliente', 'nome'],
      key: 'cliente',
      width: 250,
    },
    {
      title: 'Situação',
      dataIndex: 'situacao',
      key: 'situacao',
      width: 150,
      render: (situacao) => {
        const colorMap = {
          'Em cadastro': 'default',
          'Liberada': 'processing',
          'Programada': 'warning',
          'Encerrada': 'success',
        };
        return <Badge status={colorMap[situacao] || 'default'} text={situacao} />;
      },
    },
    {
      title: 'Qtd Total (peças)',
      dataIndex: 'itens',
      key: 'quantidadeTotal',
      width: 150,
      align: 'right',
      render: (itens) => {
        if (!itens || !Array.isArray(itens)) return '0';
        const total = itens.reduce((sum, item) => sum + (parseFloat(item.quantidadePecas) || 0), 0);
        return total.toLocaleString('pt-BR');
      },
    },
    {
      title: 'Status',
      dataIndex: 'ativo',
      key: 'ativo',
      width: 100,
      render: (ativo) => (
        <Badge 
          status={ativo ? 'success' : 'default'} 
          text={ativo ? 'Ativo' : 'Inativo'} 
        />
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <ActionButtons
          onView={() => handleView(record)}
          onEdit={() => handleEdit(record)}
          onCopy={() => handleCopy(record)}
          onActivate={() => handleAtivarDesativar(record)}
          onDeactivate={() => handleAtivarDesativar(record)}
          onDelete={() => handleDelete(record)}
          isActive={record.ativo}
          size="small"
        />
      ),
    },
  ], [handleEdit, handleView, handleDelete, handleCopy, handleAtivarDesativar]);

  // Cleanup do debounce quando o componente for desmontado
  useEffect(() => {
    return () => {
      debouncedReloadTable.cancel();
    };
  }, [debouncedReloadTable]);

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              variant="borderless"
              styles={{
                header: {
                  padding: '16px 24px',
                  borderBottom: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#262626' }}>
                  Ordens de Produção
                </h2>
                <Button
                  type="primary"
                  icon={<AiOutlinePlus />}
                  onClick={onAdd}
                  disabled={loading}
                  size="middle"
                >
                  Adicionar Ordem
                </Button>
              </div>

              {/* Filtros sempre visíveis */}
              <div style={{
                margin: '12px 0',
                padding: '12px',
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0',
                borderRadius: '6px'
              }}>
                <Form
                  form={filterForm}
                  layout="vertical"
                  onFinish={handleFilter}
                  style={{ marginBottom: 0 }}
                >
                  <Row gutter={[12, 6]} align="bottom">
                    <Col xs={24} sm={12} md={6} lg={4}>
                      <Form.Item
                        name="numeroOPERP"
                        label="OP ERP"
                        style={{ marginBottom: '4px' }}
                      >
                        <Input
                          placeholder="Digite o número da OP..."
                          size="middle"
                          allowClear
                          prefix={<AiOutlineSearch style={{ color: '#bfbfbf' }} />}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                      <Form.Item
                        name="cliente"
                        label="Cliente"
                        style={{ marginBottom: '4px' }}
                      >
                        <Input
                          placeholder="Digite o nome do cliente..."
                          size="middle"
                          allowClear
                          prefix={<AiOutlineSearch style={{ color: '#bfbfbf' }} />}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                      <Form.Item
                        name="situacao"
                        label="Situação"
                        style={{ marginBottom: '4px' }}
                      >
                        <Input
                          placeholder="Digite a situação..."
                          size="middle"
                          allowClear
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                      <Form.Item
                        name="dataOP"
                        label="Data"
                        style={{ marginBottom: '4px' }}
                      >
                        <DatePicker
                          placeholder="Selecione a data..."
                          size="middle"
                          style={{ width: '100%' }}
                          format="DD/MM/YYYY"
                          allowClear
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                      <Form.Item
                        label=" "
                        style={{ marginBottom: '4px' }}
                      >
                        <Space size="small" style={{ width: '100%' }}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="middle"
                            icon={<AiOutlineSearch />}
                            loading={loading}
                            style={{ minWidth: '80px', flex: 1 }}
                          >
                            Filtrar
                          </Button>
                          <Button
                            size="middle"
                            icon={<AiOutlineClear />}
                            onClick={() => {
                              filterForm.resetFields();
                              debouncedReloadTable();
                            }}
                            style={{ minWidth: '80px', flex: 1 }}
                          >
                            Limpar
                          </Button>
                        </Space>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div style={{ padding: '16px 0' }}>
                <PaginatedTable
                  ref={tableRef}
                  disabled={loading}
                  fetchData={fetchData}
                  initialPageSize={10}
                  columns={columns}
                  loadingIcon={<LoadingSpinner />}
                  rowKey="id"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default memo(List);
