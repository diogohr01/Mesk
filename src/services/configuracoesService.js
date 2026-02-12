import criteriosScoreMock from '../mocks/configuracoes/criteriosScore.json';
import excecoesMock from '../mocks/configuracoes/excecoes.json';
import recursosMock from '../mocks/recursosProdutivos/recursos.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ConfiguracoesService = {
  getCriteriosScore: async () => {
    try {
      await delay(150);
      const data = criteriosScoreMock.data || [];
      return {
        data: { data },
        success: true,
        message: 'Success',
      };
    } catch (error) {
      throw error;
    }
  },

  getExcecoes: async () => {
    try {
      await delay(150);
      const list = excecoesMock.data || [];
      const recursosList = recursosMock.data || [];
      const enriched = list.map((exc) => {
        const recursos = (exc.recursoIds || []).map((rid) => {
          const r = recursosList.find((rec) => rec.id === rid);
          return r ? { id: r.id, nome: r.nome } : null;
        }).filter(Boolean);
        return { ...exc, recursos };
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

export default ConfiguracoesService;
