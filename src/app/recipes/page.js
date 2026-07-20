import connectDB from "../lib/mongodb"
import Recipe from "@/models/Recipe"
import RecipeCard from "@/components/RecipeCard"
import Link from "next/link"
import CategoryFilter from "@/components/CategoryFilter"


export default async function Recipes({searchParams}){
    const {category} = await searchParams
    const {search} = await searchParams
    
    console.log(category);
    const query = {}

    if(search) query.title = {$regex: search, $options:"i"}
    if(category) query.category = category
await connectDB()
    const recipes = await Recipe.find( query ).lean()
    


    return(
        <div className="w-full min-h-screen p-4">
            
            <h1 className="text-4xl font-semibold text-center p-4 mb-5">Recipes</h1>
            <div className="flex flex-col lg:flex-row gap-2">
                <div className="  justify-center md:justify-start  md:w-1/8 flex md:flex-col flex-row w-full  sm:border-r " >
                <h1 className=" text-lg md:text-2xl font-semibold">Filters</h1>
                <CategoryFilter />
                
                </div>
                <div className="w-full  md:w-7/8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {recipes? recipes.map((recipe) => {
               return <li className="hover:scale-105 transition-all ease-in-out duration-100" key={recipe._id}>
                <RecipeCard title={recipe.title} description={recipe.description} image={recipe.image} ingredientsNumber={recipe.ingredients.map((ing) => {
                    ing.toString()
                })} id={String(recipe._id)} /> </li>
            }) : []}
            </div>
            </div>
            </div>
            
        </div>
    )
}