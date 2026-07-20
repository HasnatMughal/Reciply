import mongoose, { Schema } from "mongoose";

const RecipeSchema = new mongoose.Schema({
    title:String,
    description: String,
    ingredients: [{id:Number, name:String}],
    instructions: String,
    cookTime: String,
    image: String,
    createdAt: {type:Date, default: Date.now()},
    author: String,
    category: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert'] }
})

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema) 