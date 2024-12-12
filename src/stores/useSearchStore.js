import { create } from 'zustand';
import axios from 'axios';

const useSearchStore = create((set) => ({
    query: '',
    results: [],
    loading: false,
    error: null,

    setQuery: (query) => set({ query }),

    fetchSearchResults: async (query) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/store/products/?search=${query}`);
            set({ results: data.results, loading: false });
        } catch (error) {
            set({ error: 'Search failed', loading: false });
        }
    },
}));

export default useSearchStore;
