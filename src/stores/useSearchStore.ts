import { create } from 'zustand';
import { IPlaylist } from '@/types/playlistTypes';

interface SearchState {
  searchTerm: string;
  searchResults: IPlaylist[];
  isLoading: boolean;
  error: string | null;
  filter: 'recent' | 'popular';
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: IPlaylist[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: 'recent' | 'popular') => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  searchResults: [],
  isLoading: false,
  error: null,
  filter: 'recent',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set({ filter }),
}));

export default useSearchStore;
