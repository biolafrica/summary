"use client"

import { useState } from "react";

export default function SummaryList({display}){
  const [summarize, setSummarize] = useState(display)
  const [loading, setLoading] = useState(false)
  
  const handleRetry=async()=>{
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/retry-summarize", {
        method: "POST",
        headers :{"Content-Type": "application/json"},
        body: JSON.stringify({text: summarize})
      })

      const data = await res.json();
    
      if(data.summary){
        setSummarize(data)
      }else{
        console.error("Retry failed: No summary returned")
      }
      
    } catch (error) {
      console.error("error retrying summary:", error)
    }

    setLoading(false)
  }

  const handleCopy=()=>{
    navigator.clipboard.writeText(summarize)
    alert("copied to clipboard")
  }

  return(

    <div className="result">
      <h3>Result</h3>
      <h4>{summarize}</h4>

      <div className="action">
        <button disabled={loading} className="pri-btn" onClick={handleRetry}>{loading ? "Retrying" : "Re-try"}</button>
        <button className="sec-btn" onClick={handleCopy}>Copy</button>
      </div>
    </div>

  )

}