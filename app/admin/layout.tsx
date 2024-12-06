"use client";
import Icon from "@/components/icon";
import Directory from "./directory";
import Slidebar from "./slidebar";
import { useContext, useLayoutEffect, useState } from "react";
import ToggleTheme from "@/components/toggleTheme";
import IconButton from "@/components/iconButton";
import ThemeContext from "@/context/themeContext";
import Button from "@/components/button";


export default function Home({ children }: { children: React.ReactNode; }) {
  const logout = async ()=>{
    const r = await fetch("/api/logout", {
      method: "DELETE",
    });
    const data = await r.json();
    console.log('ydw', data);
    if (data?.success){
      window.location.href = "/";
    }
  }
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(themeContext?.isMobile === undefined ? undefined : !themeContext?.isMobile);

  useLayoutEffect(() => {
    if (themeContext?.isMobile !== undefined){
      setIsOpen(!themeContext?.isMobile);
    }
  }, [themeContext?.isMobile]);

  return (
    <main className="w-screen h-screen flex bg-bg-shallow">
      <Slidebar isOpen={isOpen} isMobile={themeContext?.isMobile} onClose={() => setIsOpen(!isOpen)} />
      <div className="flex-1 flex flex-col">
        <div className="shadow-sm  m-2 bg-bg-normal p-3 rounded-xl mb-0 text-sm flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="slidebar" size="2xl" className="hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)} /><Directory />
          </div>
          <div className="flex gap-2">
            <ToggleTheme />
            <IconButton name="github" />
            <Button name="退出登录" size="sm" onClick={logout} />
          </div>
        </div>
        <div className="flex-1 shadow-sm m-2 bg-bg-normal p-3 rounded-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
