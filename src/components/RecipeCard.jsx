"use client"

import Link from 'next/link'
import React from 'react'

function RecipeCard({id, title, description, image, ingredientsNumber}) {
  return (
      <Link href={`/recipes/${id}`}>
    <div className='flex flex-col items-start hover:border-gray-300 border transition-all duration-150 rounded-2xl ease-in-out w-full p-4'>
        <img src={image} className='w-full h-40 object-cover rounded-xl' alt="" />
        <div className='flex flex-col items-start mt-2 gap-1'>
            <h1 className='text-base md:text-lg font-medium'>{title}</h1>
            <p className='text-xs text-gray-500 line-clamp-2'>{description}</p>
            <p className='text-xs text-gray-400'>{ingredientsNumber && ingredientsNumber.length} Ingredients</p>
        </div>
    </div>
</Link>
  )
}

export default RecipeCard