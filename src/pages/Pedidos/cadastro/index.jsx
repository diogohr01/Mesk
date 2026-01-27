import React, { useState, useCallback, memo } from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const PedidosCadastro = () => {
  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Text>Cadastro de Pedidos - Em desenvolvimento</Text>
      </Content>
    </Layout>
  );
};

export default memo(PedidosCadastro);
