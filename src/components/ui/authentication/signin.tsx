'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SigninComponent() {
  const handleTwitterLogin = async () => {
    await signIn("twitter").catch((err: any) => console.log(err, "err"));
  };

  const handleTelegramLogin = () => {
    window.open("https://t.me/aldstest_bot?start=login", "_blank");
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center md:bg-tree md:bg-center md:bg-contain md:bg-no-repeat">
      <div className="z-50 w-full unbounded flex justify-center items-center">
        <div className="bg-[#0000004d] border border-white border-opacity-[10%] rounded-xl flex flex-col justify-around items-center">
          <div className="px-24 md:px-36 py-12">
            <p className="text-sm md:text-[18px] font-medium">
              Sign in with Twitter or Telegram
            </p>
          </div>

          {/* Twitter Button */}
          <div className="w-full px-6 pb-4">
            <div
              className="cursor-pointer rounded-xl w-full bg-modalColor flex justify-between items-center px-4 py-5"
              onClick={handleTwitterLogin}
            >
              <p className="text-[15px] font-semibold">Twitter</p>
              <Image
                src={require("../../../../public/backgroud/twitt.png")}
                alt="twitter.png"
                className="w-8"
              />
            </div>
          </div>

          {/* Custom Telegram Button */}
          <div className="w-full px-6 pb-6">
            <div
              className="cursor-pointer rounded-xl w-full bg-modalColor flex justify-between items-center px-4 py-5"
              onClick={handleTelegramLogin}
            >
              <p className="text-[15px] font-semibold">Telegram</p>
              <Image
                src={require("../../../../public/backgroud/telegram-icon.png")}
                alt="telegram.png"
                className="w-8"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="pb-11 text-xs text-center flex justify-center w-full items-center">
            <div className="md:px-28 text-xs px-2">
              <p className="text-accent pb-0.5">
                By connecting your Account, you agree to our
              </p>
              <p className="text-accent">
                <Link href="/term" className="border-b border-accent">
                  Terms of Service
                </Link>{" "}
                and our{" "}
                <Link href="/privacy" className="border-b border-accent">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Shadow */}
      <div className="md:hidden -z-0 absolute bottom-0 w-full flex justify-center items-center opacity-75">
        <Image
          src={require("../../../../public/backgroud/PopUp Shadow Green.png")}
          alt="shining"
          height={1000}
          width={1000}
        />
      </div>
    </div>
  );
}
