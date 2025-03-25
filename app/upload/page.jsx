"use client"

import { useState } from "react"

export default function Upload(){

  const [state, setState]= useState("text")

  return(
    
    <div>

      <div className="button-group">
        <button className={state === "text" ? "pri-btn" : "text-btn" } onClick={()=>setState("text")}>Text</button>
        <button className={state === "pdf" ? "pri-btn" : "text-btn"} onClick={()=>setState("pdf")}>Pdf</button>
        <button className={state === "picture" ? "pri-btn" : "text-btn"} onClick={()=>setState("picture")}>Picture</button>
      </div>
      
      <form className="upload-form" >

        <h3 style={{textAlign: "center", marginTop: "20px"}}>Summary</h3>

        {state === "picture" && (

          <label htmlFor="image">
            <h4>Upload image</h4>
            <input type="file" name="image" />
          </label>

        )}

        {state == "pdf" && (

          <label htmlFor="pdf">
            <h4>Upload pdf</h4>
            <input type="file" name="pdf" />
          </label>

        )}

      
        {state === "text" && (
          <label htmlFor="text" >
            <h4>Enter text</h4>
            <textarea name="text"></textarea>
          </label>

        )}
      
        <label htmlFor="language">
          <h4>Select Language</h4>
          <select name="language" >
            <option>Select Language</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spain">Spain</option>
          </select>
        </label>
      
        <label htmlFor="summary">
          <h4>Select Summary</h4>
          <select name="suammry" >
            <option >Select Summary</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </label>
    

        <button className="pri-btn">Summarize</button>

      </form>

    </div>

  )
}