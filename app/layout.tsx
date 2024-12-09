import "./globals.css";
import '@/styles/icon/iconfont.css';
import {GlobalContextProvider} from "@/context/globalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-text-normal bg-bg-normal">
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
