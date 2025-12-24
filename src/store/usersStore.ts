import { create } from "zustand";
import axios from "axios";

interface UsersState {
  users: any[];
  total: number;
  fetchUsers: (skip?: number, search?: string) => Promise<void>;
}

// Basic in-memory cache to avoid re-requesting the same users list frequently.
const usersCache: Record<string, { ts: number; data: { users: any[]; total: number } }> = {};
const USERS_CACHE_TTL = 1000 * 60 * 3; // 3 minutes

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,

  fetchUsers: async (skip = 0, search = "") => {
    const key = `${skip}-${search}`;
    const cached = usersCache[key];
    if (cached && Date.now() - cached.ts < USERS_CACHE_TTL) {
      set({ users: cached.data.users, total: cached.data.total });
      return;
    }

    const url = search
      ? `https://dummyjson.com/users/search?q=${encodeURIComponent(search)}&limit=10&skip=${skip}`
      : `https://dummyjson.com/users?limit=10&skip=${skip}`;

    const res = await axios.get(url);
    const users = res.data.users ?? [];
    const total = res.data.total ?? users.length;

    usersCache[key] = { ts: Date.now(), data: { users, total } };
    set({ users, total });
  },
}));

/* Caching notes:
 - Caches are in-memory only (per-tab). They reduce repeated network calls
   during pagination/filtering navigation.
 - TTLs are moderate (3-5 minutes) to balance freshness with request count.
*/
