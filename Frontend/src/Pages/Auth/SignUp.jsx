import React, {useState} from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'

const SignUp = () => {
  const[profilePic, setProfilePic] = useState(null)
  const[fullName, setFullName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[error, setError] = useState(null)

  const navigate = useNavigate()

  // Handle Sign up
  const handleSignUp = async (e) => {}

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp