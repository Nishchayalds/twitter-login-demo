"use client";
import React, { useEffect, useState } from "react";
import BannerComponent from "@/components/ui/Quest/BannerComponent";
import SimpleSlider from "@/components/ui/Slider";
import Image from "next/image";
import Link from "next/link"; 
import { FaTrophy, FaUserPlus } from "react-icons/fa";
import CardComponent from "./cardComponent"; 
import { RiShareForward2Fill } from "react-icons/ri";

const Main = ({
  tokenData,
  Quest,
  QuestInteractive,
  featuredQuest,
  partners,
}: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="w-full flex flex-col items-center">
      <div className="bg-bggreengrid bg-no-repeat bg-center bg-cover w-full h-auto flex justify-center px-4 mb-8 md:mb-0">
        <div className="w-full md:w-[95%] xl:w-[90%]  pt-[60px] lg:flex flex-wrap overflow-x-hidden p-2 ">
          <div className="w-full lg:w-8/12">
            <h1 className="font-semibold text-lg md:text-xl 2xl:text-2xl">
              Featured Quest
            </h1>

            {featuredQuest?.length > 1 ? (
              <SimpleSlider settings={"Q"}>
                {featuredQuest.map((item: any, index: any) => (
                  <BannerComponent item={item} key={index} />
                ))}
              </SimpleSlider>
            ) : (
              featuredQuest.map((item: any, index: any) => (
                <BannerComponent item={item} key={index} />
              ))
            )}
          </div>
          {/* <div className="w-full md:w-1/12"></div> */}
          <div className="w-full md:hidden lg:w-4/12  lg:flex justify-end">
            <div className="w-full md:w-[85%] p-1 bg-modalColor  rounded-xl mt-5">
              <div className="flex justify-center mx-auto px-10 2xl:px-16 mb-2 mt-6">
                <Image
                  src={require("../../../../public/backgroud/moon.png")}
                  alt="moon.png"
                />
              </div>
              <div className="mx-3">
                <p className="py-4  font-bold text-lg text-center md:text-start">
                  User Stats
                </p>
                <p className="text-center md:text-start  text-xs text-textGrey w-full  ">
                  Earn points, and claim your share of the Ensei airdrop!.
                </p>

                <div className="pt-3 md:pt-2 flex flex-col justify-center items-center text-center md:mt-1 xl:mt-3 ">
                  <div className="flex justify-between w-full  bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                    <p className="text-white  md:text-xs flex items-center  ">
                      {/* <BsFillLightningChargeFill color="#848486" /> */}
                      <Image
                        src={require("../../../../public/backgroud/honor.png")}
                        height={16}
                        width={16}
                        alt="Daimond"
                      />
                      &nbsp; Honors:
                    </p>
                    <p className="text-white  md:text-xs ">
                      {tokenData?.total_honor}
                    </p>
                  </div>
                  <div className="flex justify-between w-full my-2 bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                    <p className="text-white  md:text-xs flex items-center ">
                      <FaTrophy className="text-green" /> &nbsp; Current order:
                    </p>
                    <p className="text-white  md:text-xs ">
                      {" "}
                      {tokenData?.rank?.title}
                    </p>
                  </div>
                  <div className="flex justify-between w-full  bg-[#1B1B1B] font-[300] py-2 xl:py-3 rounded-xl px-3">
                    <p className="text-white  md:text-xs flex items-center ">
                      <FaUserPlus className="text-green" /> &nbsp; Number of
                      Referrals
                    </p>
                    <p className="text-white  md:text-xs ">
                      {tokenData?.total_referral}
                    </p>
                  </div>
                  <div className="flex justify-center mt-6 w-full px-1 ">
                    <Link
                      href={`/referral`}
                      className="text-black font-medium md:text-xs md:w-full  bg-green py-2 xl:py-3 rounded-xl px-3 mb-2 flex items-center justify-center gap-4"
                    >
                      <span>
                        <RiShareForward2Fill className="text-xl" />
                      </span>
                      <span>Earn with Referrals</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cards */}

      <div className="h-full px-4 lg:px-6 xl:px-16  mt-10 w-full">
        {Quest?.results?.length > 0 ? (
          <>
            <div className="flex justify-between items-center w-full  md:mb-0 mb-2 px-2  ">
              <p className="text-lg md:text-2xl  start-0  md:px-7">
                Onboarding Quest
              </p>
              {(isMobile || Quest?.results?.length > 4) &&
                Quest?.results?.length > 1 && (
                  <div className="bg-gray-400  bg-opacity-10 border rounded-2xl border-gray-800 px-3 py-2 sm:px-4 sm:py-2 flex justify-end items-center md:mr-6">
                    <Link href="/all-quest/onbording" className="text-sm">
                      Show all
                    </Link>
                  </div>
                )}
            </div>

            <div className="w-full flex justify-center">
              <div className=" md:px-5 w-full">
                {(isMobile || Quest?.results?.length > 4) &&
                Quest?.results?.length > 1 ? (
                  <SimpleSlider settings={"P"}>
                    {Quest.results.map((item: any, index: any) => (
                      <div key={index} className="p-1 md:p-2 w-full ">
                        <CardComponent index={index} item={item} type={"O"} />
                      </div>
                    ))}
                  </SimpleSlider>
                ) : (
                  <div className="md:flex w-full">
                    {Quest.results.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="p-1 md:p-2 md:w-[25%] w-full "
                      >
                        <CardComponent index={index} item={item} type={"O"} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center w-full">
            <p className="text-lg text-textGrey">
              No onboarding quests available
            </p>
          </div>
        )}
      </div>

      <div className=" w-full flex justify-center mt-10 mb-6 lg:px-6 xl:px-16">
        <p className="h-[1px] bg-gray-700 w-[95%]"> </p>
      </div>

      <div className="h-full w-full px-4 lg:px-6 xl:px-16 bg-tree bg-center bg-contain bg-no-repeat mt-5">
        {QuestInteractive?.results?.length > 0 ? (
          <>
            <div className="flex justify-between items-center  md:mb-0 mb-2  ">
              <p className="text-lg md:text-2xl  start-0 md:px-7">
                Interactive Quest
              </p>
              {(isMobile || QuestInteractive?.results?.length > 4) &&
                QuestInteractive?.results?.length > 1 && (
                  <div className="bg-gray-400  bg-opacity-10 border rounded-2xl border-gray-800 px-3 py-2 sm:px-4 sm:py-2 flex justify-end items-center md:mr-6">
                    <Link href="/all-quest/interactive" className="text-sm">
                      Show all
                    </Link>
                  </div>
                )}
            </div>

            <div className="w-full flex justify-center  ">
              <div className=" md:px-4 w-full">
                {(isMobile || QuestInteractive?.results?.length > 4) &&
                QuestInteractive?.results?.length > 1 ? (
                  <SimpleSlider settings={"P"}>
                    {QuestInteractive.results.map((item: any, index: any) => (
                      <div className="p-1 md:p-2 w-full h-full ">
                        <CardComponent index={index} item={item} type={"I"} />
                      </div>
                    ))}
                  </SimpleSlider>
                ) : (
                  <div className="w-full md:flex">
                    {QuestInteractive.results.map((item: any, index: any) => (
                      <div className="p-1 md:p-2 md:w-[25%] w-full h-full ">
                        <CardComponent index={index} item={item} type={"I"} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center w-full">
            <p className="text-lg text-textGrey">
              No interactive quests available
            </p>
          </div>
        )}

        <div className=" mt-8 w-full ">
          {partners?.results?.length > 0 ? (
            <>
              <div className="flex justify-between items-center  md:mb-0 mb-2">
                <p className="text-lg md:text-2xl  start-0 md:px-7">
                  Ecosystem Partners
                </p>
                {(isMobile || partners?.results?.length > 4) &&
                  partners?.results?.length > 1 && (
                    <div className="bg-gray-400  bg-opacity-10 border rounded-2xl border-gray-800 px-3 py-2 sm:px-4 sm:py-2 flex justify-end items-center md:mr-6">
                      <Link href="/partners" className="text-sm">
                        Show all
                      </Link>
                    </div>
                  )}
              </div>

              <div className="w-full flex justify-center">
                <div className=" md:px-4 w-full">
                  {(isMobile || partners?.results?.length > 4) &&
                  partners?.results?.length > 1 ? (
                    <SimpleSlider settings={"P"}>
                      {partners?.results.map((item: any, index: any) => (
                        <div key={index} className="p-1 md:p-2 w-full h-full ">
                          <CardComponent
                            index={index}
                            item={item}
                            type={"P"}
                            partner={true}
                          />
                        </div>
                      ))}
                    </SimpleSlider>
                  ) : (
                    <div className="md:flex w-full">
                      {partners?.results.map((item: any, index: any) => (
                        <div className="p-1 md:p-2 md:w-[24%] w-full h-full ">
                          <CardComponent
                            index={index}
                            item={item}
                            type={"P"}
                            partner={true}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center text-center w-full">
              <p className="text-lg text-textGrey">
                No ecosystem partners available
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
