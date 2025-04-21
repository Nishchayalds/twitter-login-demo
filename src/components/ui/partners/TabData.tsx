"use client";
import CardComponent from "@/components/ui/Quest/cardComponent";
import { PartnerContext } from "@/app/partners/providers/context";
import { useContext } from "react";
import InfinityScroll from "../InfinityScroll";
import TelegramCardMoblie from "@/components/Telegram/TelegramCardMoblie";
import { useSession } from "next-auth/react";

export default function TabData() {
  const { partner } = useContext(PartnerContext);
  const tokenData: any = useSession();
  const tg = tokenData && tokenData?.data?.loginType == "TG" ? true : false;

  return (
    <div className="w-full min-h-[80vh]">
      {tg ? (
        <>
          <InfinityScroll
            data={partner}
            view={(item: any, index: any) => (
              <div key={index} className="w-full md:w-[32%] lg:w-[24%] px-2">
                <TelegramCardMoblie
                  index={index}
                  item={item}
                  type={"P"}
                  partner={true}
                />
              </div>
            )}
          />
        </>
      ) : (
        <>
          {" "}
          <InfinityScroll
            data={partner}
            partner={true}
            view={(item: any, index: any) => (
              <div
                key={index}
                className="w-full md:w-[32%] lg:w-[24%] md:px-0 px-4 mb-6 md:mb-0"
              >
                <CardComponent
                  index={index}
                  item={item}
                  type={"P"}
                  partner={true}
                />
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}
