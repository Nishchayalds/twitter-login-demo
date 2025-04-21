"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";

const Levels = ({ shinobilevels }: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  }; 

  return (
    <div className="mb-5">
      <div className="mt-16 mb-16 flex flex-col gap-2 justify-center items-center">
        <p className="text-2xl lg:text-5xl mb-1 text-center">
          Order of <span className="text-green">Shinobi</span>
        </p>
        <div className="w-full flex justify-center ">
          <p className="pl-2  justify-center text-center w-[90%] md:w-1/3">
            Various versions have evolved over the years, sometimes by accident.{" "}
          </p>
        </div>
      </div>

      <div className="md:px-5 px-2  flex gap-5 flex-col justify-center items-center rounded-full">
        {shinobilevels.map((task: any, index: any) => (
          <div
            key={task.id}
            className={`hover:border w-[90%] border border-[#222222] hover:border-buttonColor bg-[#222222] ${
              openIndex === index ? "rounded-lg " : "rounded-full "
            }`}
          >
            <div className="flex justify-between items-center px-10 py-3 cursor-pointer"
              onClick={() => toggleAccordion(index)}
             >
              <span className="font-semibold flex gap-5 items-center">
                {openIndex === index ? (
                  <> 
                    <GoTrophy className="text-green text-xl font-bold"/>
                    {task.title} 
                    <FaCheckCircle className="text-green text-xl font-bold"/>
                  </>
                ) : (
                  <span>{task.title}</span>
                )}
              </span>
              <span className="text-4xl flex items-center justify-center">
                {openIndex === index ? <HiDotsHorizontal /> : <HiDotsHorizontal />}
              </span>{" "}
                 
            </div>
            {openIndex === index && (
              <div className="flex px-1 flex-col md:flex-row justify-between py-2 md:items-center">
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <p className="w-full md:w-2/3  text-sm px-5 py-2 leading-6 text-white">
                      Share the love! Get Quest completions from referrals,
                      Collect Gems, and Redeem Epic Rewards! 🏆 💰
                    </p> 
             
                  </div>
                  <div className="flex w-full gap-5 flex-col md:flex-row px-5">
                    <div className="flex justify-evenly text-xs  md:text-sm gap-5 p-2 rounded-lg bg-[#1B1B1B] items-center">
                      <p className="text-[#848486]">Honors Range</p>
                      {task.starting_honor}-{task.honor} <IoDiamondOutline />
                    </div>
                    <div className="flex justify-evenly text-xs md:text-sm gap-5 p-2 rounded-lg bg-[#1B1B1B] items-center">
                      <p className="text-[#848486]">Quest Honors Claim</p>
                      {task.points}
                      <IoDiamondOutline />
                    </div>
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

export default Levels;
