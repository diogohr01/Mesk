import React from 'react';
import { Button, Space, Tag, Statistic } from 'antd';
import { UserOutlined, SettingOutlined, HeartOutlined } from '@ant-design/icons';
import Card from './index';

// Storybook stories para documentação
export default {
    title: 'Components/Card',
    component: Card,
};

// Card básico
export const Basic = () => (
    <Card title="Card Básico" description="Descrição do card">
        <p>Conteúdo do card básico</p>
    </Card>
);

// Card com ícone
export const WithIcon = () => (
    <Card 
        title="Card com Ícone" 
        icon={<UserOutlined />}
        description="Card com ícone no título"
    >
        <p>Conteúdo do card com ícone</p>
    </Card>
);

// Card com extra
export const WithExtra = () => (
    <Card 
        title="Card com Ações" 
        extra={<Button type="primary">Ação</Button>}
    >
        <p>Card com botão de ação no cabeçalho</p>
    </Card>
);

// Card hoverable
export const Hoverable = () => (
    <Card 
        title="Card Hoverable" 
        hoverable
        description="Passe o mouse sobre este card"
    >
        <p>Este card tem efeito hover</p>
    </Card>
);

// Card clicável
export const Clickable = () => (
    <Card 
        title="Card Clicável" 
        clickable
        onClick={() => alert('Card clicado!')}
        description="Clique neste card"
    >
        <p>Este card é clicável</p>
    </Card>
);

// Card com footer
export const WithFooter = () => (
    <Card 
        title="Card com Footer" 
        footer={
            <Space>
                <Button size="small">Cancelar</Button>
                <Button type="primary" size="small">Salvar</Button>
            </Space>
        }
    >
        <p>Card com rodapé personalizado</p>
    </Card>
);

// Card de estatística
export const Statistic = () => (
    <Card 
        title="Estatísticas" 
        icon={<HeartOutlined />}
        extra={<Tag color="green">+12%</Tag>}
    >
        <Statistic
            title="Total de Vendas"
            value={112893}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            suffix="Unidades"
        />
    </Card>
);

// Card com variantes
export const Variants = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Default" variant="default">
            <p>Card com variante default</p>
        </Card>
        <Card title="Borderless" variant="borderless">
            <p>Card sem bordas</p>
        </Card>
        <Card title="Outlined" variant="outlined">
            <p>Card com borda destacada</p>
        </Card>
    </Space>
);

// Card com tamanhos
export const Sizes = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Small" size="small">
            <p>Card pequeno</p>
        </Card>
        <Card title="Default" size="default">
            <p>Card padrão</p>
        </Card>
        <Card title="Large" size="large">
            <p>Card grande</p>
        </Card>
    </Space>
);
