'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: { main: '#1e3c72' },
        secondary: { main: '#2a5298' },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
});

export default function MUIThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
