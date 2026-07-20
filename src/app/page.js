import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import connectDB from "./lib/mongodb";
import Recipe from "@/models/Recipe";
import RecipeCard from "@/components/RecipeCard";



export default async function Home() {
    await connectDB()
    const recipes = await Recipe.aggregate([{$sample : {size: 4}}])
    console.log(recipes);
    
      
  
  return (
   <div  className="flex flex-col  min-h-screen bg-circular-gradient">
    <section  className="flex flex-col h-[20vh] md:h-[90vh]  items-center md:flex-row justify-center   md:justify-between ">
      <div className="flex flex-col gap-2 items-center">
   <h1 className="text-6xl font-bold capitalize ">Find your favourite <br></br> recipe here</h1>
   <p className="text-sm text-gray-300 mt-4">Discover delicious recipes from around the world. Create, share, and enjoy amazing dishes.</p>
   <button className='bg-red-500 py-2 px-4 rounded-3xl hover:bg-red-600 text-white'><Link href={`/recipes`}>Explore our recipes</Link></button>
   </div>
   <div className="w-96 h-5/6 object-cover hidden md:block rounded-2xl">
    <img src="https://images.pexels.com/photos/19786235/pexels-photo-19786235.jpeg" className="w-full h-full object-cover rounded-2xl" />
   </div>
   </section>
    <section style={{"minHeight":"80vh", "height": "90vh"}} className="flex-flex-col items-center mt-10 mb-10">
      <h1 className="text-4xl font-semibold">What People like the most</h1>
      <p className="w-full flex justify-end"><Link href={`/recipes`}>Explore more</Link></p>
      <ol className='grid grid-cols-4 gap-4 mt-5'>
      {recipes ? recipes.map((recipe) => {
        return(
          <li key={recipe._id.toString()}>
          <RecipeCard id={recipe._id.toString()} title={recipe.title.toString()} description={recipe.description.toString()} image={recipe.image} ingredientsNumber={recipe.ingredients.map((ing) => ing.toString() )} />
            </li>
        )
      }) : []}
      </ol>
      <div>

      </div>
    </section>

    </div>
  );
}
