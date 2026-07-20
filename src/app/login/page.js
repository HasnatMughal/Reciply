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
                router.push("/")
                router.refresh()

            }
        } catch (error) {
            console.log(error);
            
        }
    }

return(
 
        <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-1">Login to your Reciply account</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Password</label>
                <input 
                    value={password} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400"
                />
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-medium mt-2" type="submit">
                Login
            </button>
        </form>
        <p className="text-center text-sm text-gray-400">
            Don't have an account? <a href="/signup" className="text-amber-600 hover:underline">Sign up</a>
        </p>
    </div>
</div>
)
}