import React from 'react';
import { Switch, Typography, Space, Alert } from 'antd';
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Componente Base BaseConditionalSwitchInput - Switch condicional base
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.value - Valor atual do switch
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.size - Tamanho do switch ('small' | 'default')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.label - Label do switch
 * @param {string} props.description - Descrição do switch
 * @param {string} props.checkedChildren - Texto quando ativado
 * @param {string} props.unCheckedChildren - Texto quando desativado
 * @param {Array} props.conditions - Array de condições
 * @param {string} props.warningMessage - Mensagem de aviso
 * @param {string} props.warningType - Tipo do aviso ('warning' | 'error' | 'info')
 */
const BaseConditionalSwitchInput = ({
    value = false,
    onChange,
    disabled = false,
    size = 'default',
    style,
    className,
    label,
    description,
    checkedChildren,
    unCheckedChildren,
    conditions = [],
    warningMessage,
    warningType = 'warning',
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    // Verificar se alguma condição está ativa
    const hasActiveCondition = conditions.some(condition => 
        condition.field && condition.value !== undefined && condition.value !== null
    );

    // Verificar se o switch deve ser desabilitado por condições
    const isDisabledByCondition = conditions.some(condition => 
        condition.field && condition.value === condition.requiredValue && !condition.allowToggle
    );

    const isDisabled = disabled || isDisabledByCondition;

    return (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {label && (
                <Text strong style={{ fontSize: '13px' }}>
                    {label}
                </Text>
            )}
            
            <Switch
                checked={value}
                onChange={handleChange}
                disabled={isDisabled}
                size={size}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                {...props}
            />
            
            {description && (
                <Text type="secondary" style={{ fontSize: '11px' }}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                    {description}
                </Text>
            )}
            
            {hasActiveCondition && warningMessage && (
                <Alert
                    message={warningMessage}
                    type={warningType}
                    icon={<ExclamationCircleOutlined />}
                    showIcon
                    style={{ fontSize: '11px' }}
                />
            )}
            
            {isDisabledByCondition && (
                <Alert
                    message="Este switch está desabilitado devido a condições específicas"
                    type="info"
                    showIcon
                    style={{ fontSize: '11px' }}
                />
            )}
        </Space>
    );
};

export default BaseConditionalSwitchInput;
