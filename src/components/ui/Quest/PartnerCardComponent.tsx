import Image from "next/image";
import React from "react";

interface IPartnerCardComponent {
  item: { name: string; logo: string; campaign: string };
}

export default function PartnerCardComponent({ item }: IPartnerCardComponent) {
  return (
    <div className="py-3  m-1 w-full flex flex-col justify-around items-center border border-[#313131] rounded-2xl bg-modalColor shadow-xl">
      <div className="flex flex-col justify-center items-center  rounded-full">
        <Image
          alt={item?.logo}
          src={item?.logo}
          width={200}
          height={200}
          className="w-14 md:w-20 h-14 md:h-20 rounded-full mb-3"
        />
        <p className="text-xs md:text-lg">{item?.name}</p>
        <p className="text-[10px] md:text-xs text-[#848486] mt-5">
          {item?.campaign} Quests
        </p>
      </div>
    </div>
  );
}
