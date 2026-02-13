import excecoesMock from '../mocks/excecoes/excecoes.json';
import tipoExcecoesMock from '../mocks/tipoExcecoes/tipoExcecoes.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTipoCodigo = (tipoId) => {
  const t = (tipoExcecoesMock.data || []).find((x) => x.id === tipoId);
  return t ? t.codigo : '';
};

const serializeDateTime = (v) => {
  if (!v) return null;
  if (typeof v === 'string') return v;
  if (v.toISOString) return v.toISOString();
  return null;
};

const getMockData = async (endpoint, data) => {
  await delay(300);

  if (endpoint.includes('getAll')) {
    const { page = 1, pageSize = 10 } = data || {};
    const raw = [...(excecoesMock.data || [])];
    const filteredData = raw.map((item) => ({ ...item, tipoCodigo: getTipoCodigo(item.tipoId) }));
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
    const item = excecoesMock.data.find((l) => l.id === id);
    return { data: { data: item || null }, success: !!item, message: item ? 'Success' : 'Exceção não encontrada' };
  }

  if (endpoint.includes('upsert')) {
    const payload = data || {};
    const existingIndex = excecoesMock.data.findIndex((l) => l.id === payload.id);
    const dataInicio = serializeDateTime(payload.dataInicio);
    const dataFim = serializeDateTime(payload.dataFim);
    if (!dataInicio || !dataFim) {
      return { data: null, success: false, message: 'Data e hora de início e fim são obrigatórias.' };
    }
    const newItem = {
      id: payload.id || Date.now(),
      dataInicio,
      dataFim,
      tipoId: payload.tipoId ?? null,
      descricao: payload.descricao || '',
      recursoIds: Array.isArray(payload.recursoIds) ? payload.recursoIds : [],
    };
    if (existingIndex >= 0) {
      excecoesMock.data[existingIndex] = { ...excecoesMock.data[existingIndex], ...newItem };
    } else {
      excecoesMock.data.push(newItem);
    }
    return { data: { data: newItem }, success: true, message: payload.id ? 'Exceção atualizada com sucesso' : 'Exceção criada com sucesso' };
  }

  if (endpoint.includes('delete')) {
    const id = data?.id ?? parseInt(endpoint.split('/').pop(), 10);
    const idx = excecoesMock.data.findIndex((l) => l.id === id);
    if (idx >= 0) excecoesMock.data.splice(idx, 1);
    return { data: { id }, success: true, message: 'Exceção excluída com sucesso' };
  }

  return { data: null, success: false, message: 'Endpoint não implementado' };
};

const ExcecoesService = {
  getAll: async (requestData) => {
    try {
      return await getMockData('/excecoes/getAll', requestData);
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      return await getMockData(`/excecoes/getById/${id}`);
    } catch (error) {
      throw error;
    }
  },
  upsert: async (payload) => {
    try {
      return await getMockData('/excecoes/upsert', payload);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      return await getMockData('/excecoes/delete', { id });
    } catch (error) {
      throw error;
    }
  },
};

export default ExcecoesService;
