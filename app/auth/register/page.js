import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

function RegisterPage() {
  return (
    <div className="h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 flex justify-center items-center">
        <RegisterForm/>
    </div>
  )
}

export default RegisterPage