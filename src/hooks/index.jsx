import React from 'react';

import { AuthProvider } from './auth';

const AppProvider = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
);

// Exportar todos os hooks
export { useAuth } from './auth';
export { default as useLazyComponent } from './useLazyComponent';
export { useFilterSearch } from './useFilterSearch';

export default AppProvider;
