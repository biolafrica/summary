import { getSummary } from "@/app/utils/Database/getSummary";
import Image from "next/image";

export default async function MyUpload({params}){
  const {id}= await params;
  const selectedSummary = await getSummary(id);

  return(
    <div className="output-cont">

      <div className="input">
        <h3>Input</h3>

        {selectedSummary.sourceUrl && (<Image src={`${selectedSummary.sourceUrl}`} width={700} height={400}/>)}

        {selectedSummary.type === "text" && (<h4>{selectedSummary.text}</h4>)}
       
      </div>


      <div className="result">
        <h3>Result</h3>
        <h4>{selectedSummary.summary}</h4>

        <div className="action">
          <button className="pri-btn">Re-try</button>
          <button className="sec-btn">Copy</button>
        </div>
      </div>

    </div>
  )
}