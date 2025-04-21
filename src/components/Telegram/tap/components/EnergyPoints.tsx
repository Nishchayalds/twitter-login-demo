"use client";

import { useEnergy } from "@/context/EnergyContext";

const EnergyPoints: React.FC = () => {
  const { energyPoints } = useEnergy();
  const totalEnergy = 60;

  return (
    <div className="text-white text-center py-4 px-4 ">
      <div className="flex justify-center items-center gap-x-2 mx-auto bor der border-gray-700  bg -white/5 py-2  rounded-md shadow -[-1px_0px_10px_-3px_rgba(255,_255,_255,_0.3)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="20"
          fill="none"
          viewBox="0 0 15 20"
          className="opacity-50"
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M4.98.002a.72.72 0 0 0-.606.424L.067 9.701a.71.71 0 0 0 .046.684.72.72 0 0 0 .606.33h3.409l-1.953 8.41a.71.71 0 0 0 .371.796c.293.15.65.083.868-.162L14.196 7.616a.712.712 0 0 0-.54-1.187H9.848l2.998-5.363a.7.7 0 0 0 .07-.171V.892a.704.704 0 0 0-.076-.54.73.73 0 0 0-.439-.329h-.002A.7.7 0 0 0 12.214 0H5.043q-.03 0-.064.002m.822 2.59L4.365 6.163a.71.71 0 0 0 .4.928.72.72 0 0 0 .933-.397l1.438-3.572a.71.71 0 0 0-.4-.927.72.72 0 0 0-.934.397"
            clipRule="evenodd"
          ></path>
        </svg>
        <span
          className="font-bold text-xxs leading-none w-min opacity-50 
          bg-gradient-to-r from-greenish-200 via-greenish-100 to-greenish-300 
          text-transparent bg-clip-text"
        >
          ENERGY POINTS
        </span>

        <span className="font-bold text-lg">{energyPoints}</span>
        <span className="opacity-50 text-lg">/ {totalEnergy}</span>
      </div>
    </div>
  );
};

export default EnergyPoints;
