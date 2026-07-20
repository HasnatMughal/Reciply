"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@/components/Container"




export default function NewRecipe(){
    const [title, setTitle] = useState('')
    const [description ,setDescription] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState('')
    const [image, setImage] = useState("")
    const [cookTime, setCookTime] = useState(0)
    const [authorID, setAuthorID] = useState('')
    const [category, setCategory] = useState('')
    console.log(image);

//      useEffect(() => {
//     async function getCurrentUser(){
//         try {
//           const cookieStore = await cookies()  
//           const token = cookieStore.get('token')
//           const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
//           const currentUserId = decoded.id
//           setAuthorID(currentUserId)
//         } catch (error) {
            
//         }
//     }
//    })
    
    const router = useRouter()
    
    async function createNewRecipe(){

        try {
const formData = new FormData()
    formData.append('file', image)

    const uploadRes = await fetch('/api/upload',{
        method:"POST",
        body:formData
    })

    const uploadData = await uploadRes.json()
    console.log(uploadData);
    const imageUrl = uploadData.url
    

          const res = await fetch("/api/recipes",{
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify({title, description, ingredients, instructions, cookTime, image:imageUrl, author:authorID, category:category})
          })  
          const data = await res.json()
          if(res.ok){
            console.log("recipe created", data);
            router.push(`/recipes/${data.id}`)
            
          }

        } catch (error) {
            
        }
    }



    function addIngredient(ingredient){
        setIngredients([...ingredients, {id: Date.now(), name: ingredient}])
    }

    return(
        <div className="w-full min-h-screen">
            <Container>
            <h1 className="text-3xl text-center font-semibold">Create a new Recipe</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                createNewRecipe()
            }} className="flex flex-col items-start gap-4 w-full max-w-2xl mx-auto p-6">
            <input placeholder="Enter the recipe name" value={title} onChange={(e) => setTitle(e.target.value)} 
className="w-full border border-gray-200 p-3 rounded-lg" />
            <textarea 
    placeholder="Enter recipe description" 
    value={description}  
    onChange={(e) => setDescription(e.target.value)}
    className="w-full border border-gray-200 p-3 rounded-lg min-h-24 resize-y"
/>
                <div className="flex items-center gap-2">
            <input placeholder="Enter the ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} 
className="w-full border border-gray-200 p-3 rounded-lg" />
            <button className="w-20 h-10 text-white p-2 bg-blue-400 hover:bg-blue-500" onClick={(e) => {
                e.preventDefault()
                addIngredient(ingredient)
                setIngredient('')}}>Add</button>

           <ol className="bg-gray-50 border border-gray-200 rounded-lg min-w-48 min-h-32 p-3 text-gray-700">
            <h1 className="text-xl text-center ">Ingredients</h1>
            {ingredients.map((ing,index) => {
                return(
                    <li key={ing.id} className="text-sm">{index + 1}. {ing.name}</li>
                )
            })}
            </ol> 
            </div>
            <textarea 
    placeholder="Enter the instructions" 
    value={instructions} 
    onChange={(e) => setInstructions(e.target.value)} 
    className="w-full border border-gray-200 p-3 rounded-lg min-h-32 resize-y"
/>
            <input placeholder="Enter the cooking time" value={cookTime} onChange={(e) => setCookTime(e.target.value)} 
className="w-full border border-gray-200 p-3 rounded-lg" />
<select 
    value={category} 
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border border-gray-200 p-3 bg-color rounded-lg"
>
    <option className="" value="">Select Category</option>
    <option value="Breakfast">Breakfast</option>
    <option value="Lunch">Lunch</option>
    <option value="Dinner">Dinner</option>
    <option value="Dessert">Dessert</option>
</select>
            <input type="file"  onChange={(e) => setImage(e.target.files[0])} />
            <button className="max-w-64 w-full bg-blue-400 hover:bg-blue-500 text-white p-2 " type="submit">Create</button>

            </form>
        </Container>
        </div>
    )
}