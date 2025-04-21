import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IbannerComponent {
  item: {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    banner_image: string;
    tasks: number;
    honors: number;
    is_feature: boolean;
    type: string;
  };
}

export default function BannerComponent({ item }: IbannerComponent) { 
  return (
    <div className="w-full">
      <div className="mt-[20px] bg-modalColor flex flex-wrap md:flex-nowrap overflow-hidden rounded-2xl  justify-between items-center">
        <div className="w-full md:w-[56%] pt-[50px] md:pt-[63px] pb-[55px] px-2 md:pl-12 flex flex-col items-center md:items-start justify-center order-2 md:order-1">
          <h2 className="font-bold  leading-8 tracking-tight text-2xl md:text-2xl 2xl:text-3xl text-center md:text-left line-clamp-2 h-16">
            {item?.title}
          </h2>
          <p className="mt-4 text-sm font-normal text-accent leading-5 text-center md:text-left line-clamp-2 h-10">
            {item?.description}
          </p>

          <div className="mt-7 flex flex-warp justify-between bg-darkGrey p-4 rounded-xl w-full">
            <p>Rewards</p>
            <div>{item?.honors} honors</div>
          </div>
          <Link
            className="mt-6 bg-buttonColor font-semibold py-2 px-6 w-fit rounded-xl capitalize text-black"
            href={`/quest/${item?.slug}?type=${
              item?.type == "Interactive"
                ? "I"
                : item?.type == "Onboarding"
                ? "O"
                : "P"
            }`}
          >
            Start Quest
          </Link>
        </div>
        <div className="w-full md:w-[40%] relative order-1 md:order-2">
          <div className="sm:h-96 h-56 w-full md:rounded-xl overflow-hidden  ">
            <Image
              src={
                item?.banner_image
                  ? item.banner_image
                  : require("../../../../public/backgroud/monkey.png")
              }
              alt="honor.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
