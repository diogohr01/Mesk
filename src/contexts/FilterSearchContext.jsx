import React, { createContext, useContext } from 'react';
import { useFilterSearch } from '../hooks/useFilterSearch';

const FilterSearchContext = createContext(null);

const FALLBACK = {
  searchTerm: '',
  setSearchTerm: () => {},
  clearSearch: () => {},
  searchProps: {},
};

export function FilterSearchProvider({ children }) {
  const value = useFilterSearch();
  return (
    <FilterSearchContext.Provider value={value}>
      {children}
    </FilterSearchContext.Provider>
  );
}

export function useFilterSearchContext() {
  const ctx = useContext(FilterSearchContext);
  return ctx ?? FALLBACK;
}
