"use client";
import StoreHistory from "@/actions/Quest";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiCheckShield } from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import Button from "../controls/Button";
import { Modal } from "../modal";
import TaskSubmission from "../Quest/TaskSubmission";

const ReusableAccordian = ({ tasks, token }: any) => {
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [
    isTaskSubmissionVerificationModalOpen,
    setIsTaskSubmissionVerificationModalOpen,
  ] = useState<boolean>(false);

  const [isTaskSubmissionModalOpen, setIsTaskSubmissionModalOpen] =
    useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<any>(null);

  const toggleAccordion = (index: number) => {
    setSelectIndex(selectIndex === index ? null : index);
  };

  const handleSubmitVerificationClick = async (task: any) => {
    setCurrentTask(task);
    setIsTaskSubmissionVerificationModalOpen(true);
  };

  const handleSubmitClick = async (task: any) => {
    setCurrentTask(task);
    setIsTaskSubmissionModalOpen(true);
    await StoreHistory(token?.user?.image, {
      task: task?.id,
      honors_type: "T",
      status: "C",
    })
      .then((data) => {
        console.log(data);
        setIsTaskSubmissionModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {tasks?.map((item: any, index: number) => {
        const isOpen = selectIndex === index;
        const borderRadiusClass = isOpen ? "rounded-xl" : "rounded-full";

        return (
          <div key={index} className="px-12 w-full">
            {isTaskSubmissionVerificationModalOpen && currentTask && (
              <Modal
              honers={""}
                title="Submit Verification Link"
                isOpen={isTaskSubmissionVerificationModalOpen}
                onClose={() => setIsTaskSubmissionVerificationModalOpen(false)}
                content={<TaskSubmission task={currentTask} />}
              />
            )}
            {isTaskSubmissionModalOpen && currentTask && (
              <Modal
              honers={""}
                title="Quest begain"
                isOpen={isTaskSubmissionModalOpen}
                onClose={() => setIsTaskSubmissionModalOpen(false)}
                content={
                  <div>
                    <p>Submitting...</p>
                  </div>
                }
              />
            )}
            <div
              className={`py-5 my-2 border-2 border-borderDark bg-modalColor ${borderRadiusClass} shadow-lg`}
            >
              <div
                onClick={() => toggleAccordion(index)}
                className="flex cursor-pointer flex-col md:flex-row justify-between md:items-center"
              >
                <div className="flex items-center justify-start">
                  <div className="relative w-10 h-10 p-2 mx-5 bg-task-bg bg-center bg-cover bg-no-repeat">
                    <Image
                      src={require(`../../../../public/backgroud/twitter.png`)}
                      alt="twitter.png"
                    />
                  </div>
                  <div>
                    <p className="text-white text-opacity-80">
                      {item?.type} on {item?.platform?.title}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between md:justify-start ml-5">
                  <div className="border border-borderDark rounded-full px-3">
                    <p className="font-[400] py-1 pl-5 md:pl-0 px-3 text-[12px] text-center text-[#7D7D7D]">
                      {item?.honor} honors
                    </p>
                  </div>
                  <div className="relative w-10 p-1 mx-5">
                    <Image
                      src={require("../../../../public/backgroud/task-arrow.png")}
                      alt="task-arrow.png"
                      className={`transform ${isOpen ? "-rotate-45" : ""}`}
                    />
                  </div>
                </div> */}
              </div>
              <div
                className={`${
                  isOpen ? "max-h-screen" : "max-h-0"
                } overflow-hidden flex flex-col justify-start items-start transform transition-all duration-500`}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div className="flex items-center justify-start">
                    <div className="relative w-10 h-10 p-2 mx-5"></div>
                    <div>
                      <p className="leading-6 tracking-wide w-full md:w-2/3 text-opacity-80 text-[14px] text-[#7D7D7D]">
                        You just have to start the quest by clicking start quest{" "}
                        {item?.type} this {item?.content}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-5 flex flex-col md:flex-row md:justify-start justify-center items-center gap-5 px-10">
                  <div className="relative w-10 h-10 p-2"></div>
                  {item?.type == "Follow" ? (
                    <></>
                  ) : (
                    <Button
                      leftIcon={<BiCheckShield size={20} />}
                      title="Submit for Verification"
                      onClick={() => handleSubmitVerificationClick(item)}
                      secondary
                      buttonProps={{
                        type: "submit",
                      }}
                    />
                  )}
                  {item?.type == "Subscribe" ? (
                    <Link
                      href={item?.content}
                      target="_blank"
                      className={`bg-buttonColor hover:bg-secondary  text-black text-[14px] font-semibold px-2 flex items-center justify-center  py-1 w-auto rounded-xl shadow  transition-colors hover:shadow-xl`}
                    >
                      <BsFillRocketTakeoffFill size={15} />
                      Start Quest
                    </Link>
                  ) : (
                    <Button
                      leftIcon={<BsFillRocketTakeoffFill size={15} />}
                      title={item?.is_completed ? "Completed" : "Start Task"}
                      onClick={() => {
                        item?.is_completed
                          ? console.log("done")
                          : handleSubmitClick(item);
                      }}
                      secondary
                      buttonProps={{
                        type: "submit",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReusableAccordian;
