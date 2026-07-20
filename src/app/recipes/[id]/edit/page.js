"use client"

import { useState, useEffect } from "react"
import Container from "@/components/Container"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"


export default function UpdateRecipe(){
    const {id} = useParams()
    const router = useRouter()


   const [title, setTitle] = useState('')
       const [description ,setDescription] = useState('')
       const [ingredient, setIngredient] = useState('')
       const [ingredients, setIngredients] = useState([])
       const [instructions, setInstructions] = useState('')
       const [image, setImage] = useState("")
       const [cookTime, setCookTime] = useState("")

       async function fetchRecipe(){
            try {
                const res = await fetch(`/api/recipes/${id}`)
                const data = await res.json()
                console.log(data)
                if(data){
                    setTitle(data.existingRecipe.title)
                    setIngredients(data.existingRecipe.ingredients)
                    setDescription(data.existingRecipe.description)
                    setInstructions(data.existingRecipe.instructions)
                    setCookTime(data.existingRecipe.cookTime)
                    setImage(data.existingRecipe.image)
                }
            } catch (error) {
                
            }
        }
   
       useEffect(() => {
        fetchRecipe()
       },[])
   
       function addIngredient(ingredient){
        setIngredients([...ingredients, {id:Date.now(), name:ingredient}])
    }

    function filterIngredients(id){
       const filteredIngredients =  ingredients.filter((ingredient) => ingredient.id !== id )
       setIngredients(filteredIngredients)
    //    setIngredients([...ingredients, filteredIngredients])
    }

    async function UpdateTheRecipe(){
        const formData = new FormData()
        formData.append('file',image)

        const uploadRes = await fetch('/api/upload',{
            method:"POST",
            body:formData
        })
        const uploadData = await uploadRes.json()
        const imageUrl = uploadData.url

        const updateRes = await fetch(`/api/recipes/${id}`,{
            method:"PUT",
            body:JSON.stringify({title, description, ingredients, instructions, cookTime, image:imageUrl})}
        )
        const updatedData = await updateRes.json()
        if(updateRes.ok){
            console.log(updatedData);
            router.push(`/recipes/${id}`)

            
        }
    }

    async function deleteRecipe(id) {
        try {
            const deleteRes = await fetch(`/api/recipes/${id}`,
                {
                    method: "DELETE",
                }
            )
            const delData = await deleteRes.json()
            if(deleteRes.ok){
                console.log(delData.message);
                router.push('/dashboard')
                
            }
        } catch (error) {
            
        }
    }

//    console.log(ingredients);
   
    return(
        <div className="w-full min-h-screen">
            <Container>
            <h1 className="text-3xl text-center font-semibold">Update Recipe</h1>
            <div className="w-full flex flex-end ">
                <button className="w-32 h-12 bg-red-400 hover:bg-red-500 text-white" onClick={(e) => {e.preventDefault()
                deleteRecipe(id)
                }}>Delete</button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                UpdateTheRecipe()
            }} className="flex flex-col items-start gap-4 w-full max-w-2xl mx-auto p-6">
            <input placeholder="Enter the recipe name" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 p-3 rounded-lg"  />
            <textarea 
    placeholder="Enter recipe description" 
    value={description}  
    onChange={(e) => setDescription(e.target.value)}
    className="w-full border border-gray-200 p-3 rounded-lg min-h-24 resize-y"
/>
                <div className="flex items-center gap-2">
            <input placeholder="Enter the ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-full border border-gray-200 p-3 rounded-lg" />
            <button className="w-20 h-10 text-white p-2 bg-blue-400 hover:bg-blue-500" onClick={(e) => {
                e.preventDefault()
                addIngredient(ingredient)}}>Add</button>

           <ol className="bg-gray-50 border border-gray-200 rounded-lg min-w-48 min-h-32 p-3 text-gray-700">
            <h1 className="text-xl text-center ">Ingredients</h1>
            {ingredients ? ingredients.map((ing, index) => {
                return(
                    <li key={ing.id} className="text-sm flex gap-15"><div className="flex ">
                        <p>{index + 1}.</p><p>{ing.name} </p></div>     <button onClick={(e) =>{
                        e.preventDefault()
                        filterIngredients(ing.id)}}>X</button></li>
                )
            }) : []}
            </ol> 
            </div>
            <textarea 
    placeholder="Enter the instructions" 
    value={instructions} 
    onChange={(e) => setInstructions(e.target.value)} 
    className="w-full border border-gray-200 p-3 rounded-lg min-h-32 resize-y"
/>
            <input placeholder="Enter the cooking time" value={cookTime} onChange={(e) => setCookTime(e.target.value)} cclassName="w-full border border-gray-200 p-3 rounded-lg" />
            <input type="file"  onChange={(e) => setImage(e.target.files[0])} />
            <button className="max-w-64 w-full bg-blue-400 hover:bg-blue-500 text-white p-2 " type="submit">Update</button>

            </form>
        </Container>
        </div>
    )
}