"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images, UsersRound, Zap, UserShield, StarPlus } from 'lucide-react'
import { useAuth } from "./context/authcontext.jsx";
import { CgProfile } from "react-icons/cg";

export default function Home() {
  const { users ,isloggedin} = useAuth();
  const cards = [
    {
      icon: <Images />,
      title: "Share Your Momments",
      desc: "Post your photos with caption and express yourself"
    },
    {
      icon: <UsersRound />,
      title: "Connect and Discover",
      desc: "Follow friend and discover amazing creators"
    },
    {
      icon: <Zap />,
      title: "Inspire Other",
      desc: "Your Story can isnpire someone today"
    },
    {
      icon: <UserShield />,
      title: "Private and Secure",
      desc: "Your data is Safe with us we respect your privacy"
    }
  ]
  return (

    <>
      <div className="main flex flex-col md:flex-row">
        <div className="right w-full md:w-1/2 p-5 md:p-10">
          <div className="flex items-center gap-2 m-2">
            <Image src="/navicon.png" alt='icon' width={40} height={40} priority className='w-auto h-auto' />
            <h2 className="text-purple-600 text-sm md:text-base">Share moments, Connect World</h2>
          </div>
          <div className="flex flex-col gap-1 m-3">
            <h1 className="text-3xl md:text-4xl font-bold">Share Life </h1>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-purple-600">Inspire</span> Other
            </h1>
            <p className="text-wrap mt-3 mb-3 text-purple-500 text-sm md:text-base">
              Lume is a Platform to share your Photos, express yourself and connect with people around the world
            </p>
          </div>
          <div className="m-5 flex flex-wrap gap-2">
            {!isloggedin ? (
              <Link href="/login" className="flex items-center gap-2 whitespace-nowrap text-sm md:text-base bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150">
                <span>Get Started</span> <ArrowRight size={18} />
              </Link>
            ) : (
              <Link href="/create" className="flex items-center gap-2 whitespace-nowrap text-sm md:text-base bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-blue-800 active:bg-blue-900 active:scale-95 transition-all duration-150">
                <span>Share Moments</span> <ArrowRight size={18} />
              </Link>
            )}
            <Link href="/explore" className="flex item-center gap-1 whitespace-nowrap text-sm md:text-base bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-md shadow-md border border-gray-200 active:scale-95 transition-all duration-150" >
              <span>Explore Feed </span><ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative h-75 md:h-auto">
          <Image src="/homeimage2.png" alt="home image" fill className="object-cover" />
        </div>
      </div>
      <h2 className="text-center font-bold text-2xl pb-1 border-b-2 border-zinc-200">Why Loom ?</h2>

      <div className="bottom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 gap-4 w-full">
        {cards.map((card) => {
          return (
            <div className="card px-4 py-4 md:px-4 md:py-6 bg-white flex gap-4 items-start" key={card.title} >
              <div className="shrink-0 bg-zinc-200 shadow-md border rounded-md border-gray-400 p-2"> {card.icon} </div>
              <div>
                <h2 className="text-left text-zinc-700 font-semibold">{card.title}</h2>
                <p className="text-wrap mt-2 mb-2 text-purple-500 text-sm md:text-base"> {card.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 m-5 bg-white rounded-lg shadow-md border border-gray-200">
        {isloggedin ? (
          <div className="flex flex-col gap-2 md:gap-4">
            <div ><StarPlus /> </div>
            <h1 className="text-xs md:text-xl font-bold">  Welcome Back! {users.username} Ready To Share Something New?</h1>
            <p className="text-sm md:text-base text-zinc-600"> Explore fresh moments from your community or upload your own</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:gap-4">
            <div ><StarPlus /> </div>
            <h1 className="text-xs md:text-xl font-bold">Ready To Share Your Moments</h1>
            <p className="text-sm md:text-base text-zinc-600">Join Lume today and be part of our community</p>
          </div>
        )}
        <div className='flex gap-4 items-center w-full md:w-auto'>
          {isloggedin ? (
            <Link href="/profile" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150 flex gap-1 items-center' ><CgProfile />Profile</Link>
          ) : (
            <>
              <Link href="/login" className='bg-white p-2 rounded-md shadow-md border border-gray-200 text-black  active:scale-95 transition-all duration-150'>Login</Link>
              <Link href="/signin" className='bg-blue-600 p-2 rounded-md text-white  active:scale-95 transition-all duration-150'>SignUp</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
