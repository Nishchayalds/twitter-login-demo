import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function MobileHeader({ token, Signin, tg }: any) {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const headerItems = [
    { title: "QUEST", link: "/" },
    { title: "LEADERBOARD", link: "/leaderboard" },
    { title: "PARTNERS", link: "/partners" },
    { title: "REFERRAL", link: "/referral" },
    { title: "PROFILE", link: "/dashboard" },
    { title: "ORDER OF SHINOBI", link: "/order-of-shinobi" },
  ];

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <header className="w-full flex md:hidden justify-evenly items-center px-5 py-4 left-0 top-0 z-50">
        <div className="flex items-center justify-center ">
          <button
            onClick={toggleSidebar}
            className="ml-4 text-white text-3xl focus:outline-none"
          >
            &#9776;
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image
            alt="Logo"
            src={require("../../../public/backgroud/logo.png")}
            className="w-28 h-28 object-contain absolute "
          />
        </div>
      </header>

      <div
        className={`fixed md:hidden sm:w-[50%] top-0 left-0 w-full h-full bg-[#1B1B1B] z-40 shadow-lg transform transition-transform duration-300 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-sm font-bold px-3">
          <Link href="/">
            <Image
              alt="Logo"
              src={require("../../../public/backgroud/logo.png")}
              className="w-28 h-28 object-contain absolute top-[-10px]"
            />
          </Link>
        </div>
        <button
          onClick={toggleSidebar}
          className="absolute top-6 right-4 text-4xl text-white"
        >
          ✖
        </button>
        <nav className="flex flex-col gap-6 mt-32">
          {headerItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-xl mb-2 px-5 text-white"
              onClick={toggleSidebar}
            >
              {item.title}
            </Link>
          ))}
          {token != null ? (
            <div className="text-2xl px-5">
              <p
                onClick={() => {
                  signOut();
                }}
                className="cursor-pointer "
              >
                Logout
              </p>
            </div>
          ) : (
            <div>
              <Link href={"/"} className="cursor-pointer ">
                Signin
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
