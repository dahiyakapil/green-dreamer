"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Container, Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Navbar />
      <Box component="main" sx={{ pt: 3, pb: 4 }}>
        <Container className="container">{children}</Container>
      </Box>
    </ProtectedRoute>
  );
}
