import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

/**
 * Componente Base BasePasswordInput - Input de senha base
 * @param {Object} props - Propriedades do componente
 * @param {string} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.size - Tamanho do input ('small' | 'middle' | 'large')
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {boolean} props.visibilityToggle - Se deve mostrar botão de visibilidade
 * @param {number} props.maxLength - Número máximo de caracteres
 */
const BasePasswordInput = ({
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
    size = 'middle',
    style,
    className,
    visibilityToggle = true,
    maxLength,
    ...props
}) => {
    return (
        <Input.Password
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            visibilityToggle={visibilityToggle}
            iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: '100%', ...style }}
            className={className}
            maxLength={maxLength}
            autoComplete="off"
            {...props}
        />
    );
};

export default BasePasswordInput;
