"use client"
import { useState, useRef } from "react"
<<<<<<< HEAD
import { notFound, useRouter } from "next/navigation"
=======
import { useRouter } from "next/navigation"
>>>>>>> 9839a2d10126e3df0f425ca24f9400c9b85664ab
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

<<<<<<< HEAD
  
=======
   
>>>>>>> 9839a2d10126e3df0f425ca24f9400c9b85664ab

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
<<<<<<< HEAD
=======
                        <button type="button" onClick={() => setShowMenu(!showMenu)} className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                        <Image src={users.dp || "/userdefaultimage.png"} alt='profile picture' fill loading="eager" className='rounded-full object-cover' />
                        </button>
                        {showMenu && (
                            <div className="absolute top-12 left-0 z-10 bg-white border border-gray-200 rounded-md shadow-md py-1 w-40">
                                <button type="button" onClick={handleChooseClick} className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" >Choose your DP</button>      
                            </div>
                        )}
                        {showForm && (
                            <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64">
                                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                            <Image src={preview || users.dp || '/userdefaultimage.png'} alt="preview" fill className="object-cover" />
                                        </div>
                                        <label htmlFor="image" className="text-sm text-blue-700 cursor-pointer hover:underline" > Select image </label>
                                        <input ref={fileInputRef} id="image" type="file" accept="image/*" onChange={handleImageChange}  className="hidden"/>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button  type="button"  onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 rounded-md"  > Cancel</button>
                                       
                                           
                                        
                                        <button type="submit" className="bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-800 active:scale-95 transition-all duration-150"> Submit</button>
                                    </div>
                                </form>
                            </div>
                        )}
>>>>>>> 9839a2d10126e3df0f425ca24f9400c9b85664ab
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