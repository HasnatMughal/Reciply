import connectDB from "@/app/lib/mongodb";
import Recipe from "@/models/Recipe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request){
    const cookieStore = await cookies()
    const token =  cookieStore.get('token')
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    const authorID = decoded.id
    
    const {title, description, ingredients, instructions, cookTime, image, author, category} = await request.json()

    await connectDB()

   const recipe = await Recipe.create({title, description, ingredients, instructions, cookTime, image, author:authorID, category})

   return NextResponse.json({message:"Recipe creation success", id: recipe._id})
}