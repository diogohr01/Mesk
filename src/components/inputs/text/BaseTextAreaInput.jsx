import React from 'react';
import { Input } from 'antd';

/**
 * Componente Base BaseTextAreaInput - Input de texto longo base
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {number} props.rows - Número de linhas
 * @param {number} props.maxLength - Número máximo de caracteres
 * @param {boolean} props.autoSize - Se deve ajustar automaticamente o tamanho
 */
const BaseTextAreaInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    rows = 4,
    maxLength,
    autoSize = false,
    ...props
}) => {
    return (
        <Input.TextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            rows={rows}
            maxLength={maxLength}
            autoSize={autoSize}
            autoComplete="off"
            {...props}
        />
    );
};

export default BaseTextAreaInput;
