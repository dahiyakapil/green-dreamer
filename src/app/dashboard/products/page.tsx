"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/store/productsStore";
import { Grid, Box } from "@mui/material";

const GridAny: any = Grid;
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {products.map((p: any) => (
          <GridAny item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard product={p} />
          </GridAny>
        ))}
      </Grid>
    </Box>
  );
}
