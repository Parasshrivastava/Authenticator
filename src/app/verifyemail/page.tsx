"use client";

import axios from "axios";
import Link from "next/link";
import React ,{useEffect,useState} from "react";

export default function verifyEmailPage(){
    const [token ,setToken]=useState("")
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);


    const verifyUserEmail=async ()=>{
        try {
            console.log(token);
            await axios.post('/api/users/verifyEmail/',{token});
            
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
            
            
        }
    }

    useEffect(()=>{
        const urlToken=window.location.search.split("=")[1];

        console.log(urlToken);
        console.log(token);
        
        
        setToken(urlToken||"");
        },[])

    useEffect(()=>{
        if(token.length>0)
        {
            console.log(token);
            
            verifyUserEmail();
        }
    },[token])

    return (
        <div className="flex flex-col item-center justify-center min-h-screen py-2">
            <h1 className=" text-4xl">
                verifyemail
            </h1>
            <h2 className="p-2 bg-orange-800 text-black">{token ?`${token}`:"no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login"> Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-800 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )
}