import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import React from 'react'

export default function Register() {
  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-3 px-5">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-text-normal">注册</h1>
            <p className="text-text-shallower">注册账号以使用更多功能</p>
          </div>
          <div className="m-3">
            <form action="">
              <div className="mb-4">
                <Input label='昵称' name="userName" placeholder='请输入昵称' />
              </div>
              <div className="mb-4">
                <Input label='用户ID' name="useId" placeholder='请输入用户ID（唯一）' />
              </div>
              <div className="mb-4">
                <Input label='密码' name="password" type='password' placeholder='请输入密码' />
              </div>
              <div className="mb-4">
                <Input label='确认密码' name="r_password" type='password' placeholder='请再次输入密码' />
              </div>
              <div className="mb-4">
                <Button className='w-full text-center' name="注册 并 登录" size='lg'></Button>
              </div>
              <div className='mb-4 text-text-shallower'>
                注册登录即表示同意
                <Link className='hover:underline-offset-1 text-blue-600' href="/user-agreement">《用户协议》</Link>
                和
                <Link className='hover:underline-offset-1 text-blue-600' href="/privacy-policy">《隐私政策》</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
