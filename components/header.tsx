"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Developer, RouterList } from '@/constants/common';
import ToggleTheme from './toggleTheme';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import IconButton from './iconButton';
import Slidebar from './slidebar';
import Logo from './logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  //React - Markdown

  return (
    <header className="w-full sticky top-0 backdrop-blur transition-all border-x-0 flex justify-center z-10">
      <div className="flex w-full justify-between p-4 sm:p-4 md:max-w-screen-md 2xl:max-w-screen-xl">
        {/* 网站logo */}
        <Link className="hidden md:flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-9 px-3 hover:text-textNormal mr-4" href="/">
          <Logo />
          <span className="ml-2 text-base font-semibold">{Developer.name}</span>
        </Link>

        {/* 移动设备菜单按钮 */}
        <IconButton className="md:hidden" name="menu" onClick={toggleMobileMenu} />

        {/* 导航菜单（PC端） */}
        <nav className="flex space-x-4 items-center">
          <div className='hidden md:flex'>
            {RouterList.map((item) => (
              <Link key={item.path} href={item.path} className={classNames(pathname === item.path ? "text-text-normal font-semibold" : "text-text-shallow", "transition-colors px-4 py-2 hover:text-text-normal hover:font-semibold")}>
                {item.name}
              </Link>))}
          </div>
          <ToggleTheme />
          <IconButton name="github" onClick={() => window.open('https://github.com/ChineseDavid/blog')} />
          <IconButton name="houtai" onClick={() => router.push('/admin')} />
        </nav>

      </div>

      {/* 移动设备菜单 */}
      {isMobileMenuOpen && <Slidebar routerList={RouterList} onClose={() => setIsMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;