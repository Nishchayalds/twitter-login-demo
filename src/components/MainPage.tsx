"use client";
import React, { useEffect, useState } from "react";
import Claim from "@/components/Telegram/tap/components/claim/Claim";
import { updateUser } from "@/controller/UserController";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import WebApp from "@twa-dev/sdk";

const MainPage = async ({

  token,
  CoinsData,
  User_Token,
  record
}: any) => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", pass: "" });
  const checkTel = async (user: any) => {
    if (user) {
      const tokenTelegramId = Number(token?.telegram_id);
      const userTelegramId = Number(user?.id);
      if (token?.telegram_id) {
        if (tokenTelegramId != userTelegramId) {
          signOut({ callbackUrl: "/tg-login" });
          if (window) window.location.reload();
        } else {
          router.refresh();
        }
      } else {
        await updateUser(token, { telegram_id: userTelegramId })
          .then(() => {
            router.refresh();
          })
          .catch(() => {
            router.refresh();
          });
      }
    }
  };

  useEffect(() => {
    const user = WebApp?.initDataUnsafe?.user;
    checkTel(user);
  }, [])
  return (
    <div>
      <Claim coins={CoinsData} User_Token={User_Token} token={token} record={record}/>

      {/* 
    <TgMain
      tokenData={tokenData}
      Quest={Quest}
      QuestInteractive={QuestInteractive}
      featuredQuest={featuredQuest}
      partners={partners}
      token={token}
    />
    <TapMain
      tokenData={tokenData}
      Quest={Quest}
      QuestInteractive={QuestInteractive}
      featuredQuest={featuredQuest}
      partners={partners}
      token={token}
      CoinsData={CoinsData}
    />
     */}
    </div>
  );
};

export default MainPage;
