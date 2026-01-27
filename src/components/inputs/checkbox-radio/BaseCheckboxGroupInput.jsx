import React from 'react';
import { Checkbox } from 'antd';

/**
 * Componente Base BaseCheckboxGroupInput - Input de grupo de checkboxes base
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.value - Array com valores selecionados
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {Array} props.options - Array de opções [{label, value}]
 * @param {string} props.direction - Direção do layout ('horizontal' | 'vertical')
 * @param {string} props.name - Nome do grupo
 */
const BaseCheckboxGroupInput = ({
    value = [],
    onChange,
    disabled = false,
    style,
    className,
    options = [],
    direction = 'vertical',
    name,
    ...props
}) => {
    const handleChange = (checkedValues) => {
        if (onChange) {
            onChange(checkedValues);
        }
    };

    const groupStyle = direction === 'vertical' 
        ? { display: 'flex', flexDirection: 'column', gap: '8px' }
        : { display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' };

    return (
        <Checkbox.Group
            value={value}
            onChange={handleChange}
            disabled={disabled}
            style={{ ...groupStyle, ...style }}
            className={className}
            name={name}
            {...props}
        >
            {options.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                    {option.label}
                </Checkbox>
            ))}
        </Checkbox.Group>
    );
};

export default BaseCheckboxGroupInput;
