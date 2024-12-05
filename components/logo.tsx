import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <>
      <Image src="/dw-white.png" width={40} height={40} className="w-8 h-8 hidden dark:block" alt="杨大卫" priority />
      <Image src="/dw.png" width={40} height={40} className="w-8 h-8 dark:hidden" alt="杨大卫" priority />
    </>
  )
}
