import React from 'react';
import { Select } from 'antd';

/**
 * Componente Base BaseSelectInput - Input de seleção base
 * @param {Object} props - Propriedades do componente
 * @param {string|Array} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {Array} props.options - Opções do select
 * @param {boolean} props.multiple - Se permite múltipla seleção
 * @param {boolean} props.allowClear - Se permite limpar a seleção
 * @param {boolean} props.showSearch - Se mostra campo de busca
 */
const BaseSelectInput = ({
    value = null,
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    options = [],
    multiple = false,
    allowClear = true,
    showSearch = true,
    ...props
}) => {
    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            options={options}
            mode={multiple ? 'multiple' : undefined}
            allowClear={allowClear}
            showSearch={showSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...props}
        />
    );
};

export default BaseSelectInput;
