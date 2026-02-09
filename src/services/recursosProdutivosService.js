import recursosMock from '../mocks/recursosProdutivos/recursos.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RecursosProdutivosService = {
  getAll: async () => {
    try {
      await delay(200);
      const data = recursosMock.data || [];
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

export default RecursosProdutivosService;
