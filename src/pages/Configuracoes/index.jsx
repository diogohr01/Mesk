import React from 'react';
import { Col, Row, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Card } from '../../components';
import { colors } from '../../styles/colors';

const { Text } = Typography;

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
      <Text type="secondary" style={{ fontSize: 13 }}>
        {label}
      </Text>
      {badgeSuccess ? (
        <span
          style={{
            fontSize: 11,
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
            fontSize: 11,
            fontFamily: mono ? 'monospace' : 'inherit',
          }}
        >
          {valor}
        </Text>
      )}
    </div>
  );
}

const Configuracoes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 18,
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
        <Text type="secondary" style={{ fontSize: 13 }}>
          Integração ERP
        </Text>
      </div>

      <Row gutter={[16, 16]}>
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
    </div>
  );
};

export default Configuracoes;
