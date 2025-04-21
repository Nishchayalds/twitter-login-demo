import { InputHTMLAttributes, MouseEventHandler, ReactElement } from "react";

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
  buttonProps?: InputHTMLAttributes<HTMLButtonElement>;
  submitting?: boolean;
  leftIcon?: React.ReactNode;
}

export default function Button({
  title,
  onClick,
  secondary = false,
  buttonProps,
  submitting = false,
  leftIcon,
}: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${
        secondary
          ? "bg-buttonColor hover:bg-[#0ff379f3]"
          : "bg-buttonColor hover:bg-[#0ff379f3]"
      }  text-black text-[14px] font-semibold px-4 flex items-center justify-center  py-[9px] w-auto rounded-xl shadow  transition-colors hover:shadow-xl`}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <h6 className="text-sm">{submitting ? "Submitting.." : title} </h6>
    </button>
  );
}