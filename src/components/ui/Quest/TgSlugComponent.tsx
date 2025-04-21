"use client";
import TelegramgiftBanner from "@/components/Telegram/TelegramgiftBanner";
import TelegramHeader from "@/components/Telegram/Telegramheader";
import {
  getConnectedWalletAddress,
  handleWalletConnect,
  initializeTonConnect,
  sendTonTransaction,
  startTimer,
  toggleButtonClaimVisibility,
} from "@/constants/walletFunction";
import { Claim } from "@/controller/UserController";
import { Button, Tooltip } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomDrawer from "../BottomDrawer";
import TaskCardComponentTgToggle from "./TaskCardComponentTgToggle";
import { toast } from "react-toastify";
import { Modal } from "../modal";
import TaskSubmit from "./TeleTaskSubmit";
import SlugModal from "../modal/notesPopup";
import { LuInfinity } from "react-icons/lu";


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
    time_unlimited:boolean;
  };
  type: string;
  quest: any;
  tg: any;
  slug: any;
}

export default function TgSlugComponent({
  campaign,
  type,
  apitoken,
  quest,
  user,
  tg,
  slug,
}: IQuestSlug) {
  const router = useRouter();
  const [cliamLoading, setClaimLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState<number>(100);
  const [ton_wallet, setTon_wallet] = useState<any>(null);
  const [connect_wallet_address, setConnect_wallet_address] = useState<any>();
  // const [totalClaims, setTotalClaims] = useState<number>(0);
  const [WallettimeLeft, setWalletTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleBannerClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  const HandelClaim = async () => {
    setClaimLoading(true);
    try {
      await Claim(apitoken, {
        task: null,
        status: "C",
        honors: campaign?.extra_reward + user?.rank?.points,
        campaign_type: type,
        campaign_id: campaign?.id,
        honors_type: "E",
      });
      toast.success("Claim successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setClaimLoading(false);
    }
  };

  const FarmingCoinSubmitFiveX = async () => {
    setClaimLoading(true);
    try {
      await Claim(apitoken, {
        task: null,
        status: "C",
        honors: (campaign.extra_reward + user?.rank?.points) * 5,
        campaign_type: type,
        campaign_id: campaign?.id,
        honors_type: "E",
      });
      toast.success("Claim successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setClaimLoading(false);
    }
  };

  // ------------------------ wallet work-------------------------------
  // Initialize TonConnectUI
  useEffect(() => {
    const instance = initializeTonConnect();
    setTon_wallet(instance);
    if (instance.account && instance.connected) {
      console.log("Wallet already connected:", instance.account.address);
    }
  }, []);

  // Get wallet address
  useEffect(() => {
    const address = getConnectedWalletAddress();
    if (address) {
      setConnect_wallet_address(address);
    }
  }, [isOpen, ton_wallet?.connected]);

  // Timer progress
  useEffect(() => {
    const cleanupTimer = startTimer(
      setProgress,
      setWalletTimeLeft,
      setIsClient
    );
    return cleanupTimer;
  }, [isClient]);

  // Button click handler
  const handleToggleButton = () => {
    toggleButtonClaimVisibility(
      setIsClient,
      setIsOpen,
      () => HandelClaim(),
      "Q"
    );
  };

  // Wallet connection handler
  const handleConnectWallet = async () => {
    await handleWalletConnect(ton_wallet);
  };

  // Send transaction
  const handleSendTransaction = async () => {
    setIsClient(true); // Disable the button
    setIsOpen(false); // Show the modal or update state
    await sendTonTransaction(ton_wallet, connect_wallet_address || "", () =>
      FarmingCoinSubmitFiveX()
  );
  };
  // ------------------------ wallet work-------------------------------

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = moment(campaign?.end_date);
      const now = moment();
      const duration = moment.duration(endDate.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLoading(false);
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
        setIsLoading(false);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [campaign?.end_date]);

  // const CheckTaskStatus = () => {
  //   toast.error("Please complete all task to claim");
  // };

  const currentDate = new Date(); // Current date and time (e.g., 2025-06-30T07:33:13Z)
  const expiryDate = new Date(campaign?.end_date); // Campaign expiry date-time (e.g., 2025-06-30T07:33:12Z)
  
  // Check if the current date and time has passed the expiry date
  const isExpired = currentDate >= expiryDate;
  
  return (
    <div className=" w-full bg-[#121212]">
      <TelegramHeader
        token={apitoken}
        cancel={"Back"}
        title={""}
        show={false}
        url={"/mainQuest"}
      />
       {/* Popup Modal */}
       {isPopupVisible && (
         <SlugModal
         isOpen={isPopupVisible}
         onClose={() => setIsPopupVisible(false)}
         campaign={campaign}
         ></SlugModal>
          
      )}

      <div className="h-full w-full flex flex-col justify-center items-center px-6">
        <div className={`lg:flex  justify-between md:px-16 w-full`}>
        <div onClick={handleBannerClick}>
          <TelegramgiftBanner campaign={campaign} type={type} />
        </div>

          {/* Countdown Timer Box */}
          <div className="flex flex-row items-center justify-between bg-[rgba(47,47,47,0.4)] shadow-inner text-m font-medium rounded-3xl p-6 mb-2">
            {/* "Ends In" text perfectly aligned */}
            <div className="flex items-center space-x-2">
              <p className="text-[#747474]">Ends In</p>
            </div>

            {/* Time Display */}
            <div className="flex gap-4 items-center">
              {
                campaign?.time_unlimited ? (
                  <LuInfinity className="text-[#DFDFDF] w-5 h-5" />
                ) : (
                  <>
                    {/* Days */}
                    <div className="text-center flex">
                      <p className="text-[#DFDFDF]">{timeLeft?.days}</p>
                      <p className="text-[#747474]">d</p>
                    </div>

                    {/* Hours */}
                    <div className="text-center flex">
                      <p className="text-[#DFDFDF]">{timeLeft?.hours}</p>
                      <p className="text-[#747474]">h</p>
                    </div>

                    {/* Minutes */}
                    <div className="text-center flex">
                      <p className="text-[#DFDFDF]">{timeLeft?.minutes}</p>
                      <p className="text-[#747474]">m</p>
                    </div>

                    {/* Seconds */}
                    <div className="text-center flex">
                      <p className="text-[#DFDFDF]">{timeLeft?.seconds}</p>
                      <p className="text-[#747474]">s</p>
                    </div>
                  </>
                )
              }
            </div>
          </div>

          {/* Timeline */}
          <div className="w-full px-2 ">
            <div className="w-full pt-1">
              {/* <div className="flex items-center justify-between px-3 w-full">
                  <p className=" font-semibold leading-5 ">
                    Tasks{"  "} &nbsp;
                    <span className="text-white/40 text-xs font-[400] ">
                      {campaign?.honors} honors
                    </span>
                  </p>
                  {campaign?.completion_percentage < 100 ? (
                    <div className="px-3  mb-2">
                      <Button
                        onPress={}
                        className="capitalize cursor-not-allowed"
                        variant="flat"
                      >
                        Claim
                      </Button>
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
                      </Tooltip>
                    </div>
                  ) : !campaign?.is_claim ? (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      disabled={campaign?.completion_percentage > 100}
                      className={`bg-buttonColor  hover:bg-[#0ff379f3] text-black py-2 px-4 rounded-lg shadow-md hover:bg-green-dark transition duration-300 ease-in-out ${
                        campaign?.completion_percentage > 100
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
                  ) : (
                    <Button
                      className="capitalize cursor-not-allowed"
                      variant="flat"
                    >
                      Claimed
                    </Button>
                  )}
                </div> */}
              {isLoading ? (
                <div></div>
              ) : (
                <div className="rounded-xl">
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] top-6 bottom-16 sm:bottom-20 w-1 bg-[#353535]"></div>

                    <div className="">
                      <TaskCardComponentTgToggle
                        tasks={campaign.quest}
                        token={apitoken}
                        user={user}
                        timeLeft={timeLeft}
                        tg={tg}
                        type={type}
                        id={campaign?.id}
                      />
                    </div>
                    <div className="px-2 flex flex-row justify-start items-start gap-2  mb-4">
                      {/* border */}
                      <div className="w-10 h-10 z-10">
                        <div
                          className={`z-10 flex items-center justify-center w-10 h-10 ${
                            campaign?.completion_percentage < 100
                              ? "bg-[#3E3E3E]"
                              : campaign?.is_claim
                              ? "bg-[#3E3E3E]"
                              : "bg-[#BCA2FF]"
                          } rounded-full`}
                        >
                          <img
                            src={`${
                              campaign?.completion_percentage < 100
                                ? "/lock.png"
                                : campaign?.is_claim
                                ? "/tick.png"
                                : "/star.png"
                            }`}
                            alt="coin"
                            className="w-[30px] h-[30px]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-start">
                        <span
                          className={`text-[16px] pl-[13px] font-medium mt-1 ${
                            campaign?.is_claim
                              ? "text-[#A8A8A8]"
                              : "text-[#E0E0E0]"
                          }`}
                        >
                          Complete All Tasks For Bonus Rewards
                        </span>

                        {(campaign?.completion_percentage < 100 || isExpired)? (
                          <div className="px-3 mb-2">
                            <Button
                              className="capitalize cursor-not-allowed gap-2 mt-1 text-[14px] font-medium px-4 flex items-center justify-center  py-[9px] h-9 border border-[#1F1F1F]  w-auto rounded-xl shadow  transition-colors hover:shadow-xl"
                              variant="flat"
                            >
                              Claim
                            </Button>
                            <Tooltip
                              className="capitalize"
                              content={
                                <div className="px-1 py-2">
                                  <div className="text-tiny text-darkGrey">
                                    First complete all Task
                                  </div>
                                </div>
                              }
                            ></Tooltip>
                          </div>
                        ) : !campaign?.is_claim ? (
                          <button
                            onClick={() => {
                              setIsOpen(true);
                            }}
                            disabled={campaign?.completion_percentage > 100}
                            className={`bg-[#181818] text-[#A1A1A1] text-[14px] font-medium px-4 flex items-center justify-center mt-3 ml-2 py-[9px] w-18 h-9 border border-[#BCA2FF] w-auto rounded-xl shadow transition-colors hover:shadow-xl ${
                              campaign?.completion_percentage > 100
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {cliamLoading ? (
                              <span className="flex animate-pulse">
                                Claim...
                              </span>
                            ) : (
                              "Claim"
                            )}
                          </button>
                        ) : (
                          <Button
                            className="bg-[#181818] ml-2 text-[#A1A1A1] capitalize cursor-not-allowed gap-2 mt-3 text-[14px] font-medium px-4 flex items-center justify-center  py-[9px] h-9 border border-[#1F1F1F]  w-auto rounded-xl shadow  transition-colors hover:shadow-xl"
                            variant="flat"
                          >
                            {
                              <img
                                src="/claim.png"
                                alt="coin"
                                className="w-4 h-4"
                              />
                            }{" "}
                            Claimed
                          </Button>
                        )}
                      </div>
                      {!campaign?.is_claim && (
                        <div className="flex justify-end items-end mt-2 w-[30%] mr-[30px] ">
                          <img
                            src="/honorsimage.png"
                            alt="coin"
                            className="w-4 h-4"
                          />
                          <div className="text-[12px]">
                            &nbsp;{campaign?.extra_reward}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 
              <div className="md:ml-3  my-10 px-2 ">
                <p className=" pl-[14px]">Honors Awarded</p>
                <div className="flex justify-between items-center bg-modalColor border border-borderDark rounded-xl p-5 mt-2">
                  <p className=" text-[13px] font-[400]">Honors</p>
                  <p className="border border-dashed h-[1px] w-[60%] mx-2 border-white border-opacity-[20%]"></p>
                  <div className="flex items-center">
                    <p className="text-[13px] font-[400]">{campaign?.honors}</p>
                  </div>
                </div>
              </div>

              <div className="md:ml-3  my-10 px-2 ">
                <p className="pl-[14px]">Notes</p>
                <div className="flex items-center bg-modalColor border border-borderDark rounded-lg p-3 mt-2">
                  <p className="text-[#98989D] text-xs py-4 px-3 leading-6">
                    {slug == "invite-friends"
                      ? "Once each invited friend completes at least 2 quests, you can collect your honors."
                      : campaign?.notes
                      ? campaign.notes
                      : "Each task will be manually verified. Please submit the necessary links for each task."}
                  </p>
                </div>
              </div> */}
          </div>
        </div>
      </div>

      {/* ------------------------- Modal Start -------------------------*/}

      <BottomDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        closable
        onOuterClosed={() => setIsOpen(false)}
        height={550}
      >
        <div className="py-3 ">
          <div className="flex items-center justify-center">

          <div className=" flex flex-col justify-end items-center bg-claim-coin bg-cover bg-center h-[220px] w-[250px] ">
            

          <p className=" text-xl text-[#E0E0E0]">{user?.rank?.title}</p>
            
          </div>
          </div>

          <div className="text-white flex flex-col items-center justify-end ">
            {/* <Image
              src="/claim-coin.png"
              height={500}
              width={500}
              alt="Right"
              className=" "
            /> */}
            <div className="text-center  ">
             
              <p className="text-white/50 text-xs leading-snug px-16 pt-4">
                Share the love! Get Quest completions from referrals, Collect
                Gems, and Redeem Epic Rewards!
              </p>
            </div>
          </div>
          {/* <div className="">
                    <div className="flex items-center gap-1 justify-center my-11">
                      <Image
                        src="/honorsimage.png"
                        height={1000}
                        width={1000}
                        alt="Right"
                        className="w-8 h-8"
                      />
                      <span className="text-3xl font-bold text-[#E0E0E0]">
                      Get {campaign?.extra_reward} Honors
                      </span>
                    </div>
                  </div> */}

          <div>
            <div className=" w-full flex flex-col gap-3 mt-8 px-10">
              <button
                className={`bg-[#666666]/20 rounded-2xl py-4 ${
                  !isClient ? null : "opacity-60"
                }`}
                onClick={handleToggleButton}
              >
                <p className=" text-white text-sm ">
                    Claim {(campaign?.extra_reward + user?.rank?.points)} Honors
                </p>
              </button>

              {connect_wallet_address && ton_wallet?.connected ? (
                <button
                  className="bg-[#A4E493] rounded-2xl py-1 min-h-14 text-black font-bold text-sm"
                  onClick={handleSendTransaction}
                >
                  Get 5x More: {(campaign?.extra_reward + user?.rank?.points) * 5} Honors
                </button>
              ) : (
                <button
                  className={` bg-[#A4E493] rounded-xl py-5 ${
                    !isClient ? null : "opacity-60"
                  }`}
                  onClick={() => {
                    !isClient && handleConnectWallet();
                  }}
                >
                  <p className="text-black font-semibold text-sm">
                    Get 5x More: {(campaign?.extra_reward + user?.rank?.points) * 5} Honors
                  </p>
                  {/* <p className="text-sm text-gray-200 font-sans">
                            Get 
                          </p> */}
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            {/* <p className="text-[#747474] text-xs">
                      Stake your tokens and multiply your <br /> earnings instantly.
                    </p> */}
          </div>
        </div>
      </BottomDrawer>
    </div>
  );
}
