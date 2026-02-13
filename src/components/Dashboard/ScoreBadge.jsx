import React, { memo } from 'react';
import { Tag } from 'antd';
import { colors } from '../../styles/colors';

/**
 * Badge numérico de score com cor por faixa: >= 85 verde, >= 65 amarelo, < 65 vermelho.
 * @param {number} score - Valor do score
 * @param {'sm'|'md'} [size] - Tamanho (sm = menor, md = maior)
 */
const ScoreBadge = memo(({ score, size = 'sm' }) => {
  const getColor = () => {
    if (score >= 85) return 'success';
    if (score >= 65) return 'warning';
    return 'error';
  };

  const sizeStyle = size === 'sm' ? { fontSize: 11, padding: '0 6px', lineHeight: '20px' } : { fontSize: 13, padding: '2px 8px', lineHeight: '22px' };

  return (
    <Tag color={colors.primary} style={{ margin: 0, fontFamily: 'monospace', fontWeight: 600, ...sizeStyle }}>
      {score}
    </Tag>
  );
});

ScoreBadge.displayName = 'ScoreBadge';

export default ScoreBadge;
