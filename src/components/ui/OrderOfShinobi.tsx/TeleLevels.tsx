"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";

const TeleLevels = ({ shinobilevels, myrank, level }: any) => {
  const [openIndex, setOpenIndex] = useState(null);
  console.log("....", myrank.total_honor);
  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pb-5 bg-[#0F0F0F]">
      {/* <div className="pt-14 mb-8 flex flex-col gap-2 justify-center items-center">
        <p className="text-lg mb-1 text-center">
          Order of <span className="text-green">Shinobi</span>
        </p>
        <div className="w-full flex justify-center ">
          <p className="pl-2  justify-center text-center text-sm w-[90%] ">
            Various versions have evolved over the years, sometimes by accident.{" "}
          </p>
        </div>
      </div> */}
      <div className=" pt-2">
        <div className="">
          <p className="text-xl font-bold">Order of Shinobi</p>
          <p className={`text-white/50 text-xs`}>
            Various versions have evolved over
          </p>
          <p className={`text-white/50 text-xs`}>
            the years, sometimes by accident.
          </p>
        </div>
      </div>

      <div className=" flex gap-5 flex-col justify-center items-center rounded-2xl mt-5">
        {shinobilevels.map((task: any, index: any) => (
          <div
            key={task.id}
            className={` w-full border border-[#222222]   bg-[#535353] bg-opacity-20 rounded-2xl`}
          >
            <div
              className="flex justify-between items-center px-8 py-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="font-semibold flex gap-5 items-center">
                <div className="flex items-center gap-1">
                  <div>
                    <p>{task.title}</p>
                  </div>
                  {myrank.total_honor > task.honor && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={require("../../../../public/order-rank-collect.png")}
                        alt="rank"
                      />
                    </div>
                  )}

                  {level == task.title && (
                    <Image
                      src={require(`../../../../public/active.png`)}
                      height={1000}
                      width={1000}
                      alt="active"
                      className="w-4 h-4 mr-3"
                    />
                  )}
                </div>
                {/* {openIndex === index ? (
                  <>
                    <GoTrophy className="text-green text-xl font-bold" />
                    {task.title}
                    {myrank.total_honor > task.honor && (
                      <div className="relative w-6 h-6">
                        <Image
                          src={require("../../../../public/order-rank-collect.png")}
                          alt="rank"
                        />
                      </div>
                    )}
                  </>
                ) : (
                 
                )} */}
              </div>
              <span className="text-4xl flex items-center justify-center text-[#373737]">
                {openIndex === index ? (
                  <HiDotsHorizontal />
                ) : (
                  <HiDotsHorizontal />
                )}
              </span>{" "}
            </div>

            {openIndex === index && (
              <div className="flex px-1 flex-col md:flex-row justify-between py-2 md:items-center">
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <p className="w-full md:w-2/3  text-sm px-5 py-2 leading-6 text-[#747474]">
                      Earn rewards! Complete quests, refer friends, and collect
                      gems for epic prizes!
                    </p>
                  </div>
                  <div className="flex w-full gap-5  px-5">
                    <div className="flex justify-evenly text-xs  md:text-sm gap-5 p-2 rounded-lg items-center">
                      <p className="text-white">Range</p>
                      <p className="font-medium text-sm text-tggreen  px-[5.4px] py-[2.4px] bg-[#262626] rounded-lg">
                        {task.starting_honor}-{task.honor}
                      </p>
                    </div>
                    <div className="flex justify-evenly text-xs md:text-sm gap-5 p-2 rounded-lg items-center">
                      <p className="text-white">Quest Honors Claim</p>

                      <p className="font-medium text-sm text-tggreen  px-[5.4px] py-[2.4px] bg-[#262626] rounded-lg">
                        {task.points}
                      </p>
                    </div>
                  </div>
                  {myrank.total_honor > task.honor ? (
                    <div className="px-5 w-full">
                      <div className="w-full h-1 bg-[#3d3d3d] rounded-full overflow-hidden my-2 ">
                        <div
                          className="h-full  bg-[#BCA2FF] transition-all"
                          style={{ width: `${100}%` }} // Adjust this for different progress levels
                        ></div>
                      </div>

                      <div className="flex justify-end">
                        <p className="text-[#747474]">Completed</p>
                        <p className="font-medium text-sm text-[#BCA2FF] ml-2 px-[5.4px] py-[2.4px] bg-[#262626] rounded-lg">
                          100 %
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 w-full">
                      <div className="w-full h-1 bg-[#3d3d3d] rounded-full overflow-hidden my-2 ">
                        <div
                          className="h-full  bg-[#BCA2FF] transition-all"
                          style={{
                            width: `${
                              Number(myrank.total_honor / task.honor) * 100
                            }%`,
                          }} // Adjust this for different progress levels
                        ></div>
                      </div>

                      <div className="flex justify-end">
                        <p className="text-[#747474]">Completed</p>
                        <p className="font-medium text-sm text-[#BCA2FF] ml-2 px-[5.4px] py-[2.4px] bg-[#262626] rounded-lg">
                          {(
                            Number(myrank.total_honor / task.honor) * 100
                          ).toFixed(2)}{" "}
                          %
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="px-5 w-full flex items-center">
                    <p className="font-medium text-sm text-[#9B9B9B] mr-2 px-[5.4px] py-[2.4px] bg-[#323232] rounded-lg">
                      {Number(task.honor - myrank.total_honor)}
                    </p>
                    <p className="text-xs">
                      Honors away from the next milestone!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeleLevels;
