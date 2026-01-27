import Api from './api';
import clientesMock from '../mocks/clientes/clientes.json';

// Função auxiliar para simular delay da API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função auxiliar para buscar dados mockados
const getMockData = async (endpoint, data) => {
    await delay(300);
    
    if (endpoint.includes('getAll')) {
        const { page = 1, pageSize = 10, ...filtros } = data || {};
        let filteredData = [...clientesMock.data];
        
        if (filtros.nome) {
            filteredData = filteredData.filter(item => 
                item.nome?.toLowerCase().includes(filtros.nome.toLowerCase())
            );
        }
        if (filtros.codigoEMS) {
            filteredData = filteredData.filter(item => 
                item.codigoEMS?.toString().includes(filtros.codigoEMS.toString())
            );
        }
        if (filtros.tipoServico) {
            filteredData = filteredData.filter(item => item.tipoServico === filtros.tipoServico);
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
        const item = clientesMock.data.find(c => c.id === id);
        
        return {
            data: {
                data: item || null
            },
            success: !!item,
            message: item ? "Success" : "Cliente não encontrado"
        };
    }
    
    if (endpoint.includes('upsert')) {
        return {
            data: {
                data: data
            },
            success: true,
            message: data.id ? "Cliente atualizado com sucesso" : "Cliente criado com sucesso"
        };
    }
    
    if (endpoint.includes('ativarDesativar')) {
        return {
            data: { id: data.id, ativo: data.ativo },
            success: true,
            message: data.ativo ? "Cliente ativado com sucesso" : "Cliente desativado com sucesso"
        };
    }
    
    if (endpoint.includes('copiar')) {
        const original = clientesMock.data.find(c => c.id === data.id);
        if (original) {
            const copia = {
                ...original,
                id: Date.now(),
                codigoEMS: `${original.codigoEMS}-COPIA`,
                ativo: true
            };
            return {
                data: {
                    data: copia
                },
                success: true,
                message: "Cliente copiado com sucesso"
            };
        }
    }
    
    return {
        data: null,
        success: false,
        message: "Endpoint não implementado"
    };
};

const ClientesService = {
    // Buscar todos os clientes (com filtros e paginação)
    getAll: async (requestData) => {
        try {
            // const response = await Api.post('/clientes/getAll', requestData);
            // return response.data;
            
            const mockResponse = await getMockData('/clientes/getAll', requestData);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Buscar cliente por ID
    getById: async (id) => {
        try {
            // const response = await Api.get(`/clientes/getById/${id}`);
            // return response.data;
            
            const mockResponse = await getMockData(`/clientes/getById/${id}`);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Inserir ou atualizar cliente
    upsert: async (clienteData) => {
        try {
            // const response = await Api.post('/clientes/upsert', clienteData);
            // return response.data;
            
            const mockResponse = await getMockData('/clientes/upsert', clienteData);
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Deletar cliente
    delete: async (id) => {
        try {
            const response = await Api.delete(`/clientes/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Ativar/Desativar cliente
    ativarDesativar: async (id, ativo) => {
        try {
            // const response = await Api.post('/clientes/ativarDesativar', { id, ativo });
            // return response.data;
            
            const mockResponse = await getMockData('/clientes/ativarDesativar', { id, ativo });
            return mockResponse;
        } catch (error) {
            throw error;
        }
    },

    // Copiar cliente (duplicar)
    copiar: async (id) => {
        try {
            // const response = await Api.post('/clientes/copiar', { id });
            // return response.data;
            
            const mockResponse = await getMockData('/clientes/copiar', { id });
            return mockResponse;
        } catch (error) {
            throw error;
        }
    }
};

export default ClientesService;
