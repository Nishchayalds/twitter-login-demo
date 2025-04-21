import BottomDrawer from "@/components/ui/BottomDrawer";
import { useEnergy } from "@/context/EnergyContext";
import { svgIcons } from "@/SVG";
import { LevelsIcons } from "@/SVG/levelIcon";
import React, { useEffect, useState } from "react";
interface Item {
  id: number;
  title: string;
  content: string;
  color: string;
  value: string;
  svgIcons: any;
}

export default function TapHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [innerModal, setInnerModal] = useState<boolean>(false);
  const [active, setActive] = useState<Item>();
  const { walletPoints } = useEnergy();

  const all_items: Item[] = [
    {
      id: 1,
      title: "Multi-Tap",
      content: "Boost points you receive with each tap.",
      color: "gradient-to-r from-[#FF0F7B] to-[#F89B29]",
      value: "1x",
      svgIcons: LevelsIcons?.OneX,
    },
    {
      id: 2,
      title: "Energy points recovery",
      content: "Speed up energy points recovery",
      color: "gradient-to-r from-[#0061FF] to-[#60EFFF]",
      value: "10 Sec",
      svgIcons: LevelsIcons?.energy,
    },
    {
      id: 3,
      title: "Energy points maximum",
      content: "Increase the energy points maximum",
      color: "gradient-to-r from-[#8BB81A] to-[#41A50B]",
      value: "5000",
      svgIcons: LevelsIcons?.maxEnergy,
    },
    {
      id: 4,
      title: "Auto-tap",
      content: "Earn boost points while you’re away",
      color: "gradient-to-r from-[#4776E6] to-[#8E54E9]",
      value: "500",
      svgIcons: LevelsIcons?.autoTap,
    },
  ];

  useEffect(() => {
    if (innerModal) {
      setIsOpen(false);
    }
  }, [innerModal]);
  const test = "156382";

  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 text-white bg -darkGrey backdrop-blur-lg rounded-lg rounded-t-none shadow-md">
        {/*  first div */}
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            {svgIcons?.boostPoints}
            <span className="font-bold opacity-50 text-xs leading-none w-min text-left">
              BOOST POINTS
            </span>
          </div>
          <code className="font-bold text-md">
            {/* {walletPoints.toLocaleString()} */}
            {Number(walletPoints).toLocaleString("en-IN")}
          </code>
        </div>

        {/* second div */}
        <div className="flex flex-col items-center cursor-pointer">
          <div className="flex items-center gap-x-3 cursor-pointer">
            <div className="flex items-center gap-x-1">
              {svgIcons?.boost}
              <span className="font-bold text-xs leading-none w-min text-left">
                BOOST LEVELS
              </span>
            </div>
            <div
              onClick={() => setIsOpen(true)}
              className={`${
                isOpen
                  ? "rotate-90 duration-150 ease-in-out"
                  : "rotate-0 duration-150 ease-in-out"
              }`}
            >
              {svgIcons?.arrow}
            </div>
          </div>
        </div>
      </div>

      <BottomDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title=""
        closable
        onOuterClosed={() => {
          setIsOpen(false);
        }}
        height={500}
      >
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className=" text-white  flex flex-col gap-3">
            <h1 className="font-bold text-[2rem] mx-auto">Boost Levels</h1>
            <p className="opacity-40 text-sm text-center">
              Your earn boost points as you tap on the artwork. Use these points
              to level up and speed up your collection journey.
            </p>
          </div>

          <div className="text-white">
            {all_items.map((item: Item, index: number) => {
              return (
                <div className="flex gap-3 mt-2" key={item.id}>
                  <button
                    type="button"
                    className="flex flex-grow gap-x-4 py-4 border-b border-gray-700"
                  >
                    <div className="w-[50px] rounded-lg">
                      <div
                        className={`h-1 w-full rounded-t-lg bg-${item?.color}`}
                      ></div>
                      <div className="p-2 bg-gray-700 rounded-b-lg">
                        <div className="flex flex-col gap-y-2 items-center">
                          {item?.svgIcons}
                          <span className="text-xs leading-none font-bold">
                            {item?.value}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div className="flex justify-between items-end w-full">
                        <span className="text-sm font-bold">{item?.title}</span>
                        <span
                          onClick={() => {
                            setInnerModal(true);
                            setActive(item);
                          }}
                        >
                          {svgIcons?.arrow}
                        </span>
                      </div>
                      <div className="flex flex-col gap-y-2 w-full">
                        <p className="opacity-40 text-xs w-full text-left">
                          {item?.content}
                        </p>
                        <div className="flex gap-x-3 items-center w-full justify-between">
                          <div className="flex rounded overflow-hidden flex-grow">
                            <div
                              className="h-2 bg-white"
                              style={{ width: "12.5%" }}
                            ></div>
                            <div className="h-2 bg-white opacity-40 flex-1"></div>
                          </div>
                          <p className="text-xs leading-none flex gap-x-1 font-bold">
                            <span>LEVEL 1</span>
                            <span className="opacity-40">/</span>
                            <span className="opacity-40">8</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </BottomDrawer>

      {/* inneModal */}
      <BottomDrawer
        isOpen={innerModal}
        onClose={() => {
          setInnerModal(false);
          setIsOpen(true);
        }}
        title=""
        closable
        onOuterClosed={() => {
          setInnerModal(false);
          setIsOpen(true);
        }}
        height={500}
      >
        {[active]?.map((item: any, index: number) => (
          <div key={item?.id} className="overflow-y-auto h-full flex flex-col">
            <div className="flex flex-col items-center   gap-y-3">
              <h1 className="text-[2rem] font-bold text-center leading-9">
                {/* Energy points maximum */}
                {item?.title}
              </h1>
              <p className="text-lg font-bold opacity-40 text-center px-3 leading-6">
                {/* Increase the energy points maximum */}
                {item?.content}
              </p>

              <div className="flex gap-x-3 items-center w-full justify-between border-primary-700 border-b pb-6">
                <div className="flex rounded overflow-hidden flex-grow">
                  <div
                    className="h-2 bg-white transition-all duration-500"
                    style={{ width: "12.5%" }}
                  ></div>
                  <div className="h-2 bg-white opacity-40 flex-1"></div>
                </div>
                <p className="text-xs leading-none flex gap-x-1 font-bold">
                  <span>LEVEL 1</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-40">8</span>
                </p>
              </div>

              <div className="flex justify-between items-start pt-4  w-full py-4 border-primary-700 border-b">
                <div className="w-[83px] flex justify-end">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[50px] rounded-lg">
                      <div className="h-1 w-full rounded-t-lg bg-gradient-to-r from-[#8BB81A] to-[#41A50B]"></div>
                      <div className="p-2 bg-primary-700 rounded-b-lg">
                        <div className="flex flex-col gap-y-2 items-center">
                          {item?.svgIcons}
                          <span className="text-xs leading-none font-bold">
                            {item?.value}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center w-[55px]">You have now</p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="30"
                  fill="none"
                  viewBox="0 0 39 30"
                  className="opacity-40 mt-4"
                >
                  <path
                    fill="#fff"
                    d="M38.318 12.546v5.818H35.41v2.909H32.5v2.909h-2.91v2.909h-2.908V30h-5.818v-5.818h2.909v-2.91h2.909v-2.908H.5v-5.818h26.182v-2.91h-2.91V6.727h-2.908V.91h5.818v2.91h2.909v2.908H32.5v2.91h2.91v2.909"
                  ></path>
                </svg>

                <div className="w-[100px] flex justify-start">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[50px] rounded-lg">
                      <div className="h-1 w-full rounded-t-lg bg-gradient-to-r from-[#8BB81A] to-[#41A50B]"></div>
                      <div className="p-2 bg-primary-700 rounded-b-lg">
                        <div className="flex flex-col gap-y-2 items-center">
                          {item?.svgIcons}
                          <span className="text-xs leading-none font-bold">
                            7,000
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center w-[75px]">
                      Upgrade to the next level
                    </p>
                    <div className="flex items-end gap-x-2 text-xs">
                      {svgIcons?.boostPoints}
                      <span className="text-xs font-bold">10,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full pt-2 pb-3 flex flex-col gap-y-6">
                <div className="flex justify-between">
                  <p className="text-xs opacity-40">Boost points available</p>
                  <div className="w-[100px] flex">
                    <div className="flex items-end gap-x-2 justify-center">
                      {svgIcons?.boostPoints}
                      <span className="text-xs font-bold">1,415</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-full">
                  <button
                    type="button"
                    className="w-full px-6 py-2 text-[1.125rem] font-semibold rounded-md bg-white text-black  text-base"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </BottomDrawer>
    </>
  );
}
