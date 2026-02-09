import criteriosScoreMock from '../mocks/configuracoes/criteriosScore.json';

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
};

export default ConfiguracoesService;
