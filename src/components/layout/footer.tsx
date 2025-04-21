"use client";
import Image from "next/image";
import React from "react";
import TelegramFooter from "../Telegram/TelegramFooter";
import { useSession } from "next-auth/react";

export default function Footer() {
  const tokendata: any = useSession();
  const tg = tokendata && tokendata?.data?.loginType == "TG" ? true : false;
  return !tg ? (
    <div className="w-full flex justify-center bg-transparent mt-10 ">
      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[95%] relative text-xs py-1 pb-3 gap-4 md:gap-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:justify-start gap-[4.5px] max-w-full">
          <Image
            className="w-[95.7px] h-[35px]  object-contain  "
            alt="logo.png"
            src={require("../../../public/backgroud/logo.png")}
          />
          <div className="self-stretch relative leading-[16px] text-[#525252] text-center md:text-start">
            Copyright © 2024 Ensei. All Rights Reserved.
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-end box-border max-w-full text-smi text-white py-2 md:py-0">
          <div className="w-full flex items-center gap-8  md:gap-10 justify-end ">
            <div className="flex flex-row items-center justify-start gap-2 ">
              <Image
                className="h-5 w-7 "
                loading="lazy"
                alt=""
                src={require("../../../public/backgroud/discord-logo.png")}
              />
              <div className="hidden md:flex flex-col items-start justify-start pt-0.5 px-0 pb-0 ">
                {/* <div className="relative leading-[20px] font-medium ">
                  Discord
                </div> */}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-2 ">
              <Image
                className="h-5 w-6 "
                loading="lazy"
                alt=""
                src={require("../../../public/backgroud/x-logo.png")}
              />
              <div className="hidden md:flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                {/* <div className="relative leading-[20px] font-medium ">
                  X (Twitter)
                </div> */}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-2 ">
              <Image
                className="h-5 w-6 "
                loading="lazy"
                alt=""
                src={require("../../../public/backgroud/telegram.png")}
              />
              <div className="hidden md:flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                {/* <div className="relative leading-[20px] font-medium ">
                  Telegram
                </div> */}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-2 ">
              <Image
                className="h-5 w-6 "
                loading="lazy"
                alt=""
                src={require("../../../public/backgroud/linkdin-logo.png")}
              />
              <div className="hidden md:flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                {/* <div className="relative leading-[20px] font-medium ">
                  Linkdin
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="pt-20">
      <div className=" w-full fixed z-40 bottom-0  ">
        <TelegramFooter />
      </div>
    </div>
  );
}
