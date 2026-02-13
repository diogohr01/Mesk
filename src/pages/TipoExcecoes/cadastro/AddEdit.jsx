import { Button, Col, Form, Layout, message, Row } from 'antd';
import { Card, DynamicForm } from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineSave } from 'react-icons/ai';
import TipoExcecoesService from '../../../services/tipoExcecoesService';

const { Content } = Layout;

const formConfig = [
  {
    title: 'Dados do Tipo de Exceção',
    columns: 2,
    questions: [
      { type: 'text', id: 'codigo', required: true, placeholder: 'Ex.: FERIADO', label: 'Código' },
      { type: 'text', id: 'descricao', required: true, placeholder: 'Descrição', label: 'Descrição' },
    ],
  },
];

const AddEdit = ({ editingRecord, onCancel, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchRecordData = useCallback(
    async (recordId) => {
      setLoading(true);
      try {
        const result = await TipoExcecoesService.getById(recordId);
        if (result.success && result.data?.data) {
          const r = result.data.data;
          form.setFieldsValue({
            codigo: r.codigo || '',
            descricao: r.descricao || '',
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
      setLoading(true);
      try {
        const response = await TipoExcecoesService.upsert({ ...values, id: editingRecord?.id });
        if (response.success) {
          message.success(editingRecord ? 'Tipo de exceção atualizado com sucesso!' : 'Tipo de exceção criado com sucesso!');
          onSave();
        }
      } catch (error) {
        message.error('Erro ao salvar tipo de exceção.');
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
              title={editingRecord ? 'Editar Tipo de Exceção' : 'Novo Tipo de Exceção'}
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
