import { Layout, Skeleton, Spin } from 'antd';
import React, { memo } from 'react';
import LoadingSpinner from './LoadingSpinner';

const { Content } = Layout;

// Memoizar o componente para evitar re-renderizações desnecessárias
const Loading = memo(({ small = false, useSkeleton = false, message = 'Carregando...' }) => {
    if (useSkeleton) {
        return (
            <Content style={{ 
                padding: small ? '8px' : '24px', 
                maxWidth: '1200px', 
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px'
            }}>
                <Skeleton active paragraph={{ rows: small ? 1 : 4 }} />
                {message && <div style={{ marginTop: '16px', color: '#666' }}>{message}</div>}
            </Content>
        );
    }
    
    return (
        <Content style={{ 
            padding: small ? '8px' : '24px', 
            maxWidth: '1200px', 
            margin: 'auto', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
        }}>
            <LoadingSpinner />
            {message && <div style={{ marginTop: '16px', color: '#666' }}>{message}</div>}
        </Content>
    );
});

Loading.displayName = 'Loading';

export default Loading;