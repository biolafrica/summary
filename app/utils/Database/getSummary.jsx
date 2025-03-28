

export async function getSummary(id){

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/summarize/${id}`)
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log("error fetching data", error.message)
    throw new Error( "Error fetching summary")
    
  }

}