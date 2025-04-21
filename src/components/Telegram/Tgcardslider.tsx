import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../ui/Slider";

const Tgcardslider = ({ tokenData }: any) => {
  const items = [
    {
      title: "Total Honors",
      value: tokenData?.total_honor,
      image: "Group.png",
      summery: `You have a total of ${tokenData?.total_honor} Honors. You've earned ${tokenData?.quest_honors} from quests, ${tokenData?.referral_honors} from referrals.`,
    },
    {
      title: "Rank Progress",
      value: tokenData?.rank.title,
      image: "Vector.png",
      summery: `Your current order is ${tokenData?.rank.title}. You're ${(
        (tokenData?.total_honor * 100) / tokenData?.rank.honor +
        1
      ).toFixed(0)}% of the way to ${tokenData?.next_level.title}! Earn ${
        tokenData?.rank.honor - tokenData?.total_honor + 1
      } more Honors to level up and achieve your next rank.`,
    },
    {
      title: "Referrals",
      value: tokenData?.total_referral,
      image: "Group208.png",
      summery: `You've earned ${tokenData?.referral_honors} Honors from your referrals. Keep sharing to accumulate more rewards!`,
    },
  ];

  return (
    <div className="py-10 px-3 mt-10">
      <SimpleSlider settings={"T"}>
        {items.map((item, index) => (
          <div
            key={index}
            className="h-72  border-2 border-borderDark space-y-5 px-7 py-7 rounded-2xl bg-gradient-to-br from-[#000] via-[#0b1710] to-[#002b13]"
          >
            <div className="w-fit px-3 py-3 bg-[#3ee38b] md:rounded-xl rounded-lg flex justify-center items-center text-black md:text-xs text-[10px]">
              <div className="flex gap-2 justify-center">
                <Image
                  src={`/backgroud/${item?.image}`}
                  alt={item.title}
                  className="object-contain"
                  width={15}
                  height={10}
                />
                <div className="text-sm">{item?.title}</div>
              </div>
            </div>
            <div className="text-2xl font-bold">{item?.value}</div>
            <div className="text-sm">{item?.summery}</div>
          </div>
        ))}
      </SimpleSlider>
    </div>
  );
};

export default Tgcardslider;
