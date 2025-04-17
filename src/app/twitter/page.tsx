"use client";

import React from "react";
import TwitterLogin from "react-twitter-login";

const CONSUMER_KEY = process.env.TWITTER_ID ?? "";
      
const CONSUMER_SECRET = process.env.TWITTER_SECRET ?? "";

const TwitterLoginPage = () => {
  const authHandler = (err:any, data:any) => {
    console.log("Twitter Auth Result:", err, data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login with Twitter</h2>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={CONSUMER_KEY}
        consumerSecret={CONSUMER_SECRET}
      />
    </div>
  );
};

export default TwitterLoginPage;
