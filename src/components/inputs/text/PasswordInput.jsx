import React from 'react';
import BasePasswordInput from './BasePasswordInput';

/**
 * Componente PasswordInput - Input de senha
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {boolean} props.visibilityToggle - Se deve mostrar botão de visibilidade
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const PasswordInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    visibilityToggle = true,
    style,
    className,
    ...props
}) => {
    return (
        <BasePasswordInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            visibilityToggle={visibilityToggle}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default PasswordInput;
