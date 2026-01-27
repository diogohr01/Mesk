import React from 'react';
import { Input } from 'antd';

/**
 * Componente Base BaseTextInput - Input de texto base
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.type - Tipo do input (text, password, email, etc.)
 */
const BaseTextInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    type = 'text',
    ...props
}) => {
    return (
        <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            autoComplete="off"
            {...props}
        />
    );
};

export default BaseTextInput;
