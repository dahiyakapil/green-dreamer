import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0ea5a4", contrastText: "#fff" },
    secondary: { main: "#7c3aed", contrastText: "#fff" },
    background: { default: "#f7fbff", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#6b7280" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 700, fontSize: "1.5rem" },
    h3: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f7fbff",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "8px 18px",
          boxShadow: "0 6px 14px rgba(16,24,40,0.06)",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #0ea5a4, #0e9488)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 6px 18px rgba(8,15,25,0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
