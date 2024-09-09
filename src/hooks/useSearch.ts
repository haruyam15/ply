import { useEffect } from 'react';
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) return;

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchPlaylists(searchTerm, filter);
        setSearchResults(results);
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm, filter, setSearchResults, setIsLoading, setError]);

  return { searchResults, isLoading, error };
};

export default useSearch;
