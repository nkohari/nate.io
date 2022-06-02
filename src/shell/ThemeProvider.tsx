import { createContext, useContext, useEffect, useState } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const LOCAL_STORAGE_KEY = 'theme';

export const getDefaultTheme = (): Theme => {
  const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
  const osDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (theme) {
    return theme === Theme.Dark ? Theme.Dark : Theme.Light;
  } else {
    return osDarkMode ? Theme.Dark : Theme.Light;
  }
};

export const setThemeClassOnDocumentElement = (theme: Theme) => {
  document.documentElement.classList.remove(...Object.values(Theme));
  document.documentElement.classList.add(theme);
};

type ThemeContextData = {
  theme: Theme;
  setPreferredTheme: (theme: Theme) => void;
  clearPreferredTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({
  theme: Theme.Light,
  setPreferredTheme: () => undefined,
  clearPreferredTheme: () => undefined,
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => setThemeClassOnDocumentElement(theme), [theme]);

  const context = {
    theme,
    setPreferredTheme: (theme: Theme) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme);
      setTheme(theme);
    },
    clearPreferredTheme: () => {
      localStorage.clearItem(LOCAL_STORAGE_KEY, theme);
      setTheme(getDefaultTheme());
    },
  };

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
