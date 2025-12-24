"use client";

import React, { useState } from "react";
import { Box, IconButton, Stack, CardMedia } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ImagesCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <Box mb={2}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton onClick={prev} size="small" sx={{ bgcolor: 'background.paper' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box flex={1} className="card" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
          <CardMedia component="img" image={images[idx]} alt={`image-${idx}`} sx={{ maxHeight: 360, objectFit: 'contain', borderRadius: 8 }} />
        </Box>
        <IconButton onClick={next} size="small" sx={{ bgcolor: 'background.paper' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
