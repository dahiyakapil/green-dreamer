"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/theme/muiTheme";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

function SessionSync({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    const accessToken = (session as any)?.accessToken;
    if (accessToken) {
      setToken(accessToken);
    }
  }, [session, setToken]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionSync>{children}</SessionSync>
      </ThemeProvider>
    </SessionProvider>
  );
}
