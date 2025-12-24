"use client";

import { AppBar, Toolbar, Button, Container, Typography, Box, Avatar } from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Container className="container">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link href="/dashboard/users" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, mr: 1 }}>G</Avatar>
              <Typography variant="h6" component="div">Green Dreamer</Typography>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="primary" component={Link} href="/dashboard/users" variant="text">Users</Button>
            <Button color="primary" component={Link} href="/dashboard/products" variant="text">Products</Button>
            <Button color="inherit" onClick={() => signOut()} variant="text">Logout</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
