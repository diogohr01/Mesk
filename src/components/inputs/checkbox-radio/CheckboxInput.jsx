import React from 'react';
import BaseCheckboxInput from './BaseCheckboxInput';

/**
 * Componente CheckboxInput - Input de checkbox
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.label - Label do checkbox
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const CheckboxInput = ({
    value = false,
    onChange,
    label = '',
    disabled = false,
    style,
    className,
    ...props
}) => {
    return (
        <BaseCheckboxInput
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={style}
            className={className}
            type="checkbox"
            {...props}
        >
            {label}
        </BaseCheckboxInput>
    );
};

export default CheckboxInput;
