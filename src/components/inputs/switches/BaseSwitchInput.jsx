import React from 'react';
import { Switch } from 'antd';

/**
 * Componente Base BaseSwitchInput - Input de switch base
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.value - Valor atual do switch
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.size - Tamanho do switch ('small' | 'default')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.checkedChildren - Texto quando ativado
 * @param {string} props.unCheckedChildren - Texto quando desativado
 * @param {boolean} props.loading - Se está carregando
 */
const BaseSwitchInput = ({
    value = false,
    onChange,
    disabled = false,
    size = 'default',
    style,
    className,
    checkedChildren,
    unCheckedChildren,
    loading = false,
    ...props
}) => {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <Switch
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            style={style}
            className={className}
            checkedChildren={checkedChildren}
            unCheckedChildren={unCheckedChildren}
            loading={loading}
            {...props}
        />
    );
};

export default BaseSwitchInput;
