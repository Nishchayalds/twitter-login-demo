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
import { BiCopy } from "react-icons/bi";

const CopyLink = ({ userData }: any) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [shareData, setShareData] = useState<boolean>(false);

  function ShareButtons({ urlData }: any) {
    const shareUrl = ` https://quest.ensei.io/auth?referral=${urlData}`;
    const quote = "Check out this awesome App! ";
    return (
      <div className="flex gap-5  bg-white shadow p-1 roun ded-b-full rounded ">
        <WhatsappShareButton url={shareUrl} title={quote}>
          <WhatsappIcon
            size={40}
            round={true}
            className="mb-2 hover:border-green-500 hover:border-2  rounded-full hover:p-1 transition-all ease-in-out duration-150"
          />
        </WhatsappShareButton>

        <TelegramShareButton url={shareUrl} title={quote}>
          <TelegramIcon
            size={40}
            round={true}
            className="mb-2 hover:border-green-500 hover:border-2  rounded-full hover:p-1 transition-all ease-in-out duration-150"
          />
        </TelegramShareButton>
      </div>
    );
  }

  const handelScroll = () => {
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
    window.addEventListener("scroll", handelScroll);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handelScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCopyLink = () => {
    const referralLink = `https://t.me/Enseiquestbot?start=ref_${userData?.referral_code}`;

    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess("Link copied succesfully!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy Link: ", err);
      });
  };
  return (
    <>
      <div className={`w-full flex justify-between items-center`}>
        <div className="rounded-lg border border-borderColor bg-[#2F2F2F] bg-opacity-20 shadow-lg w-[85%] text-xs px-2 flex items-center justify-between py-3">
          <p className="text-[#989898] bg-transparent truncate px-5 ">
          https://t.me/Enseiquestbot?start=ref_ {userData?.referral_code}
          </p>

          <button
            onClick={handleCopyLink}
            className="text-tggreen text-[10px] w-[15%]"
          >
            <BiCopy className="h-5 w-5" />
          </button>
        </div>

        <div className="relative" ref={targetElementRef}>
          <div
            onClick={() => setShareData(!shareData)}
            className={`text-2xl border border-borderColor rounded-2xl bg-[#2F2F2F] bg-opacity-20 ${
              shareData ? "rounded-b-none" : ""
            }  p-3 text-white  cursor-pointer`}
          >
            <CiShare2 />
          </div>

          <div
            className={`${
              shareData
                ? "translate-y-0  ease-in-out duration-500  "
                : "translate-y-[-95%]   ease-in-out duration-500 "
            } absolute  items-center justify-center top-12 right-0 opacity-100 z-50`}
          >
            {shareData && <ShareButtons urlData={userData?.referral_code} />}
          </div>
        </div>
      </div>
      <div>
        {copySuccess && (
          <span className="text-tggreen text-sm">{copySuccess}</span>
        )}
      </div>
    </>
  );
};

export default CopyLink;
