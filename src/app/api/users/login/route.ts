import {connect} from "@/dBconfig/dbconfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
// import { error } from "console";
import jwt from "jsonwebtoken"


connect();


export async function POST(request:NextRequest)
{
    try {
        

        const reqBody= await request.json()
        const {email,password} =reqBody;

        const user= await User.findOne({email});    
        if(!user)
        {
            return NextResponse.json({error:"User does not exist"},{status:400});
        }
        const validPassword=await bcryptjs.compare(password,user.password);
        if(!validPassword)
        {
            return NextResponse.json({error:"INVALID PASSWORD"},{status:400})
        }

        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email
          };
          
          // Signing the token with a secret key
          const token = jwt.sign(tokenData,process.env.JWT_SECRET_TOKEN!,{expiresIn: "1d" });

          const response=NextResponse.json({
            message:"login Successful",
            success:true
          })

          response.cookies.set("tokens",token,{httpOnly:true})

          return response;
          

    
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}