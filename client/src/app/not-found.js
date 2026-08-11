"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-10 text-center">

        <div className="flex flex-col items-center gap-2 mb-6">
          <Image 
            src="/navicon.png" 
            alt="Lume icon" 
            width={40} 
            height={40} 
            priority 
            className="w-auto h-auto"
          />
          <h1 className="text-6xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold text-zinc-800">Page Not Found</h2>
          <p className="text-sm text-purple-500">
            The moment you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <Link 
          href="/"
          className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150 font-medium"
        >
          Back to Home
        </Link>

      </div>
    </div>
  )
}

export default NotFound