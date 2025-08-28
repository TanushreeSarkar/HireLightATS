"use client";

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

// This is a custom ThemeProvider that wraps the one from next-themes.
// It allows for customization and integration with other parts of the app.

const ThemeContext = React.createContext<{
  theme: string;
  setTheme: (theme: string) => void;
} | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const useTheme = () => {
  const context = useNextTheme();
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
