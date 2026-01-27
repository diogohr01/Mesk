import React, { memo } from 'react';
import { Card as AntCard, Typography, Space } from 'antd';
import { colors } from '../../../styles/colors.js';

const { Title, Text } = Typography;


/**
 * Componente Card customizado e otimizado
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {string} props.title - Título do card
 * @param {string} props.subtitle - Subtítulo do card
 * @param {React.ReactNode} props.extra - Elemento extra (botões, ações)
 * @param {React.ReactNode} props.header - Cabeçalho customizado
 * @param {React.ReactNode} props.footer - Rodapé customizado
 * @param {boolean} props.loading - Estado de carregamento
 * @param {boolean} props.bordered - Se tem borda (padrão: false)
 * @param {boolean} props.hoverable - Se tem efeito hover
 * @param {string} props.size - Tamanho ('small' | 'default' | 'large')
 * @param {string} props.variant - Variante ('default' | 'borderless' | 'outlined')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {Function} props.onClick - Função de clique
 * @param {boolean} props.clickable - Se é clicável
 * @param {string} props.icon - Ícone do título
 * @param {string} props.description - Descrição do card
 */
const Card = memo(({
    children,
    title,
    subtitle,
    extra,
    header,
    footer,
    loading = false,
    bordered = false,
    hoverable = false,
    size = 'default',
    variant = 'default',
    style = {},
    className = '',
    onClick,
    clickable = false,
    icon,
    description,
    ...props
}) => {
    // Estilos base otimizados
    const baseStyle = {
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style
    };

    // Estilos para hover
    const hoverStyle = hoverable || clickable ? {
        cursor: clickable ? 'pointer' : 'default',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
    } : {};

    // Variantes de estilo
    const variantStyles = {
        default: {
            backgroundColor: '#fff',
            border: '1px solid #f0f0f0'
        },
        borderless: {
            backgroundColor: '#fff',
            border: 'none'
        },
        outlined: {
            backgroundColor: '#fff',
            border: `2px solid ${colors.primary}20`
        }
    };

    // Tamanhos
    const sizeStyles = {
        small: { padding: '12px' },
        default: { padding: '16px' },
        large: { padding: '24px' }
    };

    // Header customizado
    const renderHeader = () => {
        if (header) return header;
        
        if (title || subtitle || extra) {
            return (
                <div style={{ marginBottom: '16px' }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {title && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {icon && <span style={{ color: colors.primary }}>{icon}</span>}
                                <Title level={4} style={{ margin: 0, color: colors.text.primary }}>
                                    {title}
                                </Title>
                            </div>
                        )}
                        {subtitle && (
                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                {subtitle}
                            </Text>
                        )}
                        {description && (
                            <Text type="secondary" style={{ fontSize: '13px' }}>
                                {description}
                            </Text>
                        )}
                        {extra && (
                            <div style={{ marginTop: '8px' }}>
                                {extra}
                            </div>
                        )}
                    </Space>
                </div>
            );
        }
        return null;
    };

    // Footer customizado
    const renderFooter = () => {
        if (footer) {
            return (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                    {footer}
                </div>
            );
        }
        return null;
    };

    return (
        <AntCard
            loading={loading}
            bordered={bordered}
            hoverable={hoverable}
            size={size}
            variant={variant}
            style={{
                ...baseStyle,
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...(hoverable || clickable ? hoverStyle : {}),
            }}
            className={`custom-card ${className}`}
            onClick={onClick}
            {...props}
        >
            {renderHeader()}
            <div style={{ minHeight: '60px' }}>
                {children}
            </div>
            {renderFooter()}
        </AntCard>
    );
});

Card.displayName = 'Card';

export default Card;
