import { Avatar, AvatarGroup } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const GiftBanner = ({ type, campaign }: any) => {
  return (
    <div
      className=" flex flex-col-reverse md:flex-row  justify-center items-center w-full 
             md:bg-gradient-to-r md:from-[#0d0d0dc0] md:to-transparent  md:rounded-xl px-2 my-4 md:my-10"
    >
      <div className="w-full md:w-[70%] xl:w-[60%]  py-5 h-full px-3 md:p x-10">
        <p className="pt-2 md:pt-0 text-[24px] text-start  md:text-xl ">
          {type === "P" ? campaign?.partner?.name : campaign.title}
        </p>
        <p className="py-3 text-start md:py-5 font-[300] text-[14px] md:text-xs xl:text-sm text-textGrey md:w-[90%] xl:w-[75%]">
          {type === "P"
            ? "Complete the following tasks to follow our social media pages and earn honors."
            : campaign.description}
        </p>
        <div className="relative flex items-center justify-between  mt-5">
          <Image
            src={require("../../../../public/backgroud/giftbox-Icon.png")}
            alt="giftbox-icon.png"
            className="w-10 md:w-14 h-10 md:h-14  border p-2 border-borderColor rounded-lg "
          />
          <div className="md:hidden block">
            <AvatarGroup isBordered max={3} size="sm">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </div>
        </div>
      </div>
      {/* <div className="relative w-full md:w-[60%] xl:w-[40%]  py-5  p-1 h-[50%] md:h-full rounded-xl md:rounded-t-xl">
                  <Image
                    src={campaign.banner_image ?? campaign?.image}
                    alt="monkey.png"
                    width={500}
                    height={100}
                    className="h-[30vh] w-full object-cover rounded-xl md:rounded-t-xl"
                  />
                </div> */}
      <div className="relative w-full md:w-[60%] xl:w-[40%] md:py-5 p-1 h-[50%] md:h-full rounded-xl md:rounded-t-xl">
        {type === "P" ? (
          <Image
            src={campaign?.partner?.logo}
            alt="partner-logo"
            width={500}
            height={100}
            className="h-[30vh]  xl:h-[40vh] w-full object-contain rounded-xl md:rounded-t-xl"
          />
        ) : (
          <Image
            src={campaign.banner_image ?? campaign?.image}
            alt="campaign-image"
            width={500}
            height={100}
            className="h-[30vh] xl:h-[40vh] w-full object-cover rounded-xl md:rounded-t-xl"
          />
        )}
      </div>
    </div>
  );
};

export default GiftBanner;
