import React from 'react';
import BaseSelectInput from './BaseSelectInput';

/**
 * Componente SelectInput - Input de seleção
 * @param {Object} props - Propriedades do componente
 * @param {string|Array} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Array} props.options - Array de opções [{label, value}]
 * @param {boolean} props.multiple - Se permite seleção múltipla
 * @param {boolean} props.showSearch - Se deve mostrar busca
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const SelectInput = ({
    value,
    onChange,
    placeholder = 'Selecione uma opção',
    disabled = false,
    size = 'middle',
    options = [],
    multiple = false,
    showSearch = true,
    style,
    className,
    ...props
}) => {
    const handleChange = (selectedValue) => {
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <BaseSelectInput
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            multiple={multiple}
            showSearch={showSearch}
            options={options}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default SelectInput;
