import connectDB from "@/app/lib/mongodb"
import Recipe from "@/models/Recipe"
import { NextResponse } from "next/server"


export async function GET(request,{ params}){
const {id} = await params
    

    await connectDB()

    const existingRecipe = await Recipe.findById(id)
    if(!existingRecipe) return NextResponse.json({message:"Recipe not found"}, {status:404})

    return NextResponse.json({message:"Recipe found", existingRecipe})
}

export async function PUT(request,{ params}){
    const {id} = await params
    const {title, description, ingredients, instructions, cookTime, image} = await request.json()

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {title, description, ingredients, instructions, cookTime, image}, {new:true})

    return NextResponse.json({message: "Recipe updated",recipe:updatedRecipe})
}

export async function DELETE(request, {params}){
    const {id} = await params
   const existingRecipe = await Recipe.findByIdAndDelete(id)
    if(!existingRecipe) return NextResponse.json({message:"Recipe not found"}, {status:404}) 

    return NextResponse.json({message:"Recipe deleted successfully", status:204})
}