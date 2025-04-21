"use client";
import SimpleSlider from "@/components/ui/Slider";
import Questcategories from "./Questcategories";
import Rankcard from "../ui/telegram/Rankcard";
import Referralscard from "../ui/telegram/Referralscard";
// import TelegramHeader from "./Telegramheader";
import Image from "next/image";
import Link from "next/link";
import { LuInfinity } from "react-icons/lu";
import { RiShareForward2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUser } from "@/controller/UserController";
import { decryptData } from "../../../cryptoUtils";
import Cookies from "js-cookie";
import { MenuItem } from "@nextui-org/react";
import moment from "moment";

const TgMain = async ({
  tokenData,
  Quest,
  QuestInteractive,
  featuredQuest,
  partners,
  token,
}: any) => {

  // const [hourDiff, setHourDiff] = useState<{ [key: number]: string }>({});

  // useEffect(() => {
  //   const now = new Date();
  //   const updatedDiffs: { [key: number]: string } = {};
  
  //   featuredQuest?.forEach((item: any) => {
  //     const endDate = new Date(item?.value?.end_date || item?.end_date);
  //     const diffMs = endDate.getTime() - now.getTime();
  
  //     const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  //     const days = Math.floor(totalHours / 24);
  //     const hours = totalHours % 24;
  
  //     updatedDiffs[item.id] =
  //       days > 0 ? `${days}D ${hours}h` : `${hours}h`;
  //   });
  
  //   setHourDiff(updatedDiffs);
  // }, [featuredQuest]);
  // const router = useRouter();
  // const [user, setUser] = useState({ name: "", pass: "" });

  
  const now = moment();
  return (
    <main className="w-full">
      <div className=" w-full bo rder">
        <div className="">
          {/* <TelegramHeader
            token={token}
            cancel={"Back"}
            title={""}
            show={false}
          /> */}
        </div>
        <div className="w-full px-5">
          {/* <div className="text-center  py-7">
            <p className="font-normal text-[16px] text-center">Total Honors</p>
            <div className="flex items-center justify-center gap-1">
              <Image
                src={require("../../../public/avtars/daimond.png")}
                height={30}
                width={30}
                alt="Daimond"
              />
              <span className="text-[43px] font-semibold">
                {tokenData?.total_honor}
              </span>
            </div>
          </div> */}

          {/* <div className="mb-2.5">
            <Rankcard rank={tokenData?.rank?.title} />
          </div>

          <div className="">
            <Referralscard
              rank={token?.total_referral}
              description={`You've earned ${token?.referral_honors} Honors`}
              icon={<RiShareForward2Fill />}
              text={"Earn Referrals Points"}
              show={false}
              redirect={true}
            />
          </div> */}

          <div className="w-full mb-[41px] mt-[44px]">
            {/* <h1 className="font-medium text-sm mb-2">Featured Quest</h1> */}

            <SimpleSlider settings={"Q"}>
              {featuredQuest?.map((item: any, index: any) => (
                <div key={index} className="relative h-[475px] w-full rounded-3xl overflow-hidden">
                  <Image
                    src={item?.banner_image}
                    height={1000}
                    width={1000}
                    alt="Quest"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  />
                  <div className="w-full absolute bottom-0 z-10 p-2 bg-gradient-to-t from-black via-black/90 via-80% to-transparent">
                    <div className="px-3">

                      <p className="font-normal text-[18px] mb-2">{item?.title}</p>
                      <p className="text-[14px] mb-3">{item?.description}</p>
                      <div className="flex gap-5 items-center mb-3">
                        <div className="flex gap-1 items-center">
                          <Image
                            src={require("../../../public/backgroud/order-inactive-footer.png")}
                            height={700}
                            width={700}
                            alt="Quest"
                            className="w-5 h-5" />
                          <p className="font-normal text-[14px] text-white line-clamp-1">
                            {" "}
                            {item?.honors} Honors
                          </p>
                          {/* <Image
                            src={require("../../../public/honours.png")}
                            height={1000}
                            width={1000}
                            alt="Quest"
                            className="w-4 h-5" /> */}

                        </div>
                        <div className="flex gap-1 items-center">
                          <Image
                            src={require("../../../public/fire.png")}
                            height={700}
                            width={700}
                            alt="Quest"
                            className="w-4 h-4" />
                          <span className="text-[14px]">
                            {item?.category_level === 'E'
                              ? 'Easy'
                              : item?.category_level === 'M'
                              ? 'Medium'
                              : item?.category_level === 'H'
                              ? 'Hard'
                              : item?.category_level}
                          </span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <Image
                            src={require("../../../public/countdown.png")}
                            height={700}
                            width={700}
                            alt="Quest"
                            className="w-4 h-4" />
                          <span className="text-[14px] flex items-center gap-1">
                            {
                              item?.time_unlimited ? (
                                <LuInfinity className="w-5 h-5 ml-1" />
                              ) : (
                                (() => {
                                  const days = Math.floor(moment.duration(moment(item?.end_date).diff(now)).asDays());
                                  const hours = moment.duration(moment(item?.end_date).diff(now)).hours();
                                  const minutes = moment.duration(moment(item?.end_date).diff(now)).minutes();

                                  let display = '';

                                  if (days > 0) {
                                    display += `${days}d` ;
                                  } else if (hours > 0) {
                                    display += `${hours}h` ;
                                  } else if (minutes > 0) {
                                    display += `${minutes}m`;
                                  }

                                  return display.trim() || 'Expired';
                                })()
                              )
                            }
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-[#313131] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#BCA2FF] transition-all"
                          style={{ width: `${(item?.completed_task / item?.tasks) * 100}%` }} // Adjust this for different progress levels
                        ></div>
                      </div>
                      <button className="text-xs font-normal py-[10px] rounded-full text-center tracking-wider">
                        <span className="bg-[#181818] px-[8px] py-[4px] rounded-md text-[#BCA2FF]">{item?.completed_task}</span>
                        <span className="text-[#747474]">/</span>
                        <span className="bg-[#181818]  px-[8px] py-[4px] rounded-md text-[#747474]">{item?.tasks}</span>
                      </button>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <Link
                        href={`/quest/${item?.slug}?type=${item?.type == "Interactive"
                          ? "I"
                          : item?.type == "Onboarding"
                            ? "O"
                            : "P"
                          }`}
                        className="w-full justify-center bg-[#181818] text-[#1A1A1A] flex items-center gap-2 text-[14px] font-medium py-[16px] px-[15px] rounded-2xl text-center"
                      >
                        <span className="text-[#B6FFA3]">Start Quest</span>
                        <Image
                          src={require("../../../public/start-arrow.png")}
                          height={100}
                          width={100}
                          alt="Quest"
                          className="w-6 h-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          </div>
        </div>
      </div>

      {/* cards */}
      <Questcategories
        Quest={Quest}
        featuredQuest={featuredQuest}
        QuestInteractive={QuestInteractive}
        partners={partners}
        token={token}
      />
    </main>
  );
};

export default TgMain;
