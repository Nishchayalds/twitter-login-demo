import { InputHTMLAttributes, ReactNode } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  lefticon?: ReactNode;
  label?: string;
  error?: string;
  istouched?: any;
  className?: string;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <label htmlFor={props.name} className="font-semibold">
          {props.label}
        </label>
        <div
          className={` w-full flex rounded-md text-[#7E7E7E]  items-center justify-between px-2`}
        >
          {props.lefticon && props.lefticon}

          <input
            {...props}
            id={props.name}
            className={`w-full border-none ${
              props.className
            } outline-none  font-optima text-primary text-xs ${
              props.lefticon && "px-2"
            } pt-2 pb-4`}
          />
        </div>

        {props.error && props.istouched ? (
          <p className="text-red-500">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}
