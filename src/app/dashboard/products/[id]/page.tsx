import { Box, Typography, Container, Grid, Card, CardContent, Chip } from "@mui/material";
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
    <Container className="container" sx={{ py: 4 }}>
      <Box mb={2}>
        <Link href="/dashboard/products" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className="muted">← Back to Products</span>
        </Link>
      </Box>

      <Card className="card">
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ImagesCarousel images={product.images ?? [product.thumbnail]} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>{product.title}</Typography>
              <Typography variant="body1" className="muted" paragraph>{product.description}</Typography>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <Chip label={`$${product.price}`} color="primary" />
                <Chip label={`Rating: ${product.rating}`} variant="outlined" />
                <Chip label={product.category} variant="outlined" />
              </Box>

              <Typography variant="subtitle1">Brand: {product.brand}</Typography>
              <Typography variant="subtitle2" className="muted">Stock: {product.stock}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
