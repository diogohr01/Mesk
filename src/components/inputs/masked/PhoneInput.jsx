import React from 'react';
import BaseMaskedInput from './BaseMaskedInput';

/**
 * Componente PhoneInput - Input de telefone com máscara
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const PhoneInput = ({
    value = '',
    onChange,
    placeholder = 'Digite seu telefone',
    disabled = false,
    size = 'middle',
    style,
    className,
    ...props
}) => {
    return (
        <BaseMaskedInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            mask="(00) 00000-0000"
            style={{ width: '100%', ...style }}
            className={className}
            autoComplete="off"
            {...props}
        />
    );
};

export default PhoneInput;
