import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});


export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

  
    const fileBuffer = Buffer.from(await file.arrayBuffer());

   
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "summarization_files" }, (error, res) => {
        if (error) reject(error);
        else resolve(res);
      }).end(fileBuffer);
    });

    return new Response(JSON.stringify({ fileUrl: result.secure_url }), {
      status: 200,
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Cloudinary upload failed" }), { status: 500 });
  }
}
