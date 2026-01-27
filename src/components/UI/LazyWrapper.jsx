import React, { Suspense } from 'react';
import { Spin } from 'antd';

// Componente de loading otimizado
const LoadingFallback = ({ message = 'Carregando...' }) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        flexDirection: 'column',
        gap: '16px'
    }}>
        <Spin size="large" />
        <span style={{ color: '#666' }}>{message}</span>
    </div>
);

// Wrapper para lazy loading com suspense otimizado
const LazyWrapper = ({ 
    children, 
    fallback = <LoadingFallback />
}) => {
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
};

export default LazyWrapper;
