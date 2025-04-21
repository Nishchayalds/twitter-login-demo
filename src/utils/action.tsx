"use server";

import getUser from "@/controller/UserController";
import { NextResponse } from "next/server";
import { decrypt, encrypt } from "./crypto";
import { cookies } from "next/headers";
import axios from "axios";

const response = NextResponse.next();

export const DeleteCookies = () => {
  cookies().delete("userData");
};
export const GetCookies = async () => {
  const data = cookies().get("userData");
  return await decrypt(data?.value);
};

export const UpdateToken = async (token: any) => {
  const res = await getUser(token);

  const data = {
    user: {
      image: token?.user?.image,
    },
    id: res?.id,
    rank: {
      id: res?.rank?.id,
      title: res?.rank?.title,
      honor: res?.rank?.honor,
      starting_honor: res?.rank?.starting_honor,
      points: res?.rank?.points,
      rank: res?.rank?.rank
    },
    next_level: {
      id: res?.next_level?.id,
      title: res?.next_level?.title,
      honor: res?.next_level?.honor,
      starting_honor: res?.next_level?.starting_honor,
      points: res?.next_level?.points,
    },
    quest_honors: res?.quest_honors,
    total_referral: res?.total_referral,
    referral_honors: res?.referral_honors,
    is_active: res?.is_active,
    created_at: res?.created_at,
    updated_at: res?.updated_at,
    name: res?.name,
    user_name: res?.user_name,
    referral_code: res?.referral_code,
    total_honor: res?.total_honor,
    telegram_id: res?.telegram_id,
    daily_bonus: res?.daily_bonus,
    referred : res?.referred_by
  };
  await GetCookies(); 

  return data;
};

export async function getSession(t: string) {
  const token = cookies().get("userData");

  if (!token) return UpdateToken(t);
  const _user = await decrypt(token.value);

  return _user;
}


export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
