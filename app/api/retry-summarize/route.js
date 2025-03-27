import { summarizeText } from "@/app/utils/extractData";
import { NextResponse } from "next/server";
import summary from "@/app/models/summary";
import { dbConnect } from "@/app/utils/Database/db";

export async function POST(req){

  const {text, id} = await req.json();
  await dbConnect();

  try {

    if(!text){
      return NextResponse.json({error : "No text provided"}, {status:404})
    }

    const newSummary = await summarizeText(text, "concise")
    const updatedDatabase = await summary.findOneAndUpdate(
      { _id: id },
      { $set: { summary: newSummary } }, 
      { new: true }
    );

    return NextResponse.json({summary: newSummary})

  } catch (error) {
    console.error("Retry Summarization error:", error)
    return NextResponse.json({error: "failed to retry summary"}, {status: 500})
    
  }


}