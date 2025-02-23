
import User from "@/models/userModel"
import {connect} from "@/dBconfig/dbconfig"
import { NextRequest } from "next/server";
// import { useEffect, useState } from "react";


connect();

export default function UserProfile({params}:any,request:NextRequest){

    // const [data,setData]=useState("");
    // useEffect(()=>{
    // const user=User.findOne({_id:params})
    // // setData(user.username);

    // },[params])


    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white  ">

            <h1 className="mb-4">Profile</h1>
            <hr />
            <p className="text-4xl ">Profile 
                <span className="bg-orange-500 rounded p-2 ml-2">{params.id}</span>
            </p>
        
        </div>
    )
}