"use client";

import { AppBar, Toolbar, Button } from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} href="/dashboard/users">
          Users
        </Button>
        <Button color="inherit" component={Link} href="/dashboard/products">
          Products
        </Button>
        <Button color="inherit" onClick={() => signOut()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
