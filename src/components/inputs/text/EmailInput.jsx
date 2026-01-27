import React from 'react';
import BaseTextInput from './BaseTextInput';

/**
 * Componente EmailInput - Input de email
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const EmailInput = ({
    value = '',
    onChange,
    placeholder = 'Digite seu email',
    disabled = false,
    size = 'middle',
    style,
    className,
    ...props
}) => {
    return (
        <BaseTextInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            type="email"
            style={style}
            className={className}
            {...props}
        />
    );
};

export default EmailInput;
