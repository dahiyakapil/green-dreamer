"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useProductsStore } from "@/store/productsStore";
import { Grid, Box, TextField, MenuItem, Select, InputLabel, FormControl, Pagination, Stack } from "@mui/material";

const GridAny: any = Grid;
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const { products, total, categories, fetchProducts, fetchCategories } = useProductsStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const load = useCallback(() => {
    fetchProducts({ skip: (page - 1) * 10, search, category });
  }, [page, search, category, fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    load();
  }, [load]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil((total || 0) / 10)), [total]);

  const getCategoryLabel = (c: any) => {
    if (c == null) return "";
    if (typeof c === "string") return c;
    if (typeof c === "object") {
      if (typeof c.name === "string") return c.name;
      if (typeof c.slug === "string") return c.slug;
      if (typeof c.title === "string") return c.title;
      try {
        return JSON.stringify(c);
      } catch (e) {
        return String(c);
      }
    }
    return String(c);
  };

  const getCategoryValue = (c: any) => {
    if (c == null) return "";
    if (typeof c === "string") return c;
    if (typeof c === "object") {
      if (typeof c.slug === "string") return c.slug;
      if (typeof c.name === "string") return c.name;
      if (typeof c.id === "string" || typeof c.id === "number") return String(c.id);
      try {
        return JSON.stringify(c);
      } catch (e) {
        return String(c);
      }
    }
    return String(c);
  };

  return (
    <Box p={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
        <TextField
          label="Search Products"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={category}
            onChange={(e) => { setCategory(String(e.target.value)); setPage(1); }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c: any, i: number) => {
              const val = getCategoryValue(c);
              const label = getCategoryLabel(c);
              const key = typeof c === 'object' && (c?.id || c?.slug || c?.name)
                ? `${c.id ?? c.slug ?? c.name}`
                : `${label}-${i}`;

              return (
                <MenuItem key={key} value={val}>{label}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={2}>
        {products.map((p: any) => (
          <GridAny item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard product={p} />
          </GridAny>
        ))}
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} />
      </Box>
    </Box>
  );
}
