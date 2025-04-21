"use client";
import { updateUser } from "@/controller/UserController";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
interface IAuthReferral {
  referralCode: string;
  tokenData: any;
}
export default function ReferralAuth({
  referralCode,
  tokenData,
}: IAuthReferral) {
  const [loader, SetLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await updateUser(tokenData, { referred_by: referralCode })
        .then((data) => {
          console.log("res:", data);
          SetLoader(false);
          setInterval(() => {
            router.replace("/");
          }, 2000);
        })
        .catch((err) => {
          console.error("error", err);
        });
    };

    if (tokenData?.referred_by) {
      SetLoader(false);
      setInterval(() => {
        router.replace("/");
      }, 2000);
    } else {
      fetchData(); // Invoke the async function
    }
  }, [tokenData, referralCode]);

  return (
    <>
      <div
        className="h-[88.3vh] w-full unbounded flex justify-center
     items-center md:bg-tree md:bg-center md:bg-contain md:bg-no-repeat"
      >
        <div
          className="w-[90%] md:w-[40%] h-[35vh] bg-[#0000004d] border border-gray-700 
      rounded-xl flex flex-col justify-around items-center"
        >
          <div className="flex justify-between items-center w-[80%] h-[30%]">
            <p></p>
            <p className="text-xl font-medium">
              Enter your Referral Code (if any)
            </p>
            <p></p>
          </div>
          <div className=" h-[30%] w-[90%]">
            <div
              className=" rounded-xl h-[70%] bg-modalColor flex justify-between 
          items-center px-10"
              //   onClick={() => handleLogin()}
            >
              <div>
                <p>{referralCode}</p>
              </div>
              {loader ? (
                <div
                  className={`relative w-10 h-10 border-2  border-dashed flex justify-center items-center rounded-full ${
                    loader ? "animate-spin" : ""
                  }`}
                ></div>
              ) : (
                <FaCheck color="green" fontSize={30} />
              )}
            </div>
          </div>
          <div className="md:w-[60%] h-[20%] pb-16 text-xs text-center flex justify-center items-center">
            <div>
              <p className="text-[#848486] pb-0.5">
                By connecting your wallet, you agree to our
              </p>
              <p className="text-[#848486]">
                <a href="" className="border-b border-[#848486]">
                  Terms of Service
                </a>{" "}
                and our{" "}
                <a href="#" className="border-b border-[#848486]">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
