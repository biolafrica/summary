import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})


//OCR.space API
export async function extractTextFromImage(imageUrl){

  const formData = new URLSearchParams();
  formData.append("apiKey", process.env.NEXT_PUBLIC_OCR_SPACE_API_KEY);
  formData.append("url", imageUrl);
 
  if (imageUrl.endsWith(".pdf")) {
    console.log("it is pdf")
    formData.append("isTable", "true");
    formData.append("OCREngine", "2");
    formData.append("filetype", "PDF");  // 🔹 Required for PDFs
  }

  try {

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: { "Content-Type":"application/x-www-form-urlencoded"},
      body: formData.toString()
    })

    const data = await response.json();

    if(data.ParsedResults && data.ParsedResults.length > 0){
      console.log("returned data from ocr", data.ParsedResults[0].ParsedText )
      return data.ParsedResults[0].ParsedText

    }else{
      console.log("Failed to extract text from image", error)
      throw new Error("Failed to extract text from image")
    }

  } catch (error) {
    console.error("OCR API Error:", error);
    throw new Error("Failed to process file with OCR")
  }

}

export async function summarizeText(text, length){
  const prompt = `Summarize the following text in a ${length} format:\n\n${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
    temperature: 0.7,
  })

  console.log("returned data from chatgpt",response.choices[0].message.content);

  return response.choices[0].message.content.trim();
}