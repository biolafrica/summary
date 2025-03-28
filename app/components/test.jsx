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

  async function testTweet(){
    try {
      const res = await rwClient.v2.tweet("I love my woman")
      console.log('tweet posted succesfully', res)
    } catch (error) {
      console.error("twitter post unsucessful", error)
      if(error.data && (error.data.detail).includes("duplicate content")){
        console.error("error details", error.data)
        const response = await rwClient.v2.tweet(`I love my woman ${Date.now()}`)
        console.log("retry successful", response)
      }else if(error.data){
        console.error("error details", error.data)
      }
      
    }
  }

  testTweet()

  return(
    <h2>Testing</h2>
  )
}