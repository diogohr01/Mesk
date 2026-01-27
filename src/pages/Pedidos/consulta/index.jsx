import React, { memo } from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const PedidosConsulta = () => {
  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Text>Consulta de Pedidos - Em desenvolvimento</Text>
      </Content>
    </Layout>
  );
};

export default memo(PedidosConsulta);
