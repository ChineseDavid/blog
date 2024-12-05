'use client';
import { AdminRouterList } from '@/constants';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Directory() {
  const pathname = usePathname();
  const pageName = AdminRouterList.find(item=>item.path === pathname)?.name;
  return (
    <span className='border-l ml-3 px-3 border-text-shallower '>
      {pageName}
    </span>
  )
}
