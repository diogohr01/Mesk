import React from 'react';
import BaseRadioInput from './BaseRadioInput';

/**
 * Componente RadioInput - Input de radio buttons
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor selecionado
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {Array} props.options - Array de opções [{label, value}]
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.direction - Direção dos radios ('horizontal' | 'vertical')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const RadioInput = ({
    value,
    onChange,
    options = [],
    disabled = false,
    direction = 'horizontal',
    style,
    className,
    ...props
}) => {
    const handleChange = (selectedValue) => {
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <BaseRadioInput
            value={value}
            onChange={handleChange}
            disabled={disabled}
            style={style}
            className={className}
            options={options}
            direction={direction}
            {...props}
        />
    );
};

export default RadioInput;
