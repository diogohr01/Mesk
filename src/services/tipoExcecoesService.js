import tipoExcecoesMock from '../mocks/tipoExcecoes/tipoExcecoes.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getMockData = async (endpoint, data) => {
  await delay(300);

  if (endpoint.includes('getAll')) {
    const { page = 1, pageSize = 10, ...filtros } = data || {};
    let filteredData = [...(tipoExcecoesMock.data || [])];
    if (filtros.codigo) {
      filteredData = filteredData.filter((l) =>
        l.codigo?.toLowerCase().includes(String(filtros.codigo).toLowerCase())
      );
    }
    if (filtros.descricao) {
      filteredData = filteredData.filter((l) =>
        l.descricao?.toLowerCase().includes(String(filtros.descricao).toLowerCase())
      );
    }
    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);
    return {
      data: { data: paginatedData, pagination: { totalRecords: filteredData.length, page, pageSize } },
      success: true,
      message: 'Success',
    };
  }

  if (endpoint.includes('getById')) {
    const id = parseInt(endpoint.split('/').pop(), 10);
    const item = tipoExcecoesMock.data.find((l) => l.id === id);
    return { data: { data: item || null }, success: !!item, message: item ? 'Success' : 'Tipo de exceção não encontrado' };
  }

  if (endpoint.includes('upsert')) {
    const payload = data || {};
    const existingIndex = tipoExcecoesMock.data.findIndex((l) => l.id === payload.id);
    const newItem = {
      id: payload.id || Date.now(),
      codigo: payload.codigo || '',
      descricao: payload.descricao || '',
    };
    if (existingIndex >= 0) {
      tipoExcecoesMock.data[existingIndex] = { ...tipoExcecoesMock.data[existingIndex], ...newItem };
    } else {
      tipoExcecoesMock.data.push(newItem);
    }
    return { data: { data: newItem }, success: true, message: payload.id ? 'Tipo de exceção atualizado com sucesso' : 'Tipo de exceção criado com sucesso' };
  }

  if (endpoint.includes('delete')) {
    const id = data?.id ?? parseInt(endpoint.split('/').pop(), 10);
    const idx = tipoExcecoesMock.data.findIndex((l) => l.id === id);
    if (idx >= 0) tipoExcecoesMock.data.splice(idx, 1);
    return { data: { id }, success: true, message: 'Tipo de exceção excluído com sucesso' };
  }

  return { data: null, success: false, message: 'Endpoint não implementado' };
};

const TipoExcecoesService = {
  getAll: async (requestData) => {
    try {
      return await getMockData('/tipoExcecoes/getAll', requestData);
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      return await getMockData(`/tipoExcecoes/getById/${id}`);
    } catch (error) {
      throw error;
    }
  },
  upsert: async (payload) => {
    try {
      return await getMockData('/tipoExcecoes/upsert', payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await getMockData('/tipoExcecoes/delete', { id });
    } catch (error) {
      throw error;
    }
  },
};

export default TipoExcecoesService;
