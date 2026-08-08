"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/authcontext.jsx"
import Image from "next/image"

const Page = () => {
    const { user, loading, accesstoken } = useAuth()
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)

     

    // useEffect(() => {
    //     if (!loading && !user) {
    //         router.push("/login")
    //     }
    // }, [loading, user, router])

    // if (loading) {
    //     return <p className='text-center py-10'>Loading...</p>
    // }

    // if (!user) {
    //     return null
    // }
  return (
    <>
      <div className='max-w-4xl mx-auto px-4 py-10'>
            
            <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 flex items-center'>
                <Image src= "/navicon.png" alt='profile picture' width={40} height={40} priority className='rounded-full object-cover w-auto h-auto' />
                <h1 className='text-2xl font-bold mt-4'>@{user.username}</h1>
            </div>
            <div className='mt-8'>
                {postsLoading ? (
                    <p className='text-center text-zinc-500'>Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p className='text-center text-zinc-500'>Nothng Post Yet</p>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        Show Post
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Page
