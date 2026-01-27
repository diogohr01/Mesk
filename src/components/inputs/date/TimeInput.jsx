import React from 'react';
import BaseTimeInput from './BaseTimeInput';
import dayjs from 'dayjs';

/**
 * Componente TimeInput - Input de horário
 * @param {Object} props - Propriedades do componente
 * @param {dayjs|string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {string} props.format - Formato do horário (ex: 'HH:mm')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const TimeInput = ({
    value,
    onChange,
    placeholder = 'Selecione um horário',
    disabled = false,
    size = 'middle',
    format = 'HH:mm',
    style,
    className,
    ...props
}) => {
    return (
        <BaseTimeInput
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

export default TimeInput;
