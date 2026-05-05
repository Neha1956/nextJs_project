import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,

  page: 1,
  limit: 10,

  searchQuery: "",

  // Page change
  setPage: (page) => set({ page }),

  // Search update
  setSearchQuery: (query) =>
    set({
      searchQuery: query,
      page: 1, // reset page when searching
    }),

  // MAIN FETCH (pagination + normal list)
  fetchUsers: async () => {
    const { page, limit, searchQuery } = get();

    const skip = (page - 1) * limit;

    try {
      let url = "";

      // If search active
      if (searchQuery && searchQuery.trim() !== "") {
        url = `https://dummyjson.com/users/search?q=${searchQuery}`;
      } else {
        url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      }

      const response = await axios.get(url);

      set({
        users: response.data.users,
        total: response.data.total || 0,
      });
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  },

  // 🔹 Optional: separate search function (if needed)
  searchUsers: async (query) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${query}`
      );

      set({
        users: response.data.users,
        searchQuery: query,
        page: 1,
      });
    } catch (error) {
      console.log("Search error:", error);
    }
  },
}));

export default useUserStore;