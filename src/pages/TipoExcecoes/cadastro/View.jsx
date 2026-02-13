import { Button, Col, Form, Layout, Row } from 'antd';
import { Card, Loading, ViewForm } from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import TipoExcecoesService from '../../../services/tipoExcecoesService';
import { message } from 'antd';

const { Content } = Layout;

const formConfig = [
  {
    title: 'Dados do Tipo de Exceção',
    columns: 2,
    questions: [
      { type: 'text', id: 'codigo', label: 'Código' },
      { type: 'text', id: 'descricao', label: 'Descrição' },
    ],
  },
];

const View = ({ record, onEdit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    if (!record?.id) return;
    setLoading(true);
    try {
      const response = await TipoExcecoesService.getById(record.id);
      if (response.success && response.data?.data) {
        const data = response.data.data;
        const values = { codigo: data.codigo || '', descricao: data.descricao || '' };
        setFormData(values);
        form.setFieldsValue(values);
      }
    } catch (error) {
      message.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }, [record, form]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { if (formData && !loading) form.setFieldsValue(formData); }, [formData, loading, form]);

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              variant="borderless"
              title="Visualizar Tipo de Exceção"
              extra={
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="default" icon={<AiOutlineArrowLeft />} onClick={onCancel} disabled={loading}>Voltar</Button>
                  {!loading && formData && <Button type="primary" onClick={onEdit}>Editar</Button>}
                </div>
              }
            >
              {loading ? <Loading /> : formData ? <div style={{ padding: '16px 0' }}><ViewForm formConfig={formConfig} formInstance={form} /></div> : null}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default View;
