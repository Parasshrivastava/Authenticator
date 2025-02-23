import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

         connection.on('connected',()=>{
            console.log("MONGODB is successfully connected");
            
         })

         connection.on('error',(err)=>{
            console.log("MONGODB is not connected please makesure MONGO DB is running"+err);
            process.exit();
            
         })
        
    } catch (error) {
        console.log('Something Goes Wrong');
        console.log(error);
        

        
    }
}