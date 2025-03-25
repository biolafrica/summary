"use client"

import { useState } from "react"
import useForm from "../hooks/useForm"
import { useRouter } from "next/navigation"


export default function Upload(){
  const router = useRouter();

  const initialValues = {
    text: "",
    image : "",
    pdf: "",
    language: "",
    summary: ""
  }

  const [state, setState]= useState("text");
  const [laoding, setLoading] = useState(false)
  const {formData, handleInputChange, resetForm}= useForm(initialValues);

  const handleFormSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);

    const res = await fetch("",{
      method: "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    const summary = await res.json();

    if(summary.data){
      router.push(`/upload/${summary.data.id}`)
    }else{
      console.log(error.message)
    }

    resetForm();
    setLoading(false);
    
  }

  return(
    
    <div>

      <div className="button-group">
        <button className={state === "text" ? "pri-btn" : "text-btn" } onClick={()=>setState("text")}>Text</button>
        <button className={state === "pdf" ? "pri-btn" : "text-btn"} onClick={()=>setState("pdf")}>Pdf</button>
        <button className={state === "picture" ? "pri-btn" : "text-btn"} onClick={()=>setState("picture")}>Picture</button>
      </div>
      
      <form className="upload-form" onSubmit={handleFormSubmit} >

        <h3 style={{textAlign: "center", marginTop: "20px"}}>Summary</h3>

        {state === "picture" && (

          <label htmlFor="image">
            <h4>Upload image</h4>
            <input 
              type="file" 
              name="image"
               value={formData.image}
              onChange={handleInputChange} 
            />
          </label>

        )}

        {state == "pdf" && (

          <label htmlFor="pdf">
            <h4>Upload pdf</h4>
            <input 
              type="file" 
              name="pdf"
              value={formData.pdf}
              onChange={handleInputChange} 
            />
          </label>

        )}

      
        {state === "text" && (
          <label htmlFor="text" >
            <h4>Enter text</h4>
            <textarea 
              name="text"
              value={formData.text}
              onChange={handleInputChange} 
            ></textarea>
          </label>

        )}
      
        <label htmlFor="language">
          <h4>Select Language</h4>
          <select 
            name="language"
            value={formData.language}
            onChange={handleInputChange}  
          >
            <option>Select Language</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spain">Spain</option>
          </select>
        </label>
      
        <label htmlFor="summary">
          <h4>Select Summary</h4>
          <select 
            name="suammry"
            value={formData.summary}
            onChange={handleInputChange}  
          >
            <option >Select Summary</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </label>
    

        <button disabled={laoding} className="pri-btn" type="submit">{laoding? 'summarizing' : 'summarize'}</button>

      </form>

    </div>

  )
}