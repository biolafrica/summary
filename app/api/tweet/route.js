
import { tweet } from "@/app/utils/twitter";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json(); //  Corrected request parsing

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const response = await tweet(message);
    
    if (!response) {
      return NextResponse.json({ error: "No response received from Twitter API" }, { status: 400 });
    }

    return NextResponse.json({ success: true, response }, { status: 200 });
    
  } catch (error) {
    console.error("Twitter API Error:", error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
