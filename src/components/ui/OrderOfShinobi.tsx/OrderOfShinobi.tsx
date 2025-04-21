import Image from "next/image";
import React from "react";
import config from "../../../../tailwind.config";

const OrderOfShinobi = () => {
  return (
    <div className="flex justify-center pb-2 bg-opacity-5" >
      <div className="flex justify-between w-[90%] items-center gap-4 ">
        <div>
          {" "}
          <h1 className="text-2xl mt-8 lg:text-5xl md:text-start text-center">
            Order of <span className="text-green">Shinobi</span> <br />
            Ranking System
          </h1>
          <p className="mt-3 md:mt-9 text-[#E6E8EC] text-center md:text-start md:w-[80%] ">
            The Order of Shinobi Ranking System reflects your progress and 
            mastery with in the quest community.
          </p>
        </div>

        <Image
          src={"/backgroud/mountainred.png"}
          alt=""
          width={500}
          height={500}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
};

export default OrderOfShinobi;
