import { create } from "zustand";

const useAuthStore = create((set) => ({
  member: JSON.parse(localStorage.getItem("member")) || null,
  accessToken: localStorage.getItem("accessToken") || null,

  login: ({ accessToken, member }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("member", JSON.stringify(member));

    set({
      accessToken,
      member,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("member");

    set({
      accessToken: null,
      member: null,
    });
  },

  isLogin: () => {
    return !!localStorage.getItem("accessToken");
  },
}));

export default useAuthStore;