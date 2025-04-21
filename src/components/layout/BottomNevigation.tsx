import Link from "next/link";
import React from "react";
import { FaTrophy, FaQuestionCircle, FaUser, FaShareAlt } from "react-icons/fa";
import TelegramHeader from "../Telegram/TelegramFooter";

export default function BottomNavigation() {
  const headerItems = [
    { title: "LEADERBOARD", link: "/", icon: <FaTrophy /> },
    { title: "QUEST", link: "/quest", icon: <FaQuestionCircle /> },
    { title: "PROFILE", link: "/profile", icon: <FaUser /> },
    { title: "REFERRAL", link: "/referral", icon: <FaShareAlt /> },
  ];

  return (
    // <div className=" sticky bottom-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-lg py-4 rounded-t-3xl h-20 ">
    //   <div className="flex justify-around items-center relative z-50 ">
    //     {headerItems.map((item:any, index:any) => (
    //       <Link
    //         key={index}
    //         href={item.link}
    //         className=" flex flex-col items-center text-gray-800"
    //       >
    //        <div className="flex flex-col items-center hover:text-white transition-all duration-300">
    //           <div className="text-lg mb-1">{item.icon}</div>
    //           <span className="text-[10px] font-bold  ">
    //             {item.title}
    //           </span>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>

    <div>
      <TelegramHeader />
    </div>
  );
}
