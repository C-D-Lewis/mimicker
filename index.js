const { readFileSync } = require('fs');
const TwitterLite = require('twitter-lite');
const fetch = require('node-fetch');

const {
  /** Twitter API Consumer key */
  CONSUMER_KEY,
  /** Twitter API Consumer secret */
  CONSUMER_SECRET,
  /** Twitter API access token key */
  ACCESS_TOKEN_KEY,
  /** Twitter API access token secret */
  ACCESS_TOKEN_SECRET,
  /** Quotes file S3 URL */
  QUOTES_FILE_URL,
} = process.env;

const client = new TwitterLite({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

/**
 * The main function
 */
const postQuoteTweet = async () => {
  try {
    // Fetch quotes file
    const quotes = await fetch(QUOTES_FILE_URL).then(r => r.text()).then(d => d.split('\n'));

    // Choose one at random
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotes[index].trim();

    // Tweet it
    const res = await client.post("statuses/update", { status: quote });
    console.log({ res });
    return res;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Lambds function handler.
 *
 * @param {object} event - Lambda event data.
 * @param {object} context - Lambda context data.
 * @returns {object} valid Lambda response object.
 */
module.exports.handler = async (event, context) => {
  const res = await postQuoteTweet();

  return { statusCode: 200, body: JSON.stringify(res) };
};
