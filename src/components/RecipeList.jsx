"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


function RecipeList({img, title, description, id }) {
    const router = useRouter()
    async function deleteFn(){
            try {
                const deletedRes = await fetch(`api/recipes/${id}`,{
                    method:"DELETE"
                })
                if(deletedRes.ok){
                    router.push('/')
                }
                
                
            } catch (error) {
                
            }
        }
   
  return (
    <div className='min-w-64 w-full border-gray-50 border p-4 rounded-2xl flex flex-row justify-between items-center'>
        <div className='w-32 h-32 '>
            <img src={img} alt="" className='w-full object-cover' />
        </div>
        <div className='flex flex-col items-center'>
        <h2 className='text-lg'>{title}</h2>
        <h2 className='text-xs'>{description}</h2>
        </div>
        <div className='flex flex-row gap-2 '>
            <button className='bg-white  w-18 h-10 p-2 text-amber-800 ' onClick={() => router.push(`/recipes/${id}/edit`)}>Edit</button>
            <button className='bg-red-400 hover:bg-red-500 w-18 h-10 p-2 text-white ' onClick={deleteFn}>Delete</button>
        </div>
    </div>
  )
}

export default RecipeList