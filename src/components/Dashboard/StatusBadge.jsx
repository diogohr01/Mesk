import React, { memo } from 'react';
import { Tag } from 'antd';
import { statusLabels, statusColors } from '../../constants/ordemProducaoStatus';

/**
 * Badge de status da OP com label e cor consistentes.
 * @param {string} status - Chave do status (rascunho, sequenciada, confirmada, em_producao, concluida, cancelada)
 */
const StatusBadge = memo(({ status }) => {
  const label = statusLabels[status] ?? status;
  const color = statusColors[status] ?? 'default';

  return <Tag color={color}>{label}</Tag>;
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
