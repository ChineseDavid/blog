import "./globals.css";
import '@/styles/icon/iconfont.css';
import {ThemeContextProvider} from "@/context/themeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-text-normal bg-bg-normal">
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
