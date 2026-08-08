"use client"
import React from 'react'
import { useState ,useEffect} from 'react'
import Image from 'next/image'
import { useAuth } from '../context/authcontext.jsx'
import { useRouter } from 'next/navigation'
import Link from 'next/link.js'

const Page =() => {
    const router=useRouter()
    const {user,loading,accesstoken}=useAuth()
    const [image, setimage] = useState(null)
    const [caption, setcaption] = useState("")
    const[preview,setpreview]=useState(false)
    console.log(accesstoken)
    const handleImageChange=(e)=>{
         const file=e.target.files[0]
         if(file){
            setimage(file)
            setpreview(URL.createObjectURL(file));
         }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("image",image)
        formdata.append("caption",caption)
        try {
            const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rest/create-post`,{
                method:"POST",
                headers:{Authorization: "Bearer " + accesstoken},
                body:formdata,
                credentials: "include",
            })
            const data=await res.json()
            if(data.success){
                alert(data.message)
            }
            else{
              alert(data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
   
    if(!user) return(
      <>
       <p className="text-center mt-10">Login/SignIn to create post</p>
       <div className='flex gap-4 m-5  md:max-w-xl md:mx-auto'>
         <Link href="/login" className='bg-zinc-200 p-2 rounded-md text-black flex-1 text-center'>Login</Link>
          <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white flex-1 text-center'>SignIn</Link>
        </div>
       </>
      )
  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-zinc-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Image src="/navicon.png" alt="Lume icon" width={40} height={40}  priority  className="w-auto h-auto"/>
          <h1 className="text-2xl font-bold">Share a Moment</h1>
          <p className="text-sm text-purple-500 text-center">
            Upload a photo and let the world see it
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-700 font-medium">Photo</label>
            <label  htmlFor="image" className="relative flex items-center justify-center h-56 rounded-md border-2 border-dashed border-gray-300 bg-zinc-50 cursor-pointer overflow-hidden ">
              {preview ? (
                <Image  src={preview}  alt="preview"  fill className="object-cover"/>
              ) : (
                <span className="text-sm text-zinc-400">Click to upload an image</span>
              )}
            </label>
            <input  id="image" type="file"  accept="image/*" onChange={handleImageChange}  className="hidden" required/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="caption" className="text-sm text-zinc-700 font-medium">Caption</label>
            <textarea  id="caption" rows={3} placeholder="Write a caption for your moment..." required className="px-4 py-2 rounded-md border border-gray-200 text-sm outline-none resize-none" onChange={(e)=>{setcaption(e.target.value)}}/>
          </div>
          <button type="submit"className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150 font-medium mt-2" >
            Post Moment
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Page
