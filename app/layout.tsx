"use client";
import "./globals.css";
import '@/styles/icon/iconfont.css';
import classNames from "classnames";
import ThemeContext from "@/context/themeContext";
import useTheme from "@/hook/useTheme";
import useIsMobile from "@/hook/useIsMobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  return (
    <html lang="en" className={classNames(theme)}>
      <body className="text-text-normal bg-bg-normal">
        <ThemeContext.Provider value={{ isMobile, theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
