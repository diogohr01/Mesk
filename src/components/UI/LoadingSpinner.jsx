import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { colors } from '../../styles/colors';

/**
 * Componente de Loading Spinner customizado
 * @param {Object} props - Propriedades do componente
 * @param {number} props.size - Tamanho do ícone (default: 24)
 * @param {string} props.color - Cor do ícone (default: colors.primary)
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const LoadingSpinner = ({ 
    size = 24, 
    color = colors.primary, 
    style = {}, 
    className = '',
    ...props 
}) => {
    return (
        <SyncOutlined 
            spin 
            style={{ 
                fontSize: size, 
                color: color,
                ...style 
            }} 
            className={className}
            {...props}
        />
    );
};

export default LoadingSpinner;
