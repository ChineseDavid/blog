import React from 'react'
import RegisterForm from './registerForm'

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
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
