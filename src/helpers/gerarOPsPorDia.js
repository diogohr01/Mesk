import dayjs from 'dayjs';

/**
 * Gera uma lista de OPs fictícias (em memória) com duração entre 4 e 8 horas por OP,
 * uma ou mais por dia. Estrutura preparada para futuras regras de capacidade.
 * Não persiste dados; apenas retorna array para exibição/simulação.
 *
 * @param {Object} options
 * @param {string|Date|dayjs.Dayjs} [options.dataInicio] - Data de início (primeiro dia)
 * @param {number} [options.quantidadeDias=1] - Número de dias a gerar
 * @param {number} [options.minHoras=4] - Duração mínima por OP (horas)
 * @param {number} [options.maxHoras=8] - Duração máxima por OP (horas)
 * @param {number} [options.opsPorDia=2] - Quantidade de OPs por dia (para regras futuras de capacidade)
 * @returns {Array<{ dataInicio: string, dataFim: string, duracaoHoras: number, dia: string }>}
 */
export function gerarOPsPorDia(options = {}) {
  const {
    dataInicio = dayjs(),
    quantidadeDias = 1,
    minHoras = 4,
    maxHoras = 8,
    opsPorDia = 2,
  } = options;

  const start = dayjs(dataInicio);
  const result = [];
  const horasMin = Math.min(minHoras, maxHoras);
  const horasMax = Math.max(minHoras, maxHoras);

  for (let d = 0; d < quantidadeDias; d++) {
    const dia = start.add(d, 'day');
    const diaStr = dia.format('YYYY-MM-DD');
    let horaInicio = 8; // 08:00

    for (let op = 0; op < opsPorDia; op++) {
      const duracaoHoras = Math.floor(Math.random() * (horasMax - horasMin + 1)) + horasMin;
      const inicio = dia.hour(horaInicio).minute(0).second(0);
      const fim = inicio.add(duracaoHoras, 'hour');
      result.push({
        dataInicio: inicio.format('YYYY-MM-DDTHH:mm:ss'),
        dataFim: fim.format('YYYY-MM-DDTHH:mm:ss'),
        duracaoHoras,
        dia: diaStr,
      });
      horaInicio += duracaoHoras;
      if (horaInicio >= 18) break; // não passar das 18h no mesmo dia
    }
  }

  return result;
}
