import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api, { useExceptionNotification } from '../services/api';

const AuthContext = createContext({});
export const project = "@Project";

// Bypass temporário: true = login admin/Tekann.2024 usa token fixo e entra no portal; false = login normal pela API
const ENABLE_ADMIN_BYPASS = true;
const ADMIN_BYPASS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsImFkbWluIiwiYWRtaW4iXSwianRpIjoiMDdiMDZjYzIwYzExNGE5M2JiNTgyZGIxYjA5ZjI1YWEiLCJlbWFpbCI6ImFkbWluQHRla2Fubi5jb20uYnIiLCJuYW1laWQiOiI1YTU3NWFiMi02ZmQ2LTQxNmEtYjE1NC05MmI1ZGIzODg0YjgiLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsIlBlcm1pc3Npb24iOlsiQ2FkYXN0cm86Q2FkYXN0cm86R2VyZW5jaWFyIiwiQ2FkYXN0cm86TW9uaXRvcjpWZXIiLCJBZ2VuZGE6VmVyIiwiTW9uaXRvcjpHZXJlbmNpYXIiLCJDYWRhc3RybzpNb25pdG9yOkdlcmVuY2lhciIsIlBhaW5lbDpHZXJlbmNpYXIiLCJQYWluZWw6VmVyIiwiQ2FkYXN0cm86Q2FkYXN0cm86VmVyIiwiUGVyZm9ybWFuY2U6VmVyIiwiUGVyZmlzOkdlcmVuY2lhciIsIkNlbnRyYWw6R2VyZW5jaWFyIiwiQ2FkYXN0cm86QXBsaWNhdGl2bzpWZXIiLCJNb25pdG9yOlZlciIsIkFnZW5kYW1lbnRvOkNyaWFyQWdlbmRhbWVudG8iLCJDYWRhc3RybzpBZ2VuZGFtZW50bzpWZXIiLCJQZXJmb3JtYW5jZTpHZXJlbmNpYXIiLCJBcGxpY2F0aXZvOkdlcmVuY2lhciIsIkNhZGFzdHJvOkZvcm5lY2Vkb3JlczpWZXIiLCJBZ2VuZGFtZW50bzpNdWRhclN0YXR1cyIsIkNhZGFzdHJvOlBlcmZpczpWZXIiLCJBcGxpY2F0aXZvOlZlciIsIkNhZGFzdHJvOkFwbGljYXRpdm86R2VyZW5jaWFyIiwiQWdlbmRhbWVudG86R2VyZW5jaWFyIiwiQ2FkYXN0cm86UGFpbmVsOlZlciIsIkNhZGFzdHJvOkFnZW5kYW1lbnRvOkdlcmVuY2lhciIsIlBlcmZpczpWZXIiLCJDYWRhc3RybzpQYWluZWw6R2VyZW5jaWFyIiwiTW9uaXRvcjpDcmlhck9jb3JyZW5jaWFzIiwiQWdlbmRhOkdlcmVuY2lhciIsIkNlbnRyYWw6VmVyIiwiQWdlbmRhbWVudG86VmVyIiwiQ2FkYXN0cm86Rm9ybmVjZWRvcmVzOkdlcmVuY2lhciIsIkNhZGFzdHJvOlBlcmZpczpHZXJlbmNpYXIiLCJBZ2VuZGFtZW50bzpSZWFnZW5kYXIiXSwibmJmIjoxNzcwMzAwOTEyLCJleHAiOjE3NzgwNzY5MTIsImlhdCI6MTc3MDMwMDkxMiwiaXNzIjoiQXBpSXNzdWVyIiwiYXVkIjoiQXBpQXVkaWVuY2UifQ.cjzwcU-FXVC6ZlnywPO3qpzs_Zy_QQ40m8YUJMMiT_U';

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
            if (ENABLE_ADMIN_BYPASS && username === 'admin' && password === 'Tekann.2024') {
                const responseData = {
                    accessToken: ADMIN_BYPASS_TOKEN,
                    user: {
                        email: 'admin@tekann.com.br',
                        name: 'admin',
                        roles: [{ name: 'Administrador' }]
                    },
                    roles: [{ name: 'Administrador' }]
                };
                const fakeResponse = { data: { response: responseData } };
                setSignInDataOnLocalStorage(fakeResponse);
                localStorage.setItem(`${project}:userName`, username);
                api.defaults.headers.authorization = `Bearer ${responseData.accessToken}`;
                setUser({ token: responseData.accessToken, user: responseData.user, userRoles: responseData.roles });
                return fakeResponse;
            }

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
        localStorage.removeItem(`${project}:userRoles`);
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
