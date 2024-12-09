"use client";
import { login } from '@/actions'
import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'

const initState = {
  message: "",
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initState);
  return (
    <form action={formAction}>
      <div className="mb-4">
        <Input label='用户ID' name="userId" placeholder='请输入用户ID' />
      </div>
      <div className="mb-4">
        <Input label='密码' name="password" type='password' placeholder='请输入密码' />
      </div>
      <div className="mb-4">
        {state.message && <p className='text-red-500'>{state.message}</p>}
        <Button className='w-full text-center' type="submit" name="登录" size='lg'></Button>
      </div>
      <div className='mb-4 text-text-shallower text-center'>
        登录即表示同意
        <Link className='hover:underline-offset-1 text-blue-600' href="/user-agreement">《用户协议》</Link>
        和
        <Link className='hover:underline-offset-1 text-blue-600' href="/privacy-policy">《隐私政策》</Link>
      </div>
      <p className="text-sm text-center text-gray-400">
        还没有账号?
        <Link href="/register" className="text-blue-600 focus:outline-none focus:underline">立即注册</Link>
      </p>
    </form>
  )
}
