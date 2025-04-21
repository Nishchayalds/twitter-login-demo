"use client";
import TelegramHeader from "@/components/Telegram/Telegramheader";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import BottomDrawer from "@/components/ui/BottomDrawer";
import {
  Daily_Farming,
  GetQuizQuestions,
  updateUser,
} from "@/controller/UserController";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";
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

const Quiz = ({ token, userToken, cookiesToken }: any) => {
  const [IsActive, setIsActive] = useState<any>({
    correctOne: "",
    isopen_drawer: false,
  });

  
  
  const handleOptionSelect = (id: string) => {
    const currentUrl = window?.location?.origin + window?.location?.pathname;
    console.log(currentUrl, "oooppppp");
    const updatedUrl = `${currentUrl}?options=${id}`;

    Cookies.set("quiz_option", id, { expires: 1 });
    Cookies.set("updatedurl", updatedUrl, { expires: 1 });

    toggleButtonVisibility(
      setIsClient,
      setIsOpen,
      //   () => FarmingCoinSubmit(),
      "DF",
      timeLeft,
      userToken
    );

    setIsActive({
      ...IsActive,
      correctOne: id,
      isopen_drawer: true,
    });

    // router.push(updatedUrl);
  };

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectModal, setConnectModal] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [check_storage, setCheck_storage] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [ton_wallet, setTon_wallet] = useState<any>(null);
  const [connect_wallet_address, setConnect_wallet_address] = useState<any>();
  const [copyAddress, setCopyAddress] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [claimLoading, setClaimLoading] = useState(0);

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
    try {
      Cookies.set("quiz_option", "id", { expires: 1 });
    } catch (error) {}
    setClaimLoading(1);
    Cookies.remove("quiz_option");
    Cookies.remove("updatedurl");
    toggleButtonClaimVisibility(
      setIsClient,
      setIsOpen,
      () => FarmingCoinSubmit(),
      "DF",
      timeLeft,
      userToken
    );

    // handleClaimfromwallet();
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
    setClaimLoading(2);
    await sendTonTransaction(ton_wallet, connect_wallet_address || "", () =>
      FarmingCoinSubmitFiveX()
    );
    handleClaimfromwallet();
  };

  const FarmingCoinSubmitFiveX = async () => {
    const data = {
      honors: IsActive?.correctOne ===
        quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50)*5:(cookiesToken?.rank?.points)*5,
    };
    try {
      await Daily_Farming(userToken, data);
      try {
        Cookies.set("quiz_option", "id", { expires: 1 });
      } catch (error) {}
      setClaimLoading(1);
      Cookies.remove("quiz_option");
      Cookies.remove("updatedurl");
      toast.success("Claim successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error: from toggle function", error);
      setClaimLoading(0);
    }
  };

  const FarmingCoinSubmit = async () => {
    const data = {
      honors: IsActive?.correctOne === quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50):(cookiesToken?.rank?.points) ,
    };
    try {
      await Daily_Farming(userToken, data);
      // console.log(Daily_Farming(User_Token, data),"coinss")
      Cookies.remove("quiz_option");
      Cookies.remove("updatedurl");
      toast.success("Claim successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error: from toggle function", error);
      setClaimLoading(0);
    }
  };

  const CopyTonAddress = () => {
    setCopyAddress(true);
    navigator.clipboard.writeText(connect_wallet_address);
    setTimeout(() => {
      setCopyAddress(false);
    }, 1000);
  };

  const sendTonTransaction = async (
    tonWallet: any,
    connectWalletAddress: string,
    submitCoins: () => void
  ) => {
    if (!tonWallet || !connectWalletAddress) {
      console.error("Wallet instance or address is missing.");
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 3600, // 1-hour validity
      messages: [
        {
            address: "UQDuLVqlh1ZPfVxBcHhZnIQWOs8WNaCkZoy6tmMr7q0qDv-x",
            amount: "25000000", // 0.025 TON
          },
      ],
    };

    try {
      const result = await tonWallet.sendTransaction(transaction);
      toast.success("Transaction sent successfully ");
      console.log("Transaction sent successfully :", result);
      submitCoins();
    } catch (error) {
      toast.error("Transaction failed !");
      setClaimLoading(0);
      console.error("Transaction failed:", error);
    }
  };

  const fetchData = async () => {
      const data = await GetQuizQuestions(userToken);
      console.log(data, 'yoyoyoyoyo'); // This should print the API response
      return data;
    };

  // const Data = fetchData();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await GetQuizQuestions(userToken);
        setQuizData(data[0]);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedOption = Cookies.get("quiz_option");
    if (storedOption) {
      setIsActive({
        ...IsActive,
        correctOne: storedOption,
        isopen_drawer: true,
      });
    }
  }, []);

  return (
    <div className="h-screen xs:pt-10` xxs:pt-10">
      <div className="px-[23.26px] flex flex-col gap-[40px]">
        {isLoading && (
          <div className="h-[100vh] w-full flex justify-center items-center bg-transparent">
            <Spinner color="success" />
          </div>
        )}
        {!isLoading && (
          <>
            {/* <div className="">
                        <TelegramHeader
                            token={token}
                            cancel={"Back"}
                            title={"Leaderboard"}
                            show={false}
                        />
                    </div> */}
            <div className="text-center mt-[18px] pb-2">
              <p className="text-[20px] font-bold text-white">Well done!</p>
              <p className="text-[12px] text-white/50">
                One step left: predict the artwork price to <br /> add it to
                your collection.
              </p>
            </div>
            <div className="flex flex-col gap-[23px] bg-[#2F2F2F]/20 rounded-3xl px-[6px] pb-[22px] pt-[15px]">
              <div className="h-[220px] bg-cover">
                {quizData && (
                  <Image
                    src={quizData?.image ? quizData.image : "/octo.png"}
                    height={700}
                    width={700}
                    alt="Octo"
                    className="w-full h-full rounded-3xl"
                  />
                )}
              </div>
              <div className="flex flex-col gap-[8px] px-[31px]">
                <div>
                  {quizData && (
                    <p className="text-[20px] font-bold text-[#E0E0E0]">
                      {quizData?.title}
                    </p>
                  )}
                </div>
                <div>
                  {quizData && (
                    <p className="text-[12px] text-[#DFDFDF]">
                      {quizData?.description}
                    </p>
                  )}
                  {/* <p className='text-[12px] font-bold text-[#747474]'>Digital Illustration</p> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[23px] bg-[#1D1D1D] rounded-3xl px-[22px] xs:px-[40px] py-[30px]">
              <div className="flex items-center gap-[8px]">
                <span>
                  <HiOutlineQuestionMarkCircle className="text-[#BCA2FF] w-6 h-6" />
                </span>
                <p className="text-[16px] font-bold text-[#E0E0E0]">
                  Guess the current price
                </p>
              </div>
              <div className="flex justify-between">
                {quizData && (
                  <button
                    id="V1"
                    className="bg-[#2D2D2D] px-[45px] py-[15px] text-[14px] text-[#DFDFDF] font-bold rounded-xl"
                    onClick={() => handleOptionSelect("V1")}
                  >
                    {`$${quizData?.options?.value1}`}
                  </button>
                )}
                {quizData && (
                  <button
                    id="V2"
                    className="bg-[#2D2D2D] px-[45px] py-[15px] text-[14px] text-[#DFDFDF] font-bold rounded-xl"
                    onClick={() => handleOptionSelect("V2")}
                  >
                    {`$${quizData?.options?.value2}`}
                  </button>
                )}
              </div>
            </div>
            <BottomDrawer
              // isOpen={IsActive?.correctOne || IsActive?.incorrectOne}
              isOpen={IsActive?.isopen_drawer}
              onClose={() => setIsActive(true)}
              title=""
              closable
              // onOuterClosed={() => setIsActive(false)}
              height={510}
            >
              <div className="py-3">
                <div className="text-white flex flex-col items-center gap-[20px]">
                  {IsActive?.correctOne ===
                    quizData?.options?.correct_answer && (
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
                  )}

                  {IsActive?.correctOne !==
                    quizData?.options?.correct_answer && (
                    <div className="text-white flex flex-col items-center gap-[20px]">
                      <Image
                        src="/wrong.png"
                        height={1000}
                        width={1000}
                        alt="Wrongg"
                        className="w-16 h-16"
                      />
                      <div className="text-center">
                        <p className="font-bold text-xl text-[#E0E0E0]">
                          Almost There!!
                        </p>
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
                      alt="honimage"
                      className="w-8 h-8"
                    />
                    <span className="text-[32px] font-bold text-[#E0E0E0]">
                    {IsActive?.correctOne ===
                        quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50):(cookiesToken?.rank?.points)} Honors
                    </span>
                  </div>
                </div>

                <div>
                  <div className=" w-full flex flex-col gap-3 mt-2 px-6">
                    <button
                      className={`bg-[#1F1F1F]/40 border border-[#66666680]/20 rounded-3xl py-5 ${
                        claimLoading == 1 || claimLoading == 2
                          ? "opacity-60"
                          : null
                      }`}
                      onClick={handleToggleButton}
                      disabled={claimLoading == 1 || claimLoading == 2}
                    >
                      <p className="text-white text-sm font-[700]">
                        Claim {IsActive?.correctOne ===
                        quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50):cookiesToken?.rank?.points} Honors
                      </p>
                    </button>

                    {connect_wallet_address && ton_wallet?.connected ? (
                      <button
                        className={` bg-[#A4E493] rounded-3xl py-5 text-black font-[700] text-sm${
                          claimLoading == 1 || claimLoading == 2
                            ? "opacity-70"
                            : null
                        } `}
                        onClick={handleSendTransaction}
                        disabled={claimLoading == 1 || claimLoading == 2}
                      >
                        <p>Get 5x More: {IsActive?.correctOne ===
                        quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50)*5:(cookiesToken?.rank?.points)*5} Honors</p>
                      </button>
                    ) : (
                      <button
                        className={` bg-[#A4E493] rounded-3xl py-5 `}
                        onClick={() => {
                          handleConnectWallet();
                        }}
                        disabled={claimLoading == 1}
                      >
                        <p className="text-black font-[700] text-sm">
                        Get 5x More: {IsActive?.correctOne ===
                        quizData?.options?.correct_answer ?((cookiesToken?.rank?.points)+50)*5:(cookiesToken?.rank?.points)*5} Honors
                        </p>
                        {/* <p className="text-sm text-gray-200 font-sans">
                    Get 
                  </p> */}
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="text-center mt-4">
                                <p className="text-[#747474] font-[400] text-xs">Stake your tokens and multiply your <br /> earnings instantly.</p>
                            </div> */}
              </div>
            </BottomDrawer>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
