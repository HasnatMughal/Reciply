import cloudinary from "@/app/lib/cloudinary"
import { NextResponse } from "next/server"

export async function POST(request){
    const data = await request.formData()
    const file = data.get('file')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

   const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((error,result) => {
        if(error) reject(error)
        resolve(result)
        console.log(result)
        const resultURL = result.secure_url

    }).end(buffer)
    
    
    
}) 
return NextResponse.json({message:"image upload success", url:result.secure_url})
}