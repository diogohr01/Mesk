import React from 'react';
import { InputNumber } from 'antd';

/**
 * Componente Base BaseNumberInput - Input numérico base
 * @param {Object} props - Propriedades do componente
 * @param {number} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {number} props.min - Valor mínimo
 * @param {number} props.max - Valor máximo
 * @param {number} props.step - Incremento/decremento
 * @param {number} props.precision - Precisão decimal
 */
const BaseNumberInput = ({
    value = null,
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    min,
    max,
    step = 1,
    precision,
    ...props
}) => {
    return (
        <InputNumber
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            min={min}
            max={max}
            step={step}
            precision={precision}
            {...props}
        />
    );
};

export default BaseNumberInput;
