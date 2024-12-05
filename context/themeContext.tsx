"use client";
import { createContext } from 'react';
import { Theme } from '@/hook/useTheme';

interface ThemeContextValue {
  theme: Theme;
  isMobile: boolean;
  setTheme: (theme: Theme) => void;
}

// 创建主题上下文，初始值为null，类型为ThemeContextValue
const ThemeContext = createContext<ThemeContextValue | null>(null);

export default ThemeContext;