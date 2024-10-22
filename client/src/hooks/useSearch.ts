import { useEffect, useCallback } from 'react';
import useSearchStore from '@/stores/useSearchStore';
import { searchPlaylists } from '@/apis/searchApi';

const useSearch = () => {
  const {
    searchTerm,
    searchResults,
    isLoading,
    error,
    filter,
    setSearchResults,
    setIsLoading,
    setError,
  } = useSearchStore();

  const fetchSearchResults = useCallback(async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchPlaylists(searchTerm, filter);
      setSearchResults(results);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filter, setSearchResults, setIsLoading, setError]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return { searchResults, isLoading, error };
};

export default useSearch;
