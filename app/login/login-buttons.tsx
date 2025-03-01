"use client"
import { signIn, signInGitee } from '@/actions'
import Button from '@/components/button'
import React from 'react'

export default function LoginButtons({ callbackUrl }: { callbackUrl: string}) {
  return (
    <>
      <Button name="Github" onClick={()=>signIn(callbackUrl)} />
      <Button name="Gitee"  onClick={()=>signInGitee(callbackUrl)} />
    </>
  )
}
