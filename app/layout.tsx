import "./globals.css";
import '@/styles/icon/iconfont.css';
import 'bytemd/dist/index.css';
import '@/styles/bytemd.css';
import { GlobalContextProvider } from "@/context/globalContext";
import Script from 'next/script'
// import 'highlight.js/styles/default.css'; // 亮色主题
import 'highlight.js/styles/vs2015.css'; // 更推荐暗色主题

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="baidu-tongji"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${process.env.BAIDU_TONGJI_ID}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      </head>
      <body className="text-text-normal bg-bg-normal">
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
