import Api from './api';
import pedidosMock from '../mocks/pedidos/pedidos.json';

// Função auxiliar para simular delay da API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função auxiliar para buscar dados mockados
const getMockData = async (endpoint, data) => {
    await delay(300);
    
    if (endpoint.includes('getAll')) {
        const { page = 1, pageSize = 10, ...filtros } = data || {};
        let filteredData = [...pedidosMock.data];
        
        if (filtros.codigo) {
            filteredData = filteredData.filter(item => 
                item.codigo?.toString().includes(filtros.codigo.toString())
            );
        }
        if (filtros.cliente) {
            filteredData = filteredData.filter(item => 
                item.cliente?.nome?.toLowerCase().includes(filtros.cliente.toLowerCase())
            );
        }
        if (filtros.situacao) {
            filteredData = filteredData.filter(item => item.situacao === filtros.situacao);
        }
        
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);
        
        return {
            data: {
                data: paginatedData,
                pagination: {
                    totalRecords: filteredData.length,
                    page,
                    pageSize
                }
            },
            success: true,
            message: "Success"
        };
    }
    
    if (endpoint.includes('getById')) {
        const id = parseInt(endpoint.split('/').pop());
        const item = pedidosMock.data.find(p => p.id === id);
        
        return {
            data: item || null,
            success: !!item,
            message: item ? "Success" : "Pedido não encontrado"
        };
    }
    
    if (endpoint.includes('upsert')) {
        return {
            data: data,
            success: true,
            message: data.id ? "Pedido atualizado com sucesso" : "Pedido criado com sucesso"
        };
    }
    
    if (endpoint.includes('ativarDesativar')) {
        return {
            data: { id: data.id, ativo: data.ativo },
            success: true,
            message: data.ativo ? "Pedido ativado com sucesso" : "Pedido desativado com sucesso"
        };
    }
    
    if (endpoint.includes('copiar')) {
        const original = pedidosMock.data.find(p => p.id === data.id);
        if (original) {
            const copia = {
                ...original,
                id: Date.now(),
                codigo: `${original.codigo}-COPIA`,
                ativo: true
            };
            return {
                data: copia,
                success: true,
                message: "Pedido copiado com sucesso"
            };
        }
    }
    
    return {
        data: null,
        success: false,
        message: "Endpoint não implementado"
    };
};

const PedidosService = {
    // Buscar todos os pedidos (com filtros e paginação)
    getAll: async (requestData) => {
        try {
            // const response = await Api.post('/pedidos/getAll', requestData);
            // return response.data;
            
            const mockResponse = await getMockData('/pedidos/getAll', requestData);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Buscar pedido por ID
    getById: async (id) => {
        try {
            // const response = await Api.get(`/pedidos/getById/${id}`);
            // return response.data;
            
            const mockResponse = await getMockData(`/pedidos/getById/${id}`);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Inserir ou atualizar pedido
    upsert: async (pedidoData) => {
        try {
            // const response = await Api.post('/pedidos/upsert', pedidoData);
            // return response.data;
            
            const mockResponse = await getMockData('/pedidos/upsert', pedidoData);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Deletar pedido
    delete: async (id) => {
        try {
            const response = await Api.delete(`/pedidos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Ativar/Desativar pedido
    ativarDesativar: async (id, ativo) => {
        try {
            // const response = await Api.post('/pedidos/ativarDesativar', { id, ativo });
            // return response.data;
            
            const mockResponse = await getMockData('/pedidos/ativarDesativar', { id, ativo });
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Copiar pedido (duplicar)
    copiar: async (id) => {
        try {
            // const response = await Api.post('/pedidos/copiar', { id });
            // return response.data;
            
            const mockResponse = await getMockData('/pedidos/copiar', { id });
            return mockResponse;
        } catch (error) {
            throw error;
        }
    }
};

export default PedidosService;
