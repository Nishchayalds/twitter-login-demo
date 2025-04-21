"use client";

import { useState, useEffect } from "react";

export default function TgLeaderBoard({ leaderData, descriptions }: any) {
  const [currentData, setCurrentData] = useState(leaderData);

  return (
    <div className="mb-16">
      {descriptions?.map((item: any, index: any) => (
        <div key={index}>
          <h2 className="text-xl font-bold">
            {item?.title ? item?.title : item?.title2}
          </h2>
          <p className="mb-6 mt-4 ">{item?.description}</p>
        </div>
      ))}

      <div className="bg-modalColor text-white p-2 rounded-xl w-full mx-auto">
        <div className="mb-4 flex justify-between items-center text-sm">
          <div>
            Shinobis <span className="text-textGrey text-sm">(Top 10)</span>
          </div>
          <div className="text-white ">Honors</div>
        </div>
        {currentData?.results?.map((user: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center  border border-gray-600 rounded-lg sm:p-4 p-2 mb-4 "
          >
            {/* User Info Block */}
            <div className="flex-2">
              <div className="flex   items-center  ">
                <div className="text-center w-8 mr-4">
                  <div
                    className={`w-8 h-8 text-xs ${
                      user?.rank_numbers === 1
                        ? "bg-star1"
                        : user?.rank_numbers === 2
                        ? "bg-star2"
                        : user?.rank_numbers === 3
                        ? "bg-star3"
                        : "bg-[#383838]"
                    } bg-center bg-no-repeat rounded-full flex justify-center items-center`}
                  >
                    <p className="text-base font-semibold">
                      {user?.rank_numbers}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="text-xs font-medium text-white">
                    {user?.user_name}
                  </div>
                  <div className="text-xs font-medium text-textGrey">
                    {user?.rank}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-2">
              <div className="flex justify-between items-center  ">
                <div className="flex flex-col justify-center gap-2">
                  <div className="text-xs font-medium text-white ">
                    {user?.referral_honors}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
