"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const menuItems = [
  {
    offIcon: "/backgroud/home-off.png",
    onIcon: "/backgroud/home-on.png",
    url: "/",
    label: "Home",
  },
  {
    offIcon: "/backgroud/tasks-off.png",
    onIcon: "/backgroud/tasks-on.png",
    url: "/mainQuest",
    label: "Task",
  },
  {
    offIcon: "/backgroud/order-inactive-footer.png",
    onIcon: "/backgroud/order-active-footer.png",
    url: "/order-of-shinobi",
    label: "Order",
  },

  {
    offIcon: "/backgroud/friend-inactive-footer.png",
    onIcon: "/backgroud/friend-active-footer.png",
    url: "/referral",
    label: "Friends",
  },
  {
    offIcon: "/backgroud/profile-off.png",
    onIcon: "/backgroud/profile-on.png",
    url: "/dashboard",
    label: "Profile",
  },
];

const TelegramFooter = () => {
  const router = useRouter();
  const [active, setActive] = useState<number>(0); // Default active index

  const handleClick = async (i: number, item: any) => {
    setActive(i);
    await router.push(item.url !== "/" ? `${item.url}?active=${i}` : item.url);
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const activeIndex = searchParams.get("active");
    if (activeIndex !== null) setActive(parseInt(activeIndex));
  }, []);

  return (
    <div className="bg-[#1C1C1C] h-[90px] w-full rounded-t-xl z-50 relative">
      <ul className="flex w-full">
        {menuItems.map((menu, i) => (
          <li key={i} className="w-full text-end">
            <a
              className="flex flex-col text-center w-full"
              onClick={() => handleClick(i, menu)}
            >
              <div className="text-center flex flex-col items-center justify-center mt-6">
                <img
                  src={active === i ? menu.onIcon : menu.offIcon}
                  alt={menu.label}
                  className="w-6 h-6" // Adjust size as needed
                />
                {menu.label && (
                  <p className={`text-[10px] font-[500] ${active === i ? 'text-[#E0E0E0]' : 'text-[#6B6B6B]'}`}>{menu.label}</p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TelegramFooter;
