'use client';
import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import React from 'react'

export default function Login() {

  const login = async ()=>{
    const r = await fetch('/api/login', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await r.json();
    window.location.href = '/';
    console.log('ydw',data);
  }
  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-3 px-5">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-text-normal">登录</h1>
            <p className="text-text-shallower">登录以访问您的帐户</p>
          </div>
          <div className="m-3">
            <form action="">
              <div className="mb-4">
                <Input label='用户ID' name="useId" placeholder='请输入用户ID' />
              </div>
              <div className="mb-4">
                <Input label='密码' name="password" type='password' placeholder='请输入密码' />
              </div>
              <div className="mb-4">
                <Button className='w-full text-center' name="登录" size='lg' onClick={login}></Button>
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
          </div>
        </div>
      </div>
    </section>
  )
}
