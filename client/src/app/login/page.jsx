"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '../context/authcontext.jsx'
import { notFound, useRouter } from 'next/navigation'
import { useUI } from '../context/Uicontext.js'

const Page = () => {
  const router=useRouter()
  const {showToast}=useUI()
  const { accesstoken,users,setAccesstoken, setusers}=useAuth()
const [form, setform] = useState({
  email:"",
  password:""
})
const handleChange=(e)=>{
  setform({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(form),
      credentials:"include",
    })
    const data=await res.json()
    if(data.success){
      showToast("login successfull")
      setusers(data.data)
      setAccesstoken(data.accesstoken)
      router.push("/profile")
    }
  } catch (error) {
    
  }
}
if(users ||accesstoken){
  return notFound()
}
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
        
        <div className="flex flex-col items-center gap-2 mb-6">
          <Image  src="/navicon.png" alt="Lume icon" width={40}  height={40}  priority  className="w-auto h-auto"/>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-purple-500 text-center">
            Login to continue sharing your moments with Lume
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-zinc-700 font-medium">Email</label>
            <input  name="email" id="email" type="email" value={form.email}  placeholder="you@example.com" className="px-4 py-2 rounded-md border border-gray-200 text-sm outline-none " onChange={handleChange}/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-zinc-700 font-medium">Password</label>
            <input name="password" id="password" type="password" value={form.password} placeholder="••••••••" className="px-4 py-2 rounded-md border border-gray-200 text-sm outline-none  " onChange={handleChange}/>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150 font-medium"> Login</button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-zinc-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
        <p className="text-sm text-center text-zinc-600">
          Don&apos;t have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-medium hover:underline"> Sign up </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Page
