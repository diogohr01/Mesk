import { DollarOutlined, ShoppingOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Statistic, Tag, Typography } from 'antd';
import { Card } from '../../../components';
import React, { memo, useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { colors } from '../../../styles/colors';

const { Title, Text } = Typography;

const { Content } = Layout;

// Dados movidos para fora do componente para evitar recriação
const lineChartData = [
  { name: 'Jan', vendas: 30, meta: 35, clientes: 120 },
  { name: 'Fev', vendas: 40, meta: 38, clientes: 135 },
  { name: 'Mar', vendas: 45, meta: 42, clientes: 150 },
  { name: 'Abr', vendas: 50, meta: 45, clientes: 165 },
  { name: 'Mai', vendas: 49, meta: 48, clientes: 158 },
  { name: 'Jun', vendas: 60, meta: 55, clientes: 180 },
  { name: 'Jul', vendas: 70, meta: 65, clientes: 195 },
  { name: 'Ago', vendas: 65, meta: 60, clientes: 185 },
  { name: 'Set', vendas: 75, meta: 70, clientes: 210 },
  { name: 'Out', vendas: 80, meta: 75, clientes: 225 },
  { name: 'Nov', vendas: 85, meta: 80, clientes: 240 },
  { name: 'Dez', vendas: 90, meta: 85, clientes: 255 },
];

// Dados para o gráfico de barras (Receita por Trimestre)
const barChartData = [
  { name: 'Q1', receita: 400, custos: 250, lucro: 150 },
  { name: 'Q2', receita: 430, custos: 280, lucro: 150 },
  { name: 'Q3', receita: 448, custos: 300, lucro: 148 },
  { name: 'Q4', receita: 470, custos: 320, lucro: 150 },
];

// Dados para gráfico de pizza (Distribuição de Vendas por Categoria)
const pieChartData = [
  { name: 'Eletrônicos', value: 35, color: colors.chart.primary },
  { name: 'Roupas', value: 25, color: colors.chart.secondary },
  { name: 'Casa', value: 20, color: colors.chart.warning },
  { name: 'Esportes', value: 15, color: colors.chart.danger },
  { name: 'Livros', value: 5, color: colors.chart.info },
];

// Dados para gráfico de área (Crescimento de Usuários)
const areaChartData = [
  { name: 'Jan', usuarios: 1000, novos: 50 },
  { name: 'Fev', usuarios: 1200, novos: 200 },
  { name: 'Mar', usuarios: 1400, novos: 200 },
  { name: 'Abr', usuarios: 1600, novos: 200 },
  { name: 'Mai', usuarios: 1800, novos: 200 },
  { name: 'Jun', usuarios: 2000, novos: 200 },
  { name: 'Jul', usuarios: 2200, novos: 200 },
];

// Dados para gráfico combinado (Vendas vs Meta)
const composedChartData = [
  { name: 'Jan', vendas: 30, meta: 35, clientes: 120 },
  { name: 'Fev', vendas: 40, meta: 38, clientes: 135 },
  { name: 'Mar', vendas: 45, meta: 42, clientes: 150 },
  { name: 'Abr', vendas: 50, meta: 45, clientes: 165 },
  { name: 'Mai', vendas: 49, meta: 48, clientes: 158 },
  { name: 'Jun', vendas: 60, meta: 55, clientes: 180 },
];

// Dados para gráfico de dispersão (Idade vs Renda)
const scatterData = [
  { idade: 25, renda: 3000, categoria: 'A' },
  { idade: 30, renda: 4500, categoria: 'B' },
  { idade: 35, renda: 6000, categoria: 'B' },
  { idade: 40, renda: 7500, categoria: 'C' },
  { idade: 45, renda: 9000, categoria: 'C' },
  { idade: 50, renda: 12000, categoria: 'D' },
  { idade: 55, renda: 15000, categoria: 'D' },
];

// Dados para gráfico radial (Performance)
const radialData = [
  { name: 'Vendas', value: 85, fill: colors.chart.primary },
  { name: 'Marketing', value: 70, fill: colors.chart.secondary },
  { name: 'Suporte', value: 90, fill: colors.chart.warning },
  { name: 'Desenvolvimento', value: 75, fill: colors.chart.danger },
];

const Charts = () => {
  // Memoizar configurações dos gráficos para evitar recriação
  const chartConfig = useMemo(() => ({
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
    height: 300,
  }), []);

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          {/* Título da Página */}
          <Col span={24}>
            <Card title="Dashboard de Analytics" variant="borderless">
              <Text type="secondary">Visualização completa de dados e métricas de negócio</Text>
            </Card>
          </Col>

          {/* Primeira Linha - Métricas Principais */}
          <Col span={6}>
            <Card>
              <Statistic
                title="Total de Vendas"
                value={112893}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ShoppingOutlined />}
                suffix="Unidades"
              />
              <div style={{ marginTop: '8px' }}>
                <Tag color="green">+12.5%</Tag>
                <Text type="secondary" style={{ marginLeft: '8px' }}>vs mês anterior</Text>
              </div>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic
                title="Receita Total"
                value={245300}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                suffix="USD"
              />
              <div style={{ marginTop: '8px' }}>
                <Tag color="green">+8.2%</Tag>
                <Text type="secondary" style={{ marginLeft: '8px' }}>vs mês anterior</Text>
              </div>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic
                title="Novos Clientes"
                value={1847}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserOutlined />}
                suffix="Usuários"
              />
              <div style={{ marginTop: '8px' }}>
                <Tag color="green">+15.3%</Tag>
                <Text type="secondary" style={{ marginLeft: '8px' }}>vs mês anterior</Text>
              </div>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Statistic
                title="Taxa de Conversão"
                value={3.2}
                precision={1}
                valueStyle={{ color: '#cf1322' }}
                prefix={<TrophyOutlined />}
                suffix="%"
              />
              <div style={{ marginTop: '8px' }}>
                <Tag color="red">-0.5%</Tag>
                <Text type="secondary" style={{ marginLeft: '8px' }}>vs mês anterior</Text>
              </div>
            </Card>
          </Col>

          {/* Gráfico de Linhas - Vendas vs Meta */}
          <Col span={16}>
            <Card title="Vendas vs Meta - Anual" variant="borderless">
              <ResponsiveContainer width="100%" height={280} debounce={1}>
                <LineChart data={lineChartData} isAnimationActive={false}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke={colors.chart.primary} />
                  <YAxis stroke={colors.chart.primary} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="vendas"
                    stroke={colors.chart.primary}
                    strokeWidth={3}
                    name="Vendas Realizadas"
                    dot={{ fill: colors.chart.primary, strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke={colors.chart.secondary}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta"
                    dot={{ fill: colors.chart.secondary, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico de Pizza - Distribuição por Categoria */}
          <Col span={8}>
            <Card title="Vendas por Categoria" variant="borderless">
              <ResponsiveContainer width="100%" height={280} debounce={1}>
                <PieChart isAnimationActive={false}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill={colors.chart.primary}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico de Área - Crescimento de Usuários */}
          <Col span={12}>
            <Card title="Crescimento de Usuários" variant="borderless">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={areaChartData} isAnimationActive={false}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke={colors.chart.primary} />
                  <YAxis stroke={colors.chart.primary} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="usuarios"
                    stackId="1"
                    stroke={colors.chart.primary}
                    fill={colors.chart.primary}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="novos"
                    stackId="2"
                    stroke={colors.chart.secondary}
                    fill={colors.chart.secondary}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico de Barras - Receita vs Custos */}
          <Col span={12}>
            <Card title="Receita vs Custos - Trimestral" variant="borderless">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke={colors.chart.primary} />
                  <YAxis stroke={colors.chart.primary} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="receita" fill={colors.chart.primary} name="Receita" />
                  <Bar dataKey="custos" fill={colors.chart.danger} name="Custos" />
                  <Bar dataKey="lucro" fill={colors.chart.secondary} name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico Combinado - Vendas, Meta e Clientes */}
          <Col span={16}>
            <Card title="Análise Completa - Vendas, Meta e Clientes" variant="borderless">
              <ResponsiveContainer width="100%" height={280} debounce={1}>
                <ComposedChart data={composedChartData} isAnimationActive={false}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke={colors.chart.primary} />
                  <YAxis yAxisId="left" stroke={colors.chart.primary} />
                  <YAxis yAxisId="right" orientation="right" stroke={colors.chart.primary} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="vendas" fill={colors.chart.primary} name="Vendas" />
                  <Line yAxisId="left" type="monotone" dataKey="meta" stroke={colors.chart.warning} name="Meta" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="clientes" stroke={colors.chart.secondary} name="Clientes" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico de Dispersão - Idade vs Renda */}
          <Col span={8}>
            <Card title="Análise Demográfica - Idade vs Renda" variant="borderless">
              <ResponsiveContainer width="100%" height={280} debounce={1}>
                <ScatterChart data={scatterData} isAnimationActive={false}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" dataKey="idade" name="Idade" stroke={colors.chart.primary} />
                  <YAxis type="number" dataKey="renda" name="Renda" stroke={colors.chart.primary} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="renda" fill={colors.chart.primary} />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico Radial */}
          <Col span={24}>
            <Card title="Performance por Departamento" variant="borderless">
              <Row gutter={[16, 16]}>
                {radialData.map((item, index) => (
                  <Col span={6} key={index}>
                    <div style={{ textAlign: 'center' }}>
                      <ResponsiveContainer width="100%" height={160}>
                        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[item]}>
                          <RadialBar dataKey="value" fill={item.fill} />
                          <Tooltip />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <Title level={4} style={{ margin: '8px 0 4px 0' }}>{item.name}</Title>
                      <Text type="secondary">{item.value}%</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default memo(Charts);
