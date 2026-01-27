import React, { memo } from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const ClientesConsulta = () => {
  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Text>Consulta de Clientes - Em desenvolvimento</Text>
      </Content>
    </Layout>
  );
};

export default memo(ClientesConsulta);
