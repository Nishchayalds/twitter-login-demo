"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginButton } from "@telegram-auth/react";

export default function TelegramComponent({
  botUsername,
  tokenData,
  token,
}: any) {
  return (
    <div className="text-sm text-center">
      {tokenData?.telegram_id ? (
        <div className="p-2 rounded-2xl bg-buttonColor text-black">
          Connected with telegram
        </div>
      ) : (
        <LoginButton
          botUsername={botUsername}
          onAuthCallback={(data) => {
            console.log("✅ Telegram login callback data:", data);
          }}
        />
      )}
    </div>
  );
}
