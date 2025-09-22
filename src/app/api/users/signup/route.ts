import { connectDB } from "@/db/db";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB()

export async function POST(request:NextRequest) {

    try {
     const reqBody=   request.json()
     const {username,email,password} = reqBody
     console.log(reqBody);

     const existedUser = await User.findOne({email})
     if(existedUser){
        return NextResponse.json({error:"User already exists"},{status:400})

     }
     const hashedPassword = await  bcrypt.hash(password,10)

     if(!hashedPassword)
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}