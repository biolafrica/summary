import { NextResponse } from "next/server";
import { summarizeText,extractTextFromImage } from "@/app/utils/extractData";


export async function POST(req){

  const updatedForm = await req.json();
  const {text, image, pdf, language, summary_type} = updatedForm;
  console.log (updatedForm)

  try {
    let extractedText = text || "";
    let type = "text";
    let sourceUrl = null;

    if(pdf){
      type= "pdf",
      sourceUrl = pdf;
      extractedText = await extractTextFromImage(pdf);
    }

    if(image){
      type = "image";
      sourceUrl = image;
      extractedText = await extractTextFromImage(image);
    }

    const summarizedText = await summarizeText();

    if(!extractedText){
      return NextResponse.json({error : "No valid text to summarize"}, {status: 400});
    }
   
    return NextResponse.json({extractedText})

  } catch (error) {
    console.error("Summarization Error", error);
    return NextResponse.json({error : "Summarization failed"}, {status:500});
    
  }
  
}