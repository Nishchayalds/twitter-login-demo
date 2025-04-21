"use client";

import { FaArrowRight } from "react-icons/fa";
import TextInput from "../controls/TextInput";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import EditorJsonComponent from "../EditorJsonComponent";

const TaskSubmit = ({ task, setverification_link, my_func, onClose }: any) => {
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
  // console.log(task, "this is the task")
  // console.log(task.instructions, "this is the data")

  // Clear selected file
  const handleClearFile = () => {
    setSelectedFileName(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <>
      <div className={` w-full`}>
        <div className=" my-2  rounded-xl px-8">
          {/* <h3 className="text-base font-medium text-center leading-6   text-white">
            {task?.type} on {task?.platform?.title}
          </h3>
          <div className="leading-5 tracking-wider w-full text-opacity-80 my-5 text-[13px] font-light text-gray-300 text-center">
            Follow our official {task?.platform?.title} account to stay updated
            with our latest news and announcements.
          </div> */}
          <div
            className={`border-[#424242] border ${
              task?.verification_needed == "F" ? "p-5 border-2" : "border-t-2"
            }bg-[#252525]  rounded-3xl shadow-lg mt-4`}
          >
            <div className="">
              <div className="flex cursor-pointer justify-between md:items-center w-full  ">
                <div className="flex items-center w-full ">
                  <div className="w-full px-">
                    {task?.verification_needed == "F" ? (
                      <>
                        <input
                          ref={inputRef}
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          className={`w-full border-none outline-none font-medium font-optima text-primary text-md py-3`}
                        />
                        {selectedFileName ? (
                          <div className="flex items-center gap-2  px-2">
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
                            ? "Paste the URL here..."
                            : "Enter your response here…"
                        }
                        onChange={(e: any) =>
                          setverification_link(e.target.value)
                        }
                        className="bg-transparent text-[#7E7E7E] text-xs  w-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-full pt-4">
            <button
              className=" bg-[#181818] text-[#7E7E7E] border-[#282828] border hover:text-tggreen text-[13px]  px-4 py-3 flex items-center justify-center  mr-4  rounded-xl shadow-md  transition-colors  "
              type="submit"
              onClick={() => my_func(task)}
            >
              Submit
            </button>
            <button
              className=" bg-[#181818] text-[#7E7E7E] border-[#282828] border hover:text-tggreen text-[13px]  px-4 py-3 flex items-center justify-center   rounded-xl shadow-md  transition-colors  "
              type="submit"
              onClick={() => onClose(task)}
            >
              Cancel
            </button>
          </div>

          <div className="mt-10 flex flex-col items-start justify-start gap-4">
            {task?.instructions ? (
              <ul className=" ">
                <li className="flex items-start gap-4 h-40 overflow-y-scroll custom-scrollbar">
                  <EditorJsonComponent
                    jsonData={JSON?.parse(task?.instructions)}
                  />
                </li>
              </ul>
            ) : (
              <p className="text-center text-xs text-[#7E7E7E] w-full">
                Double-check your submi ssion before clicking ‘Submit.’ Once
                sent, edits may not be allowed. Our team will review the
                submission within 24 hours
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskSubmit;

{
  /* <li className="flex items-start gap-4 mb-[19px] ">
  <FaArrowRight className="bg-buttonColor rounded-full text-black text-sm h-6 w-6 p-1.5" />
  <span className="text-xs tracking-wider text-[#98989D] w-[99%]  ">
    Please submit the link to your {task?.platform?.title} profile
    for manual verification.
  </span>
</li>
<li className="flex items-start gap-4 ">
  <FaArrowRight className=" bg-buttonColor rounded-full text-black text-sm h-6 w-6 p-1.5" />
  <span className="text-xs tracking-wider text-[#98989D] w-[99%]  ">
    Our team will review the submission within 24 hours
  </span>
</li> */
}
