import "./globals.css";
import '@/styles/icon/iconfont.css';
import 'toastify-js/src/toastify.css';
import 'bytemd/dist/index.css';
import '@/styles/bytemd.css'
import 'highlight.js/styles/default.css'
import { GlobalContextProvider } from "@/context/globalContext";
import { auth } from "@/auth";
import { redirect } from "next/navigation"
import { headers } from 'next/headers'


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const headerStore = await headers();
  const pathname = headerStore.get('x-pathname');
  if(!session && pathname?.startsWith('/admin')){
    redirect('/login');
  }
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
