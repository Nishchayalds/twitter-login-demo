import { NextResponse } from 'next/server';
import OAuth from 'oauth';

export async function GET() {
  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    'http://localhost:3001/api/twitter/callback', // Update this for prod
    'HMAC-SHA1'
  );

  return new Promise((resolve) => {
    oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
      if (error) {
        return resolve(NextResponse.json({ error }, { status: 500 }));
      }
      resolve(
        NextResponse.json({
          oauthToken,
          oauthTokenSecret,
          url: `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
        })
      );
    });
  });
}
