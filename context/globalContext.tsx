"use client";
import { createContext } from 'react';
import useTheme, { Theme } from '@/hook/useTheme';
import useIsMobile from '@/hook/useIsMobile';
import { SessionProvider } from 'next-auth/react';
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

interface GlobalContextValue {
  theme: Theme;
  isMobile?: boolean;
  setTheme: (theme: Theme) => void;
}

// 创建主题上下文，初始值为null，类型为GlobalContextValue
const GlobalContext = createContext<GlobalContextValue | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  return (
    <GlobalContext.Provider value={{ theme, isMobile, setTheme }}>
      <HeroUIProvider>
        <ToastProvider toastProps={{
          timeout: 1000,
        }} />
        <SessionProvider>
          {children}
        </SessionProvider>
      </HeroUIProvider>
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };