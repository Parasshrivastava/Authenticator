
"use client";

import Link from "next/link"
import react, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios"; 
import React from "react";
import toast from "react-hot-toast"



export default  function loginPage(){


    const router=useRouter();
    const [user,setUser ] = React.useState({
        email:"",
        password:"",
        
    })

    const [buttonDisabled,setButtonDisabled]=React.useState(true);
    const [loading,setLoding]=React.useState(false)
    


    const onlogin=async ()=>{


        try {
            
            setLoding(true)
            const response=await axios.post("/api/users/login",user);
            console.log("LoginSuccessFull",response.data);
            toast.success("loginSuccessfull");
            router.push("/profile");
            


        } catch (error:any) {
            console.log("Login Failed:",error.message);
            toast.error(error.message);
            
        }
        finally{
            setLoding(false);
        }
    }

    useEffect(()=>{
        setButtonDisabled(!(user.email && user.password))
    },[user])


    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white ">
            <h1>{loading?"Loading....":"Login"}</h1>
            <hr />
            

            <label htmlFor="email">Email</label>
            <input 
             className=" py-2 border text-black border-gray-300 rounded-lg mt-4  mb-2 focus:outline-none focus:border-gray-600 "
                type="email"
                id="email"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="email"

            
            
            />
            <label htmlFor="password">Password</label>
            <input 
                 className=" py-2 border text-black border-gray-300 rounded-lg mt-4  mb-2 focus:outline-none focus:border-gray-600 "
                type="text"
                id="password"
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                placeholder="password"

            
            
            />

            <button 
            onClick={onlogin}
            disabled={buttonDisabled||loading}
            className={`py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 
                ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >Submit</button>
            <Link href="/signup"> Visit SignUP
             Page</Link>
        </div>
       
    )
}