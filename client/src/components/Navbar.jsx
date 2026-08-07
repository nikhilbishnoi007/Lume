"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const path = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const linkClass = (href) =>
        path === href
            ? 'pb-1 border-b-2 border-blue-600 text-blue-800 transition-all duration-300'
            : 'pb-1 border-b-2 border-transparent'

    return (
        <div className='border-b-2 border-zinc-300 w-full px-4 py-2'>
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
                    <Link href="/login" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150'>Login</Link>
                    <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white  active:scale-95 transition-all duration-150'>SignIn</Link>
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
                        <Link href="/login" className='bg-zinc-200 p-2 rounded-md text-black flex-1 text-center'>Login</Link>
                        <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white flex-1 text-center'>SignIn</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar