'use client';

import React, { useState } from 'react';

const TwitterLoginPage = () => {
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleLogin = async () => {
    const res = await fetch('/api/twitter/reverse');
    const data = await res.json();
    console.log(data,"data")
    if (data.url) {
      window.location.href = data.url; // redirect to Twitter
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-blue-700 to-blue-900 text-white font-sans">
    <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-semibold mb-6">Login with Twitter</h2>
      <button
        onClick={handleLogin}
        className="flex items-center cursor-pointer gap-3 bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition duration-300"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
          alt="Twitter"
          className="w-5 h-5"
        />
        Sign in with Twitter
      </button>
    </div>
  </div>
  );
};

export default TwitterLoginPage;
