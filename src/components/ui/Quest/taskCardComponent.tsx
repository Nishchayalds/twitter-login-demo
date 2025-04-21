import Image from "next/image";
import React from "react";

interface ITaskCardComponent {
  item: {
    id: number;
    content: string;
    type: string;
    platform: any;
    honor: number;
  };
}
export default function TaskCardComponent({ item }: ITaskCardComponent) { 
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center py-5 my-2 border-2 border-borderDark bg-modalColor rounded-xl shadow-lg">
      <div className="flex items-center justify-start">
        <div className="relative w-10 h-10 p-2 mx-5 bg-task-bg bg-center bg-cover bg-no-repeat">
          <Image
            src={require(`../../../../public/backgroud/twitter.png`)}
            alt="twitter.png"
          />
        </div>
        <div>
          <p className="text-white text-opacity-80">{item?.content}</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-start ml-5">
        <div className="border border-borderDark rounded-full">
          <p className="font-[400] py-1 pl-5 md:pl-0 px-5 text-center text-[12px] text-[#7D7D7D] ">
            {item.honor} honors
          </p>
        </div>
        <div className="relative w-10 p-1 mx-5 ">
          <Image
            src={require("../../../../public/backgroud/task-arrow.png")}
            alt="twitter.png"
            className={`transform  -rotate-45`}
          />
        </div>
      </div>
    </div>
  );
}
