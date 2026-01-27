import React from 'react';
import { MaskedInput as AntMaskedInput } from 'antd-mask-input';

/**
 * Componente MaskedInput - Input com máscara
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {string} props.mask - Máscara do input
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const MaskedInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    mask,
    style,
    className,
    ...props
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <AntMaskedInput
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            mask={mask}
            style={{ width: '100%', ...style }}
            className={`ant-input-mask ${className || ''}`}
            autoComplete="off"
            {...props}
        />
    );
};

export default MaskedInput;
