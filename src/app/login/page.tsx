"use client";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [error, setError] = useState<string | null>(urlError ? String(urlError) : null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    console.log("[login] submitting", { username, password: password ? "(present)" : "(empty)" });

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res && (res as any).ok) {
      // Successful sign in — go to dashboard users
      router.push("/dashboard/users");
    } else {
      setError((res as any)?.error || "Invalid credentials");
    }
  };

  const fillTestCreds = (e: any) => {
    e.preventDefault();
    setUsername("kminchelle");
    setPassword("0lelplR");
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ px: 2 }}
    >
      <Paper className="card" sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>G</Box>
          <Typography variant="h5">Admin Login</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          <Button
            onClick={fillTestCreds}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Fill Test Credentials
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
