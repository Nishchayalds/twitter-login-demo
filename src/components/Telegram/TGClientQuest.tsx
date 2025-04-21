"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import TelegramCardMoblie from "./TelegramCardMoblie";
import TelegramHeader from "./Telegramheader";
import { FaArrowRightToBracket, FaRegCopy, FaUser } from "react-icons/fa6";
import BottomDrawer from "../ui/BottomDrawer";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
  getConnectedWalletAddress,
  handleClaimfromwallet,
  handleWalletConnect,
  initializeTonConnect,
  sendTonTransaction,
  startTimer,
  toggleButtonClaimVisibility,
  toggleButtonVisibility,
} from "@/constants/walletFunction";
import { Daily_Farming } from "@/controller/UserController";
import { IoWallet } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { IoIosCopy } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TGClientQuest({
  tokenData,
  dashbordcam,
  rank,
  myrank,
  User_Token,
  coins,
}: any) {
  const currentLevel = tokenData?.rank?.id;
  const totalLevels = 10;
  const progressPercentage = (currentLevel / totalLevels) * 100;
  const [questType, setQuestType] = useState<string | null>(null);

  const shinobiCard = [
    // {
    // title: "Total Honors",
    // value: `${tokenData?.total_honor}`,
    // image: "daimond.png",
    // summery: (
    //   <>
    //     You have <span className="text-green">{tokenData?.total_honor}</span>{" "}
    //     Honors:
    //     <span className="text-green"> {tokenData?.quest_honors}</span> quests,
    //     <span className="text-green"> {tokenData?.referral_honors}</span>{" "}
    //     referrals.
    //     {/* <span className="text-[#0FF378]"> 200</span> daily claims. */}
    //   </>
    // ),
    // },
    {
      title: "Number of Referrals",
      value: `${tokenData?.total_referral}`,
      image: "double_person.png",
      summery: (
        <>
          You've earned{" "}
          <span className="text-green">{tokenData?.referral_honors}</span>{" "}
          Honors from referrals. Keep sharing for more!
        </>
      ),
    },
    {
      title: "Rank",
      value: tokenData?.rank?.title,
      image: <GoTrophy className="text-white" />,
      summery: (
        <>
          You're a <span className="text-green">{tokenData?.rank.title}</span>,{" "}
          <span className="text-green">
            {(
              (tokenData?.total_honor * 100) / tokenData?.rank.honor +
              1
            ).toFixed(0)}
            %
          </span>{" "}
          to <span className="text-green">{tokenData?.next_level.title}</span>.
          Earn{" "}
          <span className="text-green">
            {tokenData?.rank.honor - tokenData?.total_honor + 1}
          </span>{" "}
          more Honors to level up.
        </>
      ),
    },
  ];

  // ------------------------ wallet work-------------------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectModal, setConnectModal] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [check_storage, setCheck_storage] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [ton_wallet, setTon_wallet] = useState<any>(null);
  const [connect_wallet_address, setConnect_wallet_address] = useState<any>();
  const [copyAddress, setCopyAddress] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ------------------------ wallet work-------------------------------
  const WalletDisconnect = () => {
    ton_wallet.disconnect();
    setConnect_wallet_address(null);
    setConnectModal(false);
  };
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
    startTimer(setProgress, setTimeLeft, setIsClient);
  }, [isClient]);

  // Button click handler
  const handleToggleButton = () => {
    toggleButtonClaimVisibility(
      setIsClient,
      setIsOpen,
      () => FarmingCoinSubmit(),
      "DF"
    );
    handleClaimfromwallet();
  };

  // Wallet connection handler
  const handleConnectWallet = async () => {
    setCheck_storage(true);
    await handleWalletConnect(ton_wallet);
  };

  useEffect(() => {
    if (check_storage) {
      const interval = setInterval(() => {
        const bridge_conn: any = localStorage.getItem(
          "ton-connect-storage_bridge-connection"
        );

        if (bridge_conn) {
          const parsed_conn = JSON.parse(bridge_conn);
          if (parsed_conn?.connectEvent) {
            setCheck_storage(false); // Stop the interval
          }
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [check_storage]);

  // Send transaction
  const handleSendTransaction = async () => {
    await sendTonTransaction(ton_wallet, connect_wallet_address || "", () =>
      FarmingCoinSubmitFiveX()
    );
    handleClaimfromwallet();
  };

  const FarmingCoinSubmitFiveX = async () => {
    const data = {
      honors: coins[0]?.honors * 5,
    };
    try {
      await Daily_Farming(User_Token, data);
    } catch (error) {
      console.error("Error: from toggle function", error);
    }
  };

  const FarmingCoinSubmit = async () => {
    const data = {
      honors: coins[0]?.honors,
    };
    try {
      await Daily_Farming(User_Token, data);
      toast.success("Claim successfully");
    } catch (error) {
      console.error("Error: from toggle function", error);
    }
  };

  const CopyTonAddress = () => {
    setCopyAddress(true);
    navigator.clipboard.writeText(connect_wallet_address);
    setTimeout(() => {
      setCopyAddress(false);
    }, 1000);
  };

  useEffect(() => { }, []);
  // console.log(tokenData, "data");
  return (
    <div className=" w-full unbounded bg-[#0F0F0F]">
      {/* <TelegramHeader
        token={tokenData}
        cancel={"Back"}
        title={"Profile"}
        show={false}
      /> */}
      <div className="w-full bg-profileCircle bg-no-repeat bg-[length:55%] bg-[90px_0px]">
        {/* <h1 className="text-center text-lg font-semibold py-5">Profile</h1> */}

        <div className="w-full mt-7 flex justify-center  border-red-400 ">
          <div className="flex pt-14 justify-center w-full h-full ">
            <div className="w-full flex relative justify-center rotat e-4">
              <div className="w-full  h-full gap-4 flex flex-col items-center ">
                <div className=" rounded-full md:block">
                  <div className="relative">
                    <Image
                      src={require("../../../public/backgroud/profile_curcle_bg.png")}
                      alt="profile_bg-image"
                      width={500}
                      height={500}
                      className="w-32 h-32"
                    />
                    <div
                      style={{ background: tokenData?.color_code }}
                      className="w-[80%] h-[80%] rounded-full md:block absolute top-3 left-[10%]"
                    >
                      <div className="rounded-full  text-center w-full h-full flex justify-center items-center backdrop-blur-xl text-2xl">
                        {/* {tokenData?.user_name.charAt(0)} */}
                        <FaUser className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-col flex gap-1 justify-center mt-3">
                  <p className="flex justify-center items-center text-base font-[500] text-[#B0B0B0]">
                    {tokenData?.user_name}
                  </p>
                  <div className="flex justify-center gap-3">
                    <div className="flex justify-center items-center p-1 backdrop-blur-sm flex-inline rounded-lg border-borderColor text-xl font-bold text-white px-1 gap-2 ">
                      <Image
                        src={require("../../../public/honours.png")}
                        alt="profile-image"
                        width={500}
                        height={500}
                        className="w-6 h-6 md:block"
                      />

                      <p>{tokenData?.total_honor} Honors</p>
                    </div>
                    {/* <div className="flex justify-center items-center p-1   backdrop-blur-sm bg-white/5  rounded-lg border-borderColor text-xs text-[#CDCDCD] px-1">
                      {/* <Image
                        src={require("../../../public/backgroud/gem-icon.png")}
                        alt="profile-image"
                        className="w-4 h-3 md:block"
                      /> */}
                    {/* <p>{tokenData?.rank.title}</p>
                    </div> */}
                  </div>
                </div>

                {/* <div className="flex justify-center flex-col w-[90%]">
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
                      className="absolute inset-0 w-full h-full appearance-none bg-transparent rounded-full"
                    ></progress>
                    <div
                      className="h-full absolute inset-0 rounded-full bg-green transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div> */}

                {/* {connect_wallet_address && ton_wallet?.connected && (
                  <div className="flex items-center justify-center bg-[#808080] py-2 rounded-md px-1 w-[90%]">
                    <div className="flex items-center bor der w-[90%]">
                      <p className="truncate text-sm md:text-base font-mono ">
                        {connect_wallet_address}
                      </p>
                      <button
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 shadow hover:bg-green-600 transition "
                        onClick={() => CopyTonAddress()}
                      >
                        {copyAddress ? <IoIosCopy /> : <FaRegCopy />} 
                      </button>
                    </div>
                    <button
                      onClick={() => setConnectModal(true)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 shadow hover:bg-green-600  transition border-l-0 bo rder"
                    >
                      <FaArrowRightToBracket />
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {!isClient ? (
        <div className="flex justify-center items-center  w-full pt-3 gap-2  ">
          <Button
            onPress={() => setIsOpen(!isOpen)}
            className="capitalize rounded-full text-[#000] text-sm bg-green shadow-green shadow-inner"
            variant="shadow"
          >
            Daily Farming
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mt-3  ">
          <div className="relative w-32 h-32 "> 
            <svg className="w-full h-full rotate-[-90deg]"> 
              <circle
                cx="50%"
                cy="50%"
                r="48"
                fill="none"
                stroke="#808080 "  
                strokeWidth="4"
                className="animate-pulse"
              /> 
              <circle
                cx="50%"
                cy="50%"
                r="48"
                fill="none"
                stroke="#0FF378" 
                strokeWidth="5"
                strokeDasharray="301.6" 
                strokeDashoffset={
                  301.6 - (progress / 100) * 301.6
                }  
                className="transition-all duration-500 ease-out"
                style={{ backgroundColor: "yellow" }}
              />
            </svg>
 
            <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
              <p className="text-sm font-medium text-white">Daily</p>
              <p className="text-sm font-medium text-white">Farming</p>
              <div className="text-xs text-gray-600">
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div> 
        </div>
      )} */}

      <div className="flex justify-center items-center flex-col mt-7 px-[24px]">
        {shinobiCard.map((item, index) => (
          <div
            key={index}
            className="bg-[#2F2F2F]/20 rounded-3xl px-5 py-4 mb-2 gap-1 w-full"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="p-2 text-[#000]">
                  {index == 0 ? (
                    <Image
                      src={require(`../../../public/avtars/${item?.image}`)}
                      height={25}
                      width={28}
                      alt="Person"
                      className="w-6 h-6 text-[#E0E0E0]"
                    />
                  ) : (
                    <p className="text-2xl text-[#E0E0E0]"> {item?.image} </p>
                  )}
                </p>
                <p className="font-normal text-[14px] text-[#E0E0E0]">
                  {item?.title}
                </p>
              </div>
              <p className="font-medium text-[14px] text-[#E0E0E0]">
                {item?.title === "Rank"
                  ? `${tokenData?.rank?.rank}th`
                  : item?.value}
              </p>
            </div>
            {/* <p className=" tracking-widest text-xs text-[#AAAAAA] p-2 leading-5">
              {item?.summery}
            </p> */}
          </div>
        ))}
      </div>

      {/* <Tgcardslider tokenData={tokenData} /> */}

      {/* Quest Type Buttons */}
      <div className="w-full -mt-1 items-center">
        <div className="gap-5 py-1 rounded-full px-[24px]">
          <div
            className={`bg-[#2F2F2F]/20 rounded-3xl px-8 py-6 gap-1 w-full flex justify-between text-[14px] items-center ${questType === "history"
              }`}
            onClick={() =>
              setQuestType(questType === "history" ? null : "history")
            }
          >
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src={require(`../../../public/complete.png`)}
                  height={1000}
                  width={1000}
                  alt="completed"
                  className="w-[13.38px] h-[13.38px] mr-3"
                />
              </div>
              <div className="text-sm font-normal text-[#E0E0E0]">Completed Task [{dashbordcam.completed.length}]</div>
            </div>
            {questType === "history" ? (
              <IoChevronUp className="text-2xl" />
            ) : (
              <IoChevronDown className="text-2xl" />
            )}
          </div>

          <div
            className={`w-full mt-1 overflow-hidden transition-all duration-300  ${questType === "history"
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
              }`}
          >
            {dashbordcam.completed.length > 0 ? (
              dashbordcam.completed.map((item: any, index: any) => (
                <div key={index} className=" w-full  h-full mb-1">
                  <TelegramCardMoblie
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
              <p>No quest history available</p>
            )}
          </div>

          <div
            className={`bg-[#2F2F2F]/20 rounded-3xl mt-1 px-8 py-6 mb-2 gap-1 w-full flex justify-between text-[14px] items-center`}
            onClick={() =>
              setQuestType(questType === "active" ? null : "active")
            }
          >
            <div className="flex items-center gap-2 ">
              <div>
                <Image
                  src={require(`../../../public/active.png`)}
                  height={1000}
                  width={1000}
                  alt="active"
                  className="w-[13.38px] h-[13.38px] mr-3"
                />
              </div>
              <div className="text-sm font-normal text-[#E0E0E0]">Active Task [{dashbordcam?.inprogress?.length}]</div>
            </div>
            {questType === "active" ? (
              <IoChevronUp className="text-2xl" />
            ) : (
              <IoChevronDown className="text-2xl" />
            )}
          </div>
          {/* <button
            className=
            onClick={() => setQuestType("active")}
          >
            
            
            
            {/* {questType === "active" && (
              <div className="bg-green h-2 w-2 rounded-full"></div>
            )} */}
          {/* </button> */}
        </div>
      </div>

      {/* Quest Lists */}
      <div className="w-full -mt-4 px-[24px]">
        <div
          className={`w-full overflow-hidden transition-all duration-300 ${questType === "active"
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          {questType === "active" && (
            <div className={`w-full`}>
              {dashbordcam?.inprogress?.length > 0 ? (
                dashbordcam?.inprogress?.map((item: any, index: any) => (
                  <div key={index} className="p-0.5 w-full h-full">
                    <TelegramCardMoblie
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
                <p>No active quests available</p>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        closable
        onOuterClosed={() => setIsOpen(false)}
        height={270}
      >
        <div className="py-3">
          <div className="text-white flex flex-col items-center gap-[20px]">
            <Image
              src="/right.png"
              height={1000}
              width={1000}
              alt="Right"
              className="w-16 h-16"
            />
            <div className="text-center">
              <p className="font-bold text-xl text-[#E0E0E0]">You Nailed It!</p>
              <p className="text-white/50 text-xs leading-snug">
                The blockchain verifies your success.
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-1 justify-center my-11">
              <Image
                src="/honorsimage.png"
                height={1000}
                width={1000}
                alt="Right"
                className="w-8 h-8"
              />
              <span className="text-3xl font-bold text-[#E0E0E0]">
                50 Honors
              </span>
            </div>
          </div>

          <div>
            <div className=" w-full flex flex-col gap-3 mt-2 px-6">
              <button
                className={`bg-[#1F1F1F]/20 rounded-xl py-5 ${!isClient ? null : "opacity-60"
                  }`}
                onClick={handleToggleButton}
              >
                <p className="font-semibold text-white">Claim 50 Honors</p>
              </button>

              {connect_wallet_address && ton_wallet?.connected ? (
                <button
                  className="bg-red-500 rounded-lg py-1 min-h-14 text-white font-semibold text-sm"
                  onClick={handleSendTransaction}
                >
                  Send Transaction
                </button>
              ) : (
                <button
                  className={` bg-[#A4E493] rounded-xl py-5 ${!isClient ? null : "opacity-60"
                    }`}
                  onClick={() => {
                    !isClient && handleConnectWallet();
                  }}
                >
                  <p className="text-black font-semibold text-sm">
                    Get 5x More: 250 Honors
                  </p>
                  {/* <p className="text-sm text-gray-200 font-sans">
                    Get 
                  </p> */}
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-[#747474] text-xs">
              Stake your tokens and multiply your <br /> earnings instantly.
            </p>
          </div>
        </div>
      </BottomDrawer>

      <div
        className={` ${connectModal
            ? "translate-y-0 ease-in-out duration-300 fixed inset-0 z-50 flex items-end "
            : "translate-y-[100%] ease-in-out duration-500 "
          }`}
      >
        {connectModal && (
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-700 ease-in-out backdrop-blur-[3px] `}
              onClick={() => setConnectModal(false)} // Close on overlay click
              aria-hidden="true"
            ></div>

            {/* Drawer */}
            <div
              className={`w-full bg-[#1e1e2f] rounded-t-2xl shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${connectModal ? "translate-y-0" : "translate-y-full"
                }`}
              aria-modal="true"
              role="dialog"
            >
              {/* Body */}
              <div className="px-3 pt-2 pb-4 h-full overflow-y-auto  flex flex-col items-center justify-center">
                <p className="text-center text-sm pt-1 tracking-wider">
                  Are you sure you want to disconnect your TON wallet?
                </p>
                <div className="flex justify-between items-center mt-4 w-[90%]">
                  <Button
                    onPress={() => setConnectModal(false)}
                    className="capitalize rounded-full text-[#000] text-sm bg-green shadow-green shadow-inner"
                    startContent={<RxCross2 className="text-lg" />}
                  >
                    Cancel
                  </Button>
                  {connect_wallet_address && ton_wallet?.connected && (
                    <Button
                      onPress={() => WalletDisconnect()}
                      className="capitalize rounded-full text-[#000] text-sm bg-green shadow-green shadow-inner"
                      startContent={<IoWallet className="text-lg" />}
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
