"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

const Page =() => {
    const [image, setimage] = useState(null)
    const [caption, setcaption] = useState("")
    const[preview,setpreview]=useState(false)
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
            const res=await fetch(`${process.env.BACKEND_ROUTE}/api/rest/create-post`,{
                method:"POST",
                body:formdata,
                credentials: "include",
            })
            const data=await res.json()
            if(data.success){
                alert(data.message)
            }
            else{
              alert("somthig went wrong")
            }
        } catch (error) {
            alert(error.message)
        }
    }
  return (
    <>
    <div className='flex flex-col gap-6 mx-auto max-w-md w-full my-auto px-4'>
  <h2 className='text-center text-2xl font-semibold text-gray-800'>
    Create Post
  </h2>

  <form className='flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-200' onSubmit={handleSubmit}>
    
    {preview ? (
      <div className='relative w-full h-64 rounded-lg overflow-hidden border border-gray-200'>
        <Image src={preview} alt='preview' fill className='object-cover' />
      </div>
    ) : (
      <label htmlFor='image-upload' className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors text-gray-500'>
        <span className='text-sm'>Click to upload an image</span>
      </label>
    )}

    <input id='image-upload' type='file'  name='image'  accept='image/*'  onChange={handleImageChange} className='hidden' required />

   
    <textarea name='caption' id='caption' placeholder='Write a caption...' onChange={(e) => setcaption(e.target.value)} required rows={3} className='resize-none border border-gray-300 text-black rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    <input type='submit' value="Post" className='bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'/>
      
  
  </form>
</div>
    </>
  )
}

export default Page
