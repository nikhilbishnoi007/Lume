import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react'
export default function Home() {
  return (
    <>
      <div className="main flex flex-col md:flex-row">
        <div className="right w-full md:w-1/2 p-5 md:p-10">
          <div className="flex items-center gap-2 m-2">
            <Image src="/navicon.png" alt='icon' width={40} height={40} priority className='w-auto h-auto' />
            <h2 className="text-purple-600 text-sm md:text-base">Share moments, Connect World</h2>
          </div>
          <div className="flex flex-col gap-1 m-3">
            <h1 className="text-3xl md:text-4xl font-bold">Share Life</h1>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-purple-600">Inspire</span> Other
            </h1>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">
              Lume is a Platform to share your Photos, express yourself and connect with people around the world
            </p>
          </div>
          <div className="m-5 flex gap-2">
            <Link href="/login" className="flex  items-center  gap-1 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150">Get Started<ArrowRight /></Link>
            <Link href="/explore" className="bg-white text-black px-6 py-3 rounded-md shadow-md border border-gray-200 active:scale-95 transition-all duration-150">Explore Feed</Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative h-75 md:h-auto">
          <Image
            src="/homeimage2.png"
            alt="home image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="bttom grid grid-cols-4 p-4 bg-green-500 w-full">
         <div className="card  bg-white flex gap-5">
          <div className=" my-auto" ><ArrowRight /> </div>
          <div>
            <h2 className="text-center">Share Your Moments</h2>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">post your photo with caption <br/> and express yourself</p>
          </div>
         </div>
         <div className="card bg-white  flex gap-5">
          <div className=" my-auto" ><ArrowRight /> </div>
          <div>
            <h2 className="text-center">Share Your Moments</h2>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">post your photo with caption <br/> and express yourself</p>
          </div>
         </div>
         <div className="card bg-white flex gap-5">
          <div className="my-auto" ><ArrowRight /> </div>
          <div>
            <h2 className="text-center">Share Your Moments</h2>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">post your photo with caption <br/> and express yourself</p>
          </div>
         </div>
         <div className="card bg-white  flex gap-5">
          <div className="my-auto" ><ArrowRight /> </div>
          <div>
            <h2 className="text-center">Share Your Moments</h2>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">post your photo with caption <br/> and express yourself</p>
          </div>
         </div>
        
      </div>
    </>
  );
}
