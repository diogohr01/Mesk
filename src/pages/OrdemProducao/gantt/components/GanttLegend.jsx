import React, { memo } from 'react';

const legendItems = [
  { color: 'hsl(142, 71%, 40%)', label: 'No prazo' },
  { color: 'hsl(210, 100%, 52%)', label: 'Sequenciada' },
  { color: 'hsl(38, 92%, 50%)', label: 'Risco (≤2d)' },
  { color: 'hsl(0, 72%, 48%)', label: 'Atrasada' },
  { color: 'hsl(220, 10%, 40%)', label: 'Rascunho' },
  { color: 'hsl(142, 50%, 35%)', label: 'Concluída' },
];

function GanttLegend() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', padding: '12px 0' }}>
      {legendItems.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 18,
              height: 12,
              borderRadius: 3,
              backgroundColor: item.color,
            }}
          />
          <span style={{ fontSize: 13, color: '#8c8c8c' }}>{item.label}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 18,
            height: 12,
            borderRadius: 3,
            backgroundColor: 'rgba(0,0,0,0.08)',
            backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />
        <span style={{ fontSize: 13, color: '#8c8c8c' }}>Setup</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 18, height: 3, backgroundColor: '#385E9D', borderRadius: 2 }} />
        <span style={{ fontSize: 13, color: '#8c8c8c' }}>Hoje</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 3, height: 14, backgroundColor: 'rgba(0,0,0,0.25)' }} />
        <span style={{ fontSize: 13, color: '#8c8c8c' }}>Deadline</span>
      </div>
    </div>
  );
}

export default memo(GanttLegend);
