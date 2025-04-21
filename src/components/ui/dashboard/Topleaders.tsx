// import Image from "next/image";
// import { IoDiamond, IoDiamondOutline } from "react-icons/io5";
// import { MdGroup } from "react-icons/md";

// const TopLeaderboard = ({ rank ,LeaderboardData}: any) => {
//   const leaders = [
//     {
//       name: rank[1].user_name,
//       score: rank[1].total_honor,
//       rank: rank[1].rank,
//       rankImage: require("../../../../public/avtars/rank2.png"),
//       imgSrc: require("../../../../public/avtars/avatar2.png"),
//     },
//     {
//       name: rank[0].user_name,
//       score: rank[0].total_honor,
//       rank: rank[0].rank,
//       rankImage: require("../../../../public/avtars/rank1.png"),
//       imgSrc: require("../../../../public/avtars/avatar1.png"),
//     },
//     {
//       name: rank[2].user_name,
//       score: rank[2].total_honor,
//       rank: rank[2].rank,
//       rankImage: require("../../../../public/avtars/rank3.png"),
//       imgSrc: require("../../../../public/avtars/avatar3.png"),
//     },
//   ];
//   console.log("rank", rank);
//   return (
//     <>
//       <div className=" py-10 px-4 rounded-xl text-center flex flex-col justify-center items-center w-full ">
//         <h2 className="text-white leading-6 tracking-widest text-4xl font-normal mb-4">
//           Top Leaders
//         </h2>
//         <p className="text-gray text-xs flex justify-center gap-5 px-3 py-3 border border-gray-2 backdrop-blur-sm w-fit rounded-2xl items-center">
//           <MdGroup /> Your current rank: 3
//         </p>
//         <div className="w-[85%] bg-avtar bg-contain bg-no-repeat bg-center">
//           <div className="flex relative z-50  gap-12 sm:gap-8  flex-col items-center md:mb-36 md:flex-row  justify-between my-5">
//             {leaders.map((leader, index) => (
//               <div
//                 key={leader.name}
//                 className={`relative   w-52   border border-borderDark backdrop-blur-sm  bg-white/5 p-4 rounded-2xl shadow-md ${
//                   index === 0
//                     ? "order-2 md:order-1 md:top-44 "
//                     : index === 1
//                     ? "order-1 md:order-2 top-4 "
//                     : "order-3 md:top-36"
//                 }`}
//               >
//                 <div className="flex justify-center  items-center">
//                   <Image
//                     src={leader.imgSrc}
//                     alt={leader.name}
//                     height={1080}
//                     width={1920}
//                   />
//                 </div>

//                 <div className="flex gap-3 items-center  overflow-hidden">
//                   <Image
//                     src={leader.imgSrc}
//                     alt={leader.name}
//                     className="rounded-full w-10 h-10"
//                     height={1080}
//                     width={1920}
//                   />
//                   {leader.name}
//                 </div>
//                 <div className=" flex justify-evenly gap-2 items-center ">
//                   <div className="mt-2 space-x-2 py-1 text-white text-xs flex  gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
//                     <IoDiamondOutline />
//                     <span className="text-white font-normal text-[10px]">
//                       {leader.score}
//                     </span>
//                   </div>
//                   <div className="mt-2 space-x-2 py-1 text-white text-[10px] flex  gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
//                     <IoDiamond color="pink" />
//                     <span className="text-white font-normal ">
//                       {leader.rank}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="w-full flex  flex-col md:flex-row h-[85%]  sm:h-0 justify-between absolute right-2 sm:right-7 lg:right-[60px]   top-32">
//               {leaders.map((leader, index) => (
//                 <div
//                   className={`${
//                     index === 0
//                       ? "order-3 md:order-1 "
//                       : index === 1
//                       ? "order-1  "
//                       : "order-3   "
//                   }`}
//                 >
//                   <Image
//                     src={leader.rankImage}
//                     alt={leader.name}
//                     className={`flex${
//                       index === 0
//                         ? " md:mt-32 mt-0  "
//                         : index === 1
//                         ? "  "
//                         : "order-3  md:mt-32 mr-32 "
//                     }`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopLeaderboard;

import Image from "next/image";
import { IoDiamond, IoDiamondOutline } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import Slider from "react-slick";
import SimpleSlider from "../Slider";

const TopLeaderboard = ({ rank, myrank }: any) => {
  const leaders = [
    {
      name: rank[0].user_name,
      score: rank[0].total_honor,
      rank: rank[0].rank,
      rankImage: require("../../../../public/avtars/rank1.png"),
      imgSrc: require("../../../../public/avtars/avatar1.png"),
    },
    {
      name: rank[1].user_name,
      score: rank[1].total_honor,
      rank: rank[1].rank,
      rankImage: require("../../../../public/avtars/rank2.png"),
      imgSrc: require("../../../../public/avtars/avatar2.png"),
    },
    {
      name: rank[2].user_name,
      score: rank[2].total_honor,
      rank: rank[2].rank,
      rankImage: require("../../../../public/avtars/rank3.png"),
      imgSrc: require("../../../../public/avtars/avatar3.png"),
    },
  ];
  const leaders1 = [
    {
      name: rank[0].user_name,
      score: rank[0].total_honor,
      rank: rank[0].rank,
      rankImage: require("../../../../public/avtars/rank1.png"),
      imgSrc: require("../../../../public/avtars/avatar1.png"),
    },
    {
      name: rank[1].user_name,
      score: rank[1].total_honor,
      rank: rank[1].rank,
      rankImage: require("../../../../public/avtars/rank2.png"),
      imgSrc: require("../../../../public/avtars/avatar2.png"),
    },
    {
      name: rank[2].user_name,
      score: rank[2].total_honor,
      rank: rank[2].rank,
      rankImage: require("../../../../public/avtars/rank3.png"),
      imgSrc: require("../../../../public/avtars/avatar3.png"),
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className=" py-10 px-4 rounded-xl text-center flex flex-col justify-center items-center w-full ">
        <h2 className="text-white leading-6 tracking-widest text-4xl font-normal mb-4">
          Top Leaders
        </h2>
        <p className="text-gray text-xs flex justify-center gap-2 px-3 py-3 border border-gray-2 backdrop-blur-sm w-fit rounded-2xl items-center">
          <MdGroup className="text-lg"/> Your current rank: {myrank}
        </p>

        <div className="lg:w-[85%] w-full bg-ellipsegreenCircle  bg-contain bg-no-repeat ">
          <div className="hidden md:block">
            <div className="flex relative z-50 gap-12 sm:gap-8 flex-col items-center mt-5 md:flex-row justify-between my-5">
              {leaders.map((leader, index) => (
                <div
                  key={leader.name}
                  className={`relative w-52 border border-borderDark backdrop-blur-sm bg-white/5 p-4 rounded-2xl shadow-md ${
                    index === 0
                      ? "order-2 md:order-1 "
                      : index === 1
                      ? "order-1 md:order-2 "
                      : "order-3 "
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <Image
                      src={leader.imgSrc}
                      alt={leader.name}
                      height={1080}
                      width={1920}
                    />
                  </div>

                  <div className="flex gap-3 items-center overflow-hidden">
                    <Image
                      src={leader.imgSrc}
                      alt={leader.name}
                      className="rounded-full w-10 h-10"
                      height={1080}
                      width={1920}
                    />
                    {leader.name}
                  </div>
                  <div className="flex justify-evenly gap-2 items-center">
                    <div className="mt-2 space-x-2 py-1 text-white text-xs flex gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
                      <IoDiamondOutline />
                      <span className="text-white font-normal text-[10px]">
                        {leader.score}
                      </span>
                    </div>
                    <div className="mt-2 space-x-2 py-1 text-white text-[10px] flex gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
                      <IoDiamond color="pink" />
                      <span className="text-white font-normal">
                        {leader.rank}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full flex flex-col md:flex-row h-[85%] sm:h-0 justify-between absolute right-2 sm:right-7 lg:right-[60px] top-32">
                {leaders.map((leader, index) => (
                  <div
                     
                  >
                    <Image
                      src={leader.rankImage}
                      alt={leader.name}
                      className={`flex ${
                        index === 0
                          ? "  mt-0  "
                          : index === 1
                          ? "  "
                          : "order-3   mr-32 "
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            {/* <Slider {...settings}> */}
            <SimpleSlider settings={"Top"}>

              {leaders1.map((leader, index) => (
                <div key={leader.name} className="relative w-full h-full">
                  <div className="flex relative z-50 gap-12 sm:gap-8 flex-col items-center md:mb-36 md:flex-row justify-between my-5">
                    <div className="relative w-52 border border-borderDark backdrop-blur-sm bg-white/5 p-4 rounded-2xl shadow-md">
                      <div className="flex justify-center items-center">
                        <Image
                          src={leader.imgSrc}
                          alt={leader.name}
                          height={1080}
                          width={1920}
                        />
                      </div>

                      <div className="flex gap-3 items-center overflow-hidden">
                        <Image
                          src={leader.imgSrc}
                          alt={leader.name}
                          className="rounded-full w-10 h-10"
                          height={1080}
                          width={1920}
                        />
                        {leader.name}
                      </div>
                      <div className="flex justify-evenly gap-2 items-center">
                        <div className="mt-2 space-x-2 py-1 text-white text-xs flex gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
                          <IoDiamondOutline />
                          <span className="text-white font-normal text-[10px]">
                            {leader.score}
                          </span>
                        </div>
                        <div className="mt-2 space-x-2 py-1 text-white text-[10px] flex gap-2 px-3 border border-gray-2 group-hover:border-[#3ee38b] backdrop-blur-sm rounded-2xl items-center">
                          <IoDiamond color="pink" />
                          <span className="text-white font-normal">
                            {leader.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row h-[85%] sm:h-0 justify-between absolute right-2 sm:right-7 lg:right-[60px] top-32">
                      <Image
                        src={leader.rankImage}
                        alt={leader.name}
                        className={`flex ${
                          index === 0
                            ? "md:mt-32 mt-0"
                            : index === 1
                            ? ""
                            : "order-3 md:mt-32 mr-32"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
            {/* </Slider> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopLeaderboard;
