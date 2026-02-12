import React from 'react';
import { Switch, Typography, Space, Alert } from 'antd';
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Componente ConditionalSwitch - Switch com condições e alertas
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do switch
 * @param {string} props.description - Descrição opcional do switch
 * @param {boolean} props.value - Valor atual do switch
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.size - Tamanho do switch ('small' | 'default')
 * @param {Object} props.conditions - Condições para mostrar alertas
 * @param {string} props.conditions.warning - Mensagem de aviso quando ativado
 * @param {string} props.conditions.info - Mensagem de informação quando ativado
 * @param {string} props.conditions.error - Mensagem de erro quando ativado
 * @param {boolean} props.showConditionalAlert - Se deve mostrar alertas condicionais
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const ConditionalSwitch = ({
    label,
    description,
    value = false,
    onChange,
    disabled = false,
    size = 'default',
    conditions = {},
    showConditionalAlert = true,
    style,
    className,
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    const renderConditionalAlert = () => {
        if (!showConditionalAlert || !value) return null;

        const { warning, info, error } = conditions;

        if (error) {
            return (
                <Alert
                    message={error}
                    type="error"
                    icon={<ExclamationCircleOutlined />}
                    showIcon
                    style={{ marginTop: 8 }}
                />
            );
        }

        if (warning) {
            return (
                <Alert
                    message={warning}
                    type="warning"
                    icon={<ExclamationCircleOutlined />}
                    showIcon
                    style={{ marginTop: 8 }}
                />
            );
        }

        if (info) {
            return (
                <Alert
                    message={info}
                    type="info"
                    icon={<InfoCircleOutlined />}
                    showIcon
                    style={{ marginTop: 8 }}
                />
            );
        }

        return null;
    };

    return (
        <div className={className} style={style}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                {label && (
                    <Text strong style={{ fontSize: '13px' }}>
                        {label}
                    </Text>
                )}
                
                <Switch
                    checked={value}
                    onChange={handleChange}
                    disabled={disabled}
                    size={size}
                    {...props}
                />
                
                {description && (
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                        <InfoCircleOutlined style={{ marginRight: 4 }} />
                        {description}
                    </Text>
                )}
                
                {renderConditionalAlert()}
            </Space>
        </div>
    );
};

export default ConditionalSwitch;
