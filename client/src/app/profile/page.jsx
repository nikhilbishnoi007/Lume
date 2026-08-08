"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/authcontext.jsx"
import Image from "next/image"

const Page = () => {
    const { user,  accesstoken, setuser, setAccesstoken } = useAuth()
    const router = useRouter()
    const [posts, setposts] = useState([])
    const [PostsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    const getposts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/getuserpost`, {
                method: "GET",
                headers: { Authorization: "Bearer " + accesstoken },
                credentials: "include"
            })
            const datares = await response.json()
            if (datares.success) {
                setposts(datares.post)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setPostsLoading(false)
        }
    }
  getposts()
  }, [accesstoken])

    const handleClick = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                setuser([])
                setAccesstoken(null)
                router.push("/login")
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
            <button onClick={handleClick}>Logout</button>
            <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 flex items-center'>
                <Image src="/navicon.png" alt='profile picture' width={40} height={40} priority className='rounded-full object-cover w-auto h-auto' />
                <h1 className='text-2xl font-bold mt-4'>@{user.username}</h1>
            </div>
            <div className='mt-8'>
                { posts.length ===0 ? (
                    <p className='text-center text-zinc-500'>Nothing Posted Yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                                <div className="flex items-center gap-2 p-3">
                                    <span className="text-sm font-medium text-zinc-700">@{user.username}</span>
                                </div>
                                <div className="relative w-full h-64 bg-zinc-100">
                                    <Image src={post.image} alt="post image" fill className="object-cover" />
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
    )
}

export default Page