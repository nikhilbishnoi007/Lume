"use client"
import { useContext ,createContext,useState,useEffect,useCallback } from "react"

const AuthContext=createContext()

export function AuthProvider({children}){
    const [accesstoken, setAccesstoken] = useState(null)
    const [user,setuser]=useState([])
    const [loading, setLoading] = useState(true) 
    useEffect(() => {
      const newrefreshtoken=async()=>{
        try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`,{
            method:"GET",
            credentials:"include"
        })
        const data=await res.json()
        if(data.success){
            console.log(data.message)
            setAccesstoken(data.accesstoken)
        }
        else{
            console.log(data.message)
        }
    }catch(error){
        console.log(error.message)
    }finally{
        setLoading(false)
    }
      }
      newrefreshtoken()
    }, [])
    const getuser = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/getuser`, {
        credentials: "include",
      });
      const resdata = await response.json();
      if(resdata.success){
        setuser(resdata.data)
      }
    } catch (error) {
      console.log(error.message)
    }

  }, [])
   useEffect(() => {
    
    getuser();
    
  }, [getuser]);
    
    return(
        <AuthContext.Provider value={{ accesstoken, setAccesstoken, user, setuser,getuser,loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}