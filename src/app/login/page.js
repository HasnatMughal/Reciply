"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const router = useRouter()

    async function handleSubmit(){
        try {
            const res = await fetch("/api/login",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify({email,password})
            })
            if(res.ok){
                console.log("Login success")
                router.push("/dashboard")

            }
        } catch (error) {
            console.log(error);
            
        }
    }

return(
 
         <div className="w-full max-w-lg mx-auto border flex flex-col items-center gap-4 min-h-screen justify-center border-gray-100">
            <h1 className="text-center font-semibold text-3xl">Login</h1>
<form className=" flex flex-col gap-4 items-center" onSubmit={(e) => {e.preventDefault()
    handleSubmit()
}}>
   
    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full min-w-64 border border-gray-200 px-2 py-3 focus:border-gray-300"/>
    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="w-full min-w-64 border border-gray-200 px-2 py-3 focus:border-gray-300"/>
        <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 w-64" type="submit">Login</button>
</form>

    </div>
)
}