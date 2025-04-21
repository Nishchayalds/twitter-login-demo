import React from "react";
import { MdOutlineTask } from "react-icons/md";

const TGComponents = ({index , item, type}:any) => {
    console.log("item: " , item)
  return (
    <div className="p-1">
      <div className="">
        {[1, 2, 3, 4]?.map((item: any, index: any) => (
          <div className="border border-gray-300 rounded p-2 w-full mb-2">
            <div className="bg-[#27B055] p-1 w-full rounded bg-opacity-50">
              <span className="text-[12px]">Title</span>
              <div className="flex w-full justify-between items-center pt-0.5 gap-2">
                <p className="w-[50%] line-clamp-1 text-sm">Title</p>
                <button className="w-[25%] bg-[#1B1B1B] rounded-full flex justify-center items-center text-[8px] px-2 py-1">
                  <MdOutlineTask /> &nbsp; 50 Task
                </button>
                <button className="w-[25%] bg-[#1B1B1B] rounded-full text-[8px] px-2 py-1">
                  &#11045; &nbsp; 50 honers
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TGComponents;
