"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { MdLeaderboard } from "react-icons/md";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const TelegramHeader = ({
  token,
  cancel,
  title,
  show,
  Signin,
  tg,
  home = false,
  url = "/",
}: any) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const router = useRouter();

  const pathname = usePathname();
  // console.log(pathname, "kdfklsdfkld")

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

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleDropdownClick = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };
  return (
    <>
      {cancel == "Back" && (
        <div className={`flex items-center justify-between w-full  px-4 py-5 `}>
          {home ? (
            <p className="text-[#fff] flex items-center gap-2 w-1/3 "></p>
          ) : pathname.startsWith("/quest/") ? (
            <p
              onClick={() => router.push(url)}
              className="text-[#fff] flex items-center gap-2 w-1/3 "
            >
              <IoChevronBackOutline className="text-lg" />
              {/* <span>{cancel}</span> */}
            </p>
          ) : (
            <p className="w-1/3"></p>
          )}
          <div className="flex flex-col justify-center items-center  w-1/3">
            {/* <Image
              alt="Logo"
              src={require("../../../public/backgroud/logo.png")}
              className="w-28 h-28 object-contain absolute "
            /> */}
          </div>

          <p className="w-1/3  flex justify-end ">
            <button
              onClick={toggleSidebar}
              className="text-white text-3xl focus:outline-none"
            >
              <Image
                alt="menu-desing"
                src={require("../../../public/menu-design.png")}
                className="w-8 h-8 hidden"
              />
            </button>
          </p>
        </div>
      )}
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

      {show && (
        <div className="px-4 py-2 pt-5">
          <div className="flex items-center justify-between w-full">
            <div className="text-xl bor der p-2 border-gray-600 rounded-full cursor-pointer bg-[# 0FF378]">
              {/* <MdLeaderboard className="text-black text-sm" /> */}
            </div>
            <div className="text-xl font-semibold ">
              <p>{title}</p>
            </div>
            <Link
              href={"/dashboard"}
              // onClick={toggleDropdown}
              className="text-xl border p-2 border-gray-600 rounded-full cursor-pointer bg-green"
            >
              <FaUser className="text-black text-sm" />
            </Link>
          </div>
        </div>
      )}

      {dropdownVisible && token && (
        <div
          onClick={handleDropdownClick}
          className="absolute right-2  w-28 py-4 px-2 justify-center flex flex-col gap-4 top-28 bg-[#1B1B1B] border border-gray-600 shadow-lg rounded-md z-50"
        >
          <Link
            href="/order-of-shinobi"
            className="text-white font-semibold text-center cursor-pointer bg-[#ff5c00] rounded-full"
          >
            Shinobi
          </Link>
        </div>
      )}
    </>
  );
};

export default TelegramHeader;

// return (
//   <div className="sticky z-50 top-0 bg-[#1B1B1B]">
//     <div
//       className="flex justify-end px-4 py-2  items-center gap-7 relative"
//       ref={dropdownRef}
//     >
//       {pathname !== "/" && (
//         <div className="flex w-full justify-start">
//           <Telegrambackbtn />
//         </div>
//       )}

//       {token && (
//         <div
//           onClick={toggleDropdown}
//           className="text-xl border py-2 px-4 border-gray-600 rounded-full cursor-pointer"
//         >
//           {token.user_name.charAt(0).toUpperCase()}
//         </div>
//       )}

//       {dropdownVisible && token && (
//         <div
//           onClick={handleDropdownClick}
//           className="absolute  w-28 py-4 px-2 justify-center flex flex-col gap-4 top-16 bg-[#1B1B1B] border border-gray-600 shadow-lg rounded-md z-50"
//         >
//           <Link
//             href="/order-of-shinobi"
//             className="text-white font-semibold text-center cursor-pointer bg-[#3ee38b] rounded-full"
//           >
//             Shinobi
//           </Link>

//         </div>
//       )}
//     </div>
//   </div>
// );
