import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
  appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET_KEY,
  accessToken: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_SECRET,
});

export async function tweet(message) {
  try {
    const response = await client.v2.tweet(message);
    return response;
  } catch (error) {
    console.error("Twitter API Error:", error);
    return {error :"Failed to post tweet", details: error.data || error.message};
  }
}

