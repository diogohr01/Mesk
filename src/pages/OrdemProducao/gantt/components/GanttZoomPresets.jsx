import React, { useState, useEffect } from 'react';
import { Slider, Space, Typography } from 'antd';

const { Text } = Typography;

const MIN = 1;   // 100%
const MAX = 4;   // 400%
const STEP = 0.1;

/**
 * Controle compacto de zoom: slider (100%–400%) com a percentagem ao lado.
 * Durante o arraste usa estado local para não travar o Gantt; aplica o valor ao soltar.
 */
function GanttZoomPresets({ zoomScale, onZoomScaleChange, min = MIN, max = MAX, step = STEP }) {
  const [localScale, setLocalScale] = useState(zoomScale);

  useEffect(() => {
    setLocalScale(zoomScale);
  }, [zoomScale]);

  const percent = Math.round(localScale * 100);

  return (
    <Space size={8} style={{ alignItems: 'center', minWidth: 0 }}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={localScale}
        onChange={setLocalScale}
        onAfterChange={(v) => onZoomScaleChange(v)}
        style={{ width: 80, margin: 0, flexShrink: 0 }}
        tooltip={{ formatter: (v) => `${Math.round(Number(v) * 100)}%` }}
      />
      <Text style={{ fontSize: 12, fontFamily: 'monospace', width: 40, flexShrink: 0 }}>
        {percent}%
      </Text>
    </Space>
  );
}

export default GanttZoomPresets;
