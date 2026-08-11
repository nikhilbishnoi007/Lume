"use client"
import { useContext, createContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [accesstoken, setAccesstoken] = useState(null)
    const [users, setusers] = useState([])
    const [isloggedin, setisloggedin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const newrefreshtoken = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    console.log(data.message)
                    setAccesstoken(data.accesstoken)
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        newrefreshtoken()
    }, [])

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const responses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkauth`, {
                    method: "GET",
                    credentials: "include"
                })
                const responsedata = await responses.json()
                if (responsedata.success) {
                    setisloggedin(true)
                } else {
                    setisloggedin(false)
                }
            } catch (error) {
                console.log(error.message)
                setisloggedin(false)
            }
        }
        checkAuth()
    }, [])

    const getuser = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/getuser`, {
                credentials: "include",
            })
            const resdata = await response.json()
            if (resdata.success) {
                setusers(resdata.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    useEffect(() => {
        getuser()
    }, [getuser])

    return (
        <AuthContext.Provider value={{ accesstoken, setAccesstoken, users, setusers, getuser, loading, isloggedin, setisloggedin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}