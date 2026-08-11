"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/app/context/authcontext.jsx'
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router=useRouter()
    const { users,isloggedin } = useAuth()
    const path = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const linkClass = (href) => {
      return  path === href
            ? 'pb-1 border-b-2 border-blue-600 text-blue-800 transition-all duration-300'
            : 'pb-1 border-b-2 border-transparent text-black'
    }


    return (
        <div className='border-b-2 border-zinc-300 w-full px-4 py-2 bg-white '>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <Image src="/navicon.png" alt='icon' width={40} height={40} priority className='w-auto h-auto'></Image>
                    <h1 className='text-xl'>Lume</h1>
                </div>


                <ul className='hidden md:flex items-center gap-5'>
                    <li className={linkClass("/")}><Link href="/">Home</Link></li>
                    <li className={linkClass("/explore")}><Link href="/explore">Explore</Link></li>
                    <li className={linkClass("/create")}><Link href="/create">Create</Link></li>
                </ul>


                <div className='hidden md:flex gap-4 items-center'>
<<<<<<< HEAD
                    {isloggedin ? (
=======
                    {users ? (
>>>>>>> 9839a2d10126e3df0f425ca24f9400c9b85664ab
                         <Link href="/profile" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150 flex items-center gap-1'>Profile <CgProfile/></Link>
                        
                    ) : (
                        <>
                            <Link href="/login" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150'>Login</Link>
                            <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white  active:scale-95 transition-all duration-150'>SignUp</Link>
                        </>
                    )}
                </div>


                <button
                    className='md:hidden'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label='Toggle menu'
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>


            {isOpen && (
                <div className='md:hidden flex flex-col gap-4 mt-4 pb-2'>
                    <ul className='flex flex-col gap-3'>
                        <li className={linkClass("/")} onClick={() => setIsOpen(false)}><Link href="/">Home</Link></li>
                        <li className={linkClass("/explore")} onClick={() => setIsOpen(false)}><Link href="/explore">Explore</Link></li>
                        <li className={linkClass("/create")} onClick={() => setIsOpen(false)}><Link href="/create">Create</Link></li>
                    </ul>
                    <div className='flex gap-4'>
                        {isloggedin ? (
                           <Link href="/profile" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150 flex gap-1 items-center' ><CgProfile />Profile</Link>
                        ) : (
                            <>
                                <Link href="/login" className='bg-zinc-200 p-2 rounded-md text-black flex-1 text-center active:scale-95 transition-all duration-150'>Login</Link>
                                <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white flex-1 text-center active:scale-95 transition-all duration-150'>SignUp</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar