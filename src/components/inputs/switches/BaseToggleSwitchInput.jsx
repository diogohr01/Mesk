import React from 'react';
import { Switch, Typography, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Componente Base BaseToggleSwitchInput - Switch toggle base
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
 * @param {string} props.tooltip - Tooltip do switch
 * @param {boolean} props.showIcons - Se deve mostrar ícones
 */
const BaseToggleSwitchInput = ({
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
    tooltip,
    showIcons = true,
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    const getCheckedChildren = () => {
        if (checkedChildren) return checkedChildren;
        if (showIcons) return <CheckOutlined />;
        return 'ON';
    };

    const getUnCheckedChildren = () => {
        if (unCheckedChildren) return unCheckedChildren;
        if (showIcons) return <CloseOutlined />;
        return 'OFF';
    };

    const switchElement = (
        <Switch
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            checkedChildren={getCheckedChildren()}
            unCheckedChildren={getUnCheckedChildren()}
            {...props}
        />
    );

    return (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {label && (
                <Text strong style={{ fontSize: '14px' }}>
                    {label}
                </Text>
            )}
            
            {tooltip ? (
                <Tooltip title={tooltip}>
                    {switchElement}
                </Tooltip>
            ) : (
                switchElement
            )}
            
            {description && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                    {description}
                </Text>
            )}
        </Space>
    );
};

export default BaseToggleSwitchInput;
