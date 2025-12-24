import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import React from "react";

function ProductCard({ product }: any) {
  return (
    <Link href={`/dashboard/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="card" sx={{ cursor: 'pointer', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="180"
            image={product.thumbnail}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>{product.title}</Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 700 }}>${product.price}</Typography>
            </Box>
          </CardContent>
        </Card>
    </Link>
  );
}

export default React.memo(ProductCard);
