import { extractTextFromPDF, extractTextFromImage, summarizeText } from "@/app/utils/extractData";
import summary from "@/app/models/summary";
import { NextResponse } from "next/server";

export async function POST(request){
  const updatedForm = await request.json();
  const {text, image, pdf, language, summary_type} = updatedForm;

  console.log("pdf", pdf)

  try {

    let extractedText = text || "";
    let type = "text";
    let sourceUrl = null;


    return NextResponse.json({id: 1})


    
  } catch (error) {
    console.error("Summarization Error", error);
    return NextResponse.json({error : "Summarization failed"}, {status:500});
    
  }

}