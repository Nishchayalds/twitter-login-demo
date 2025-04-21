"use client";
import { useEffect, useState } from "react";
import { FaArrowRightToBracket, FaRegCopy, FaUser } from "react-icons/fa6";

import {
  getConnectedWalletAddress,
  handleClaimfromwallet,
  handleWalletConnect,
  initializeTonConnect,
  sendTonTransaction,
  startTimer,
  toggleButtonVisibility,
} from "@/constants/walletFunction";
import { Daily_Farming, GetQuizQuestions, updateUser } from "@/controller/UserController";
import { IoWallet } from "react-icons/io5";
import { button, Button } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowForward, IoIosCopy } from "react-icons/io";
import { toast } from "react-toastify";
import BottomDrawer from "@/components/ui/BottomDrawer";
import TelegramHeader from "@/components/Telegram/Telegramheader";
import { useRouter } from "next/navigation";
import { BiHourglass } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";

const quests = [
  {
    id: 1,
    title: "Complete Quest",
    honors: 20,
    button: "Quest",
    link: "/mainQuest",
  },
  {
    id: 2,
    title: "Invite Friends",
    honors: 10,
    button: "Invite",
    link: "/referral",
  },
  // { id: 3, title: "Complete Quest", honors: 30 },
];

const Claim = ({ coins, User_Token, token, record }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ------------------------ wallet work-------------------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectModal, setConnectModal] = useState<boolean>(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (record?.length > 0) {
      setIsClient(true);
    }
  }, [record]);

  useEffect(() => {
    console.log("record", record);
  }, [isClient]);

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

  // console.log(User_Token, "tokeneeee")
  // console.log(token, "tokeneeedfsdfdse")
  // ------------------------ wallet work-------------------------------
  const WalletDisconnect = () => {
    ton_wallet?.disconnect();
    setConnect_wallet_address(null);
    setConnectModal(false);
  };
  // Initialize TonConnectUI
  useEffect(() => {
    const instance = initializeTonConnect();
    setTon_wallet(instance);
    if (instance?.account && instance?.connected) {
      console.log("Wallet already connected:", instance?.account?.address);
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
    // Start timer when component is mounted
    startTimer(setProgress, setTimeLeft, setIsClient);
  }, [isClient]);

  // Button click handler
  const handleToggleButton = () => {
    setIsLoading(true);
    FarmingCoinSubmit();
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
        const bridge_conn: any = localStorage?.getItem(
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
      honors: 250,
    };
    try {
      await Daily_Farming(User_Token, data);
    } catch (error) {
      console.error("Error: from toggle function", error);
    }
  };

  const FarmingCoinSubmit = async () => {
    const data = {
      honors: 50,
    };
    try {
      // await Daily_Farming(User_Token, data);
      // toast.success("Claim successfully");
      router.push("/quiz");
    } catch (error) {
      console.error("Error: from toggle function", error);
    }
  };

  const CopyTonAddress = () => {
    setCopyAddress(true);
    navigator?.clipboard?.writeText(connect_wallet_address);
    setTimeout(() => {
      setCopyAddress(false);
    }, 1000);
  };
  // const isCorrect = false;
  return (
    <div className=" flex items-center  flex-col w-full  min-h-[88vh]">
      <div className="w-full">
        {/* <TelegramHeader
          token={token}
          cancel={"Back"}
          title={"Earn"}
          show={false}
          home={true}
        /> */}
      </div>

      <div className="text-white w-full flex space-y-4 flex-col items-center justify-around mt-16">
        <div className="flex flex-col items-center justify-center w-full mt-3  ">
          <div className="relative w-40 h-40   ">
            <svg
              className="w-full h-full rotate-[-90deg]"
              viewBox="0 0 110 110"
              width="110"
              height="110"
            >
              <circle
                cx="50%"
                cy="50%"
                r="40" /* Smaller circle */
                fill="none"
                stroke="#808080"
                strokeWidth="4"
                className="animate-pulse"
              />
              <defs>
                <pattern
                  id="imagePattern"
                  patternUnits="userSpaceOnUse"
                  width="120"
                  height="120"
                >
                  <image href="/Rectangle.png" width="120" height="120" />
                </pattern>
              </defs>
              <circle
                cx="50%"
                cy="50%"
                r="40" /* Smaller circle */
                fill="none"
                stroke="url(#imagePattern)"
                strokeWidth="20" /* Thinner stroke */
                strokeDasharray="251.2" /* Circumference for r=40 */
                strokeDashoffset={251.2 - (progress / 100) * 251.2}
                className="transition-all duration-500 ease-out"
                style={{ backgroundColor: "yellow" }}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-black ">
              <p className="text-base font-medium text-white">
                {record?.length > 0 ?<img src="/hour-glass.gif"alt="Loading..." width={36} height={36} />:<BiHourglass size={32} />}
              </p>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        {isLoading && (
          <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black z-50">
            <Spinner color="success" />
          </div>
        )}
        {isClient ? (
          <div className="mt-6 bg-zinc-800 rounded-xl px-8 py-3 text-center">
            <span className="text-sm text-[#DFDFDF]">
              <span className="text-sm font-[500] text-[#747474]"> Next Claim </span>{String(timeLeft?.hours).padStart(2, "0")}:
              {String(timeLeft?.minutes).padStart(2, "0")}:
              {String(timeLeft?.seconds).padStart(2, "0")}
            </span>
          </div>
        ) : (

          <div
            onClick={handleToggleButton}
            className="mt-6 bg-tggreen text-black font-bold text-sm rounded-xl px-8 py-3 text-center"
          >
            <span className="text-lg">Claim</span>
          </div>
        )}

        <button className="flex justify-center items-center gap-2 mb-2 mx-8">
          {/* <div className="w-6 h-6 rounded-full border border-[#BCA2FF] flex items-center justify-center ">
            <BsInfo className="w-5 h-5 text-[#BCA2FF]" />
          </div> */}
          <Image
            src="/aai.png"
            height={1000}
            width={1000}
            alt="Right"
            className="w-6 h-6"
          />
          <span className="text-xs font-normal text-[#747474]">Rewards Can Be Claimed Every 8 Hours</span>
        </button>

        <div className="px-6 pt-6 w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-zinc-700 flex-1"></div>
            <span className="px-4 text-[#747474] font-[500] text-xs">Earn More Honoros</span>
            <div className="h-px bg-zinc-700 flex-1"></div>
          </div>

          {/* Quest Items */}
          <div className="space-y-2">
            {quests.map((quest) => (
              <div key={quest?.id} className="bg-zinc-900 rounded-3xl px-8 py-4 mb-1 border border-[#66666680]/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">{quest?.title}</h3>
                    {/* <div className="flex items-center mt-1">
                      <div className="relative w-3 h-3 mr-2">
                        <img
                          src="/honor-logo-tg.png" // direct path if public folder
                          alt="honor.icons"
                        />
                      </div>
                      <span>{quest.honors} Honors</span>
                    </div> */}
                  </div>
                  <Link href={`${quest?.link}`}>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-tggreen text-sm px-[30.5px] py-[15px] rounded-xl border-1 border-b-2 border-[#323232]">
                      {quest?.button}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <BottomDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        closable
        onOuterClosed={() => setIsOpen(false)}
        height={510}
      >
        <div className="py-3">
          <div className="text-white flex flex-col items-center gap-[20px]">
            <div className="text-white flex flex-col items-center gap-[20px]">
              <Image
                src="/right.png"
                height={1000}
                width={1000}
                alt="Right"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="font-bold text-xl text-[#E0E0E0]">
                  You Nailed It!
                </p>
                <p className="text-white/50 text-xs leading-snug">
                  The blockchain verifies your success.
                </p>
              </div>
            </div>
            {isCorrect ? (
          
          ) : (
            <div className="text-white flex flex-col items-center gap-[20px]">
              <Image
                src="/wrong.png"
                height={1000}
                width={1000}
                alt="Wrong"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="font-bold text-xl text-[#E0E0E0]">Almost There!!</p>
                <p className="text-white/50 text-xs leading-snug">
                  Your answer isn't correct, but you're close!
                </p>
              </div>
            </div>
          )}
          </div> 
          <div className="">
            <div className="flex items-center gap-2 justify-center my-11">
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
                className={`bg-[#1F1F1F]/70 rounded-3xl py-5 ${
                  !isClient ? null : "opacity-60"
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
                  className={` bg-[#A4E493] rounded-3xl py-5 ${
                    !isClient ? null : "opacity-60"
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
                  </p> 
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
      </BottomDrawer>*/}

      {/* <BottomDrawer
        isOpen={connectModal}
        onClose={() => setConnectModal(false)}
        title=""
        closable
        onOuterClosed={() => setConnectModal(false)}
        height={200}
      >
        <div className="px-3 pt-2 pb-4 h-full overflow-y-auto w-full  flex flex-col items-center justify-center">
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
      </BottomDrawer> */}

      {/* <BottomDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        closable
        onOuterClosed={() => setIsOpen(false)}
        height={270}
      >
        <div className="py-3">
          <div className="text-white text-center space-y-2">
            <p className="font-bold text-xl">Daily Check-In</p>
            <p className="text-gray-400 text-xs leading-snug">
              Complete daily tasks to earn exclusive rewards. Stay consistent
              and get bonuses!
            </p>
          </div>

          <div>
            <div className=" w-full flex flex-col gap-2 mt-2">
              <button
                className={`bg-[#f5f2eb] rounded-lg py-1 ${
                  !isClient ? null : "opacity-60"
                }`}
                onClick={handleToggleButton}
              >
                <p className="font-semibold text-black">Claim my daily gems</p>
                <p className="text-sm text-gray-500 font-sans">Get 50 honors</p>
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
                  className={` bg-[#9384dd] rounded-lg py-1 bg-opacity-100 ${
                    !isClient ? null : "opacity-60"
                  }`}
                  onClick={() => {
                    !isClient && handleConnectWallet();
                  }}
                >
                  <p className="text-white font-semibold text-sm">
                    Get 5x more
                  </p>
                  <p className="text-sm text-gray-200 font-sans">
                    Get 250 honors
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </BottomDrawer> */}

      <BottomDrawer
        isOpen={connectModal}
        onClose={() => setConnectModal(false)}
        title=""
        closable
        onOuterClosed={() => setConnectModal(false)}
        height={200}
      >
        <div className="px-3 pt-2 pb-4 h-full overflow-y-auto w-full  flex flex-col items-center justify-center">
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
      </BottomDrawer>
    </div>
  );
};

export default Claim;
