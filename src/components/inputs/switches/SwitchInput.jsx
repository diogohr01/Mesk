import React from 'react';
import { Typography, Space } from 'antd';
import BaseSwitchInput from './BaseSwitchInput';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Componente SwitchInput - Switch simples com label e descrição
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do switch
 * @param {string} props.description - Descrição opcional do switch
 * @param {boolean} props.value - Valor atual do switch
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.size - Tamanho do switch ('small' | 'default')
 * @param {string} props.checkedChildren - Texto quando ativado
 * @param {string} props.unCheckedChildren - Texto quando desativado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const SwitchInput = ({
    label,
    description,
    value = false,
    onChange,
    disabled = false,
    size = 'default',
    checkedChildren,
    unCheckedChildren,
    style,
    className,
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <div className={className} style={style}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                {label && (
                    <Text strong style={{ fontSize: '13px' }}>
                        {label}
                    </Text>
                )}
                
                <BaseSwitchInput
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
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
            </Space>
        </div>
    );
};

export default SwitchInput;
