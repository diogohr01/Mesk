import React, { useEffect, useRef } from 'react';
import { colors } from '../../styles/colors';

const NS = 'http://www.w3.org/2000/svg';
const GRAPHIC_TAGS = ['path', 'circle', 'rect', 'polygon', 'line', 'polyline', 'ellipse'];

/**
 * Envolve um ícone SVG (ex.: react-icons) e injeta um linearGradient no DOM do SVG,
 * aplicando-o em stroke e opcionalmente em fill. Compatível com qualquer ícone que renderize SVG.
 *
 * @param {React.ReactElement} children - Ícone (ex.: <AiFillHome />)
 * @param {string} gradientId - Base do ID do gradient (evitar duplicados; useId garante unicidade por instância)
 * @param {boolean} fillGradient - Se true, aplica gradient no fill; se false, só no stroke (contorno)
 * @param {[string, string]} gradientColors - [corInício, corFim]. Default: colors.iconGradient
 */
function GradientizeIcon({
  children,
  gradientId = 'icon-grad',
  fillGradient = false,
  gradientColors = colors.iconGradient || [colors.primary, colors.primaryDark],
}) {
  const ref = useRef(null);
  const uniqueIdRef = useRef(null);
  const [startColor, endColor] = Array.isArray(gradientColors) && gradientColors.length >= 2
    ? gradientColors
    : [colors.primary, colors.primaryDark];

  if (!uniqueIdRef.current) {
    uniqueIdRef.current = `${gradientId}-${Math.random().toString(36).slice(2, 11)}`;
  }
  const uniqueId = uniqueIdRef.current;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const svg = root.querySelector('svg');
    if (!svg) return;

    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS(NS, 'defs');
      svg.insertBefore(defs, svg.firstChild);
    }

    let gradient = defs.querySelector(`#${uniqueId}`);
    if (!gradient) {
      gradient = document.createElementNS(NS, 'linearGradient');
      gradient.setAttribute('id', uniqueId);
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '100%');

      const stop1 = document.createElementNS(NS, 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', startColor);
      const stop2 = document.createElementNS(NS, 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', endColor);
      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
    }

    const apply = (node) => {
      if (!(node instanceof SVGElement)) return;
      const tag = node.tagName ? node.tagName.toLowerCase() : '';
      if (tag === 'svg' || tag === 'g') {
        node.childNodes.forEach((child) => apply(child));
        return;
      }
      if (GRAPHIC_TAGS.includes(tag)) {
        node.style.stroke = `url(#${uniqueId})`;
        node.style.strokeWidth = '1.5';
        if (tag === 'line' || tag === 'polyline') {
          node.style.fill = 'none';
        } else if (fillGradient) {
          node.style.fill = `url(#${uniqueId})`;
          node.style.strokeWidth = '0.5';
        } else {
          node.style.fill = 'none';
        }
      }
      node.childNodes.forEach((child) => apply(child));
    };
    apply(svg);
  }, [uniqueId, fillGradient, startColor, endColor]);

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  );
}

export default GradientizeIcon;
