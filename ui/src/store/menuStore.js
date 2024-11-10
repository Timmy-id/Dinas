import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/menus';

axios.defaults.withCredentials = true;

export const useMenuStore = create((set) => ({
  menus: [],
  fetchMenus: async () => {
    const response = await axios.get(API_URL);
    set({ menus: response.data.data });
  },

  createMenu: async (menu) => {
    const response = await axios.post(API_URL, menu);
    set((state) => ({ menus: [...state.menus, response.data.data] }));
  },

  updateMenu: async (menuId, updatedMenu) => {
    const response = await axios.patch(
      `${API_URL}/${menuId}`,
      updatedMenu,
    );
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === menuId ? response.data.data : menu,
      ),
    }));
  },
  deleteMenu: async (menuId) => {
    await axios.delete(`${API_URL}/${menuId}`);
    set((state) => ({
      menus: state.menus.filter((menu) => menu.id !== menuId),
    }));
  },
}));
