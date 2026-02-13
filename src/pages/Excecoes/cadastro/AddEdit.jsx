import { Button, Col, Form, Layout, message, Row } from 'antd';
import { Card, DynamicForm } from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineSave } from 'react-icons/ai';
import dayjs from 'dayjs';
import ExcecoesService from '../../../services/excecoesService';
import TipoExcecoesService from '../../../services/tipoExcecoesService';
import RecursosProdutivosService from '../../../services/recursosProdutivosService';

const { Content } = Layout;

const AddEdit = ({ editingRecord, onCancel, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    TipoExcecoesService.getAll({ page: 1, pageSize: 500 }).then((res) => {
      if (res.success && res.data?.data) setTipos(res.data.data);
    });
    RecursosProdutivosService.getAll().then((res) => {
      if (res.success && res.data?.data) setRecursos(res.data.data);
    });
  }, []);

  const formConfig = React.useMemo(
    () => [
      {
        title: 'Dados da Exceção',
        columns: 2,
        questions: [
          {
            type: 'datetime',
            id: 'dataInicio',
            label: 'Data e hora de início',
            required: true,
            format: 'DD/MM/YYYY HH:mm',
          },
          {
            type: 'datetime',
            id: 'dataFim',
            label: 'Data e hora de fim',
            required: true,
            format: 'DD/MM/YYYY HH:mm',
          },
          {
            type: 'select',
            id: 'tipoId',
            label: 'Tipo de exceção',
            placeholder: 'Selecione',
            options: tipos.map((t) => ({ value: t.id, label: t.descricao || t.codigo })),
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
            label: 'Recursos',
            placeholder: 'Todos se vazio',
            options: recursos.map((r) => ({ value: r.id, label: r.nome })),
          },
        ],
      },
    ],
    [tipos, recursos]
  );

  const fetchRecordData = useCallback(
    async (recordId) => {
      setLoading(true);
      try {
        const result = await ExcecoesService.getById(recordId);
        if (result.success && result.data?.data) {
          const r = result.data.data;
          form.setFieldsValue({
            dataInicio: r.dataInicio ? dayjs(r.dataInicio) : null,
            dataFim: r.dataFim ? dayjs(r.dataFim) : null,
            tipoId: r.tipoId ?? undefined,
            descricao: r.descricao || '',
            recursoIds: r.recursoIds || [],
          });
        }
      } catch (error) {
        message.error('Erro ao buscar o registro.');
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  useEffect(() => {
    if (editingRecord?.id) fetchRecordData(editingRecord.id);
    else form.resetFields();
  }, [editingRecord, fetchRecordData, form]);

  const handleSave = useCallback(
    async (values) => {
      const dataInicio = values.dataInicio ? (dayjs.isDayjs(values.dataInicio) ? values.dataInicio.toISOString() : values.dataInicio) : null;
      const dataFim = values.dataFim ? (dayjs.isDayjs(values.dataFim) ? values.dataFim.toISOString() : values.dataFim) : null;
      if (!dataInicio || !dataFim) {
        message.error('Data e hora de início e fim são obrigatórias.');
        return;
      }
      setLoading(true);
      try {
        const response = await ExcecoesService.upsert({
          id: editingRecord?.id,
          dataInicio,
          dataFim,
          tipoId: values.tipoId ?? null,
          descricao: values.descricao || '',
          recursoIds: values.recursoIds || [],
        });
        if (response.success) {
          message.success(editingRecord ? 'Exceção atualizada com sucesso!' : 'Exceção criada com sucesso!');
          onSave();
        } else {
          message.error(response.message || 'Erro ao salvar.');
        }
      } catch (error) {
        message.error('Erro ao salvar exceção.');
      } finally {
        setLoading(false);
      }
    },
    [editingRecord, onSave]
  );

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              variant="borderless"
              title={editingRecord ? 'Editar Exceção' : 'Nova Exceção'}
              extra={
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button icon={<AiOutlineArrowLeft />} onClick={onCancel} disabled={loading}>Voltar</Button>
                  <Button type="primary" icon={<AiOutlineSave />} onClick={() => form.submit()} loading={loading}>Salvar</Button>
                </div>
              }
            >
              <div style={{ padding: '16px 0' }}>
                <DynamicForm formConfig={formConfig} formInstance={form} onSubmit={handleSave} submitText="Salvar" />
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AddEdit;
