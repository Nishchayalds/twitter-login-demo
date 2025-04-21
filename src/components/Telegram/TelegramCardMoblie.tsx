"use client";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import defaultIcon from "../../../public/Shuriken1.png";
interface IcarComponent {
  index: number;
  item: any;
  type: string;
  partner?: boolean;
  token?: any;
}

export default function TelegramCardMoblie({
  item,
  type,
}: IcarComponent): any {
  // console.log(item, "items")
  // console.log(item?.completed_task, "itemsssssss")
  return (
    <>
      <div className="flex w-full gap-4 bg-[#2F2F2F]/20 pl-[15px] pr-[31.85px] py-3 rounded-3xl">
        <div
          // style={type !== "P" ? { background: item?.color } : {}}
          className={`rounded-[8px] mt-1 `}
        >
          <div
          // ${type !== "P" && " w-9 h-9 bg-telegrid-trending"}
          // className={`rounded-[8px]`}
          >
            {/* {type == "P" ? (
              item?.partner?.logo ? (
                <Image
                  src={item?.partner?.logo}
                  alt="honor.png"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                // <div
                //   style={{ background: item?.color }}
                //   className="rounded-[8px]"
                // >
                //   <p
                //     className={`  rounded-[8px] w-9 h-9  bg-telegrid-trending`}
                //   ></p>
                // </div>
                <Image
                  src={defaultIcon}
                  alt={item?.icon_image}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )
            ) : (
              <Image
                src={item?.icon_image ? item?.icon_image : defaultIcon}
                alt={item?.icon_image}
                width={40}
                height={40}
                className="rounded-full"
              />
            )} */}
          </div>
        </div>

        <div className="w-full" onClick={() => (window.location.href = `/quest/${item?.slug}?type=${type}`)}>
          <div className="w-full flex items-center justify-between">
            <div className="w-full">
              <div className="flex justify-between w-full">
                <p className="text-sm font-medium line-clamp-1 text-[#E0E0E0] tracking-wider">
                  {item?.title}
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src={require("../../../public/honours.png")}
                    height={700}
                    width={700}
                    alt="Quest"
                    className="w-5 h-5" />
                  <span className="font-sm text-[#E0E0E0]"> {item?.honors}</span>
                </div>
              </div>
              <div className="w-full h-1 bg-[#3d3d3d] rounded-full overflow-hidden my-2">
                <div
                  className="h-full bg-[#BCA2FF] transition-all"
                  style={{ width: `${(item?.completion_percentage)}%` }} // Adjust this for different progress levels
                ></div>
              </div>

              <p className="flex items-center justify-between pt-1 text-[12px] w-full">
                <button className="text-xs flex items-center gap-1 font-normal py-[5px] rounded-full text-center tracking-wider">
                  <p className="text-[#747474] font-medium text-sm">Task </p>
                  <span className="bg-[#181818] px-[8px] py-[4px] rounded-md text-[#BCA2FF]">{item?.completed_task}</span>
                  <span className="text-[#747474]">/</span>
                  <span className="bg-[#181818]  px-[8px] py-[4px] rounded-md text-[#747474]">{item?.tasks}</span>
                </button>
                {type == "P" || item?.partner?.name ? (
                  item?.partner?.name ? (
                    <span className="font-[300] text-white/[80%]">
                      {item?.partner?.name}
                    </span>
                  ) : (
                    <span className="font-[300] text-white/[80%]">
                      {item?.partner}
                    </span>
                  )
                ) : (
                  <span className="text-[#747474] font-medium text-xs">
                    Completed {item?.completion_percentage}%
                  </span>
                )}
              </p>
            </div>

            {/* <Link href={`/quest/${item?.slug}?type=${type}`}>
              <button className="border border-[#232323] font-normal text-xs bg-white/10 rounded-full px-[15px] py-[10px]">
                Start
              </button>
            </Link> */}
          </div>

          {/* <p className="border-1.5 mt-[15px] w-full border-[#232323]   "></p> */}
        </div>
      </div>
    </>
  );
}
