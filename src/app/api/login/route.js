import connectDB from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/User";

export async function POST(request){
    const {email,password} = await request.json()

    await connectDB()

    const user = await User.findOne({email})
    if(!user) return NextResponse.json({error: "User not found"},{status:404})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return NextResponse.json({error: "Wrong password"}, {status:401})

    const token = jwt.sign({id:user._id, name:user.name}, process.env.JWT_SECRET, {expiresIn: "30d"})
    const response =  NextResponse.json({message:"Login success"})

    response.cookies.set("token", token, {httpOnly: true})

    return response

}

