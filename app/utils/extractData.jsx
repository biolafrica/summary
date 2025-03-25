import OpenAI from "openai";
import fetch from "node-fetch";
import PdfParse from "pdf-parse";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})


//OCR.space API
export async function extractTextFromImage(imageUrl){

  const formData = new URLSearchParams();
  formData.append("apiKey", process.env.NEXT_PUBLIC_OCR_SPACE_API_KEY);
  formData.append("url", imageUrl);
  formData.append("language", "eng");
  formData.append("isOverlayRequired", "false");

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    headers: { "Content-Type":"application/x-www-form-urlencoded"},
    body: formData.toString()
  })

  const data = await response.json();
  if(data.ParsedResults && data.ParsedResults.length > 0){
    return data.ParsedResults[0].ParsedText
  }else{
    console.log("Failed to extract text from image", error)
    throw new Error("Failed to extract text from image")
  }


}

export async function summarizeText(text, length){
  const prompt = `Summarize the following text in a ${length} format:\n\n${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{role: "user", content: prompt}],
    temperature: 0.7,
  })

  return response.choices[0].message.content.trim();
}

export async function extractTextFromPDF(pdf){
  type = "pdf";
  sourceUrl = pdf;
  const pdfResponse = await fetch(pdf);
  const pdfBuffer = await pdfResponse.arrayBuffer();
  const parsedPDF = await PdfParse(Buffer.from(pdfBuffer));

  return parsedPDF;

}