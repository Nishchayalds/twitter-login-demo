"use client";
import { useEnergy } from "@/context/EnergyContext";

const Progress: React.FC = () => {
  const { progress, progressLimit } = useEnergy();
  const totalProgress = progressLimit;
  const progressPercentage = (progress / totalProgress) * 100;

  return (
    <div className="text-white px-4 py-3">
      <div className="text-base">Current progress</div>
      <div className="flex justify-between text-sm mt-2">
        <span>{progress}</span>
        <span>/ {totalProgress}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
        <div
          className="bg-[#0FF378] h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
