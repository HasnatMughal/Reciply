import mongoose from "mongoose";

const mongoDbURI = process.env.MONGODB_URI

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

async function connectDB(){
    if(cached.conn) return cached.conn

    cached.promise = mongoose.connect(mongoDbURI)
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB