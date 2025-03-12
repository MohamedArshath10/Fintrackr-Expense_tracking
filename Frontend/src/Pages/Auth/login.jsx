import React, { useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)){
      setError('Please Enter a valid Email address')
      return
    }

    if(!password){
      setError('Please Enter a valid Password')
      return
    }

    setError("")

    // login Api call


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
            placeholder = "Min 8 characters"
            type = "password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-[13px] text-slate-800 nt-3'>Don't have an account? {" "} <Link className= "font-medium text-primary underline" 
          to="/signup">Signup</Link></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login