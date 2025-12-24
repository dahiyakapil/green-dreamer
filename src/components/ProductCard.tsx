import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function ProductCard({ product }: any) {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
        />
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography>${product.price}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default React.memo(ProductCard);
