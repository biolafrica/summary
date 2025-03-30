import { TwitterApi } from "twitter-api-v2";

// Environment variable validation
const validateEnv = () => {
  const requiredVars = {
    bearer: process.env.TWITTER_BEARER_TOKEN,
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
};



// OAuth 2.0 Application-Only (Bearer Token) Client
const createAppClient = () => {
  try {
    return new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
  } catch (error) {
    console.error("Failed to initialize OAuth 2.0 client:", error);
    throw error;
  }
};



// OAuth 1.0a User Authentication Client
const createUserClient = () => {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    return client.readWrite;
  } catch (error) {
    console.error("Failed to initialize OAuth 1.0a client:", error);
    throw error;
  }
};



// Initialize clients
validateEnv();
const appClient = createAppClient();
const rwClient = createUserClient();

export { rwClient, appClient };

