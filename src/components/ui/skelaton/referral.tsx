import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function ReferralSkelaton() {
  return (
    <div className=" flex flex-col w-full">
      <div className="px-5 flex flex-col gap-3 justify-between items-center py-10">
        <Skeleton
          className="h-[10vh]  w-[70%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
        <Skeleton
          className="h-[15vh]  w-[90%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>
      <div className="px-5">
        <Skeleton
          className="h-[20vh] md:h-[50vh] w-full rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>

      <div className="px-5 flex flex-col gap-3 justify-between items-center py-10">
        <Skeleton
          className="h-[5vh]  w-[90%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
        <Skeleton
          className="h-[8vh]  w-[90%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>

      <div className="px-5">
        <Skeleton
          className="h-[50vh] md:h-[50vh] w-full rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>
    </div>
  );
}
