import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
let isConnected = false;


export async function dbConnect() {

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected");

  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }

}


