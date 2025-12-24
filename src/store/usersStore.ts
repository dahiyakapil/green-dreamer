import { create } from "zustand";
import axios from "axios";

interface UsersState {
  users: any[];
  total: number;
  fetchUsers: (skip?: number, search?: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,

  fetchUsers: async (skip = 0, search = "") => {
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=10&skip=${skip}`;

    const res = await axios.get(url);
    set({ users: res.data.users, total: res.data.total });
  },
}));
