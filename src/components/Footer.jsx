import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div>
        <footer className="w-full bg-color border-t text-white py-8 mt-10">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white text-sm">© 2026 RecipeApp. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-white">
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/dashboard">Dashboard</Link>
        </div>
    </div>
</footer>
    </div>
  )
}

export default Footer