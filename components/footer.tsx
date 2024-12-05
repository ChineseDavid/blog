import React from 'react';
import { Developer } from '@/constants';
import { RouterList } from '@/constants';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isActivePage = RouterList.some((item) => {
    return item.path === pathname;
  });
  if(!isActivePage) return null;
  
  return (
    <footer className="text-center py-4">
      <a target='_blank' href="https://beian.miit.gov.cn/" className="block md:inline text-text-shallow hover:text-text-normal hover:cursor-pointer">豫ICP备2024096627号</a>
      <span className='block md:inline pl-5 text-text-shallow'>@ 2024 · {Developer.name} 努力做一个更好的程序员</span>
    </footer>
  )
}
