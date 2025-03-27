import summary from "@/app/models/summary";
import { dbConnect } from "@/app/utils/Database/db";
import { NextResponse } from "next/server";



export async function GET(request, {params}){
  const {id} = await params;
  console.log(id)


  await dbConnect();

  try {
    const selectedSummary = await summary.findById(id);


    if(!selectedSummary){
      return NextResponse({error : "Summary not found"},{status : 404})
    }

    return NextResponse.json(selectedSummary);
  } catch (error) {
    return NextResponse.json({error : "Failed to fetch summary"}, {status: 500})
    
  }

}