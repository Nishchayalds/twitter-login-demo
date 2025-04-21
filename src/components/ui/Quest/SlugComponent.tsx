"use client";
import React, { useEffect, useState } from "react";
import CardComponent from "./cardComponent";
import Image from "next/image";
import TaskCardComponentToggle from "./TaskCardComponentToggle";
import SimpleSlider from "../Slider";
import { Avatar, AvatarGroup, Button, Tooltip } from "@nextui-org/react";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { Claim } from "@/controller/UserController";
import { useRouter } from "next/navigation";
import EditorJsonComponent from "../EditorJsonComponent";

interface IQuestSlug {
  token: any;
  user: any;
  apitoken: any;

  campaign: {
    id: number;
    title: string;
    description: string;
    image: string;
    honors: string;
    banner_image: string;
    quest: [];
    is_feature: boolean;
    completion_percentage: any;
    end_date: string;
    partner: any;
    extra_reward: any;
    is_claim: boolean;
    notes: string;
  };
  type: string;
  quest: any;
  slug: string;
  tg: any;
}

export default function SlugComponent({
  campaign,
  token,
  type,
  apitoken,
  quest,
  user,
  slug,
  tg,
}: IQuestSlug) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const router = useRouter();
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = moment(campaign?.end_date);
      const now = moment();
      const duration = moment.duration(endDate.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup timer when component unmounts
    return () => clearInterval(timer);
  }, [campaign?.end_date]);
  const [isMobile, setIsMobile] = useState(false);
  const [cliamLoading, setClaimLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const HandelClaim = async () => {
    setClaimLoading(true);
    try {
      await Claim(apitoken, {
        task: null,
        status: "C",
        honors: campaign.extra_reward,
        campaign_type: type == "P" ? "P" : type,
        campaign_id: campaign?.id,
        honors_type: "E",
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setClaimLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#1B1B1B] md:bg-none pt-2">
      <div className="h-full w-full flex flex-col justify-center items-center  ">
        <div
          className="lg:flex  justify-between 
            bg-greenShadow-m md:bg-ellipsegreenCircle bg-no-repeat bg-center 
            bg-cover md:px-16 w-full"
        >
          <div className="w-full lg:w-[75%] md:p-1 h-full ">
            <div className=" w-full">
              <div
                className=" flex flex-col-reverse md:flex-row  justify-center items-center w-full 
             md:bg-gradient-to-r md:from-[#0d0d0dc0] md:to-transparent  md:rounded-xl px-2 my-4 md:my-10"
              >
                <div className="w-full md:w-[70%] xl:w-[60%]  py-5 h-full px-3 md:p x-10">
                  <p className="pt-2 md:pt-0 text-[24px] text-start  md:text-xl ">
                    {type === "P" ? campaign?.partner?.name : campaign.title}
                  </p>
                  <p className="py-3 text-start md:py-5 font-[300] text-[14px] md:text-xs xl:text-sm text-textGrey md:w-[90%] xl:w-[75%]">
                    {type === "P" ? (
                      "Complete the following tasks to follow our social media pages and earn honors."
                    ) : (
                      <span className="whitespace-pre-wrap font-light text-[14px] md:text-xs xl:text-sm text-textGrey">
                        {campaign.description}
                      </span>
                    )}
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

              <div className=" py-4 bg-[#1B1B1B] shadow-xl md:border-t border-borderColor ">
                <div className="flex  justify-between px-3">
                  {campaign?.completion_percentage < 100 ? (
                    <div className="px-3 w-full mb-2">
                      <Tooltip
                        className="capitalize"
                        content={
                          <div className="px-1 py-2">
                            <div className="text-tiny text-darkGrey">
                              First complete all Task
                            </div>
                          </div>
                        }
                      >
                        <Button
                          className="capitalize cursor-not-allowed"
                          variant="flat"
                        >
                          Claim
                        </Button>
                      </Tooltip>
                    </div>
                  ) : !campaign?.is_claim ? (
                    <div className="">
                      <button
                          onClick={() => {
                            window.location.href = 'https://t.me/Enseiquestbot';
                          }}
                          
                        disabled={campaign?.completion_percentage < 100}
                        className={`bg-buttonColor  hover:bg-[#0ff379f3] text-black py-2 px-4 rounded-lg shadow-md hover:bg-green-dark transition duration-300 ease-in-out ${
                          campaign?.completion_percentage < 100
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {cliamLoading ? (
                          <span className="flex animate-pulse">Claim...</span>
                        ) : (
                          "Claim"
                        )}
                      </button>
                    </div>
                  ) : campaign?.is_claim ? (
                    <Button
                      className="capitalize cursor-not-allowed ml-2 md:m-0"
                      variant="flat"
                    >
                      Claimed
                    </Button>
                  ) : (
                    <div className="px-3 w-full mb-2">
                      <Tooltip
                        className="capitalize"
                        content={
                          <div className="px-1 py-2">
                            <div className="text-tiny text-darkGrey">
                              First complete all Task
                            </div>
                          </div>
                        }
                      >
                        <Button
                          className="capitalize cursor-not-allowed"
                          variant="flat"
                        >
                          Claim
                        </Button>
                      </Tooltip>
                    </div>
                  )}

                  {!campaign?.is_claim &&
                    campaign?.completion_percentage >= 100 && (
                      <p className="text-sm text-gray-200 tracking-wider ">
                        <span className="text-gray-400">
                          Get Extra Honors by completing all tasks:
                        </span>{" "}
                        {campaign?.extra_reward || 0} honors
                      </p>
                    )}
                </div>

                <div className="flex justify-between items-center p-3 py-6  ">
                  <div className="flex justify-start md:w-[70%] gap-5">
                    <div className="flex justify-center items-center gap-3 border-[1px] border-borderColor rounded-lg p-2">
                      <div className="w-2 h-2 rounded-full bg-green"></div>

                      <p className="text-[10px] md:text-xs text-[#7D7D7D]">
                        {campaign?.completion_percentage}% Progress
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-3 border-[1px] border-borderColor rounded-lg p-2">
                      <CiCalendar />
                      <p className="text-[10px] md:text-xs text-[#7D7D7D]">
                        Ends at{" "}
                        {moment(campaign?.end_date).format("Do MMMM , h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className=" w-[50%] hidden md:flex justify-end">
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

                <div className="w-[90%] h-[1px] bg-borderDark self-center mx-auto"></div>
                <div className="w-full mt-10">
                  <p className="text-xl pb-3 px-3 md:px-5">
                    Tasks{" "}
                    <span className="text-[#7D7D7D] text-medium">
                      ({campaign.honors} honors)
                    </span>
                  </p>
                  <div className="">
                    <TaskCardComponentToggle
                      tasks={campaign.quest}
                      token={apitoken}
                      user={user}
                      timeLeft={timeLeft}
                      tg={tg}
                      type={type}
                      id={campaign?.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[25%] px-2 md:px-0">
            <div className="md:ml-3  my-2 p-4 bg-modalColor border border-borderDark rounded-xl">
              <div className="flex items-center border-b-2 pb-3 border-borderDark border-dashed ">
                <div className="relative w-5 h-5 mr-2">
                  {/* <Image
                    src={require("../../../../public/backgroud/watch.png")}
                    alt="watch.png"
                  /> */}
                  <MdOutlineWatchLater className="text-green" />
                </div>
                <p>Ouest Ends in</p>
              </div>
              <div className="flex gap-5 items-center justify-center bg-[#000000] shadow-inner border border-black rounded-xl bg-opacity-[20%] p-3 mt-5">
                <div className="text-white text-xl  text-center">
                  {timeLeft.days}
                  <p className="text-white text-opacity-[20%] font-[300] text-medium">
                    Days
                  </p>
                </div>
                <div className="text-white text-xl text-center">
                  {timeLeft.hours}
                  <p className="text-white text-opacity-[20%] font-[300] text-medium">
                    Hrs
                  </p>
                </div>
                <div className="text-white text-xl text-center">
                  {timeLeft.minutes}
                  <p className="text-white text-opacity-[20%] font-[300] text-medium">
                    Mins
                  </p>
                </div>
                <div className="text-white text-xl text-center">
                  {timeLeft.seconds}
                  <p className="text-white text-opacity-[20%] font-[300] text-medium">
                    Sec
                  </p>
                </div>
              </div>
            </div>
            <div className="md:ml-3  my-10 ">
              <p className="text-xl">Honors Awarded</p>
              <div className="flex items-center bg-modalColor border border-borderDark rounded-xl p-5 mt-5">
                <p>Honors</p>
                <p className="border border-dashed h-[1px] w-[80%] mx-2 border-white border-opacity-[20%]"></p>
                <div className="flex items-center">
                  <Image
                    src={require("../../../../public/backgroud/honor.png")}
                    alt="honor.png"
                    height={30}
                    width={30}
                    loading="lazy"
                    className="mr-2"
                  />
                  <p> {campaign.honors}</p>
                </div>
              </div>
            </div>
            <div className="md:ml-3  my-10 ">
              <p className="text-xl">Notes</p>
              <div className="flex items-center bg-modalColor border border-borderDark rounded-xl p-5 mt-5">
                <p className="text-[#98989D] text-[12px]">
                  {slug == "invite-friends"
                    ? "Once each invited friend completes at least 2 quests, you can collect your honors."
                    : campaign?.notes
                    ? <EditorJsonComponent jsonData={JSON?.parse(campaign.notes)} />
                                
                    : "Each task will be manually verified. Please submit the necessary links for each task."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full flex justify-center pt-10 mb10 md:bg-tree bg-center bg-cover bg-no-repeat  ">
          <div className=" w-[90%]">
            <p className="text-2xl pb-2 mb-2 md:ml-9">More Quest</p>
            <div className="w-full flex justify-center">
              <div className=" md:px-5 w-full">
                {isMobile || quest.results?.length > 4 ? (
                  <SimpleSlider>
                    {quest.results.map((item: any, index: any) => (
                      <div className="p-0.5 md:p-2 w-full h-full " key={index}>
                        <CardComponent index={index} item={item} type={type} />
                      </div>
                    ))}
                  </SimpleSlider>
                ) : (
                  <div className="md:flex w-full">
                    {quest?.results?.map((item: any, index: any) => (
                      <div
                        className="p-0.5 md:p-2 md:w-[25%] w-full h-full "
                        key={index}
                      >
                        <CardComponent index={index} item={item} type={type} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
