"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { CiHeart, CiShare2 } from "react-icons/ci";

import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const CopyLink = ({ userData, type, tg }: any) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [shareData, setShareData] = useState<boolean>(false);

  function ShareButtons({ urlData }: any) {
    const shareUrl = `https://quest.ensei.io/auth?referral=${urlData}`;
    const quote = "Check out this awesome App!";

    return (
      <div className="flex gap-5 bg-white shadow p-1 rounded-b-full rounded">
        <WhatsappShareButton url={shareUrl} title={quote}>
          <WhatsappIcon
            size={40}
            round={true}
            className="mb-2 hover:border-green-500 hover:border-2 rounded-full hover:p-1 transition-all ease-in-out duration-150"
          />
        </WhatsappShareButton>

        <TelegramShareButton url={shareUrl} title={quote}>
          <TelegramIcon
            size={40}
            round={true}
            className="mb-2 hover:border-green-500 hover:border-2 rounded-full hover:p-1 transition-all ease-in-out duration-150"
          />
        </TelegramShareButton>
      </div>
    );
  }

  const handleScroll = () => {
    setShareData(false);
  };

  const targetElementRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      targetElementRef.current &&
      !targetElementRef.current.contains(event.target)
    ) {
      setShareData(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCopyLink = () => {
    const referralLink = `https://quest.ensei.io/auth?referral=${userData?.referral_code}`;

    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess("Link copied successfully!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy Link: ", err);
      });
  };

  return (
    <>
      <div className="w-full flex mt-4 justify-between">
        <div
          className={`rounded-lg border border-borderColor md:backdrop-blur-sm bg-white/10 shadow-lg md:w-[85%] ${
            type === "Q" ? "w-[65%]" : "w-[85%]"
          } text-xs px-2 md:py-2 flex items-center justify-between`}
        >
          <button
            onClick={handleCopyLink}
            className="text-green text-[10px] md:text-xs md:w-[25%]"
          >
            Copy Link
          </button>
        </div>

        <div className="relative flex justify-end ml-4" ref={targetElementRef}>
          <div
            onClick={() => setShareData(!shareData)}
            className={`text-2xl border rounded-full ${
              shareData ? "rounded-b-none" : ""
            } p-2 text-white cursor-pointer`}
          >
            <CiShare2 />
          </div>

          <div
            className={`${
              shareData
                ? "translate-y-[-95%] ease-in-out duration-500"
                : "translate-y-0 ease-in-out duration-500"
            } absolute z-40 items-center justify-center top-12 opacity-100`}
          >
            {shareData && <ShareButtons urlData={userData?.referral_code} />}
          </div>
        </div>
      </div>
      <div>{copySuccess && <span className="text-green">{copySuccess}</span>}</div>
    </>
  );
};

export default CopyLink;
