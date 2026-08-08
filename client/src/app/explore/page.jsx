"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from "next/image";
import { Heart, MessageCircle, Send } from 'lucide-react'
import { useAuth } from '../context/authcontext.jsx';

const Page = () => {
  const [posts, setposts] = useState([])
  const {user}=useAuth()
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rest/get-post`)
      const data = await res.json()
      if (data.success) {
        setposts(data.data)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-zinc-50 px-4 py-6 md:px-10 md:py-10">
        <h1 className="text-center font-bold text-2xl pb-1 border-b-2 border-zinc-200 mb-6">
          Explore
        </h1>

        {posts.length === 0 ? (
          <h2 className="text-center text-zinc-400 mt-10">No posts yet</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 p-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-zinc-200">
                    <Image src={post.image} alt={post.user} fill className="object-cover" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700">{post.user?.username}</span>
                </div>
                <div className="relative w-full h-64 bg-zinc-100">
                  <Image src={post.image} alt={post.caption} fill className="object-cover" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-zinc-600 hover:text-red-500 active:scale-90 transition-all duration-150">
                      <Heart size={20} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                  </div>
                  <p className="text-sm text-purple-500">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  )
}

export default Page
