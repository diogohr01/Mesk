import React from 'react';
import { Radio } from 'antd';

/**
 * Componente Base BaseRadioInput - Input de radio buttons base
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor selecionado
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {Array} props.options - Array de opções [{label, value}]
 * @param {string} props.direction - Direção do layout ('horizontal' | 'vertical')
 * @param {string} props.name - Nome do grupo
 */
const BaseRadioInput = ({
    value,
    onChange,
    disabled = false,
    style,
    className,
    options = [],
    direction = 'horizontal',
    name,
    ...props
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const groupStyle = direction === 'vertical' 
        ? { display: 'flex', flexDirection: 'column', gap: '8px' }
        : { display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' };

    return (
        <Radio.Group
            value={value}
            onChange={handleChange}
            disabled={disabled}
            style={{ ...groupStyle, ...style }}
            className={className}
            name={name}
            {...props}
        >
            {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                    {option.label}
                </Radio>
            ))}
        </Radio.Group>
    );
};

export default BaseRadioInput;
