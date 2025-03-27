import  {TwitterApi} from "twitter-api-v2"
import { configDotenv } from "dotenv"

configDotenv()

const twitterClient = new TwitterApi({
  appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
  appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET_KEY,
  accessToken:process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
  accessSecret:process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_SECRET

})

export async function tweet(text){
  try {
    const tweetResponse = await twitterClient.v2.tweet(text);
    console.log("tweeted:", tweetResponse)
    return tweetResponse
    
  } catch (error) {
    console.error("Twitter API Error", error);
  }

}