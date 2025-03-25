import dbConnect from "@/app/utils/db";
import { NextResponse } from "next/server";
import Summary from "../../models/summary"
import { summarizeText, extractTextFromPDF, extractTextFromImage } from "@/app/utils/extractData";


await dbConnect();

export async function POST(req){
  try {
    const {text, pdf, image, language, summary} = await req.json();

    console.log("req", text, pdf, image);
    
    let extractedText = text || "";
    let type = "text";
    let sourceUrl = null;

    if(pdf){
      const parsedPDF = await extractTextFromPDF(pdf)
      console.log("parsed pdf", parsedPDF);
      extractedText = parsedPDF.text;
    }

    if(image){
      type = "image";
      sourceUrl = image;
      extractedText = await extractTextFromImage(image);
    }

    if(!extractedText){
      return NextResponse.json({error : "No valid text to summarize"}, {status: 400});
    }

    const summaryText = await summarizeText(extractedText, summary);

    const newSummary = new Summary({
      text: extractedText,
      summary : summaryText,
      type,
      sourceUrl,
      language
    });

    await newSummary.save();
    return NextResponse.json({id: newSummary._id})

  } catch (error) {
    console.error("Summarization Error", error);
    return NextResponse.json({error : "Summarization failed"}, {status:500});
    
  }
  
}