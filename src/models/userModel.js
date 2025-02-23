
import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide a Username"],
        unique:[true]
    },
    email:{
        type:String,
        required:[true,"Please Provide a email"],
        unique:[true]
    },
    password:{
        type:String,
        required:[true,"Please Provide a USername"],
        
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyTokenExpiry:Date,
    verifyToken:String

})

const User=mongoose.models.User||mongoose.model("User",userSchema)

export default User;