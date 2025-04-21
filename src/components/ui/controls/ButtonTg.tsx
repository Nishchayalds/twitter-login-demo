import { InputHTMLAttributes, MouseEventHandler, ReactElement } from "react";

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  secondary?: any;
  buttonProps?: InputHTMLAttributes<HTMLButtonElement>;
  submitting?: boolean;
  leftIcon?: React.ReactNode;
}

export default function ButtonTg({
  title,
  onClick,
  secondary = {},
  buttonProps,
  submitting = false,
  leftIcon,
}: ButtonProps) {
  console.log(secondary?.is_completed, "ksdkdiekdkd")
  console.log(leftIcon, "lefticon")
  return (
    
    // <button
    //   type="submit"
    //   onClick={onClick}
    //   className={`${
    //     secondary?.verification_needed
    //       ? "bg-[#181818]"
    //       : "bg-[#181818]"
    //   }  text-[#A1A1A1] text-[14px] font-medium px-4 flex items-center justify-center  py-[9px] h-9 border border-[#1F1F1F]  w-auto rounded-xl shadow  transition-colors hover:shadow-xl`}
    // >
    //   {leftIcon && <span className="mr-2">{leftIcon}</span>}
    //   <h6 className="text-sm">{submitting ? "Submitting.." : title} </h6>
    // </button>
    <button
      type="submit"
      onClick={onClick}
      className={`${secondary?.verification_needed ?"bg-[#181818] text-[#A1A1A1] text-[14px] font-medium px-4 flex items-center justify-center  py-[9px] h-9 border border-[#1F1F1F]  w-auto rounded-xl shadow  transition-colors hover:shadow-xl" :`${secondary.is_completed=='P'?" bg-[#272626]   hover:bg-[#272626] text-[14px] w-9 h-9 mr-2 font-semibold  flex items-center justify-center rounded-xl shadow transition-colors hover:shadow-xl text-black":"bg-[#181818] gap-2 text-[#A1A1A1] text-[14px] font-medium px-4 flex items-center justify-center  py-[9px] h-9 border border-[#1F1F1F]  w-auto rounded-xl shadow  transition-colors hover:shadow-xl"}`}`}
    >
      {leftIcon && secondary?.is_completed=='P' && <span className={`${secondary?.verification_needed ?"mr-2":""}`}>{leftIcon}</span>}
      {leftIcon && secondary?.is_completed=='C' && <span className={`${secondary?.verification_needed ?"mr-2":""}`}>{<img src="/claim.png" alt="coin" className="w-4 h-4" />}</span>}
      <h6 className="text-sm">{submitting ? "Submitting.." : title} </h6>
    </button>
  );
}
