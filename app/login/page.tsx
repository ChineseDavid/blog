import React from 'react'
import LoginForm from './loginForm';

export default function Login() {
  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-3 px-5">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-text-normal">登录</h1>
            <p className="text-text-shallower">登录以访问您的帐户</p>
          </div>
          <div className="m-3">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}
