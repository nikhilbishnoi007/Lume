"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import Image from "next/image";

const Page = () => {
    const [posts, setposts] = useState([])
    useEffect(() => {
        const getPosts=async()=>{
         const res=await fetch(`${process.env.BACKEND_ROUTE}/api/rest/get-post`)
         const data= await res.json()
         if(data.success){
            setposts(data.data)
         }
        }
     getPosts()
    }, [])
    
  return (
    <>
      <div className="flex flex-col gap-6 mx-auto max-w-md w-full py-8 px-4">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Feed
      </h2>
      { posts.length === 0 && (
        <p className="text-center text-gray-400 text-sm"> No posts yet. Be the first to share something.</p>
      )}

      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden" >  
          <div className="relative w-full h-80 bg-gray-100">
            <Image src={post.image} alt={post.caption || "post"}   fill className="object-cover"/>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
      
    </>
  )
}

export default Page
