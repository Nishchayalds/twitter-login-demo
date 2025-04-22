"use client";

import TelegramComponent from "@/components/telegramcomponent";

export default function TelegramLoginPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="p-6 rounded-lg shadow-lg bg-white text-center w-[90%] max-w-md">
        <h1 className="text-xl font-semibold mb-4">Sign in with Telegram</h1>
        
        <TelegramComponent
          botUsername="aldstest_bot"
          tokenData={null} // update this with real session/token data
          token="token"   // pass actual token here
        />

        <p className="text-xs text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <a href="/term" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
