"use client";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";

export default function TelegramgiftBanner({ campaign, type }: any) {
  
  return (
    <>
      <div className=" flex flex-col rounded-3xl  bg-[rgba(47,47,47,0.4)] justify-center items-center w-full pb-2 mb-2 mt-11">
        <div className=" w-full  p-1 h-[50%] md:h-full overflow-hidden rounded-3xl ">
          {type === "P" ? (
            <Image
              src={campaign?.partner?.logo}
              alt="partner-logo"
              width={500}
              height={100}
              className="h-[30vh]   w-full object-contain rounded-3xl md:rounded-t-xl"
              />
            ) : (
              <Image
              src={campaign.banner_image ?? campaign?.image}
              alt="campaign-image"
              width={500}
              height={100}
              className="h-[30vh]  w-full object-cover rounded-3xl md:rounded-t-xl"
              />
            )}
        </div>
        {/* <div className="w-full md:w-[70%] xl:w-[60%]  py-5 h-full px-3 md:p x-10">
          <p className="pt-2 md:pt-0 text-[18px] text-start  md:text-xl font-semibold leading-7 ">
            {type === "P" ? campaign?.partner?.name : campaign.title}
          </p>
          <p className="py-3 text-start md:py-5 font-[400] leading-5 text-[13px] md:text-xs xl:text-sm text-white/40  ">
            {type === "P"
              ? "Complete the following tasks to follow our social media pages and earn honors."
              : campaign.description}
          </p>
          <div className="flex justify-start mt-5 gap-1">
            <div className="flex justify-center bg-[#1B1B1B] items-center gap-3 border-[1px] border-white/10 rounded-lg py-4 pr-4 pl-2">
              <div className="w-2 h-2 rounded-full bg-green"></div>
              <p className="text-[10px]  text-[#7D7D7D]">
                {campaign?.completion_percentage}% Progress
              </p>
            </div>

            <div className="flex justify-center items-center gap-1 border-[1px] bg-[#1B1B1B] border-white/10 rounded-lg p-1 pr-4 pl-2">
              <CiCalendar className="text-lg text-white/40" />
              <p className="text-[10px]  text-[#7D7D7D]">
                Ends at {moment(campaign?.end_date).format("Do MMMM  h:mm a")}
              </p>
            </div>
          </div>
        </div> */}
      <div className="text-white p-6 rounded-xl w-full max-w-md">
      {/* Title and Rewards */}
      <div className="flex justify-between items-center truncate">
        <p className="text-[16px] font-semibold w-3/4 truncate overflow-hidden whitespace-nowrap">
          {type === "P" ? campaign?.partner?.name : campaign.title}
        </p>
        <div className="flex items-center gap-1">
          <img src="/honorsimage.png" alt="coin" className="w-4 h-4" />
          <p className=" font-bold text-[12px] ">{campaign.honors}</p>
        </div>
      </div>

      {/* Description */}
      <div className="w-[202px]">

      <p className="text-[12px] text-[#DFDFDF] font-light">
        {type === "P"
          ? "Accept your first quest and start earning rewards."
          : campaign.description}
      </p>
      </div>

      <div className="mt-6">
      {/* Progress Bar */}
        <div className="w-full bg-[#313131] h-[2.85px] rounded-full">
          <div
            className="bg-[#BCA2FF] h-[2.85px] rounded-full"
            style={{  width: `${(campaign?.completed_task / campaign.quest.length) * 100}%` }}
          ></div>
        </div>

      {/* Task Progress */}
      <div className="flex justify-between items-center mt-2 text-[12px] text-[#747474]">
        <div className="flex items-center gap-1">
          Task
          <span className="bg-[#313131] text-[#BCA2FF] px-[5.8px] rounded ">
            {campaign.completed_task}
          </span >
          / <span className="bg-[#313131] px-[5.8px] rounded ">
            {campaign.quest.length}
          </span >
        </div>
        
        <div className=" px-2 py-0.5 rounded-full text-xs">
          Completed <span className=" text-[#BCA2FF] bg-[#313131] px-[5.8px] rounded">{((campaign?.completed_task / campaign.quest.length) * 100).toFixed(0)}%</span>
        </div>
      </div>
      </div>
    </div>
      </div>
    </>
  );
}

{/* <div className="relative flex items-center justify-between  mt-5">
  <Image
    src={require("../../../public/backgroud/giftbox-Icon.png")}
    alt="giftbox-icon.png"
    className="w-12  h-12 border p-2.5 border-white/10 rounded-lg bg-white/10 "
  />
  <div className="md:hidden block">
    <AvatarGroup isBordered max={3} size="sm">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </AvatarGroup>
  </div>
</div> */}