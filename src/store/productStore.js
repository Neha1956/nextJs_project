import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set, get) => ({
  products: [],
  total: 0,

  page: 1,
  limit: 10,

  searchQuery: "",

  // 🔹 Page change
  setPage: (page) => set({ page }),

  // 🔹 Search update
  setSearchQuery: (query) =>
    set({
      searchQuery: query,
      page: 1,
    }),

  // 🔹 MAIN FETCH (pagination + search)
  fetchProducts: async () => {
    const { page, limit, searchQuery } = get();

    const skip = (page - 1) * limit;

    try {
      let url = "";

      // If search active
      if (searchQuery && searchQuery.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const response = await axios.get(url);

      set({
        products: response.data.products,
        total: response.data.total || 0,
      });
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  },
}));

export default useProductStore;