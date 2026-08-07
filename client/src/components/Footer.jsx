import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-zinc-200 px-4 py-8 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-xs">
          <div className="flex items-center gap-2">
            <Image   src="/navicon.png" alt="Lume icon" priority width={32} height={32} className="w-auto h-auto"/>
            <span className="text-xl font-bold">Lume</span>
          </div>
          <p className="text-sm text-purple-500">
            Share your moments, express yourself and connect with people around the world.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-zinc-700">Product</h3>
            <Link href="/" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/explore" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/create" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Create</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-zinc-700">Account</h3>
            <Link href="/login" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/signin" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Sign Up</Link>
          </div>

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-zinc-700">Legal</h3>
            <Link href="/privacy" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-zinc-200 text-center">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Lume. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer