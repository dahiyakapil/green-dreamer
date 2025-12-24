import { Box, Typography } from "@mui/material";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params; // ✅ REQUIRED in Next.js 14

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  return (
    <Box p={3}>
      <Typography variant="h5">{product.title}</Typography>
      <Typography>{product.description}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
    </Box>
  );
}
