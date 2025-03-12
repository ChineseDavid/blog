import "./globals.css";
import '@/styles/icon/iconfont.css';
import 'bytemd/dist/index.css';
import '@/styles/bytemd.css';
import { GlobalContextProvider } from "@/context/globalContext";
// import 'highlight.js/styles/default.css'; // 亮色主题
import 'highlight.js/styles/vs2015.css'; // 更推荐暗色主题


export default async function RootLayout({
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
