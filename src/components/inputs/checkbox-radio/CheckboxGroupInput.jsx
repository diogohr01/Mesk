import React from 'react';
import BaseCheckboxGroupInput from './BaseCheckboxGroupInput';

/**
 * Componente CheckboxGroupInput - Input de grupo de checkboxes
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.value - Valores selecionados
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {Array} props.options - Array de opções [{label, value}]
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const CheckboxGroupInput = ({
    value = [],
    onChange,
    options = [],
    disabled = false,
    style,
    className,
    direction = 'vertical',
    ...props
}) => {
    const handleChange = (checkedValues) => {
        if (onChange) {
            onChange(checkedValues);
        }
    };

    return (
        <BaseCheckboxGroupInput
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

export default CheckboxGroupInput;
