import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const { RangePicker } = DatePicker;

/**
 * Componente Base BaseDateRangeInput - Input de intervalo de datas base
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.value - Array com as datas [inicio, fim]
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {Array} props.placeholder - Array com placeholders [inicio, fim]
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.format - Formato das datas
 * @param {boolean} props.showTime - Se deve mostrar o tempo
 * @param {string} props.picker - Tipo do picker ('date' | 'week' | 'month' | 'quarter' | 'year')
 */
const BaseDateRangeInput = ({
    value = null,
    onChange,
    placeholder = ['Data inicial', 'Data final'],
    disabled = false,
    size = 'middle',
    style,
    className,
    format = 'DD/MM/YYYY',
    showTime = false,
    picker = 'date',
    ...props
}) => {
    const handleChange = (dates, dateStrings) => {
        if (onChange) {
            onChange(dateStrings);
        }
    };

    // Converter strings para dayjs se necessário
    const dateValues = value ? value.map(date => 
        date ? (typeof date === 'string' ? dayjs(date, format) : date) : null
    ) : null;

    return (
        <RangePicker
            value={dateValues}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            format={format}
            showTime={showTime}
            picker={picker}
            locale={{
                lang: {
                    locale: 'pt-br',
                    placeholder: placeholder,
                    rangePlaceholder: ['Data inicial', 'Data final'],
                    today: 'Hoje',
                    now: 'Agora',
                    backToToday: 'Voltar para hoje',
                    ok: 'OK',
                    clear: 'Limpar',
                    month: 'Mês',
                    year: 'Ano',
                    timeSelect: 'Selecionar hora',
                    dateSelect: 'Selecionar data',
                    monthSelect: 'Escolher mês',
                    yearSelect: 'Escolher ano',
                    decadeSelect: 'Escolher década',
                    yearFormat: 'YYYY',
                    dateFormat: 'DD/MM/YYYY',
                    dayFormat: 'D',
                    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
                    monthFormat: 'MMMM',
                    monthBeforeYear: true,
                    previousMonth: 'Mês anterior (PageUp)',
                    nextMonth: 'Próximo mês (PageDown)',
                    previousYear: 'Ano anterior (Control + left)',
                    nextYear: 'Próximo ano (Control + right)',
                    previousDecade: 'Década anterior',
                    nextDecade: 'Próxima década',
                    previousCentury: 'Século anterior',
                    nextCentury: 'Próximo século',
                }
            }}
            {...props}
        />
    );
};

export default BaseDateRangeInput;
