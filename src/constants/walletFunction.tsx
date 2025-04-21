import { CreateRecordforDailyfarming } from "@/controller/UserController";
import { TonConnectUI } from "@tonconnect/ui";
import { toast } from "react-toastify";

// Initialize TonConnectUI instance
let tonConnectUIInstance: TonConnectUI | undefined;
const TIMER_DURATION = 8 * 60 * 60 * 1000; // 6 hours 18600000

export const initializeTonConnect = () => {
  const manifestUrl =
    "https://supidobucket.s3.eu-north-1.amazonaws.com/media/ton-manifest.json";
  if (!tonConnectUIInstance) {
    tonConnectUIInstance = new TonConnectUI({ manifestUrl });
  }
  return tonConnectUIInstance;
};
// Get connected wallet address from localStorage
export const getConnectedWalletAddress = (): string | null => {
  const storedData = localStorage.getItem(
    "ton-connect-storage_bridge-connection"
  );
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData?.connectEvent?.payload?.items[0]?.address || null;
  }
  return null;
};

const getCurrentWindowStart = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getUTCHours();  
  const windowStartHour = Math.floor(currentHour / 8) * 8; // 0, 8, 16 (GMT)
  const windowStart = new Date(currentTime);
  windowStart.setUTCHours(windowStartHour, 0, 0, 0); // Use UTC hours
  return windowStart;
};

export const getNextWindowStart = (currentWindowStart: Date) => {
  const nextWindow = new Date(currentWindowStart);
  nextWindow.setUTCHours(nextWindow.getUTCHours() + 8); // 8 hours added in GMT
  return nextWindow;
};

// Update the window duration to 2 minutes
export const startTimer = (
  setProgress: (progress: number) => void,
  setTimeLeft: (time: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => void,
  setIsClient: (value: boolean) => void
) => {
  const windowDuration = 8 * 60 * 60 * 1000; // 6 minutes in milliseconds

  const updateTimer = () => {
    const currentTime = new Date();
    const currentWindowStart = getCurrentWindowStart();
    const nextWindowStart = getNextWindowStart(currentWindowStart);
    const difference = nextWindowStart.getTime() - currentTime.getTime();

    // 🔥 **Progress Bar Update**
    const progressPercentage =
      ((windowDuration - difference) / windowDuration) * 100;
    setProgress(progressPercentage); 

    // if (
    //   Math.floor((difference / (1000 * 60 * 60)) % 24) == 0 &&
    //   Math.floor((difference / 1000) % 60) == 0 &&
    //   Math.floor((difference / (1000 * 60)) % 60) == 0
    // ) {
    //   setIsClient(false);
    //   localStorage.setItem("isClient", JSON.stringify(false));
    // }

    if (difference <= 1000) {
      setIsClient(false); 
      localStorage.setItem("isClient", JSON.stringify(false));
    }

    // ⏳ **Countdown Timer Update**
    setTimeLeft({
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  };

  updateTimer(); // Pehli baar update karo
  const timer = setInterval(updateTimer, 1000); // Har second update karo

  return () => clearInterval(timer); // Cleanup function
};

// Claim Handler
export const handleClaimfromwallet = () => {
  // const currentWindowStart = getCurrentWindowStart();
  // const claimStatus = JSON.parse(localStorage.getItem("claimStatus") || "{}");
  // claimStatus[currentWindowStart.toISOString()] = true; // Mark as claimed
  // localStorage.setItem("claimStatus", JSON.stringify(claimStatus));
  // ✅ Update UI after claiming
  // setIsClient(false); // Always show the button
};

// post ki api yha chlani hai

export const toggleButtonVisibility = async (
  setIsClient: (value: boolean) => void,
  setIsOpen: (value: boolean) => void,
  // submitCoins: () => void,
  type: string,
  timeLeft:any=null,
  User_Token:any=null
) => {
  try {
    setIsClient(true); // Disable the button
    setIsOpen(false); // Show the modal or update state

    
    if (type == "DF") {
      // DF  = Daily Farming
      //creating user daily claim record
      if(timeLeft != null && User_Token != null){
        console.log("in api", timeLeft);
      const data = {
            hours: timeLeft.hours,
            minutes: timeLeft.minutes,
            seconds: timeLeft.seconds,
          };
          try {
            await CreateRecordforDailyfarming(User_Token, data);
          } catch (error) {
            console.error("Error: from toggle function", error);
          }}
      localStorage.setItem("isClient", JSON.stringify(true));
    }
    // submitCoins();
  } catch (error) {
    console.error("Error: from toggle function", error);
  }
};

export const toggleButtonClaimVisibility = async (
  setIsClient: (value: boolean) => void,
  setIsOpen: (value: boolean) => void,
  submitCoins: () => void,
  type: string,
  timeLeft:any=null,
  User_Token:any=null
) => {
  try {
    setIsClient(true); // Disable the button
    setIsOpen(false); // Show the modal or update state

    
    if (type == "DF") {
      // DF  = Daily Farming
      //creating user daily claim record
      if(timeLeft != null && User_Token != null){
        console.log("in api", timeLeft);
      const data = {
            hours: timeLeft.hours,
            minutes: timeLeft.minutes,
            seconds: timeLeft.seconds,
          };
          // try {
          //   await CreateRecordforDailyfarming(User_Token, data);
          // } catch (error) {
          //   console.error("Error: from toggle function", error);
          // }
        }
      localStorage.setItem("isClient", JSON.stringify(true));
    }
    submitCoins();
  } catch (error) {
    console.error("Error: from toggle function", error);
  }
};

// Send TON transaction
export const sendTonTransaction = async (
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
    messages: [{ address: "UQDuLVqlh1ZPfVxBcHhZnIQWOs8WNaCkZoy6tmMr7q0qDv-x", amount: "25000000" }],
  };

  try {
    const result = await tonWallet.sendTransaction(transaction);
    toast.success("Transaction sent successfully ");
    console.log("Transaction sent successfully :", result);
    submitCoins();
  } catch (error) {
    toast.error("Transaction failed !");
    console.error("Transaction failed:", error);
  }
};

// Handle wallet connection
export const handleWalletConnect = async (tonWallet: any) => {
  if (tonWallet) {
    if (tonWallet.account) {
      console.log(tonWallet.connected, "[is wallet connected]");
      console.log("Wallet already connected:", tonWallet.account.address);
    } else {
      await tonWallet.openModal();
    }
  }
};
