import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: { main: '#1e3c72' },
    secondary: { main: '#2a5298' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

export const metadata: Metadata = {
  title: "Sistema de Votaciones",
  description: "Plataforma de vot aciones en línea segura y moderna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
