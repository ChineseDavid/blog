"use client";
import { createContext } from 'react';
import useTheme, { Theme } from '@/hook/useTheme';
import useIsMobile from '@/hook/useIsMobile';

interface ThemeContextValue {
  theme: Theme;
  isMobile?: boolean;
  setTheme: (theme: Theme) => void;
}

// 创建主题上下文，初始值为null，类型为ThemeContextValue
const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {theme,setTheme} = useTheme();
  const isMobile = useIsMobile();
  return (
    <ThemeContext.Provider value={{ theme, isMobile, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };