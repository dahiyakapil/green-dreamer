import { create } from "zustand";
import axios from "axios";

interface ProductsState {
  products: any[];
  total: number;
  categories: string[];
  fetchProducts: (opts?: { skip?: number; search?: string; category?: string }) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

// Simple in-memory cache keyed by query string to avoid refetching same pages.
// Cache strategy: store responses by `${skip}-${search}-${category}` for 5 minutes.
// This reduces duplicate API calls when users navigate back and forth.
const cacheStore: Record<string, { ts: number; data: { products: any[]; total: number } }> = {};
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  total: 0,
  categories: [],

  fetchCategories: async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      set({ categories: res.data });
    } catch (err) {
      set({ categories: [] });
    }
  },

  fetchProducts: async (opts = {}) => {
    const { skip = 0, search = "", category = "" } = opts;
    const key = `${skip}-${search}-${category}`;

    // Return from cache when fresh
    const cached = cacheStore[key];
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      set({ products: cached.data.products, total: cached.data.total });
      return;
    }

    try {
      let url = "";
      if (search) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=10&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=10&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=10&skip=${skip}`;
      }

      const res = await axios.get(url);
      const data = res.data;
      const products = data.products ?? [];
      const total = data.total ?? products.length;

      // Save to cache
      cacheStore[key] = { ts: Date.now(), data: { products, total } };

      set({ products, total });
    } catch (err) {
      set({ products: [], total: 0 });
    }
  },
}));

/*
Why caching here?
- Avoids duplicate network requests when user toggles pagination, filters.
- Improves responsiveness and reduces load on public API.

Why Zustand?
- Small API surface and minimal boilerplate compared to Redux.
- Stores can contain async actions directly, keeping logic co-located.
- Lightweight footprint, ideal for small-to-medium apps.
*/
