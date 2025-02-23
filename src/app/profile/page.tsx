
"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

export default function ProfilePage(){


    const router=useRouter()
    const [data,setData]=useState("");
    const [userID,setUserID]=useState("")
    const logout=async ()=>{
        try {
            
            await axios.get('/api/users/logout')
            toast.success('Logout Successful')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
            
            
        }
    }

    const getUserDetails=async ()=>{
        const res=await axios.get("/api/users/me");
        console.log(res.data);
        setUserID(res.data.data._id)
        setData(res.data.data.username);
        // console.log(data);
        

        
        
    }

    useEffect(()=>{
        getUserDetails();
        
        
    },[])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white ">

            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>

            <h1 className=" bg-orange-500 mt-8 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded ">
                <Link href={`/profile/${userID}`}>{data}</Link>
            </h1>

            {/* <button
            onClick={getUserDetails}
            className=" bg-green-500 mt-8 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ">GetData</button> */}
            <button
            onClick={logout}
            className=" bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">LogOut</button>
        </div>
    )
}