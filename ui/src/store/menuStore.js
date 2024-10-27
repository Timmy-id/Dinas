import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/menus';

axios.defaults.withCredentials = true;

export const useMenuStore = create((set) => ({
  menu: null,
  error: null,
  isLoading: false,

  createMenu: async (name, price, description, isAvailable) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}`, {
        name,
        description,
        price,
        isAvailable,
      });

      set({
        menu: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'Error creating menu',
        isLoading: false,
      });
      throw error;
    }
  },
}));
