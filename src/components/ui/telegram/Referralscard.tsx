"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const Referralscard = ({ rank, icon, text, description, show, redirect }: any) => {
  const router = useRouter()
  return (
    <div className="bg-[#212121] rounded-lg w-full p-3.5">
      <div className="flex justify-between items-center w-full">
        <p className="font-normal text-sm">Referrals</p>
        {show && <p className="font-normal text-sm">{rank}</p>}
      </div>
      <p className="text-[#AAAAAA] text-sm font-normal">{description}</p>

      <div onClick={()=> router.push("/referral")} className="flex items-center gap-3 mt-3.5">
        <span className="text-green text-2xl">{icon}</span>
        <span className="font-normal text-sm text-green">{text}</span>
      </div>
    </div>
  );
};

export default Referralscard;
