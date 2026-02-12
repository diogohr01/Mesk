import { useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

/**
 * @typedef {'hora'|'dia'|'semana'|'mes'} GanttZoom
 */

/**
 * @typedef {Object} GanttColumn
 * @property {dayjs.Dayjs} date
 * @property {string} label
 * @property {string} [subLabel]
 */

/**
 * @typedef {Object} GanttDayGroup
 * @property {dayjs.Dayjs} date
 * @property {string} label
 * @property {number} colSpan
 */

/**
 * @typedef {Object} GanttTimeConfig
 * @property {dayjs.Dayjs} startDate
 * @property {dayjs.Dayjs} endDate
 * @property {number} totalWidth
 * @property {number} cellWidth
 * @property {GanttColumn[]} columns
 * @property {GanttDayGroup[]} [dayGroups]
 * @property {boolean} hasSubHeader
 */

/**
 * Gera colunas e agrupamentos de tempo para o Gantt conforme zoom e escala.
 * @param {GanttZoom} zoom
 * @param {dayjs.Dayjs} rangeStart
 * @param {dayjs.Dayjs} rangeEnd
 * @param {number} [scale=1]
 * @returns {GanttTimeConfig}
 */
export function useGanttTime(zoom, rangeStart, rangeEnd, scale = 1) {
  return useMemo(() => {
    let cellWidth = 56;
    const columns = [];
    let dayGroups = [];
    let hasSubHeader = false;
    const start = dayjs(rangeStart).startOf('day');
    const end = dayjs(rangeEnd).add(1, 'day').startOf('day');

    const addDays = (from, to) => {
      const days = [];
      let d = dayjs(from).startOf('day');
      const endDay = dayjs(to).startOf('day');
      while (d.isBefore(endDay) || d.isSame(endDay, 'day')) {
        days.push(d);
        d = d.add(1, 'day');
      }
      return days;
    };

    const addHours = (from, to) => {
      const hours = [];
      let h = dayjs(from);
      const endHour = dayjs(to);
      while (h.isBefore(endHour) || h.isSame(endHour, 'hour')) {
        hours.push(h);
        h = h.add(1, 'hour');
      }
      return hours;
    };

    switch (zoom) {
      case 'hora': {
        cellWidth = Math.round(72 * scale);
        const hours = addHours(start, end.add(-1, 'hour'));
        hours.forEach((h) => {
          columns.push({ date: h, label: h.format('HH:mm') });
        });
        const dayMap = new Map();
        hours.forEach((h) => {
          const dayKey = h.format('YYYY-MM-DD');
          const existing = dayMap.get(dayKey);
          if (existing) {
            existing.colSpan += 1;
          } else {
            dayMap.set(dayKey, {
              date: h.startOf('day'),
              label: h.format('ddd DD/MM'),
              colSpan: 1,
            });
          }
        });
        dayGroups = Array.from(dayMap.values());
        hasSubHeader = true;
        break;
      }
      case 'dia': {
        const days = addDays(start, end.add(-1, 'day'));
        const hoursPerDay = [0, 4, 8, 12, 16, 20];
        days.forEach((d) => {
          hoursPerDay.forEach((h) => {
            columns.push({
              date: d.hour(h).minute(0).second(0).millisecond(0),
              label: String(h).padStart(2, '0') + ':00',
            });
          });
        });
        cellWidth = Math.round(56 * scale);
        dayGroups = days.map((d) => ({
          date: d,
          label: d.format('ddd DD/MM'),
          colSpan: hoursPerDay.length,
        }));
        hasSubHeader = true;
        break;
      }
      case 'semana': {
        cellWidth = Math.round(108 * scale);
        const days = addDays(start, end.add(-1, 'day'));
        days.forEach((d) => {
          columns.push({
            date: d,
            label: d.format('ddd'),
            subLabel: d.format('DD'),
          });
        });
        let weekStart = dayjs(start).startOf('week');
        const weekEnd = dayjs(end).startOf('week');
        const weeks = [];
        while (weekStart.isBefore(weekEnd) || weekStart.isSame(weekEnd)) {
          const weekDays = days.filter((d) => d.isSame(weekStart, 'week'));
          if (weekDays.length) {
            weeks.push({
              date: weekStart,
              label: `Semana ${weekStart.week()} — ${weekStart.format('MMM')}`,
              colSpan: weekDays.length,
            });
          }
          weekStart = weekStart.add(1, 'week');
        }
        dayGroups = weeks;
        hasSubHeader = true;
        break;
      }
      case 'mes': {
        cellWidth = Math.round(270 * scale);
        const months = [];
        let current = dayjs(start).startOf('month');
        const endMonth = dayjs(end).startOf('month');
        while (current.isBefore(endMonth) || current.isSame(endMonth, 'month')) {
          months.push(current);
          current = current.add(1, 'month').startOf('month');
        }
        months.forEach((m) => {
          columns.push({
            date: m,
            label: m.format('MMMM YYYY'),
          });
        });
        hasSubHeader = false;
        break;
      }
      default:
        break;
    }

    const totalWidth = columns.length * cellWidth;
    return {
      startDate: start,
      endDate: end,
      totalWidth,
      cellWidth,
      columns,
      dayGroups: dayGroups.length ? dayGroups : undefined,
      hasSubHeader,
    };
  }, [zoom, rangeStart, rangeEnd, scale]);
}

/**
 * Calcula posição em px de uma barra no eixo do tempo.
 * @param {dayjs.Dayjs} startDate
 * @param {dayjs.Dayjs} barStart
 * @param {dayjs.Dayjs} barEnd
 * @param {number} totalWidth
 * @param {dayjs.Dayjs} endDate
 * @returns {{ left: number, width: number }}
 */
export function getBarPosition(startDate, barStart, barEnd, totalWidth, endDate) {
  const totalMs = endDate.valueOf() - startDate.valueOf();
  if (totalMs === 0) return { left: 0, width: 0 };
  const start = dayjs(barStart).valueOf();
  const end = dayjs(barEnd).valueOf();
  const s = dayjs(startDate).valueOf();
  const leftMs = start - s;
  const widthMs = end - start;
  const left = (leftMs / totalMs) * totalWidth;
  const width = Math.max((widthMs / totalMs) * totalWidth, 4);
  return { left, width };
}

/**
 * Converte posição em px para data no eixo do tempo.
 * @param {number} px
 * @param {dayjs.Dayjs} startDate
 * @param {number} totalWidth
 * @param {dayjs.Dayjs} endDate
 * @returns {dayjs.Dayjs}
 */
export function positionToDate(px, startDate, totalWidth, endDate) {
  const totalMs = endDate.valueOf() - startDate.valueOf();
  const ms = (px / totalWidth) * totalMs;
  return dayjs(startDate.valueOf() + ms);
}
