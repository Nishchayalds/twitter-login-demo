import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const Lightgreen = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col  items-center h-screen bg-tgback w-full bg-center bg-cover bg-no-repeat">
      <div className="xxs:h-[45vh] xs:h-[50vh]  flex items-end">
        <Image
          alt="banner"
          src={require("../../../public/tglogo.png")}
          className=" w-48 object-contain pb-20"
        />
      </div>
      <div className="h-[45vh]  flex flex-col w-full justify-evenly   ">
        <div className="px-12 pb-10">
          <div className="text-3xl font-normal">
            <p>Complete Quest. </p>
            <p>Level Up. </p>
            <p>Earn Rewards.</p>
          </div>
          <p className="mt-2 text-[14px] text-[#FFFFFF] opacity-50">
            Join the Web3 revolution—complete
          </p>
          <p className="mt-2 text-[14px] text-[#FFFFFF] opacity-50">
            challenges, earn rewards, and grow
          </p>
          <p className="mt-2 text-[14px] text-[#FFFFFF] opacity-50">
            your portfolio effortlessly.
          </p>
        </div>
        <div
          className="flex justify-center items-center w-full  px-3 "
          onClick={() => router.push("/")}
        >
          <div className="flex justify-between items-center w-full  px-3 py-1 bg-[#1D1D1D] rounded-full  border-t-[1px] border-t-[#666666]">
            <div className="pl-5">GET STARTED</div>
            <div className="w-14 h-14 bg-[#B6FFA3] rounded-full flex justify-center items-center text-black">
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightgreen;