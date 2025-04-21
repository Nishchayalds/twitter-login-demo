import { Card, Skeleton } from "@nextui-org/react";
import CardSkelaton from "./card";

export default function BannerSkelaton() {
  return (
    <div className=" flex flex-col ">
      <div className="px-5 flex justify-between py-10">
        <Skeleton
          className="h-[5vh]  w-[49%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
        <Skeleton
          className="h-[5vh]  w-[49%] rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>
      <div className="px-5">
        <Skeleton
          className="h-[30vh] md:h-[50vh] w-full rounded-lg"
          style={{ background: "#7b7878ba" }}
        />
      </div>

      <div className="w-full px-5 flex justify-between py-3">
        {[1, 1, 1].map(() => (
          <Skeleton
            className="h-3 w-[30%] rounded-lg py-3 mt-5"
            style={{ background: "#7b7878ba" }}
          />
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-3 px-5">
        {[1, 1, 1, 1, 1].map(() => (
          <div className="max-w-[300px] w-full flex items-center gap-3 my-3">
            <div>
              <Skeleton
                className="flex rounded-lg w-12 h-12"
                style={{ background: "#7b7878ba" }}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton
                className="h-3 w-3/5 rounded-lg"
                style={{ background: "#7b7878ba" }}
              />
              <Skeleton
                className="h-3 w-4/5 rounded-lg"
                style={{ background: "#7b7878ba" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
