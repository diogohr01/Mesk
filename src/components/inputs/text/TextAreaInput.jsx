import React from 'react';
import BaseTextAreaInput from './BaseTextAreaInput';

/**
 * Componente TextAreaInput - Input de texto longo
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {number} props.rows - Número de linhas visíveis
 * @param {number} props.maxLength - Número máximo de caracteres
 * @param {boolean} props.autoSize - Se deve ajustar altura automaticamente
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const TextAreaInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    rows = 4,
    maxLength,
    autoSize = false,
    style,
    className,
    ...props
}) => {
    return (
        <BaseTextAreaInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            rows={rows}
            maxLength={maxLength}
            autoSize={autoSize}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default TextAreaInput;
