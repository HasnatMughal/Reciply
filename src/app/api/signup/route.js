import User from "@/models/User";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {name,email,password} = await request.json()

    await connectDB()

    const existingUser = await User.findOne({ email })
    if(existingUser) return NextResponse.json({error:"User already exists"}, {status:400})

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = User.create({name, email, password:hashedPassword})

    return NextResponse.json({message:"User created successfully"}, {status: 201})
}