import React from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import AppProvider from './hooks/index';
import RoutesList from './routes';
import GlobalStyle from './styles/global';

import ptBR from 'antd/es/locale/pt_BR';
import { colors } from './styles/colors';

function App() {
    return (
        <ConfigProvider
            locale={ptBR}
            theme={{
                token: {
                    colorPrimary: colors.primary,
                    colorPrimaryBg: colors.background,
                    // Otimizações de performance
                    motion: false, // Desabilitar animações do Ant Design
                    motionDurationFast: 0,
                    motionDurationMid: 0,
                    motionDurationSlow: 0,
                },
                // Desabilitar animações globais
                hashed: false,
                cssVar: false,
            }}
        >
            <AntApp>
                <AppProvider>
                    <RoutesList forceRefresh={true} />
                </AppProvider>
                <GlobalStyle />
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
