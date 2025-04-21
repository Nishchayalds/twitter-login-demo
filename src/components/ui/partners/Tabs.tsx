"use client";
import { PartnerContext } from "@/app/partners/providers/context";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import TabData from "./TabData";
import RemoteController from "@/controller/RemoteController";
import { useSession } from "next-auth/react";
import { urlConstants } from "@/constants";
import { PartnerQuest, PartnerQuestBySlug } from "@/controller/UserController";

export default function Tabs() {
  const router = useRouter();
  const pathname = usePathname();

  const { category, searchData, setSearchData } = useContext(PartnerContext);

  const partnerData = async (searchValue: any) => {
    if (searchValue) router.push(`${pathname}?search=${searchValue}`);
    else router.push(`${pathname}`);
  };

  return (
    <div className="h-full w-full">
      {/* Header Tabs */}
      <div className=" md:px-10 my-8 px-4 w-full flex flex-col md:flex-row md:gap-4">
        {/* Left side */}
        <div className="flex gap-4 items-end">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center  ">
            
              <CiGlobe className="text-textGrey" />

              <p className="text-textGrey text-sm">Ecosystem</p>
            </div>

            <p className="text-2xl ">Partners</p>
          </div>
          {/* Search bar for smaller screens  */}
        </div>
        <div className="mt-2 md:hidden ml-auto w-full flex justify-center items-center ">
          <input
            type="text"
            placeholder="Search"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
              partnerData(e.target.value);
            }}
            className="bg-transparent border text-sm  border-textGrey px-8 py-2 rounded-2xl focus:outline-none focus-visible:outline-none w-full  float-end"
          />
        </div>
        {/* Tabs */}
        <div className="flex gap-4 items-end overflow-x-scroll lg:overflow-x-hidden mt-6 md:mt-0">
          <Link
            href={"/partners"}
            className={`text-sm mb-1 cursor-pointer  ${
              pathname === "/partners" ? "text-white" : "text-textGrey"
            }`}
          >
            All
          </Link>
          {category?.map((tab: any) => (
            <Link
              key={tab?.slug} // Unique key for each tab
              href={`/partners/${
                pathname.includes("partners")
                  ? tab.slug
                  : `partners/${tab.slug}`
              }`}
              className={`text-sm mb-1 cursor-pointer ${
                pathname === `/partners/${tab?.slug}`
                  ? "text-white"
                  : "text-textGrey"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* Search bar for larger screens */}
        <div className="hidden md:flex self-end ml-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
              partnerData(e.target.value);
            }}
            className="bg-transparent border border-textGrey text-xs px-4 py-2 rounded-2xl focus:outline-none focus-visible:outline-none"
          />
        </div>
      </div>

      {/* Tabs Data */}
      <div className="w-full  md:px-4   ">
        <div>
          <TabData />
        </div>
      </div>
    </div>
  );
}
