import React, {useContext, useState} from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector'
import { API_PATHS } from '../../Utils/apiPaths'
import axiosInstance from '../../Utils/axiosInstance'
import { UserContext } from '../../Context/useContext'
import uploadImage from '../../Utils/uploadImage'

const SignUp = () => {
  const[profilePic, setProfilePic] = useState(null)
  const[fullName, setFullName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  // Handle Sign up
  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if(!fullName){
      setError("Please enter your name")
      return
    }

    if(!validateEmail){
      setError("Please enter a valid Email")
      return
    }

    if(!password){
      setError("Enter a valid Password")
      return
    }

    setError("");

    // Sign Up api call
    try{

      // Upload profile image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password
      })

      const {token, user} = response.data

      if(token){
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }
      else{
        setError("Something went wrong")
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full name"
              placeholder="John"
              type={Text}
            />

          <Input 
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label = "Email Address"
            placeholder = "johndoe@gmail.com"
            type = "text"
          />

          <div className='col-span-2'>
            <Input 
              value = {password}
              onChange = {({target}) => setPassword(target.value)}
              label = "Password"
              placeholder = "Min 8 characters"
              type = "password"
            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary'>Sign up</button>

            <p className='text-[13px] text-slate-800 nt-3'>Already have an account? {" "} <Link className= "font-medium text-primary underline" 
            to="/login">Login</Link></p>
          </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp