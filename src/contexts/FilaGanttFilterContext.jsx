import React, { createContext, useContext, useState, useCallback } from 'react';

const FilaGanttFilterContext = createContext(null);

const FALLBACK = {
  cenarioId: null,
  setCenarioId: () => {},
  filtroTipo: 'todos',
  setFiltroTipo: () => {},
};

export function FilaGanttFilterProvider({ children }) {
  const [cenarioId, setCenarioId] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const value = {
    cenarioId,
    setCenarioId,
    filtroTipo,
    setFiltroTipo,
  };
  return (
    <FilaGanttFilterContext.Provider value={value}>
      {children}
    </FilaGanttFilterContext.Provider>
  );
}

export function useFilaGanttFilterContext() {
  const ctx = useContext(FilaGanttFilterContext);
  return ctx ?? FALLBACK;
}
