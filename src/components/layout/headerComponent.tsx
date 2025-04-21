"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MobileHeader from "./MobileHeader";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface HeaderI {
  token: any;
  tg: any;
}

export default function HeaderComponent({ token }: HeaderI) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tokendata: any = useSession();
  const tg = tokendata && tokendata?.data?.loginType == "TG" ? true : false;

  const headerItem = [
    { title: "QUEST", link: "/" },
    { title: "LEADERBOARD", link: "/leaderboard" },
    { title: "PARTNERS", link: "/partners" },
    { title: "REFERRAL", link: "/referral" },
    { title: "ORDER OF SHINOBI", link: "/order-of-shinobi" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      console.log("Scroll Offset:", offset); // Debug log for offset
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("Removing scroll event listener"); // Debug log
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleDropdownClick = () => {
    setDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* for desktop */}
      <header
        className={`w-full px-6 lg:px-16 py-3 ${
          tg ? "hidden" : "flex"
        } items-center sticky left-0 top-0  z-[50] transition-all duration-300  ${
          scrolled
            ? "backdrop-blur-md bg-opacity-80"
            : "backdrop-blur-md bg-opacity-80"
        }`}
      >
        <div className="flex flex-1   ">
          <div className="text-2xl font-bold flex items-center justify-between w-full gap-4 lg:gap-8  ">
            <div className="relative w-32">
              <a href="/">
                <Image
                  alt=""
                  src={require("../../../public/backgroud/logo.png")}
                  className="object-contain"
                />
              </a>
            </div>
            <div className="flex  gap-2 mr-2 ">
              <nav className="flex gap-2  border p-1 border-white/5 rounded-lg bg-black/10">
                {headerItem?.slice(0, 3).map((item, index) => (
                  <Link
                    className="text-[9px] xl:text-xs xl:py-2 font-[300] tracking-widest px-2 hover:bg-white/5  rounded-md"
                    key={index}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <nav className="flex gap-2  border p-1 border-white/5 rounded-lg bg-black/10">
                {headerItem?.slice(3).map((item, index) => (
                  <Link
                    className="text-[9px] xl:text-xs xl:py-2 font-[300] tracking-widest px-2 hover:bg-white/5  rounded-md"
                    key={index}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div
          className="flex justify-between items-center gap-2 relative"
          ref={dropdownRef}
        >
          {token !== null && (
            <div
              onClick={toggleDropdown}
              className="text-xl border py-2 px-4 border-gray-600 rounded-full hover:bg-white/10 cursor-pointer"
            >
              {token.user_name.charAt(0).toUpperCase()}
            </div>
          )}

          {dropdownVisible && token && (
            <div
              onClick={handleDropdownClick}
              className="absolute right-[-35px] w-32 h-28 justify-center flex flex-col gap-4 top-16 bg-[#1B1B1B] border  border-gray-600  shadow-lg rounded-md z-50"
            >
              <Link
                href="/dashboard"
                className="text-white font-semibold text-center cursor-pointer"
              >
                Profile
              </Link>
              <div className="h-[1px] bg-gray-600 mx-1"></div>

              {token != null ? (
                <div className="text-center px-3">
                  <p
                    onClick={() => {
                      signOut();
                    }}
                    className="unbounded text-xs border px-3 py-1.5 border-gray-800 rounded-full bg-green cursor-pointer text-black"
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <div>
                  <Link
                    href={"/"}
                    className="unbounded text-black text-xs border px-3 py-1.5 border-gray-800 rounded-full bg-[#ff5c00] cursor-pointer"
                  >
                    Signin
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* for mobile */}
      {!tg && <MobileHeader token={token} tg={tg} />}
    </>
  );
}
