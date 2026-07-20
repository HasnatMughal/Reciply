"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiMenu } from 'react-icons/bi'



function Navbar({isLoggedIn}) {

  useEffect(() => {
    isLoggedIn
  },[isLoggedIn])
  

  const router = useRouter()
  const [viewHam, setViewHam] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  async function submitFn(title){
    router.push(`/recipes?search=${title}`)
  }
  return (
    <div className='w-full flex justify-between p-8'>
        <div className='text-2xl md:text-4xl font-bold'>Reciply</div>
        
        <div className='flex hidden md:flex-row md:block md:flex items-center gap-8'>
        <li className='hover:border-b'><Link href={`/`}>Homepage</Link></li>
        <li className='hover:border-b'><Link href={`/recipes`}>Recipes</Link></li>
        {
          !isLoggedIn ? <div className="flex gap-2 items-center">
            <Link href={"/login"}>Login</Link>
            <Link className=' hover:bg-white hover:text-amber-900 px-4 py-2 border' href={"/signup"}>Register</Link>
          </div> : <li className='hover:border-b'><Link href={`/dashboard`}>Dashboard</Link></li> 
        }
        
        </div>
        <div className='relative flex items-center'>
          <button onClick={() => setViewHam(!viewHam)} className='block md:hidden'><BiMenu  className='text-2xl'/></button>
        {viewHam === true ? 
        <div className='flex p-4 flex-col absolute bg-white text-black top-8 left-0 block md:flex-row md:hidden items-center gap-2'>
        <li className='hover:border-b'><Link href={`/`}>Homepage</Link></li>
        <li className='hover:border-b'><Link href={`/recipes`}>Recipes</Link></li>
        <li className='hover:border-b'><Link href={`/dashboard`}>Dashboard</Link></li>
        </div> : ""}
       </div>

        <div>
        <form action="" onSubmit={(e) => {
          e.preventDefault()
          submitFn(searchVal)
        }} className='flex gap-2'>
          <input type="text" placeholder='Search for your favourite recipe' onChange={(e) => {setSearchVal(e.target.value)}}  className='p-2 w-32 md:w-64 focus:border-gray-50' />
          <button className='text-xl' type="submit">🔍</button>
        </form>
        </div>
    </div>
  )
}

export default Navbar