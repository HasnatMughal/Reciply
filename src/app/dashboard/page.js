import connectDB from "../lib/mongodb";
import Recipe from "@/models/Recipe";
import RecipeCard from "@/components/RecipeCard";
import Container from "@/components/Container";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import RecipeList from "@/components/RecipeList";
import Link from "next/link";


export default async function Dashboard(){
    const cookieStore = await cookies()
    const token = cookieStore.get("token" )
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    const userName = decoded.name
    const authorID = decoded.id
    console.log(authorID)

    const query = {author:authorID}
    

    await connectDB()

   
    const recipes = await Recipe.find(query).lean()

    const recipesCount = recipes.length
    console.log(recipesCount);
    

    return(
        <div>
            <Container>
                <h1 className="text-3xl font-bold capitalize">Hi, {userName}. Welcome to your dashboard</h1>
                    <div className="flex flex-col min-h-screen gap-5">
                        <div className="grid grid-cols-3 ">
                            <div className="w-48 mt-5 mb-5 bg-red-400 h-48 rounded-2xl border border-gray-50 flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-semibold">
                                Your Recipes
                            </h1>
                            <h1 className="text-xl ">
                                {recipesCount}
                            </h1>
                            </div>

                        </div>

                        <div className="flex flex-col w-full ">
                            <h1 className="text-2xl font-semibold text-center mt-5">Your Recipes</h1>
                            <button className="bg-white  w-32 h-10 p-2 text-amber-800  "><Link href={`recipes/new`}>Create new</Link></button>
                            <div className="flex flex-row w-full">

                           <div className="w-full mt-5 flex flex-col gap-4"> {recipes? recipes.map((recipe) => {
                                return(<li  key={recipe._id}>
                                    <RecipeList img={recipe.image} title={recipe.title}  id={recipe._id.toString()} />
                                </li>)
                            }) : []}
                            </div>
                            <div className="flex justify-end ">
                                
                            </div>
                            </div>
                            
                        </div>
                    </div>
            </Container>
        </div>
    )
    
}