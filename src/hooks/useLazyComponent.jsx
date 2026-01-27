import { useCallback, useState, useEffect } from 'react';

/**
 * Hook para carregamento otimizado de componentes lazy
 * @param {Function} importFunc - Função de importação do componente
 * @param {Object} options - Opções de configuração
 * @returns {Object} - { Component, loading, error, retry }
 */
export const useLazyComponent = (importFunc, options = {}) => {
    const {
        preload = false,
        retryAttempts = 3,
        retryDelay = 1000
    } = options;

    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);

    const loadComponent = useCallback(async () => {
        if (Component || loading) return;

        setLoading(true);
        setError(null);

        try {
            const module = await importFunc();
            const ComponentToLoad = module.default || module;
            setComponent(() => ComponentToLoad);
            setAttempts(0);
        } catch (err) {
            console.error('Erro ao carregar componente:', err);
            setError(err);
            
            if (attempts < retryAttempts) {
                setTimeout(() => {
                    setAttempts(prev => prev + 1);
                    loadComponent();
                }, retryDelay);
            }
        } finally {
            setLoading(false);
        }
    }, [Component, loading, attempts, retryAttempts, retryDelay]);

    const retry = useCallback(() => {
        setError(null);
        setAttempts(0);
        loadComponent();
    }, [loadComponent]);

    // Preload se habilitado
    useEffect(() => {
        if (preload && !Component && !loading) {
            loadComponent();
        }
    }, [preload, Component, loading, loadComponent]);

    return {
        Component,
        loading,
        error,
        retry,
        loadComponent
    };
};

export default useLazyComponent;
