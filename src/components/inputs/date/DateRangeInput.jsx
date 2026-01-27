import React from 'react';
import BaseDateRangeInput from './BaseDateRangeInput';
import dayjs from 'dayjs';

/**
 * Componente DateRangeInput - Input de intervalo de datas
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.value - Valor atual do input [startDate, endDate]
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string|Array} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {string} props.format - Formato da data (ex: 'DD/MM/YYYY')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const DateRangeInput = ({
    value = [null, null],
    onChange,
    placeholder = 'Selecione o intervalo',
    disabled = false,
    size = 'middle',
    format = 'DD/MM/YYYY',
    style,
    className,
    ...props
}) => {
    return (
        <BaseDateRangeInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            format={format}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default DateRangeInput;
