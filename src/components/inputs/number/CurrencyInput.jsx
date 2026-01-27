import React from 'react';
import BaseNumberInput from './BaseNumberInput';

/**
 * Componente CurrencyInput - Input para valores monetários
 * @param {Object} props - Propriedades do componente
 * @param {number} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {number} props.min - Valor mínimo
 * @param {number} props.max - Valor máximo
 * @param {number} props.step - Incremento/decremento
 * @param {number} props.precision - Número de casas decimais
 * @param {string} props.currency - Símbolo da moeda (ex: 'R$', '$', '€')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const CurrencyInput = ({
    value,
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    min = 0,
    max,
    step = 0.01,
    precision = 2,
    currency = 'R$',
    style,
    className,
    ...props
}) => {
    return (
        <BaseNumberInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            min={min}
            max={max}
            step={step}
            precision={precision}
            inputMode="decimal"
            pattern="[0-9]*"
            formatter={(value) =>
                value !== undefined
                    ? `${currency} ${new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: precision,
                        maximumFractionDigits: precision,
                    }).format(value)}`
                    : ''
            }
            parser={(value) =>
                value ? value.replace(/\D/g, '') / Math.pow(10, precision) : ''
            }
            style={style}
            className={className}
            {...props}
        />
    );
};

export default CurrencyInput;
