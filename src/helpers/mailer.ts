import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"
// import { Html } from "next/document";
// import { verify } from "crypto";

export const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10);
        // console.log(hashedToken);
        
        if(emailType==="VERIFY")
        {
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})

        } else if(emailType==="RESET")
        {
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})

        }  
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASS
            }
        });   


        const mailOptions={
            from:"Paras@gmail.com",
            to:email,
            subject:emailType=="VERIFY"?"Verify Your Email":"Reset Your Password",
            html:`<p> Click -> <a href="${process.env.domain}/verifyemail?token=${hashedToken}"> Click Here</a>
            to ${emailType==="Verify"?"verify Your Email":"Reset Your Password"}</p>`
        }

        const MailRsesponse=await transport.sendMail(mailOptions);
        console.log(MailRsesponse);
        
        return mailOptions;
        // return hashedToken

    } catch (error:any) {
        console.log("***************************");
        
         throw new Error(error.message);
        
    }
}
