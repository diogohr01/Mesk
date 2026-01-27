import React from 'react';
import BaseTreeSelectInput from './BaseTreeSelectInput';
import { TreeSelect } from 'antd';

/**
 * Componente TreeSelectInput - Input de seleção em árvore
 * @param {Object} props - Propriedades do componente
 * @param {string|Array} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Array} props.treeData - Dados da árvore
 * @param {boolean} props.treeCheckable - Se permite seleção múltipla
 * @param {string} props.showCheckedStrategy - Estratégia de exibição
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const TreeSelectInput = ({
    value,
    onChange,
    placeholder = 'Selecione uma opção',
    disabled = false,
    size = 'middle',
    treeData = [],
    treeCheckable = true,
    showCheckedStrategy = TreeSelect.SHOW_ALL,
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
        <BaseTreeSelectInput
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            treeData={treeData}
            treeCheckable={treeCheckable}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default TreeSelectInput;
