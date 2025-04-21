"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
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
            signIn(
              "telegram-login",
              {
                username: tokenData?.id,
                token: token,
                callbackUrl: "/dashboard",
              },
              data as any
            );
          }}
        />
      )}
    </div>
  );
}
