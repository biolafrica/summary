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
    summary_type: ""
  }

  const [state, setState]= useState("text");
  const [laoding, setLoading] = useState(false);
  const {formData, handleInputChange, resetForm}= useForm(initialValues);
  const [file, setFile] = useState(null);

  const handleFileUpload = async()=>{
    if(!file){
      console.log("No file selected")
      return
    }
    console.log(file)

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if(!res.ok) throw new Error (data.error || "Upload failed")
      
      console.log("File uploaded successfully", data.fileUrl);
      return data.fileUrl;
      
    } catch (error) {
      console.error("Upload error:", error)
    }

  }

  const handleFormSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true)

    let updatedFormData = {...formData}

    if(file){
      const filePath = await handleFileUpload();

      if (state === "picture"){
        updatedFormData = {...formData, image: filePath }
      }else { updatedFormData = {...formData, pdf: filePath}} 

    }

    console.log("sent form", updatedFormData);

    const response = await fetch("/api/summarize", {
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(updatedFormData)

    })

    const data = await response.json();
    if (data){
      console.log ("my data", data)
    }else {console.log("no data")}

    setLoading(false)
    resetForm();

  }

  return(
    
    <div>

      <div className="button-group">
        <button className={state === "text" ? "pri-btn" : "text-btn" } onClick={()=>setState("text")}>Text</button>
        <button className={state === "pdf" ? "pri-btn" : "text-btn"} onClick={()=>setState("pdf")}>Pdf</button>
        <button className={state === "picture" ? "pri-btn" : "text-btn"} onClick={()=>setState("picture")}>Picture</button>
      </div>
      
      <form className="upload-form" onSubmit={handleFormSubmit} encType="multipart/form-data" >

        <h3 style={{textAlign: "center", marginTop: "20px"}}>Summary</h3>

        {state === "picture" && (

          <label htmlFor="image">
            <h4>Upload image</h4>
            <input 
              type="file" 
              name="image"
              onChange={(e)=>setFile(e.target.files[0])} 
            />
          </label>

        )}

        {state == "pdf" && (

          <label htmlFor="pdf">
            <h4>Upload pdf</h4>
            <input 
              type="file" 
              name="pdf"
              onChange={(e)=>setFile(e.target.files[0])}
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
      
        <label htmlFor="summary_type">
          <h4>Select Summary Type</h4>
          <select 
            name="summary_type"
            value={formData.summary_type}
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