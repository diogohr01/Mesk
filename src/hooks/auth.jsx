import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api, { useExceptionNotification } from '../services/api';

const AuthContext = createContext({});
export const project = "@Project";

export const AuthProvider = ({ children }) => {
    const exceptionNotificationAPI = useExceptionNotification();

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem(`${project}:token`);
        const user = localStorage.getItem(`${project}:user`);
        
        if (token && user) {
            try {
                const userJson = JSON.parse(user);
                api.defaults.headers.authorization = `Bearer ${token}`;
                return { token, user: userJson };
            } catch (error) {
                console.error('Erro ao fazer parse do usuário:', error);
                // Limpar dados corrompidos
                localStorage.removeItem(`${project}:token`);
                localStorage.removeItem(`${project}:user`);
                localStorage.removeItem(`${project}:userRoles`);
                localStorage.removeItem(`${project}:userName`);
            }
        }
        return null;
    });

    const setSignInDataOnLocalStorage = useCallback((result) => {
        // A API retorna data.response ao invés de data.data
        const responseData = result?.data?.response || result?.data?.data;
        
        if (result && result.data && responseData) {
            const token = responseData.accessToken;
            const user = responseData.user;
            const userRoles = responseData.roles || [];

            sessionStorage.clear();
            localStorage.removeItem(`${project}:token`);
            localStorage.removeItem(`${project}:user`);
            localStorage.removeItem(`${project}:userRoles`);
            localStorage.removeItem(`${project}:userName`);

            localStorage.setItem(`${project}:token`, token);
            localStorage.setItem(`${project}:user`, JSON.stringify(user));
            localStorage.setItem(`${project}:userRoles`, JSON.stringify(userRoles));

            api.defaults.headers.authorization = `Bearer ${token}`;

            setUser({ token, user, userRoles });
        }
    }, []);

    const signIn = useCallback(async ({ username, password }) => {
        try {
            const response = await api.post('/signin', { username, password });
            
            // A API retorna data.response ao invés de data.data
            const responseData = response?.data?.response || response?.data?.data;
            
            if (responseData) {
                const { accessToken, user } = responseData;
                setSignInDataOnLocalStorage(response);
                localStorage.setItem(`${project}:userName`, username);
                setUser({ token: accessToken, user });
                api.defaults.headers.authorization = `Bearer ${accessToken}`;
                return response;
            } else {
                throw new Error('Resposta da API em formato inesperado');
            }
        } catch (error) {
            exceptionNotificationAPI(error);
            throw error; // Re-throw para que o componente possa tratar
        }
    }, [exceptionNotificationAPI, setSignInDataOnLocalStorage]);

    const signOut = useCallback(() => {
        api.defaults.headers.authorization = '';
        localStorage.removeItem(`${project}:token`);
        localStorage.removeItem(`${project}:user`);
        localStorage.removeItem(`${project}:userName`);
        setUser(null);
    }, []);

    // Memoizar o valor do contexto para evitar re-renderizações desnecessárias
    const contextValue = useMemo(() => ({
        user: user?.user,
        signIn,
        signOut
    }), [user?.user, signIn, signOut]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
