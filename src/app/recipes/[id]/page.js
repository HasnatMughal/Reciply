
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
      <div className="min-h-screen w-full">
    <Container>
        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
            <img src={recipe?.image} className="w-full h-full object-cover" alt={recipe?.title} />
            <div className="absolute top-4 right-4">
                <RecipeActions isOwner={isOwner} id={id} />
            </div>
        </div>

        {/* Title + Cook Time */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-4xl font-bold capitalize">{recipe?.title}</h1>
            <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm">
                ⏱ {recipe?.cookTime}
            </div>
        </div>

        {/* Description */}
        <p className=" text-sm md:text-base mb-8">{recipe?.description}</p>

        {/* Ingredients + Instructions */}
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                <ol className="flex flex-col gap-2">
                    {recipe?.ingredients?.map((ing, index) => (
                        <li key={index} className="text-sm  border border-gray-200 rounded-lg px-3 py-2">
                            {index + 1}. {ing.name}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                <p className="text-sm md:text-base leading-relaxed">{recipe?.instructions}</p>
            </div>
        </div>
    </Container>
</div>
    )
}