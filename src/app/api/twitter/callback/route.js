import { NextResponse } from 'next/server';
import OAuth from 'oauth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const oauth_token = searchParams.get("oauth_token");
  const oauth_verifier = searchParams.get("oauth_verifier");

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  return new Promise((resolve) => {
    oauth.getOAuthAccessToken(
      oauth_token,
      null,
      oauth_verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          return resolve(NextResponse.json({ error }, { status: 500 }));
        }
        resolve(
          NextResponse.json({
            oauthAccessToken,
            oauthAccessTokenSecret,
            screen_name: results.screen_name
          })
        );
      }
    );
  });
}
