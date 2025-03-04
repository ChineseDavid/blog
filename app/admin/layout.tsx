"use client";
import Icon from "@/components/icon";
import Directory from "./directory";
import Slidebar from "./slidebar";
import { useContext, useLayoutEffect, useState } from "react";
import ToggleTheme from "@/components/toggleTheme";
import IconButton from "@/components/iconButton";
import { GlobalContext } from "@/context/globalContext";
import User from "@/components/user";


export default function Home({ children }: { children: React.ReactNode; }) {
  
  const globalContext = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(globalContext?.isMobile === undefined ? undefined : !globalContext?.isMobile);

  useLayoutEffect(() => {
    // getSession();
    if (globalContext?.isMobile !== undefined) {
      setIsOpen(!globalContext?.isMobile);
    }
  }, [globalContext?.isMobile]);



  return (
    <main className="w-screen h-screen flex bg-bg-shallow">
      <Slidebar isOpen={isOpen} isMobile={globalContext?.isMobile} onClose={() => setIsOpen(!isOpen)} />
      <div className="flex-1 flex flex-col">
        <div className="shadow-sm  m-2 bg-bg-normal p-3 rounded-xl mb-0 text-sm flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="slidebar" size="2xl" className="hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            <Directory />
          </div>
          <div className="flex gap-2">
            <ToggleTheme />
            <IconButton name="github" onClick={() => window.open('https://github.com/ChineseDavid/blog')} />
            {/* <Button name="退出登录" size="sm" onClick={signOut} /> */}
            <User />
          </div>
        </div>
        <div className="flex-1 shadow-sm m-2 bg-bg-normal p-3 rounded-xl overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
