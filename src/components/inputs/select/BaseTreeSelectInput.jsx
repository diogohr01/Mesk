import React from 'react';
import { TreeSelect } from 'antd';

/**
 * Componente Base BaseTreeSelectInput - Input de seleção em árvore base
 * @param {Object} props - Propriedades do componente
 * @param {string|Array} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {Array} props.treeData - Dados da árvore
 * @param {boolean} props.multiple - Se permite múltipla seleção
 * @param {boolean} props.allowClear - Se permite limpar a seleção
 * @param {boolean} props.showSearch - Se mostra campo de busca
 * @param {boolean} props.treeCheckable - Se permite seleção múltipla com checkboxes
 */
const BaseTreeSelectInput = ({
    value = null,
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    treeData = [],
    multiple = false,
    allowClear = true,
    showSearch = true,
    treeCheckable = false,
    ...props
}) => {
    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <TreeSelect
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            style={{ width: '100%', ...style }}
            className={className}
            treeData={treeData}
            multiple={treeCheckable ? true : multiple}
            allowClear={allowClear}
            showSearch={showSearch}
            treeCheckable={treeCheckable}
            treeDefaultExpandAll={false}
            treeNodeFilterProp="title"
            filterTreeNode={(input, node) =>
                node.title.toLowerCase().includes(input.toLowerCase())
            }
            {...props}
        />
    );
};

export default BaseTreeSelectInput;
