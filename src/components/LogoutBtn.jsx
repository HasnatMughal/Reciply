"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

function LogoutBtn() {

const router = useRouter()

    async function logoutFn(){
            try {
                const loggedOut = await fetch('/api/logout',{
                    method:"POST"
                })
                if(loggedOut.ok){
                    router.push('/login')
                    router.refresh()
                }
            } catch (error) {
                
            }
        }
  return (
    <button onClick={() => logoutFn()} className="bg-red-500 hover:bg-red-600 w-24 p-2">Logout</button>
  )
}

export default LogoutBtn