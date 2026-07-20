
import connectDB from "@/app/lib/mongodb";
import Recipe from "@/models/Recipe";
import Container from "@/components/Container";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import RecipeActions from "@/components/RecipeActions";
// import { useRouter } from "next/navigation";


export default async function RecipePage({params}){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    const currentUserId = decoded.id
    console.log(currentUserId);
    // const router = useRouter()

    
    
    const {id} = await params
    await connectDB()
   
    const recipe = await Recipe.findById(id)
    // console.log(recipe);
    // console.log(recipe.author)
    // console.log(currentUserId);
    const isOwner = currentUserId  === recipe.author
    

    return(
        <div className="min-h-screen flex w-full gap-4 flex-col items-start">
            <Container>
            <h1 className="text-4xl text-center w-full font-bold">Recipe details</h1>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                    <RecipeActions isOwner={isOwner} id={id} />
                    </div>
        {<img src={recipe&& recipe.image} className="w-full h-96 object-cover"/>}
        </div>
        <div className="flex flex-col w-full items-start gap-2">
            <div className="flex flex-row w-full items-center justify-between">
            <h1 className="text-3xl font-semibold capitalize">{recipe&& recipe.title}</h1>
            <div className="flex flex-col items-center ">
                <h2 className="text-blue-300 text-2xl">Cooking Time</h2>
                <h2 className="  text-gray-400">{recipe&& recipe.cookTime}</h2>
            </div>

            </div>
            <div>
            <h2 className="text-2xl">Description</h2>
            <p className="text-sm">{recipe&& recipe.description}</p>
            <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col items-start">
            <h2 className="text-2xl">Ingredients</h2>
                <ol className="">
                    
                    { recipe.ingredients? recipe.ingredients.map((ing, index) => {
                       return (<li className="text-sm" key={index}>
                       {index}. {ing.name}
                       </li>)
                    }): []}
                </ol>
            </div>
            <div className=" flex flex-col">
            <h2 className="text-2xl ">Instructions</h2>
            <p className="text-sm">{recipe.instructions}</p>
            </div>
            </div>

            </div>


        </div>
        </Container>
        </div>
    )
}