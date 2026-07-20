"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

function RecipeActions({isOwner, id}) {
    
    const router = useRouter()
    if(!isOwner) return null
     function navigateToEditPage() {router.push(`/recipes/${id}/edit`)}

     
  return (
    <div className='flex gap-2 items-center'>
        <button className="bg-white  w-18 h-10 p-2 text-amber-800" onClick={navigateToEditPage}>Edit</button>
        
    </div>
  )
}

export default RecipeActions