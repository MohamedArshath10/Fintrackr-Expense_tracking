import React, { useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import {useNavigate} from 'react-router-dom'
import Input from '../../Components/Inputs/Input'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // handle Login Form
  const handleLogin = async (e) => {

  }
  return (
    <AuthLayout>
      <div className='lg:w[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-950 mt-[5px] mb-6'> Please enter your details to login</p>

        <form onSubmit={handleLogin}>
          <Input 
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label = "Email Address"
            placeholder = "arshath@gmail.com"
            type = "text"
          />
          <Input 
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
            label = "Password"
            placeholder = ""
            type = "password"
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login