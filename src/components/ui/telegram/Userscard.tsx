import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

const Userscard = (UserCount : any) => { 
  return (
    <div className="bg-[#212121] rounded-lg p-3 flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3">
        <p className="bg-green rounded-full p-2 text-[#000]">
          <BsFillLightningChargeFill />
        </p>
        <p className="font-normal text-sm">Total users</p>
      </div>
      <p className="font-medium text-lg">{UserCount?.rank?.map((user:any)=>user?.users_count)}</p>
    </div>
  );
};

export default Userscard;
