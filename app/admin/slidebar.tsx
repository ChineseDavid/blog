"use client";
import Logo from '@/components/logo';
import { AdminRouterList, Developer } from '@/constants';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import MobileSlidebar from '@/components/slidebar';

interface SlidebarProps {
  // 由于 pc 和 mobile slidebar初始状态不一致，根据statusId的变化来控制是否显示slidebar
  isOpen: boolean | undefined;
  isMobile?: boolean | undefined;
  setIsOpen?: (open: boolean) => void;
  onClose?: () => void;
}

export default function Slidebar({ isOpen, isMobile, onClose }: SlidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (isMobile) {
    return isOpen !== undefined && isOpen && <MobileSlidebar onClose={onClose} routerList={AdminRouterList} />;
  }
  return (
    <div className={classNames(`relative transition-all duration-300 hidden md:block`, isOpen === undefined || isOpen ? 'w-[192px]' : 'w-[0px]')}>
      <div className="p-3 w-48 absolute right-0">
        <div className="flex items-center justify-start p-3 hover:cursor-pointer hover:bg-text-shallowest rounded-lg mb-6" onClick={() => router.push('/')}>
          <Logo />
          <span className='ml-3 font-semibold'>{Developer.name}</span>
        </div>
        <div className='text-sm'>
          {AdminRouterList.filter(item=>!item.hide).map((item) => (
            <Link key={item.path} href={item.path} className={
              classNames(
                "block rounded-lg transition-colors my-1 px-4 py-2 hover:text-text-normal hover:bg-text-shallowest",
                {
                  "bg-text-shallowest": pathname === item.path
                }
              )}>
              {item.name}
            </Link>))}
        </div>
      </div>
    </div>
  )
}
