"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "../controls/TextInput";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import EditorJsonComponent from "../EditorJsonComponent";
// import { X } from "lucide-react"; // Icon for the cancel button

const TaskSubmission = ({ task, setverification_link, my_func }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setverification_link(file);
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Clear selected file
  const handleClearFile = () => {
    setSelectedFileName(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the file input
    }
  };

  console.log(task?.instructions);

  return (
    <>
      <div className={`md:px-4  w-full`}>
        <div className=" my-2  rounded-xl pt-10">
          {/* <h3 className="text-[18px] text-center leading-6 font-normal text-white">
            {task?.type} on {task?.platform?.title}
          </h3>

          <div className="leading-5  w-full text-opacity-80 mb-5 mt-[7px] text-[15px] font-light text-gray-300   text-center md:px-14">
            Follow our official {task?.platform?.title} account to stay updated
            with our latest news and announcements.
          </div> */}

          <div className="border-2 border-borderDark bg-modalColor rounded-xl shadow-lg">
            <div className="flex cursor-pointer justify-between md:items-center w-full  ">
              <div className="flex items-center w-full">
                <div className="w-full">
                  {task?.verification_needed == "F" ? (
                    <>
                      <input
                        ref={inputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        className={`w-full border-none outline-none font-medium font-optima text-primary text-md py-3`}
                      />

                      {/* File name display with cancel button */}
                      {selectedFileName ? (
                        <div className="flex items-center gap-2  px-2 py-1">
                          <input
                            type="text"
                            value={selectedFileName}
                            readOnly
                            placeholder="Selected File"
                            className="w-full border-none outline-none bg-transparent text-[15px] font-light text-gray-300 text-md p-3  "
                          />
                          <button
                            onClick={handleClearFile}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={"Upload a file..."}
                          readOnly
                          placeholder="Selected File"
                          onClick={handleButtonClick}
                          className={`w-full border-none outline-none  text-[15px] font-light text-gray-300  bg-transparent p-3`}
                        />
                      )}
                    </>
                  ) : (
                    <TextInput
                      placeholder={
                        task?.verification_needed == "U"
                          ? "Enter your Verification Url..."
                          : "Enter your text..."
                      }
                      onChange={(e: any) =>
                        setverification_link(e.target.value)
                      }
                      className="bg-transparent text-white  w-full "
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5 flex flex-row justify-center gap-5  ">
            <button
              className={`bg-buttonColor hover:bg-[#0ff379f3]"
                  text-black text-[14px] font-semibold py-[10px] px-[28px] flex items-center justify-center w-auto rounded-xl shadow  transition-colors hover:shadow-xl`}
              onClick={() => my_func(task)}
            >
              Submit 
            </button>
          </div>
          <div className="mt-10 flex flex-col items-start justify-start">
            <h5 className=" text-center leading-6 font-normal text-white">
              Verification Instruction
            </h5>
            {task?.instructions ? (
              <ul className="text-xs leading-5 w-full text-opacity-80 mb-5 text-[15px] font-light text-gray-300 flex flex-col gap-y-5">
                <li className="flex items-start gap-4 h-40 overflow-y-scroll custom-scrollbar">
                  <EditorJsonComponent
                    jsonData={JSON?.parse(task?.instructions)}
                  />
                </li>
              </ul>
            ) : (
              <p className="text-center text-sm text-gray-300 w-full">
                No instructions provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskSubmission;

{
  /* <li className="flex items-start gap-4">
  <FaArrowRight className="bg-buttonColor rounded-full text-lg h-4 sm:h-5 w-5 p-1 text-black mt-1" />
  <span className=" ">
    Please submit the link to your {task?.platform?.title} profile
    for manual verification.
  </span>
</li>
<li className="flex items-start gap-4">
  <FaArrowRight className=" bg-buttonColor rounded-full text-lg h-4 sm:h-5 w-5 p-1 text-black mt-1" />
  <span>Our team will review the submission within 24 hours</span>
</li> */
}
