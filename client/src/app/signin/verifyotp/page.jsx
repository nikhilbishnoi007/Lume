"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const Page = () => {
  const [otp, setOtp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Entered OTP:', otp)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">

        <div className="flex flex-col items-center gap-2 mb-6">
          <Image  src="/navicon.png"  alt="Lume icon"  width={40}  height={40}  priority  className="w-auto h-auto"/>
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-sm text-purple-500 text-center">
            We&apos;ve sent a code to your email. Enter it below to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="text-sm text-zinc-700 font-medium">Enter OTP</label>
            <input  id="otp" type="text" inputMode="numeric"placeholder="Enter your OTP" value={otp}onChange={(e) => setOtp(e.target.value)}className="px-4 py-2 rounded-md border border-gray-200 text-sm outline-none focus:border-blue-600 transition-colors"/>
          </div>

          <button  type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150 font-medium" >
            Verify
          </button>
        </form>

      </div>
    </div>
  )
}

export default Page