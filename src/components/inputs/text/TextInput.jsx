import React from 'react';
import BaseTextInput from './BaseTextInput';

/**
 * Componente TextInput - Input de texto básico
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {string} props.type - Tipo do input ('text' | 'email' | 'tel' | 'url' | 'search')
 * @param {number} props.maxLength - Número máximo de caracteres
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const TextInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    type = 'text',
    maxLength,
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
            type={type}
            maxLength={maxLength}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default TextInput;
