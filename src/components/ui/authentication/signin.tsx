'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LoginButton } from "@telegram-auth/react";

export default function SigninComponent() {
  const telegramButtonRef = useRef<HTMLDivElement>(null);

  const handleTwitterLogin = async () => {
    await signIn("twitter").catch((err: any) => console.log(err, "err"));
  };

  const triggerTelegramLogin = () => {
    if (typeof window === "undefined") {
      // This is the server – don't try to access DOM
      return;
    }
  
    try {
      const iframe = telegramButtonRef.current?.querySelector("iframe");
      const button = iframe?.contentWindow?.document?.querySelector("button") as HTMLButtonElement;
  
      if (button) {
        button.click();
      } else {
        console.warn("Telegram login button not ready yet.");
      }
    } catch (error) {
      console.error("Unable to trigger Telegram login:", error);
    }
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center md:bg-tree md:bg-center md:bg-contain md:bg-no-repeat ">
      <div className="z-50 w-full unbounded flex justify-center items-center">
        <div className="bg-[#0000004d] border border-white border-opacity-[10%] rounded-xl flex flex-col justify-around items-center">
          <div className="px-24 md:px-36 py-12">
            <p className="text-sm md:text-[18px] font-medium">
              Sign in with Twitter
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

          {/* Telegram Button */}
          <div className="w-full px-6 pb-6">
            <div
              className="cursor-pointer rounded-xl w-full bg-modalColor flex justify-between items-center px-4 py-5"
              onClick={triggerTelegramLogin}
            >
              <p className="text-[15px] font-semibold">Telegram</p>
              <Image
                src={require("../../../../public/backgroud/telegram.png")}
                alt="telegram.png"
                className="w-8"
              />
            </div>

            {/* Hidden Telegram Login Button */}
            <div className="hidden" ref={telegramButtonRef}>
              <LoginButton
                botUsername="aldstest_bot"
                onAuthCallback={(data) => {
                  console.log("Telegram login successful!");
                  console.log("User data received:", data);
                }}
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

      {/* Shadow image */}
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
