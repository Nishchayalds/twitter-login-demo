"use client";
import React, { useEffect, useState } from "react";
import TapHeader from "./TapHeader";
import Progress from "./Progress";
import EnergyBall from "./EnergyBall";
import EnergyPoints from "./EnergyPoints";
import { useEnergy } from "@/context/EnergyContext";
import QnAWindow from "@/components/ui/QnAWindow";
const TapParent = () => {
  const { progress, progressLimit } = useEnergy();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (progress == progressLimit) {
      setTimeout(() => {
        // setIsOpen(true);
      }, 500);
    }
  }, [progress]);

  return (
    <>
      {!isOpen ? (
        <div className="text-white flex flex-col justify-between bg-greenShadow-m bg-cover bg-no-repeat min-h-[88vh]">
          <div className=" ">
            <TapHeader />
            <Progress />
          </div>

          <div className="">
            <EnergyBall />
          </div>

          <div className="">
            <EnergyPoints />
          </div>
        </div>
      ) : (
        isOpen && <QnAWindow />
      )}
    </>
  );
};

export default TapParent;
