import { Developer } from '@/constants'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from './iconButton'

interface SlidebarProps {
  className?: string;
  routerList: { path: string, name: string }[];
  onClose?: () => void;
}

export default function Slidebar({ routerList, onClose }: SlidebarProps) {
  const pathname = usePathname();
  const [startAnimation, setStartAnimation] = useState<boolean>(true);
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const closeHandle = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      onClose?.();
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(false);
    }, 300)

    const clickHandle = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        closeHandle();
      }
    }
    document.addEventListener('click', clickHandle);
    return () => {
      setCloseAnimation(false);
      document.removeEventListener('click', clickHandle);
    }
  }, [])

  return (
    <div
      className={classNames('block md:hidden fixed top-0 left-0 w-screen h-screen bg-zinc-950/90 z-[100]', {
        'animate-show': startAnimation,
        'animate-hide': closeAnimation,
      })}
    >
      <div
        className={classNames("absolute top-0 bottom-0 left-0 bg-bg-normal p-3", {
          'animate-slideFromRight': startAnimation,
          'animate-slideToRight': closeAnimation,
        })}
        ref={contentRef}
      >
        <div className="relative text-center">
          <div className="text-xl font-bold py-1">{Developer.name}</div>
          <div className="text-sm text-text-shallow pt-2 pb-6">{Developer.desc}</div>
          <IconButton name="close" className="absolute right-0 top-0" size="sm" onClick={closeHandle} />
        </div>
        <nav className="space-y-2 py-4">
          {routerList.map((item) => (
            <Link key={item.path} href={item.path} onClick={closeHandle} className={
              classNames(
                pathname === item.path ? "bg-text-normal text-bg-normal" : "bg-bg-normal text-text-normal",
                "block w-72 rounded-xl transition-colors px-4 py-3 hover:text-text-normal"
              )}>
              {item.name}
            </Link>))}
        </nav>
      </div>
    </div>
  )
}
