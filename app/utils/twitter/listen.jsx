import { appClient, rwClient } from "./connect";

// Store processed tweet IDs to avoid duplicate responses
const processedTweetIds = new Set();

async function checkMentions() {
  try {
    console.log("Checking for new mentions...");
    const mentions = await rwClient.v2.userMentionTimeline(process.env.TWITTER_BOT_USER_ID, {
      max_results: 5,
      "tweet.fields": ["id", "text", "author_id", "created_at"],
    });

    if (!mentions.data?.data?.length) {
      console.log("No new mentions found.");
      return;
    }

    for (const tweet of mentions.data.data) {
      if (!processedTweetIds.has(tweet.id)) {
        console.log("🔔 New mention detected:", tweet);
        processedTweetIds.add(tweet.id);
        await respondToMention(tweet.id, tweet.text, tweet.author_id);
      } else {
        console.log("Skipping already processed tweet:", tweet.id);
      }
    }

  } catch (error) {
    console.error("Error checking mentions:", error.data || error);
    if (error.status === 429 || error.data?.title === "Too Many Requests") {
      console.log("Rate limit exceeded, pausing for 15 minutes...");
      // Pause polling for 15 minutes
      clearInterval(pollingInterval);
      setTimeout(() => {
        console.log("Resuming polling after rate limit wait...");
        pollingInterval = setInterval(checkMentions, 120000); // Restart polling
      }, 15 * 60 * 1000); // 15 minutes
    }
  }
}

async function respondToMention(tweetId, tweetText, userId) {
  try {
    const user = await rwClient.v2.user(userId);
    const username = user.data.username;
    const respondText = `@${username} Thanks for mentioning me!`;

    const res = await rwClient.v2.reply(respondText, tweetId);
    console.log("Replied successfully:", res.data);
  } catch (error) {
    console.error("Error replying:", error.data || error);
    if (error.status === 429 || error.data?.title === "Too Many Requests") {
      console.log("Rate limit exceeded on reply, waiting 15 minutes...");
      await new Promise(resolve => setTimeout(resolve, 15 * 60 * 1000));
    }
  }
}

// Poll every 2 minutes (120 seconds) to stay under 15 requests/15 minutes
let pollingInterval = setInterval(checkMentions, 120000);

// Initial check on startup
checkMentions();