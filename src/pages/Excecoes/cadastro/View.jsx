import { Button, Col, Form, Layout, Row } from 'antd';
import { Card, Loading, ViewForm } from '../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import dayjs from 'dayjs';
import ExcecoesService from '../../../services/excecoesService';
import TipoExcecoesService from '../../../services/tipoExcecoesService';
import { message } from 'antd';

const { Content } = Layout;

const View = ({ record, onEdit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    TipoExcecoesService.getAll({ page: 1, pageSize: 500 }).then((res) => {
      if (res.success && res.data?.data) setTipos(res.data.data);
    });
  }, []);

  const formConfig = React.useMemo(
    () => [
      {
        title: 'Dados da Exceção',
        columns: 2,
        questions: [
          { type: 'text', id: 'dataInicio', label: 'Data e hora de início' },
          { type: 'text', id: 'dataFim', label: 'Data e hora de fim' },
          { type: 'text', id: 'tipoDescricao', label: 'Tipo' },
          { type: 'text', id: 'descricao', label: 'Descrição' },
        ],
      },
    ],
    []
  );

  const fetchData = useCallback(async () => {
    if (!record?.id) return;
    setLoading(true);
    try {
      const response = await ExcecoesService.getById(record.id);
      if (response.success && response.data?.data) {
        const data = response.data.data;
        const tipo = tipos.find((t) => t.id === data.tipoId);
        const values = {
          dataInicio: data.dataInicio ? dayjs(data.dataInicio).format('DD/MM/YYYY HH:mm') : '',
          dataFim: data.dataFim ? dayjs(data.dataFim).format('DD/MM/YYYY HH:mm') : '',
          tipoDescricao: tipo ? (tipo.descricao || tipo.codigo) : '',
          descricao: data.descricao || '',
        };
        setFormData(values);
        form.setFieldsValue(values);
      }
    } catch (error) {
      message.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }, [record, form, tipos]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { if (formData && !loading && tipos.length) form.setFieldsValue(formData); }, [formData, loading, form, tipos]);

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              variant="borderless"
              title="Visualizar Exceção"
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
