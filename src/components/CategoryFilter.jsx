"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

function CategoryFilter() {
  const router = useRouter()
  return (

    <div className='flex flex-col items-start mt-5 '>
      <h1 >Choose a category</h1>
      <select  onChange={(e) => {if(e.target.value === ""){router.push(`recipes`)} else{router.push(`/recipes?category=${e.target.value}`)}}} className='bg-color w-16 md:w-32 p-2  text-white'>

    <option value="">All recipes</option>
    <option value="Breakfast">Breakfast</option>
    <option value="Lunch">Lunch</option>
    <option value="Dinner">Dinner</option>
    <option value="Dessert">Dessert</option>
      </select>
     
    </div>
  )
}

export default CategoryFilter