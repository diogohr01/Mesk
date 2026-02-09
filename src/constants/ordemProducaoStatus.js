/**
 * Labels e cores de status para Ordem de Produção (sequenciamento).
 * Usado por Dashboard, Gantt, StatusBadge e demais componentes.
 */

export const statusLabels = {
  rascunho: 'Rascunho',
  sequenciada: 'Sequenciada',
  aguardando_confirmacao: 'Aguardando Confirmação',
  confirmada: 'Confirmada',
  em_producao: 'Em Produção',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

/** Cores para Tag do Ant Design (success, processing, warning, error, default) ou uso em estilo */
export const statusColors = {
  rascunho: 'default',
  sequenciada: 'processing',
  aguardando_confirmacao: 'gold',
  confirmada: 'blue',
  em_producao: 'orange',
  concluida: 'success',
  cancelada: 'default',
};
