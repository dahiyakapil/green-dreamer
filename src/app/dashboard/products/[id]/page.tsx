import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ImagesCarousel from "@/components/ImagesCarousel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params; // ✅ REQUIRED in Next.js 14+

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  const product = await res.json();

  return (
    <Box p={3}>
      <Box mb={2}>
        <Link href="/dashboard/products">← Back to Products</Link>
      </Box>

      {/* images carousel rendered client-side */}
      <ImagesCarousel images={product.images ?? [product.thumbnail]} />

      <Typography variant="h5" gutterBottom>{product.title}</Typography>
      <Typography paragraph>{product.description}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
      <Typography>Category: {product.category}</Typography>
    </Box>
  );
}
