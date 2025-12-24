import { create } from "zustand";

interface ProductsState {
  products: any[];
  fetchProducts: (skip?: number, search?: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],

  fetchProducts: async (skip = 0, search = "") => {
    const url = search
      ? `https://dummyjson.com/products/search?q=${search}`
      : `https://dummyjson.com/products?limit=10&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();
    set({ products: data.products });
  },
}));
