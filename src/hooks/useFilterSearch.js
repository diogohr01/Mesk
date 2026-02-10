import { useCallback, useMemo, useState } from 'react';

/**
 * Hook para filtro de pesquisa em listas. Centraliza estado e props do campo de pesquisa.
 *
 * @param {string} [initialValue=''] - Valor inicial do termo de pesquisa.
 * @returns {{ searchTerm: string, setSearchTerm: Function, clearSearch: Function, searchProps: object }}
 *
 * @example
 * const { searchTerm, searchProps, clearSearch } = useFilterSearch();
 * // No fetchData: search: searchTerm?.trim() || undefined
 * // Na UI: <Input.Search placeholder="Pesquisar..." {...searchProps} />
 * // No Limpar: clearSearch(); debouncedReloadTable();
 */
export function useFilterSearch(initialValue = '') {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const searchProps = useMemo(
    () => ({
      value: searchTerm,
      onChange: (e) => setSearchTerm(e?.target?.value ?? ''),
      onSearch: (value) => setSearchTerm(value ?? ''),
    }),
    [searchTerm]
  );

  return {
    searchTerm,
    setSearchTerm,
    clearSearch,
    searchProps,
  };
}
