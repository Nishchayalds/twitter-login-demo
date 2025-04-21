"use client";
import { useCallback, useEffect, useState } from "react";
import { useEnergy } from "@/context/EnergyContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { updateCoins } from "@/controller/UserController";

const EnergyBall: React.FC = () => {
  const {
    energyPoints,
    handleEnergyBallClick,
    progress,
    isBurst,
    walletPoints,
    progressLimit,
  } = useEnergy();
  const [floatingPoints, setFloatingPoints] = useState<any>([]);
  const token = useSession();
  const UserToken = token?.data?.user?.image?.toString();

  const updateCoin = async () => {
    try {
      const data = {
        counts: progress,
        action_points: walletPoints,
      };
      await updateCoins(UserToken, data);
    } catch (error) {
      console.log("error in updateCoin", error);
    }
  };

  useEffect(() => {
    if (progress > 0) {
      const timer = setTimeout(() => {
        updateCoin();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleClick = (e: any) => {
    if (energyPoints > 0) {
      if (energyPoints > 0 && progress < progressLimit) {
        handleEnergyBallClick();
      }

      const containerRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      const newPoint = { id: Date.now(), x, y };
      setFloatingPoints((prev: any) => [...prev, newPoint]);

      // Remove the floating coin after 1 second.
      setTimeout(() => {
        setFloatingPoints((prev: any) =>
          prev.filter((point: any) => point.id !== newPoint.id)
        );
      }, 1000);
    }
  };

  return (
    <div className="relative flex justify-center items-center ">
      {/* Wrap the image and the floating coins in a container with onClick */}
      <div className="relative" onClick={handleClick}>
        {floatingPoints.map((point: any) => (
          <div
            key={point.id}
            className="absolute text-green-500 font-bold text-lg animate-fly text-white pointer-events-none"
            style={{ left: point.x, top: point.y }}
          >
            +1
          </div>
        ))}
        <Image
          src={require("../../../../../public/taping/tap.png")}
          alt="Energy Ball"
          height={1000}
          width={1000}
          className={`cursor-pointer h-72 w-56 ${
            isBurst ? "animate-ping duration-500" : ""
          }`}
          // style={{ width: `${ballSize}px`, height: `${ballSize}px` }}
        />
      </div>
    </div>
  );
};

export default EnergyBall;
