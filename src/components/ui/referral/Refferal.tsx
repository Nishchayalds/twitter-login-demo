import BottomNavigation from "@/components/layout/BottomNevigation";
import MobileLeaderboard from "@/components/ui/responsivetable";
import Leaderboard from "@/components/ui/table";
import { urlConstants } from "@/constants";
import RemoteController from "@/controller/RemoteController";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import CopyLink from "@/components/ui/referral/CopyLink";
import RefferalTable from "@/app/referral/components/RefferalTable";

interface CardProps {
  number: string; // or `number` if it's a number type
  imageSrc: string;
  title: string;
  description: string;
}

// Create a reusable Card component
async function Card({ number, imageSrc, title, description }: CardProps) {
  return (
    <div className="border border-borderColor text-white p-3 md:backdrop-blur-sm bg-white/5 rounded-lg flex flex-col items-start w-full shadow-lg ">
      <div className="flex items-center w-full  justify-between mb-4">
        <div className="rounded-full">
          <Image src={imageSrc} alt={title} width={30} height={30} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#929292]">{number}</p>
        </div>
      </div>
      <div className="w-[75%]">
        <p className="text-lg mb-1">{title}</p>
      </div>
      <p className="text-[#A7B1AC] font-light text-xs w-[85%] pt-2 justify-normal ">
        {description}
      </p>
    </div>
  );
}

export default async function Refferal({ FdData }: any) {
  const LeaderboardController = new RemoteController();
  const LeaderboardData = await LeaderboardController.get(
    urlConstants.leaderboard
  );
  const url = urlConstants.leaderboard;
  const token: any = await getServerSession(authOptions);
  const controller = new RemoteController(token?.user?.image);
  const userData = await controller.get(urlConstants?.me);

  const descriptions = [
    {
      title2: "Leaderboard",
    },
  ];

  return (
    <div className="h-full w-full unbounded  mt-12">
      <div className="w-full flex flex-col md:flex-row justify-center bg-ellipsegreenCircle bg-no-repeat bg-center bg-contain relative">
        <div className="w-full md:w-[90%] p-5 h-auto flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-[50%] h-full flex flex-col ">
            <div className="w-full md:w-[85%] text-center md:text-left justify-between">
              <div className="text-2xl md:text-4xl tracking-wider font-semibold">
                <p>Refer a Friend,</p>
                <p>Earn rewards!</p>
              </div>
              <br />
              <div className="text-base text-[#F2F2F2] font-light w-full md:text-lg">
                <p>
                  Share the love! Get Quest completions from referrals, Collect
                  Gems, and Redeem Epic Rewards! 🏆 💰
                </p>
              </div>
            </div>
            <br />
            <div className="w-full md:w-[80%] py-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Use Card component to render each card */}
                <Card
                  number="1"
                  imageSrc="/backgroud/link.png"
                  title="Send Invitation"
                  description="Share your unique referral link with a friend."
                />
                <Card
                  number="2"
                  imageSrc="/backgroud/medal.png"
                  title="Complete quests"
                  description="Get 20 honors per new user who signs up and completes their first quest."
                />
                <Card
                  number="3"
                  imageSrc="/backgroud/reward.png"
                  title="Earn Rewards"
                  description="Earn amazing rewards using your honors."
                />
              </div>

              <CopyLink userData={userData} type={"R"} />
            </div>
          </div>
          <div className="w-[50%] h-full p-3 relative ">
            <Image
              src={require("../../../../public/backgroud/vintage-door-lines.png")}
              alt="lines.png"
              className="absolute w-[100%] top-0 right-0 md:block hidden //  2xl:h-full"
            />
            <div className="w-full h-full">
              <Image
                src={require("../../../../public/backgroud/vintage-door.png")}
                alt="vintage-door.png"
                className="absolute md:w-[100%] md:top-20 md:right-12 hidden md:block // 2xl:top-16 2xl:right-35"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center items-center bg-tree  bg-no-repeat  bg-cover">
        <div className="hidden lg:block md:w-[80%] w-[90%] rounded-xl border border-borderDark">
          <RefferalTable FdData={FdData} />
        </div>
        <div className="block lg:hidden md:w-[80%] w-[90%] ">
          <MobileLeaderboard FdData={FdData} />
        </div>
      </div>
    </div>
  );
}
