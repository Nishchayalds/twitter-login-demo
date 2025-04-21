"use client";
import { PartnerContext } from "@/app/partners/providers/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import TabData from "./TabData";

export default function Tgtabs() {
  const { category, searchData, setSearchData } = useContext(PartnerContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-full w-full flex flex-col">
      {/* Sticky Header */}
      <div className="sticky z-30 top-16 h-[20vh] bg-[#1B1B1B] overflow-hidden">
        <div className="mt-6 text-center w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
              router.push(`?search=${e.target.value}`);
            }}
            className="bg-transparent border border-textGrey text-xs px-4 py-2 rounded-2xl focus:outline-none"
          />
        </div>

        {/* Header Tabs */}
        <div className="md:my-16 md:px-10 my-8 px-4 flex flex-col md:flex-row md:gap-4">
          {/* Left Side */}
          <div className="flex gap-4 items-end md:mt-0">
            <div className="flex flex-col">
              <p className="text-textGrey text-xs font-bold">Ecosystem</p>
              <p className="text-2xl font-bold">Partners</p>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              <Link
                href={"/partners"}
                className={`text-xs mb-1 cursor-pointer ${
                  pathname === "/partners" ? "text-white" : "text-textGrey"
                }`}
              >
                All
              </Link>
              {category?.map((tab: any) => (
                <Link
                  key={tab?.slug}
                  href={`/partners/${tab.slug}`}
                  className={`text-xs mb-1 cursor-pointer ${
                    pathname === `/partners/${tab?.slug}`
                      ? "text-white"
                      : "text-textGrey"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar for Larger Screens */}
          <div className="hidden md:flex self-end ml-auto">
            <input
              type="text"
              placeholder="Search"
              value={searchData}
              onChange={(e) => {
                setSearchData(e.target.value);
                router.push(`?search=${e.target.value}`);
              }}
              className="bg-transparent border border-textGrey text-xs px-4 py-2 rounded-2xl focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tabs Data with Vertical Scroll */}
      <div className="w-full overflow-y-auto flex-grow md:my-16 md:px-10 px-4">
        <div>
          <TabData />
        </div>
      </div>
    </div>
  );
}
