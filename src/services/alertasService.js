import alertasMock from '../mocks/alertas/alertas.json';
import ordensProducaoMock from '../mocks/ordemProducao/ordensProducao.json';
import recursosMock from '../mocks/recursosProdutivos/recursos.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getOrdemProducaoById = (id) => (ordensProducaoMock.data || []).find((op) => op.id === id);
const getRecursoById = (id) => (recursosMock.data || []).find((r) => r.id === id);

const AlertasService = {
  getAll: async () => {
    try {
      await delay(150);
      const list = alertasMock.data || [];
      const enriched = list.map((alerta) => {
        const op = alerta.ordemProducaoId != null ? getOrdemProducaoById(alerta.ordemProducaoId) : null;
        const recurso = alerta.recursoId != null ? getRecursoById(alerta.recursoId) : null;
        return {
          ...alerta,
          ordemProducao: op ? { id: op.id, codigo: op.numeroOPERP } : null,
          recurso: recurso ? { id: recurso.id, nome: recurso.nome } : null,
        };
      });
      return {
        data: { data: enriched },
        success: true,
        message: 'Success',
      };
    } catch (error) {
      throw error;
    }
  },
};

export default AlertasService;
