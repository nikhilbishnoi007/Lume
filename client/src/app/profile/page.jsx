"use client"
import { useState, useRef } from "react"
import { notFound, useRouter } from "next/navigation"
import { useAuth } from "../context/authcontext.jsx"
import Image from "next/image"
import { IoIosLogOut } from "react-icons/io";
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useUI } from "../context/Uicontext.js"

const Page = () => {
    const { users, accesstoken, setusers, setAccesstoken ,isloggedin} = useAuth()
    const router = useRouter()
    const { showToast ,showConfirm} = useUI();
    const [open, setopen] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [preview, setPreview] = useState(null)
    const fileInputRef = useRef(null)
     const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleChooseClick = () => {
        setShowMenu(false)
        setShowForm(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const file = fileInputRef.current.files[0]
            if (!file) {
                showToast("please select an image")
                return
            }
            const formData = new FormData()
            formData.append("dp", file)

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/setdp`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                },
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                setusers(data.data)
                showToast("dp updated successfully")
                setShowForm(false)
            } else {
                showToast(data.message)
            }
        } catch (error) {
            showToast(error.message)
        }
    }

  

    const handleClick = async () => {
        const result = await showConfirm("do you want to logout")
        if (!result) {
            return
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                setusers([])
                setAccesstoken(null)
                router.push("/login")
            } else {
                showToast(data.message)
            }
        } catch (error) {
           showToast(error.message)
        }
    }
    const handelState = () => {
        setopen(!open)
    }
 

    return (
        <>
            <div className="flex p-4 justify-end">
                <button onClick={handleClick} className="bg-red-600 p-2  rounded-md text-white flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150">Logout <IoIosLogOut /></button>
            </div>
            <div className='max-w-4xl mx-auto px-4 py-10'>
                <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 flex items-center justify-around'>
                    <div className="flex items-center md:gap-5 relative">
                        <h1 className='text-2xl font-bold mt-4'>@{users.username}</h1>
                    </div>
                    <div>
                        <h2>{users.post?.length}</h2>
                        <h2 className="font-bold">Post</h2>
                    </div>
                </div>
                <div className='mt-8'>
                    {users.post?.length === 0 ? (
                        <p className='text-center text-zinc-500'>Nothing Posted Yet</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {users.post?.map((post) => (
                                <div key={post._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                                    <div className="flex items-center gap-2 p-3 justify-between">
                                        <h1 className="text-sm font-medium text-zinc-700">@{users.username}</h1>
                                        <button onClick={handelState} className=" cursor-pointer  active:scale-95 transition-all duration-150 flex gap-1 items-center">
                                            <MoreVertical size={18} className="text-zinc-500" />
                                        </button>
                                    </div>
                                    
                                    <div className="relative w-full h-64 bg-zinc-100">
                                        {open && (
                                        <div className="absolute right-0 top-0 bg-white border border-gray-200 rounded-lg shadow-md w-32 z-10">
                                            <button onClick={() => { setopen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-zinc-50">
                                                <Trash2 size={14} />Delete
                                            </button>
                                        </div>
                                    )}
                                        <Image src={post.image} alt="post image" fill className="object-cover" onClick={()=>{setopen(false)}} />
                                    </div>
                                    <div className="p-3 flex flex-col gap-2">
                                        <p className="text-sm text-purple-500">{post.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page