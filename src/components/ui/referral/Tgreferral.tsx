// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { urlConstants } from "@/constants";
// import RemoteController from "@/controller/RemoteController";
// import { getServerSession } from "next-auth";
// import Image from "next/image";
// import TgLeaderBoard from "../leaderboard/tgTable";
// import CopyLink from "@/components/Telegram/TeleCopy";
// import TelegramHeader from "@/components/Telegram/Telegramheader";
// import { FaCirclePlus } from "react-icons/fa6";
// import { BsFillLightningChargeFill } from "react-icons/bs";
// import { IoIosLink } from "react-icons/io";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CopyLink from "@/components/Telegram/TeleCopy";
import TelegramHeader from "@/components/Telegram/Telegramheader";
import { urlConstants } from "@/constants";
import RemoteController from "@/controller/RemoteController";
import { getServerSession } from "next-auth";
import { BiCopy } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";

// interface CardProps {
//   number: string; // or `number` if it's a number type
//   imageSrc: string;
//   title: string;
//   description: string;
// }

// // Create a reusable Card component
// async function Card({ number, imageSrc, title, description }: CardProps) {
//   return (
//     <div className="border mt-3 border-borderColor text-white p-3 md:backdrop-blur-sm bg-white/5 rounded-lg flex flex-col items-start w-full shadow-lg ">
//       <div className="flex items-center w-full  justify-between mb-4">
//         <div className="rounded-full">
//           <Image src={imageSrc} alt={title} width={30} height={30} />
//         </div>
//         <div>
//           <p className="text-2xl font-bold text-[#929292]">{number}</p>
//         </div>
//       </div>
//       <div className="w-[75%]">
//         <p className="text-lg mb-1">{title}</p>
//       </div>
//       <p className="text-[#A7B1AC] font-light text-xs w-[85%] pt-2 justify-normal line-clamp-2">
//         {description}
//       </p>
//     </div>
//   );
// }

// export default async function Tgrefferal() {
// const LeaderboardController = new RemoteController();
// const LeaderboardData = await LeaderboardController.get(
//   urlConstants.leaderboard
// );
// const url = urlConstants.leaderboard;
// const token: any = await getServerSession(authOptions);
// const controller = new RemoteController(token?.user?.image);
// const userData = await controller.get(urlConstants?.me);

//   return (
//     <div className="bg-telelines bg-opacit bg-no-repeat bg-contain bg-[#0F0F0F] h-full">
// <div className="">
//   <TelegramHeader
//     token={token}
//     cancel={"Cancel"}
//     title={""}
//     show={true}
//   />
// </div>
//       <div className="h-full w-full   pt-2 ">
//         <div className="w-full flex flex-col md:flex-row justify-center bg-greenShadow bg-no-repeat  ">
//           <div className="w-full  h-auto flex flex-col items-center">
//             <div className="w-full h-full flex flex-col ">
//               <div className="w-full  text-center  ">
//                 <div className="text-lg  tracking-wider font-semibold mt-1">
//                   <p>Refer a Friend,Earn rewards!</p>
//                 </div>
//                 <div className="text-sm text-[#F2F2F2] font-light w-full px-8 mt-3 tracking-wider">
//                   <p>
//                     Share the love! Get Quest completions from referrals,
//                     Collect Gems, and Redeem Epic Rewards!
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-center gap-1 my-3">
//                   {/* <BsFillLightningChargeFill className="text-2xl text-[#848486]"/> */}
//                   <Image
//                     src={require("../../../../public/avtars/daimond.png")}
//                     height={30}
//                     width={30}
//                     alt="Daimond"
//                   />
//                   <span className="text-[40px] font-semibold">
//                     {userData?.total_referral}
//                   </span>
//                   <span className="bg-green rounded-full h-5 w-5 text-center p-1 text-black">
//                     <IoIosLink className="text-xs" />
//                   </span>
//                 </div>
//               </div>

//               <div className="w-full pb-5 ">
//                 <div className=" bg-orangeCircle bg-center">
//                   <div className="flex flex-col md:flex-row gap-4 px-5">
//                     <Card
//                       number="1"
//                       imageSrc={require("../../../../public/backgroud/link.png")}
//                       title="Send Invitation"
//                       description="Share your unique referral link with a friend."
//                     />
//                     <Card
//                       number="2"
//                       imageSrc={require("../../../../public/backgroud/medal.png")}
//                       title="Complete quests"
//                       description="Get 20 honors per new user who signs up and completes their two quest."
//                     />
//                     <Card
//                       number="3"
//                       imageSrc={require("../../../../public/backgroud/reward.png")}
//                       title="Earn Rewards"
//                       description="Earn amazing rewards using your honors."
//                     />
//                   </div>
//                 </div>
//                 <div className="px-5 z-50">
//                   <CopyLink userData={userData} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="w-full flex justify-center items-center bg-tree  bg-no-repeat  bg-cover">
//         <div className="block md:hidden md:w-[80%] w-[90%] ">
//           <TgLeaderBoard
//             leaderData={LeaderboardData}
//             url={url}
//             descriptions={descriptions}
//           />
//         </div>
//       </div> */}
//       </div>
//     </div>
//   );
// }

// import { ChevronLeft, Copy, Share2, Info } from "lucide-react"
// import { Button } from "@/components/ui/button"

export default async function ReferralPage() {
  const LeaderboardController = new RemoteController();
  const LeaderboardData = await LeaderboardController.get(
    urlConstants.leaderboard
  );
  const url = urlConstants.leaderboard;
  const token: any = await getServerSession(authOptions);
  const controller = new RemoteController(token?.user?.image);
  const userData = await controller.get(urlConstants?.me);
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="">
        {/* <TelegramHeader
          token={token}
          cancel={"Back"}
          title={"Refer a friend"}
          show={false}
        /> */}
      </div>
      {/* Mobile frame for demo purposes */}
      <div className="max-w-md mx-auto bg-[#121212] min-h-screen relative">
        {/* Main content */}
        <div className="px-6 py-4">
          {/* Referral card */}
          <div className="rounded-3xl overflow-hidden mb-6 border-2 border-[#1C1C1E] h-48">
            <div className="flex justify-start items-end bg-tginvite bg-center bg-cover bg-no-repeat p-6 w-full h-full rounded-3xl relative">
              {/* <div className="absolute inset-0 bg-black/20 rounded-3xl"></div> */}
              <div className="relative z-10">
                <div className="text-sm mb-1">Referral</div>
                <div className="text-4xl font-bold">
                  {userData?.total_referral}
                </div>
              </div>
            </div>
          </div>

          {/* Referral link */}
          <div className="flex items-center mb-10">
            <CopyLink userData={userData} />
          </div>

          {/* Refer a friend section */}
          <div className="mb-8 mx-6">
            <h2 className="text-2xl font-semibold mb-2">Refer A Friend</h2>
            <p className="text-[#dfdfdf] text-xs font-[200]">
              Share the love! Get Quest completions from referrals, Collect
              Gems, and Redeem Epic Rewards!
            </p>
          </div>

          {/* How it works button */}
          <button className="flex items-center gap-2 mb-8 mx-8">
            <div className="w-6 h-6 rounded-full border border-[#BCA2FF] flex items-center justify-center ">
              <BsInfo className="w-5 h-5 text-[#BCA2FF]" />
            </div>
            <span className="text-xs">How it works</span>
          </button>

          {/* Steps */}
          <div className="relative mx-6">
            {/* Vertical line */}
            <div className="absolute left-[25px] top-[40px] bottom-[40px] w-0.5 bg-[#2F2F2F]  z-0"></div>

            {/* Step 1 */}
            <div className="flex mb-12 relative z-10  w-full">
              <div className="w-[20%]">
                <div
                  className="w-12 h-12 rounded-full border border-borderColor
bg-[#2F2F2F]  flex items-center justify-center text-xl font-bold mr-6"
                >
                  1
                </div>
              </div>
              <div className="w-[80%]">
                <h3 className="text-md font-semibold mb-1">Send Invitation</h3>
                <p className="text-gray-400 text-xs">
                  Share your unique referral link with a friend.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex mb-12 relative z-10  w-full">
              <div className="w-[20%]">
                <div
                  className="w-12 h-12 rounded-full border border-borderColor
bg-[#2F2F2F]  flex items-center justify-center text-md font-bold mr-6"
                >
                  2
                </div>
              </div>
              <div className="w-[80%]">
                <h3 className="text-md font-semibold mb-1">Complete Quests</h3>
                <p className="text-gray-400 text-xs">
                  Get 20 Honors per new user who signs up and completes their
                  first quest.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex mb-12 relative z-10  w-full">
              <div className="w-[20%]">
                <div
                  className="w-12 h-12 rounded-full border border-borderColor
bg-[#2F2F2F]  flex items-center justify-center text-md font-bold mr-6"
                >
                  3
                </div>
              </div>
              <div className="w-[80%]">
                <h3 className="text-md font-semibold mb-1">Earn Rewards</h3>
                <p className="text-gray-400 text-xs">
                  Earn amazing rewards using your Honors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
