import React from 'react';
import { Checkbox, Radio } from 'antd';

/**
 * Componente Base BaseCheckboxInput - Input de checkbox/radio base
 * @param {Object} props - Propriedades do componente
 * @param {boolean|Array} props.value - Valor atual do input
 * @param {function} props.onChange - Função chamada quando o valor muda
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 * @param {string} props.type - Tipo do input ('checkbox' | 'radio')
 * @param {Array} props.options - Opções para checkbox/radio group
 * @param {string} props.direction - Direção do layout ('horizontal' | 'vertical')
 */
const BaseCheckboxInput = ({
    value = false,
    onChange,
    disabled = false,
    style,
    className,
    type = 'checkbox',
    options = [],
    direction = 'vertical',
    ...props
}) => {
    
    // Validar se as opções são válidas com mais proteções
    let validOptions = [];
    try {
        if (Array.isArray(options)) {
            validOptions = options.filter(option => {
                try {
                    return option && 
                           typeof option === 'object' && 
                           (option.value !== undefined || option.label !== undefined);
                } catch (error) {
                    console.error('Erro ao validar opção:', option, error);
                    return false;
                }
            });
        }
    } catch (error) {
        console.error('Erro ao processar opções:', options, error);
        validOptions = [];
    }
    
    
    const handleChange = (e) => {
        if (onChange) {
            if (type === 'checkbox' && !Array.isArray(value)) {
                onChange(e.target.checked);
            } else if (type === 'checkbox' && Array.isArray(value)) {
                onChange(e);
            } else if (type === 'radio') {
                onChange(e.target.value);
            }
        } else {
            console.warn('onChange não está definido!');
        }
    };

    if (type === 'radio' && validOptions.length > 0) {
        
        return (
            <Radio.Group
                value={value}
                onChange={handleChange}
                disabled={disabled}
                style={style}
                className={className}
                {...props}
            >
                {validOptions.map((option, index) => {
                    try {
                        const key = option?.value || `radio-${index}`;
                        const optionValue = option?.value || '';
                        const label = option?.label || option || `Opção ${index + 1}`;
                        
                        
                        return (
                            <Radio key={key} value={optionValue}>
                                {label}
                            </Radio>
                        );
                    } catch (error) {
                        console.error('Erro ao renderizar opção do radio:', option, error);
                        return (
                            <Radio key={`error-${index}`} value={`error-${index}`}>
                                Erro na opção
                            </Radio>
                        );
                    }
                })}
            </Radio.Group>
        );
    }

    if (type === 'checkbox' && validOptions.length > 0) {
        return (
            <Checkbox.Group
                value={value}
                onChange={handleChange}
                disabled={disabled}
                style={style}
                className={className}
                {...props}
            >
                {validOptions.map((option, index) => {
                    try {
                        const key = option?.value || `checkbox-${index}`;
                        const value = option?.value || '';
                        const label = option?.label || option || `Opção ${index + 1}`;
                        
                        return (
                            <Checkbox key={key} value={value}>
                                {label}
                            </Checkbox>
                        );
                    } catch (error) {
                        console.error('Erro ao renderizar opção do checkbox:', option, error);
                        return (
                            <Checkbox key={`error-${index}`} value={`error-${index}`}>
                                Erro na opção
                            </Checkbox>
                        );
                    }
                })}
            </Checkbox.Group>
        );
    }

    // Se não há opções válidas, mostrar mensagem de erro ou componente simples
    if (type === 'radio' && validOptions.length === 0) {
        return (
            <div style={{ color: 'red', fontSize: '12px' }}>
                Erro: Nenhuma opção válida encontrada para o radio button
            </div>
        );
    }

    // Checkbox ou Radio simples
    const Component = type === 'radio' ? Radio : Checkbox;
    return (
        <Component
            checked={type === 'checkbox' ? value : undefined}
            value={type === 'radio' ? value : undefined}
            onChange={handleChange}
            disabled={disabled}
            style={style}
            className={className}
            {...props}
        />
    );
};

export default BaseCheckboxInput;
