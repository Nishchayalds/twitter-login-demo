"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
export default function Leaderboard({ leaderData }: any) {
  const [currentData, setCurrentData] = useState(leaderData);
  const [nextpage, setNextpage] = useState<any>(1);
  const [previouspage, setPreviouspage] = useState(1);

  const handlePreviousPage = async () => {
    if (currentData?.previous) {
      await axios
        .get(currentData?.previous)
        .then(({ data }: any) => {
          setCurrentData(data);
          setPreviouspage(nextpage - 1 ? 1 : nextpage - 1);
          setNextpage(undefined);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("no previous url found");
    }
  };

  const handleNextPage = async () => {
    if (currentData?.next) {
      const pageMatch = currentData?.next.match(/page=(\d+)/);
      await axios
        .get(currentData?.next)
        .then(({ data }) => {
          setCurrentData(data);
          setNextpage(pageMatch[1]);
        })
        .catch((err) => console.log("err", err));
    } else {
      console.log("no next url found");
    }
  };

  const head = [
    "#",
    "User",
    "Order",
    "Quest Honors",
    "Referrals Honors",
    "Total Honors",
  ]; 
  return (
    <div className="text-white p-8 rounded-xl border-gray-400">
      <h2 className="text-2xl font-bold mb-8">Leaderboard</h2>

      <div className="flex flex-col">
        <div className="flex justify-between ">
          {head.map((item: string, index: number) => (
            <div
              key={index}
              className={`text-textGrey ${
                item == "#" ? "w-[7%] text-start" : "w-[20%]"
              } 
              ${
                item == "User"
                  ? "text-center flex justify-center items-center "
                  : "text-center "
              }
              p-2 py-3 text-center`}
            >
              <p>{item}</p>
              {item == "User" && (
                <div className="border ml-3 h-4 w-4 flex justify-center items-center rounded-full p-0.5 text-xs">
                  <p>?</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Render the paginated data */}
        {currentData.results?.map((item: any, index: number) => {
    
          return (
            <div
              key={index}
              className="flex bg-modalColor mb-2 justify-between items-center "
            >
              <div className="text-white bg-modalColor w-[5%] py-[22px] flex justify-center items-center text-sm my-0.5 text-center rounded-tl-md rounded-bl-md">
                <p
                  className={`w-8 h-8 text-xs ${
                    item?.rank_numbers == 1
                      ? "bg-star1"
                      : item?.rank_numbers == 2
                      ? "bg-star2"
                      : item?.rank_numbers == 3
                      ? "bg-star3"
                      : "bg-[#383838]"
                  } bg-center bg-no-repeat rounded-full flex justify-center items-center`}
                >
                  {item?.rank_numbers}
                </p>
              </div>

              <div className="text-white bg-modalColor w-[20%]  bo rder py-[18px] text-sm my-0.5 text-start flex justify-start">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex justify-center items-center bg-borderDark rounded-full border border-textGrey text-textGrey p-2">
                    <FaRegUser />
                  </div>
                  <div className="text-sm font-medium text-white w-full">
                    {item?.user_name} 
                  </div>
                </div>
              </div>

              <div className="text-white bo rder bg-modalColor w-[19%] py-7 text-sm my-0.5 text-center">
                <p>{item?.rank}</p>
              </div>
              <div className="text-white bg-modalColor w-[19%] py-7 text-sm my-0.5 text-center">
                <p>{item?.quest_honors}</p>
              </div>
              <div className="text-white bg-modalColor w-[15%] py-7 text-sm my-0.5 text-center">
                <p>{item?.referral_honors}</p>
              </div>

              <div className="text-white flex justify-center items-center bg-modalColor w-[20%] py-[19px] text-sm my-0.5 text-center rounded-tr-md rounded-br-md">
                <div className="p-[1px] bg-gradient-to-r to-[#0FF378]  from-[#E6FE54] rounded-lg w-[60%]">
                  <div className="border border-transparent bg-modalColor flex justify-around items-center rounded-lg p-1.5">
                    <Image
                      src={require("../../../public/backgroud/honor.png")}
                      alt="honor.png"
                    />
                    {item?.total_honor}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pagination Controls */}
        <div className="flex gap-6 items-center bg-modalColor w-full p-4">
          <div>
            Page {nextpage ?? previouspage} of{" "}
            {Math.round(currentData?.count / 5)}
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl"
              onClick={handlePreviousPage}
              disabled={currentData.previous == null} // Disable if on the first page
            >
              <AiOutlineLeft className="h-6 w-6 rounded-full" />
            </button>
            <button
              className="flex justify-center items-center h-10 w-10 p-1 bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-800 text-white rounded-2xl"
              onClick={handleNextPage}
              disabled={currentData.next == null} // Disable if on the last page
            >
              <AiOutlineRight className="h-6 w-6 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
