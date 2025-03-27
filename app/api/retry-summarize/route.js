import { summarizeText } from "@/app/utils/extractData";
import { NextResponse } from "next/server";

export async function POST(req){

  const {text} = await req.json();

  try {

    if(!text){
      return NextResponse.json({error : "No text provided"}, {status:404})
    }

    const newSummary = await summarizeText(text, "concise")

    return NextResponse.json({summary: newSummary})

  } catch (error) {
    console.error("Retry Summarization error:", error)
    return NextResponse.json({error: "failed to retry summary"}, {status: 500})
    
  }


}