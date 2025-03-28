import { rwClient } from "../utils/twitter"

export default function Test(){

  async function checkTwitterConnection(){

    try {
      const user = await rwClient.v2.me();
      console.log("connected to twitter as:", user.data.username)
    } catch (error) {
      console.error("twitter connection failed", error)
    }
  }

  checkTwitterConnection();

  return(
    <h2>Testing</h2>
  )
}