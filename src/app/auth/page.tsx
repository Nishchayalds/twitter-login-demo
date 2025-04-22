'use client';

import { LoginButton } from "@telegram-auth/react";
import { useState } from "react";

export default function TelegramLoginPage() {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Login with Telegram
      </h1>

      <LoginButton
        botUsername="aldstest_bot" // Change this to your bot username
        onAuthCallback={(data) => {
            try {
              console.log("Telegram login successful!");
              console.log("User data received:", data);
            } catch (error) {
              console.error("Error handling Telegram login data:", error);
            }
          }}
      />

      
    </div>
  );
}
