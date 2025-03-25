import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if(!MONGODB_URI){
  throw new Error ("MONGODB_URI is not define in enviroment variables")
}

let isConnected = false

export default async function dbConnect(){
  if(isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB Connected')
    
  } catch (error) {
    console.error("MongoDB Connection Error", error)
    process.exit(1);
    
  }

}

