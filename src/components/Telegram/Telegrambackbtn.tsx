"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Telegrambackbtn = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();

    setTimeout(() => {
      router.refresh();
    }, 300);
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="text-whitebg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-300     md:flex justify-center items-center px-4 py-2 rounded-full cursor-pointer"
      >
        <IoIosArrowBack />
      </button>
    </div>
  );
};

export default Telegrambackbtn;
