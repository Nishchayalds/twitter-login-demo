"use client";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaTrophy, FaUserPlus } from "react-icons/fa";
import CardComponent from "../ui/Quest/cardComponent";

const Slugcomponentpartner = ({ C_data, partner_Data }: any) => {
  console.log("partner_Data", partner_Data);
  console.log("c_data", C_data);
  const [cam_data, setCam_data] = useState(C_data?.results);

  return (
    <div className="">
      <div className="flex justify-evenly items-center md:flex-row flex-col px-8 md:px-20 mt-8">
        <div
          className="flex flex-col-reverse md:flex-row justify-center items-center w-full  h-fit
             md:bg-gradient-to-r md:from-[#0d0d0dc0] md:to-transparent md:rounded-xl px-2 my-4 md:my-10 border border-[#414040]"
        >
          <div className="w-full md:w-[50%]  py-5 ">
            <p className="pt-2 md:pt-0 text-[24px] text-start md:text-xl">
              {partner_Data?.name}
            </p>
            <p className="py-3 text-start md:py-5 font-[300] text-[14px] md:text-xs xl:text-sm text-textGrey md:w-[90%] xl:w-[75%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              quisquam.
            </p>
            <div className="relative flex items-center justify-between mt-5">
              <Image
                src={require("../../../public/backgroud/giftbox-Icon.png")}
                alt="giftbox-icon.png"
                className="w-10 md:w-14 h-10 md:h-14 border p-2 border-borderColor rounded-lg"
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
            </div>
          </div>

          <div className="relative w-full md:w-[60%] xl:w-[40%] md:py-5 p-1  rounded-xl md:rounded-t-xl">
            <div className="mb-4">
              <Image
                src={partner_Data?.logo}
                alt={partner_Data?.name}
                width={500}
                height={100}
                className="h-[40%] w-full object-contain rounded-xl md:rounded-t-xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-[50%] flex justify-end ">
          <div className="w-full md:w-[95%] p-1 bg-modalColor rounded-xl mt-5">
            <div className="flex justify-center mx-auto px-10 2xl:px-16 mb-2 mt-6">
              <Image
                src={require("../../../public/backgroud/moon.png")}
                alt="moon.png"
              />
            </div>
            <div className="mx-3">
              <p className="py-4 font-bold text-lg text-center md:text-start">
                User Stats
              </p>
              <p className="text-center md:text-start text-xs text-textGrey w-full">
                Earn points, and claim your share of the SUPIDO airdrop!.
              </p>

              <div className="pt-3 md:pt-2 flex flex-col justify-center items-center text-center md:mt-1 xl:mt-3 ">
                <div className="flex justify-between w-full bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                  <p className="text-white md:text-xs flex items-center">
                    <BsFillLightningChargeFill color="#848486" /> &nbsp; Honors:
                  </p>
                  <p className="text-white md:text-xs ">120</p>
                </div>
                <div className="flex justify-between w-full my-2 bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                  <p className="text-white md:text-xs flex items-center">
                    <FaTrophy color="#848486" /> &nbsp; Current Rank:
                  </p>
                  <p className="text-white md:text-xs ">Deshi</p>
                </div>
                <div className="flex justify-between w-full bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                  <p className="text-white md:text-xs flex items-center">
                    <FaUserPlus color="#848486" /> &nbsp; Number of Referrals
                  </p>
                  <p className="text-white md:text-xs ">2</p>
                </div>
                <div className="flex justify-center mt-6 w-full ">
                  <Link
                    href={`/referral`}
                    className="text-white md:text-xs w-[70%] md:w-full bg-[#ff5c00] py-2 xl:py-3 rounded-xl px-3 mb-2"
                  >
                    Earn with Referrals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full flex justify-center my-10">
        <p className="h-[1px] bg-gray-700 w-[90%]"> </p>
      </div>

      <div className="h-full w-full px-2 md:px-16 bg-tree bg-center bg-contain bg-no-repeat ">
        <div className="w-full flex justify-center">
          <div className="md:px-5 w-full flex justify-center md:justify-start">
            {cam_data.length > 0 ? (
              cam_data.map((item: any, index: any) => (
                <div
                  key={index}
                  className="p-0.5 md:p-2 w-[90%] md:w-[35%] lg:w-[25%] h-full"
                >
                  <CardComponent index={index} item={item} type={"I"} />
                </div>
              ))
            ) : (
              <div>No data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slugcomponentpartner;
