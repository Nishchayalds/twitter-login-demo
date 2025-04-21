"use client";
import { useRef, useState } from "react";
import InfinityScroll from "../ui/InfinityScroll";
import TelegramCardMoblie from "./TelegramCardMoblie";

const Questcategories = ({
  featuredQuest,
  Quest,
  QuestInteractive,
  partners,
  token,
}: any) => {
  const [isOpen, setIsOpen] = useState("Onboarding");
  const containerRef = useRef(null);

  const renderContent = () => {
    const getHref = () => {
      switch (isOpen) {
        case "Onboarding":
          return "/onboarding";
        case "Interactive":
          return "/interactive";
        case "Ecosystem":
          return "/partners";
        default:
          return "#";
      }
    };

    switch (isOpen) {
      case "Onboarding":
        return (
          <>
            <InfinityScroll
              data={Quest}
              view={(item: any, index: any) => (
                <div className="px-1 py-2  w-full" key={index}>
                  <TelegramCardMoblie
                    index={index}
                    item={item}
                    type={"O"}
                    token={token}
                  />
                </div>
              )}
            />
          </>
        );

      case "Interactive":
        return (
          <InfinityScroll
            data={QuestInteractive}
            view={(item: any, index: any) => (
              <div className="p-1   w-full" key={index}>
                <TelegramCardMoblie
                  index={index}
                  item={item}
                  type={"I"}
                  token={token}
                />
              </div>
            )}
          />
        );

      case "Ecosystem":
        return (
          <InfinityScroll
            data={partners}
            view={(item: any, index: any) => (
              <div className=" w-full" key={index}>
                <TelegramCardMoblie
                  index={index}
                  item={item}
                  type={"P"}
                  partner={true}
                  token={token}
                />
              </div>
            )}
          />
        );

      default:
        return null;
    }
  };

  const data = [
    { name: "Onboarding", url: "Onboarding" },
    { name: "Interactive", url: "Interactive" },
    { name: "Ecosystem partners", url: "Ecosystem" },
  ];

  const handleClick = (itemUrl: any, index: any) => {
    setIsOpen(itemUrl);

    // Scroll the clicked item into the center
    const container: any = containerRef.current;
    const selectedItem = container?.children[index];

    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Ensures no vertical scroll
        inline: "center", // Scroll horizontally to the center
      });
    }
  };

  return (
    <div className="px-5 pb-1 w-full">
      <p>Campaign</p>
      <div
        ref={containerRef}
        className="flex text-xs mb-8 w-full pt-4 overflow-x-hidden whitespace-nowrap "
      >
        {data?.map((item: any, index: any) => (
          <div
            key={index}
            // onClick={() => setIsOpen(item.url)}
            onClick={() => handleClick(item.url, index)}
            className="flex items-center justify-center w-full mr-8 relative "
          >
            {isOpen == item.url ? (
              <>
                {/* <span className="absolute -top-2 -right-2 rounded-full bg-green p-1 text-white">
                  {Quest.length}
                </span> */}
                <p className="w-full text-black rounded-large bg-[#B6FFA3] whitespace-nowrap px-4 py-2 text-center text-[13px] font-bold">
                  {item?.name}
                </p>
              </>
            ) : (
              <p className="w-full text-[#A8A8A8] bg-[#181818] shadow-[0.5px_-0.5px_0px_#ABABAB,-0.5px_-0.5px_0px_#ABABAB] rounded-large whitespace-nowrap px-4 py-2 text-center text-[13px] font-bold">
                {item?.name}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <div className="md:hidden block md:px-5 w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Questcategories;
