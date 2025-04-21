"use client"; // Marks this as a client-side component
import TelegramComponent from "@/components/telegramcomponent";
import CardComponent from "@/components/ui/Quest/cardComponent";
import SimpleSlider from "@/components/ui/Slider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { GoDiamond } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function ClientQuest({
  token,
  tokenData,
  dashbordcam,
  rank,
  myrank,
}: any) {
  const currentLevel = tokenData?.rank?.id;
  const totalLevels = 10;
  const progressPercentage = (currentLevel / totalLevels) * 100;

  const [questType, setQuestType] = useState("active");
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
    <div className="h-full w-full unbounded">
      <div className="w-full flex items-center justify-center bg-ellipsegreenCircle bg-no-repeat bg-top bg-contain relative md:h-[70vh] ">
        <div className="w-full md:w-[50%] h-[70%] flex justify-center top-0 border-red-400 ">
          <div className=" bg-semi-circle bg-no-repeat bg-center bg-contain flex justify-center  w-full h-full  ">
            <div className="w-full flex relative justify-center">
              <div className="mt-8 w-full h-full gap-4 flex flex-col items-center ">
                {/* <Image
                  src={require("../../../../public/backgroud/profile-image.png")}
                  alt="profile-image"
                  className="w-20 h-20 rounded-full md:block"
                /> */}
                <div
                  style={{ background: tokenData?.color_code }} 
                  className="w-16 h-16 rounded-full md:block"
                >
                  <div 
                    className="   rounded-full text-center w-full h-full flex justify-center items-center backdrop-blur-xl text-2xl"
                  >
                    <FaUser className="text-2xl" />
                  </div>
                </div>
                
                    {/* {tokenData?.user_name.charAt(0)} */}
                <div className="flex-col flex gap-8 justify-center">
                  <p className="flex justify-center items-center text-3xl ">
                    {tokenData?.user_name}
                  </p>
                  <div className="flex justify-center gap-3">
                    <div className="flex justify-center items-center p-2 px-3 backdrop-blur-sm bg-white/5 flex-inline rounded-lg border-borderColor text-xs text-[#CDCDCD] gap-2">
                      <Image
                        src={require("../../../../public/backgroud/honor.png")}
                        alt="profile-image"
                        className="w-4 h-4 md:block"
                      />

                      <p>{tokenData?.total_honor}</p>
                    </div>
                    <div className="flex justify-center items-center p-1 border backdrop-blur-sm bg-white/5  rounded-lg border-borderColor text-xs text-[#CDCDCD]">
                      <p>{tokenData?.rank.title}</p>
                    </div>
                  </div>
                </div>

                <TelegramComponent
                  botUsername={`Enseiquestbot`}
                  tokenData={tokenData}
                  token={token}
                />
                {/*  Devyanitelegram_bot*/}
                <div className="flex justify-center flex-col w-[70%]">
                  <div className="flex px-1 justify-between items-center rounded-lg">
                    <p className="text-base font-semibold">
                      Level {currentLevel}
                    </p>
                    <p className="border border-borderColor rounded-md px-3 py-1 backdrop-blur-sm bg-white/5 text-xs text-[#CDCDCD]">
                      {currentLevel}/{totalLevels}
                    </p>
                  </div>
                  <div className="relative mt-2 w-full h-2 rounded-full bg-gray-300">
                    <progress
                      value={progressPercentage}
                      max={100}
                      className="absolute inset-0 w-full h-full appearance-none bg-transparent"
                    ></progress>
                    <div
                      className="h-full absolute inset-0 rounded-full bg-green transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col   py-10  justify-evenly  items-center gap-8 md:gap-0 overflow-hidden  ">
        {[
          {
            title: "Total Honors",
            value: tokenData?.total_honor,
            image: "Group3.png",
            summery: `You have a total of ${tokenData?.total_honor} Honors. You've earned ${tokenData?.quest_honors} from quests, ${tokenData?.referral_honors} from referrals.  and ${tokenData?.daily_bonus} from daily claims  `,
          },
          {
            title: "Rank Progress",
            value: tokenData?.rank.title,
            image: "op2.png",
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
            image: "win2.png",
            summery: ` You've earned ${tokenData?.referral_honors} Honores from your referrals. Keep sharing to accumulate more rewards!`,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="md:w-[27%] h-72  w-[90%]  border-2 border-borderDark space-y-5 px-7 py-7 rounded-2xl bg-gradient-to-br from-black/70 via-green/5 to-green/15"
          >
            <div>
              <div className="w-fit px-3 py-3 bg-green md:rounded-xl rounded-lg flex justify-center items-center text-black md:text-xs text-[10px]">
                <div className="flex gap-2 justify-center">
                  <Image
                    src={`/backgroud/${item?.image}`}
                    alt="Group.png"
                    className="object-contain"
                    width={15}
                    height={10}
                  />
                  <div className="text-sm">{item?.title}</div>
                </div>
              </div>
            </div>
            <div className="text-2xl  font-bold ">{item?.value}</div>
            <div className="text-sm  ">{item?.summery}</div>
          </div>
        ))}
      </div>

      {/* Quest Type Buttons */}
      <div className="w-full py-10 mb-10 flex gap-10 space-y-2 px-3 justify-center items-center">
        <div className="flex justify-center gap-5 border border-[#0FF37826] py-1 px-2 rounded-full ">
          <button
            className={`py-2 gap-2 flex md:text-[16px] text-sm items-center rounded-full px-[14px] md:px-10 ${
              questType === "active" ? " bg-green text-black" : ""
            }`}
            onClick={() => setQuestType("active")}
          >
            <IoIosCheckmarkCircleOutline
              className={`${questType === "active" && "text-black"}`}
            />
            Active Quests
          </button>
          <button
            className={`py-2 gap-2 flex md:text-[16px] text-sm items-center rounded-full px-2 md:px-10 ${
              questType === "history" ? " bg-green text-black" : ""
            }`}
            onClick={() => setQuestType("history")}
          >
            <GoDiamond
              className={`${questType === "history" && "text-black"}`}
            />
            Quest History
          </button>
        </div>
      </div>

      {/* Quest Lists */}
      <div className="w-full ">
        <div className={`px-5  w-full  `}>
          {questType === "active" ? (
            <div
              className={`w-full ${
                !isMobile && dashbordcam.inprogress.length <= 4
                  ? "flex  "
                  : "block"
              }`}
            >
              {dashbordcam.inprogress.length > 0 ? (
                !isMobile && dashbordcam.inprogress.length <= 4 ? (
                  dashbordcam.inprogress.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="p-0.5 md:p-2 w-full md:w-[25%] h-full "
                    >
                      <CardComponent
                        index={index}
                        item={item}
                        type={
                          item?.type == "Onboarding"
                            ? "O"
                            : item?.type == "Interactive"
                            ? "I"
                            : "P"
                        }
                      />
                    </div>
                  ))
                ) : (
                  <SimpleSlider settings={"P"}>
                    {dashbordcam?.inprogress.map((item: any, index: any) => (
                      <div key={index} className="p-0.5 md:p-2 w-full h-full ">
                        <CardComponent
                          index={index}
                          item={item}
                          type={
                            item?.type == "Onboarding"
                              ? "O"
                              : item?.type == "Interactive"
                              ? "I"
                              : "P"
                          }
                        />
                      </div>
                    ))}
                  </SimpleSlider>
                )
              ) : (
                <p>No active quests available</p>
              )}
            </div>
          ) : questType === "history" ? (
            <div
              className={`w-full ${
                !isMobile && dashbordcam.completed.length <= 4
                  ? "flex  "
                  : "block"
              } `}
            >
              {dashbordcam.completed.length > 0 ? (
                !isMobile && dashbordcam.completed.length <= 4 ? (
                  dashbordcam.completed.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="p-0.5 md:p-2 w-full md:w-[24%] h-full "
                    >
                      <CardComponent
                        index={index}
                        item={item}
                        type={
                          item?.type == "Onboarding"
                            ? "O"
                            : item?.type == "Interactive"
                            ? "I"
                            : "P"
                        }
                      />
                    </div>
                  ))
                ) : (
                  <SimpleSlider settings={"P"}>
                    {dashbordcam.completed.map((item: any, index: any) => (
                      <div key={index} className="p-0.5 md:p-2 w-full h-full ">
                        <CardComponent
                          index={index}
                          item={item}
                          type={
                            item?.type == "Onboarding"
                              ? "O"
                              : item?.type == "Interactive"
                              ? "I"
                              : "P"
                          }
                        />
                      </div>
                    ))}
                  </SimpleSlider>
                )
              ) : (
                <p>No quest history available</p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* <div className="w-full flex items-center justify-center my-5">
        <TopLeaderboard rank={rank.results} myrank={myrank} />
      </div> */}
    </div>
  );
}
