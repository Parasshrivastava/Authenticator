



import {connect} from "@/dBconfig/dbconfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";



connect();
export  async function POST(request:NextRequest)
{
    try {
        
        const reqBody= await request.json()
        const {username,email,password}=reqBody

        const user=await User.findOne({email})
        if(user)
        {
            return NextResponse.json({error:"User Already Exists"},{status:400})

        }

        const Salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,Salt)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })


        const saveUser=await newUser.save()
        console.log(saveUser);

        // Send Verification email

        await sendEmail({email,emailType:"VERIFY",userId:saveUser._id});

        return NextResponse.json({message:"User Successfully created",
            success:true,
            saveUser

        },{status:201})
        

    } catch (error:any) {
        console.log("&&&&&&&&&&&&&&&&&");
        
        return NextResponse.json(
        
        {
            
            
            error:error.message
        },
        {
            status:500
        }

    
    )
        
    }
}