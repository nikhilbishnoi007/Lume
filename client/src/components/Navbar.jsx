"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Navbar = () => {
    const path=usePathname()
    return (
        <>
            <div className='flex justify-between  border-b-2 border-zinc-300 w-full px-4 py-2'>
                <div className='flex items-center'>
                    <Image src="/navicon.png" alt='icon' width={40} height={40} priority className='w-auto h-auto '></Image>
                    <h1 className='text-xl '>
                       Lume
                    </h1>
                </div>
               <ul className='flex items-center gap-2 md:gap-5'>
                <li className={path==="/"?'pb-1 border-b-2 border-blue-600 text-blue-800 transition-all duration-300 ':''}><Link href="/">Home</Link></li>
                <li className={path==="/explore"?'pb-1 border-b-2 border-blue-600 text-blue-800 transition-all duration-300 ':''}><Link href="/explore">Explore</Link></li>
                <li className={path==="/create"?'pb-1 border-b-2 border-blue-600 text-blue-800 transition-all duration-300 ':''}><Link href="/create">Create</Link></li>
               </ul>
               <div className='flex gap-4 items-center'>
                <Link href="/"className='bg-zinc-200 p-2  rounded-md text-black'>Login</Link>
                <Link href="/" className='bg-blue-600 p-2  rounded-md text-white'>SignIn</Link>
               </div>
            </div>
        </>
    )
}

export default Navbar
