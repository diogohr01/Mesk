import React from 'react';
import { Switch, Typography, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Componente ToggleSwitch - Switch com ícones e tooltips
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do switch
 * @param {string} props.description - Descrição opcional do switch
 * @param {boolean} props.value - Valor atual do switch
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.size - Tamanho do switch ('small' | 'default')
 * @param {boolean} props.showIcons - Se deve mostrar ícones no switch
 * @param {string} props.checkedIcon - Ícone quando ativado
 * @param {string} props.unCheckedIcon - Ícone quando desativado
 * @param {string} props.tooltip - Tooltip para o switch
 * @param {string} props.checkedTooltip - Tooltip quando ativado
 * @param {string} props.unCheckedTooltip - Tooltip quando desativado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const ToggleSwitch = ({
    label,
    description,
    value = false,
    onChange,
    disabled = false,
    size = 'default',
    showIcons = true,
    checkedIcon = <CheckOutlined />,
    unCheckedIcon = <CloseOutlined />,
    tooltip,
    checkedTooltip,
    unCheckedTooltip,
    style,
    className,
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    const getTooltip = () => {
        if (tooltip) return tooltip;
        if (value && checkedTooltip) return checkedTooltip;
        if (!value && unCheckedTooltip) return unCheckedTooltip;
        return null;
    };

    const switchElement = (
        <Switch
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            checkedChildren={showIcons ? checkedIcon : undefined}
            unCheckedChildren={showIcons ? unCheckedIcon : undefined}
            {...props}
        />
    );

    return (
        <div className={className} style={style}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                {label && (
                    <Text strong style={{ fontSize: '14px' }}>
                        {label}
                    </Text>
                )}
                
                {getTooltip() ? (
                    <Tooltip title={getTooltip()} placement="top">
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
        </div>
    );
};

export default ToggleSwitch;
