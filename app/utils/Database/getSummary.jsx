

export async function getSummary(id){

  try {
    const response = await fetch(`http://localhost:3000/api/summarize/${id}`)
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log("error fetching data", error.message)
    throw new Error( "Error fetching summary")
    
  }

}