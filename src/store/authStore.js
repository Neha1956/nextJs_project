import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,

  login: (token) =>
    set({
      token: token,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      token: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;