import React from 'react';
import BaseNumberInput from './BaseNumberInput';

/**
 * Componente NumberInput - Input numérico genérico
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
 * @param {string} props.type - Tipo ('integer' | 'decimal')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const NumberInput = ({
    value,
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    min,
    max,
    step,
    precision,
    type = 'integer',
    style,
    className,
    ...props
}) => {
    const inputProps = {
        value,
        onChange,
        placeholder,
        disabled,
        size,
        min,
        max,
        step,
        precision,
        style: { width: '100%', ...style },
        className,
        autoComplete: 'off',
        ...props
    };

    // Configurações específicas por tipo
    if (type === 'integer') {
        inputProps.inputMode = 'decimal';
        inputProps.pattern = '[0-9]*';
    } else if (type === 'decimal') {
        inputProps.inputMode = 'decimal';
        inputProps.pattern = '[0-9]*';
        inputProps.precision = precision || 2;
        inputProps.step = step || 0.01;
        inputProps.formatter = (value) =>
            value !== undefined
                ? `${new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: precision || 2,
                    maximumFractionDigits: precision || 2,
                }).format(value)}`
                : '';
        inputProps.parser = (value) =>
            value ? value.replace(/\D/g, '') / Math.pow(10, precision || 2) : '';
    }

    return <BaseNumberInput {...inputProps} />;
};

export default NumberInput;
