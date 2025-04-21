"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import SimpleSlider from "./Slider";

export default function MobileLeaderboard({ FdData }: any) {
  const [currentData, setCurrentData] = useState(FdData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Define how many items per page

  const totalPages = Math.round(currentData?.count / itemsPerPage); // Total pages based on count

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      // Only go back if not on the first page
      const previousPage = currentPage - 1;

      if (currentData?.previous) {
        try {
          const { data } = await axios.get(currentData.previous);
          setCurrentData(data);
          setCurrentPage(previousPage);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      // Only go forward if not on the last page
      const nextPage = currentPage + 1;

      if (currentData?.next) {
        try {
          const { data } = await axios.get(currentData.next);
          setCurrentData(data);
          setCurrentPage(nextPage);
        } catch (err) {
          console.log("err", err);
        }
      }
    }
  };

 

  return (
    <div className="mb-10">
      {currentData?.results?.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-2">My Friends</h2>
          <p className="text-sm mb-8">See how you stack up against other referral  </p>

          <div className="bg-modalColor text-white p-2 rounded-t-xl w-full mx-auto">
            <SimpleSlider settings={"L"}>
              {currentData?.results?.map((user: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-600 rounded-lg  sm:p-4 p-2 mb-4 flex"
                >
                  {/* Ranking Block */}

                  {/* User Info Block */}
                  <div className="flex-1 p-1">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-textGrey font-medium">
                          User
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center bg-borderDark rounded-full border border-textGrey text-textGrey p-2">
                          <FaRegUser />
                        </div>
                        <div className="text-sm font-medium text-white line-clamp-1">
                          {user?.user_name}
                        </div>
                      </div>
                    </div>

                    <hr className="border-textGrey" />

                    <div className="mb-2 flex justify-between py-2">
                      <div className="text-xs text-textGrey">Order</div>
                      <div className="text-xs font-semibold">{user?.order}</div>
                    </div>
                    <hr className="border-textGrey" />

                    <div className="mb-2 flex justify-between py-2">
                      <div className="text-xs text-textGrey">
                        Referral Honors
                      </div>
                      <div className="text-xs font-semibold">
                        {user?.referral_honors}
                      </div>
                    </div>

                    {/* <hr className="border-textGrey" />

                    <div className="mb-2 flex justify-between py-2">
                      <div className="text-xs text-textGrey">Rank Numbers</div>
                      <div className="text-xs font-semibold">
                        {user?.rank_numbers}
                      </div>
                    </div> */}
                    <hr className="border-textGrey" />
                    <div className="mb-2 flex justify-between py-2">
                      <div className="text-xs text-textGrey">Quest Honors</div>
                      <div className="text-xs font-semibold">
                        {user?.quest_honors}
                      </div>
                    </div>
                    <hr className="border-textGrey" />

                    <div className="flex items-center mt-2 bg-[#262626] rounded-lg justify-between py-2">
                      <div className="text-sm text-textGrey">Total Honors</div>
                      <div className="self-stretch rounded-lg border-green-700 border-[1px] border-solid flex justify-around items-center gap-2 py-0 px-[10px] pr-1 z-[5]">
                        <Image
                          src={require("../../../public/backgroud/honor.png")}
                          alt="honor.png"
                        />
                        {user?.total_honor}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          </div>

          {/* Pagination Controls */}
          <div className="flex gap-6 items-center bg-modalColor w-full p-4 ">
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2 items-center">
              <button
                className="flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl"
                onClick={handlePreviousPage}
                disabled={currentPage === 1} // Disable if on the first page
              >
                <AiOutlineLeft className="h-6 w-6 rounded-full" />
              </button>
              <button
                className="flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl"
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Disable if on the last page
              >
                <AiOutlineRight className="h-6 w-6 rounded-full" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className=" border-gray-400 border rounded-xl py-3">
          <p className="text-center text-xl">No Referrals</p>
        </div>
      )}
    </div>
  );
}
