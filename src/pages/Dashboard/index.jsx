import React, { useEffect, useMemo, useState } from 'react';
import {
  Col,
  Progress,
  Row,
  Typography,
} from 'antd';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  RiseOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Card as LayoutCard, KpiCard, ScoreBadge, StatusBadge } from '../../components';
import OrdemProducaoService from '../../services/ordemProducaoService';
import RecursosProdutivosService from '../../services/recursosProdutivosService';
import { statusLabels } from '../../constants/ordemProducaoStatus';
import { colors } from '../../styles/colors';

const { Title, Text } = Typography;

const RESUMO_STATUS_KEYS = ['rascunho', 'sequenciada', 'confirmada', 'em_producao'];
const RESUMO_STATUS = RESUMO_STATUS_KEYS.map((key) => ({
  key,
  label: statusLabels[key] || key,
  color: key === 'rascunho' ? '#8c8c8c' : key === 'sequenciada' ? '#1890ff' : key === 'confirmada' ? '#385E9D' : '#d46b08',
}));

const Dashboard = () => {
  const [opsResumo, setOpsResumo] = useState([]);
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    OrdemProducaoService.getDadosDashboard().then((res) => {
      if (res.success && res.data && res.data.opsResumo) {
        setOpsResumo(res.data.opsResumo);
      }
    });
    RecursosProdutivosService.getAll().then((res) => {
      if (res.success && res.data && res.data.data) {
        setRecursos(res.data.data.map((r) => ({ nome: r.nome, carga: r.status === 'manutencao' ? 0 : 70, status: r.status })));
      }
    });
  }, []);

  const totalOPs = opsResumo.length;
  const emProducao = opsResumo.filter((op) => op.status === 'em_producao').length;
  const hoje = new Date();
  const atrasadas = opsResumo.filter(
    (op) =>
      op.dataEntrega && new Date(op.dataEntrega) < hoje &&
      op.status !== 'concluida' &&
      op.status !== 'cancelada'
  ).length;
  const concluidas = opsResumo.filter((op) => op.status === 'concluida').length;
  const scoreMedia =
    totalOPs > 0
      ? Math.round(opsResumo.reduce((acc, op) => acc + (op.score || 0), 0) / totalOPs)
      : 0;

  const opsUrgentes = useMemo(
    () =>
      opsResumo
        .filter((op) => op.status !== 'concluida' && op.status !== 'cancelada')
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 5),
    [opsResumo]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title level={4} style={{ margin: 0, color: colors.text.primary }}>
          Dashboard do Planejador
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Visão geral do sequenciamento de produção
        </Text>
      </div>

      {/* KPIs - 5 cards na mesma linha */}
      <Row gutter={[16, 16]} style={{ flexWrap: 'nowrap' }}>
        <Col flex="1 1 0" style={{ minWidth: 0 }}>
          <KpiCard
            title="OPs Totais"
            value={totalOPs}
            icon={FileTextOutlined}
            subtitle="Ordens ativas"
          />
        </Col>
        <Col flex="1 1 0" style={{ minWidth: 0 }}>
          <KpiCard
            title="Em Produção"
            value={emProducao}
            icon={ToolOutlined}
            subtitle="Em execução"
          />
        </Col>
        <Col flex="1 1 0" style={{ minWidth: 0 }}>
          <KpiCard
            title="Atrasadas"
            value={atrasadas}
            icon={WarningOutlined}
            subtitle="Requer ação"
          />
        </Col>
        <Col flex="1 1 0" style={{ minWidth: 0 }}>
          <KpiCard
            title="Concluídas"
            value={concluidas}
            icon={CheckCircleOutlined}
            subtitle="Este mês"
            trend={{ value: '+12%', positive: true }}
          />
        </Col>
        <Col flex="1 1 0" style={{ minWidth: 0 }}>
          <KpiCard
            title="Score Médio"
            value={scoreMedia}
            icon={RiseOutlined}
            subtitle="Eficiência do sequenciamento"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Fila prioritária */}
        <Col xs={24} lg={12}>
          <LayoutCard
            header={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Title level={5} style={{ margin: 0 }}>Fila Prioritária</Title>
                <Link to="/ordem-producao/cadastro" style={{ fontSize: 12, color: colors.primary }}>
                  Ver tudo →
                </Link>
              </div>
            }
            style={{ height: '100%' }}
          >
            <div>
              {opsUrgentes.map((op, i) => (
                <div
                  key={op.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < opsUrgentes.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Text type="secondary" style={{ width: 20, fontFamily: 'monospace', fontSize: 12 }}>
                      {i + 1}
                    </Text>
                    <div>
                      <Text strong style={{ display: 'block', fontSize: 14 }}>
                        {op.codigo}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {op.produto} • {op.cliente}
                      </Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <StatusBadge status={op.status} />
                    <ScoreBadge score={op.score} />
                  </div>
                </div>
              ))}
            </div>
          </LayoutCard>
        </Col>

        {/* Status dos Recursos */}
        <Col xs={24} lg={12}>
          <LayoutCard
            header={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Title level={5} style={{ margin: 0 }}>Status dos Recursos</Title>
                <Link to="/recursos-produtivos" style={{ fontSize: 12, color: colors.primary }}>
                  Gerenciar →
                </Link>
              </div>
            }
            style={{ height: '100%' }}
          >
            <div style={{ marginBottom: 24 }}>
              {recursos.map((r) => (
                <div key={r.nome} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ fontSize: 14 }}>{r.nome}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: r.status === 'operando' ? '#52c41a' : '#ff4d4f',
                      }}
                    >
                      {r.status === 'operando' ? `${r.carga}% carga` : 'Em manutenção'}
                    </Text>
                  </div>
                  <Progress
                    percent={r.status === 'operando' ? r.carga : 100}
                    showInfo={false}
                    strokeColor={r.status === 'operando' ? (r.carga > 80 ? colors.primary : '#d46b08') : '#ff4d4f'}
                    trailColor="#f0f0f0"
                    size="small"
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                background: colors.backgroundGray,
                borderRadius: 8,
                padding: 16,
              }}
            >
              <Text
                strong
                style={{
                  display: 'block',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: colors.text.secondary,
                  marginBottom: 12,
                }}
              >
                Resumo por Status
              </Text>
              <Row gutter={[16, 8]}>
                {RESUMO_STATUS.map((s) => {
                  const count = opsResumo.filter((o) => o.status === s.key).length;
                  return (
                    <Col span={12} key={s.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: s.color,
                            flexShrink: 0,
                          }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {s.label}
                        </Text>
                        <Text strong style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 12 }}>
                          {count}
                        </Text>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </LayoutCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
