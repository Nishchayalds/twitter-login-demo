"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IbannerComponent {
  item: {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    banner_image: string;
    tasks: number;
    honors: number;
    is_feature: boolean;
    type: string;
    name: string;
  };
}

export default function TelegramMobileBanner({ item }: IbannerComponent) {
 
  return (
    <>
      <div className="w-full mt-6  rounded-xl overflow-hidden relative  border-1 border-[#FFFFFF0D]">
        <div className="h-80 absolute inset-0 ">
          <Image
            src={
              item?.banner_image
                ? item.banner_image
                : require("../../../public/backgroud/monkey.png")
            }
            alt="honor.png"
            objectFit="contain"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-lg "
          />
          <div className="absolute  inset-0  rgba  "></div>
        </div>
        <div className="w-full md:w-[56%]  pt-5 relative pb-[55px] px-2 md:pl-12 flex flex-col gap-3 md:items-start justify-center order-2 md:order-1">
          <Image
            src={require("../../../public/9b9f8bd3468f42afb0edc55eeaf1291b.jpg@2x.png")}
            alt="honor.png"
            objectFit="contain"
            className=" rounded-lg"
          />
          <p className=" leading-8 tracking-tight text-sm"> SynergyAI </p>
          <h2 className="font-bold leading-8 tracking-tight text-sm">
            {item?.title}
          </h2>

          <div className="flex flex-wrap justify-between bg-darkGrey p-4 rounded-full w-full">
            <p>Rewards</p>
            <div className="flex gap-3 items-center">
              <Image
                src={require("../../../public/backgroud/honor.png")}
                alt="honor.png"
                objectFit="contain"
              />
              {item?.honors} honors
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
