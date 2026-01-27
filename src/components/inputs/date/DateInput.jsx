import React from 'react';
import BaseDateInput from './BaseDateInput';
import dayjs from 'dayjs';

/**
 * Componente DateInput - Input de data
 * @param {Object} props - Propriedades do componente
 * @param {dayjs|string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {string} props.format - Formato da data (ex: 'DD/MM/YYYY')
 * @param {boolean} props.showTime - Se deve mostrar seletor de hora
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const DateInput = ({
    value,
    onChange,
    placeholder = 'Selecione uma data',
    disabled = false,
    size = 'middle',
    format = 'DD/MM/YYYY',
    showTime = false,
    style,
    className,
    ...props
}) => {
    return (
        <BaseDateInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            format={format}
            showTime={showTime}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default DateInput;
