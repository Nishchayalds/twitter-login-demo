import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonTg from "../controls/ButtonTg";
import { BiCheckShield } from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { Modal } from "../modal";
import TaskSubmission from "./TaskSubmission";
import StoreHistory from "@/actions/Quest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CopyLink from "../referral/CopyLink";
import { Claim } from "@/controller/UserController";
import Modale from "./Modale";
import { convertToMilliseconds } from "@/constants";
import TaskSubmit from "./TeleTaskSubmit";

const TaskCardComponentTgToggle = ({
  tasks: initialTasks,
  token,
  user,
  timeLeft,
  tg,
  type,
  id,
}: any) => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLinkClick = (e: any) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [verification_link, setverification_link] = useState<any>();
  const [Yes, setYes] = useState<boolean>(false);
  const [Type, setType] = useState<string>("");

  const [
    isTaskSubmissionVerificationModalOpen,
    setIsTaskSubmissionVerificationModalOpen,
  ] = useState<boolean>(false);
  const [isTaskSubmissionModalOpen, setIsTaskSubmissionModalOpen] =
    useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<any>(null);

  const toggleAccordion = (index: number) => {
    setSelectIndex(selectIndex === index ? null : index);
  };

  const handleSubmitClick = async (task: any) => {
    setCurrentTask(task);
    setIsTaskSubmissionModalOpen(true);
    window.open(task?.content, "_blank");

    try {
      await StoreHistory(token, {
        task: task?.id,
        honors_type: "T",
        status: "I",
      });
      const updatedTasks = tasks.map((t: any) =>
        t.id === task.id ? { ...t, is_completed: "I" } : t
      );

      setTasks(updatedTasks);
      // UpdateToken(token);
      router?.refresh();

      setIsTaskSubmissionModalOpen(false);
    } catch (err) {
      setIsTaskSubmissionModalOpen(false);
      console.error(err);
    }
  };

  const handleSubmitVerificationClick = async (task: any) => {
    setCurrentTask(task);
    setType(task?.verification_needed);
    setIsTaskSubmissionVerificationModalOpen(true);
  };

  //  this function is used to submit the verification link in popup
  const HandleSubmitVerificationClick = async (task: any) => {
    if (verification_link !== undefined && verification_link !== "") {
      const data = {
        task: task?.id,
        honors_type: "T",
        status: "I",
        ...(Type === "U" ? { verification_link: verification_link } : {}),
        ...(Type === "F" ? { verification_file: verification_link } : {}),
        ...(Type === "T" ? { verification_text: verification_link } : {}),
      };
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      try {
        await StoreHistory(token, formData);
        const updatedTasks = tasks.map((t: any) =>
          t.id === task.id ? { ...t, is_completed: "I" } : t
        );
        setTasks(updatedTasks);
        // UpdateToken(token);
        router?.refresh();

        setIsTaskSubmissionVerificationModalOpen(false);
      } catch (err) {
        setIsTaskSubmissionVerificationModalOpen(false);
        console.error(err);
      }
    }
  };

  const HandelClaim = async (task: any) => {
    try {
      await Claim(token, {
        task: task?.id,
        honors_type: "R",
        honor: task?.honor,
        status: "C",
      });

      const updatedTasks = tasks.map((t: any) =>
        t.id === task.id ? { ...t, is_completed: "C" } : t
      );
      setTasks(updatedTasks);
      router?.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handelVerification = async (task: any) => {
    try {
      await StoreHistory(token, {
        task: task?.id,
        honors_type: "T",
        status: "I",
      });
      const updatedTasks = tasks.map((t: any) =>
        t.id === task.id ? { ...t, is_completed: "I" } : t
      );

      setTasks(updatedTasks);
      // UpdateToken(token);
      router?.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsPopupOpen(false);
    }
  };

  const SingleStart = async (task: any) => {
    setCurrentTask(task);
    window.open(task?.content, "_blank");
    setTimeout(() => {
      setIsPopupOpen(true);
    }, 1000);
    if (Yes) {
      await handelVerification(task);
    }
  };

  useEffect(() => {
    if (Yes) {
      handelVerification(currentTask);
    }
  }, [Yes]);

  const durationMs = convertToMilliseconds(
    timeLeft?.days,
    timeLeft?.hours,
    timeLeft?.minutes,
    timeLeft?.seconds
  );

  const currentTime = new Date();
  const endTime = new Date(currentTime.getTime() + durationMs);

  return (
    <>
      {tasks?.map((item: any, index: number) => {
        const isOpen = selectIndex === index;

        return (
          <div key={index} className="px-2">
            {isTaskSubmissionVerificationModalOpen && currentTask && (
              <Modal
                title={
                  currentTask?.verification_needed == "F"
                    ? "Upload Proof of Completion"
                    : currentTask?.verification_needed == "U"
                    ? "Submit Verification Link"
                    : "Submit Verification"
                }
                desc={
                  currentTask?.verification_needed == "F"
                    ? ""
                    : currentTask?.verification_needed == "U"
                    ? "Provide a valid URL for quest as proof of completion."
                    : "Enter the required details to verify your quest completion."
                }
                icon={
                  currentTask?.verification_needed == "F"
                    ? require("../../../../public/Frame.png")
                    : currentTask?.verification_needed == "U"
                    ? require("../../../../public/link.png")
                    : require("../../../../public/text-v.png")
                }
                isOpen={isTaskSubmissionVerificationModalOpen}
                onClose={() => setIsTaskSubmissionVerificationModalOpen(false)}
                honers={item?.honor}
                tg={tg}
                content={
                  tg ? (
                    <TaskSubmit
                      task={currentTask}
                      setverification_link={setverification_link}
                      my_func={() => HandleSubmitVerificationClick(currentTask)}
                      onClose={() =>
                        setIsTaskSubmissionVerificationModalOpen(false)
                      }
                    />
                  ) : (
                    <TaskSubmission
                      task={currentTask}
                      setverification_link={setverification_link}
                      my_func={() => HandleSubmitVerificationClick(currentTask)}
                    />
                  )
                }
              />
            )}

            {item?.content && (
              <div className="py-5 my-2 rounded-xl shadow-lg">
                  {/* {index==1 && 
                    <div className="absolute left-[27px] top-6 bottom-16 w-1 bg-[#353535]">
                      <div className={`bg-[#353535] w-1 h-[${(2/tasks.length)*100}%] `}></div>

                        {(<><div className={` h-20 bg-custom-gradient-a w-1  `}></div>
                                      <div className="bg-[#353535] w-1 h-5 "></div></>)}
                                      
                        <div className={` h-20 bg-custom-gradient-b w-1  `}></div>
                    </div>} */}
                

                <div
                  onClick={() => toggleAccordion(index)}
                  className="flex cursor-pointer flex-col md:flex-row justify-between md:items-center"
                >
                  <div className="flex items-center justify-start">
                    <div className={`z-10 flex items-center justify-center w-12 h-10 mr-2 ${item?.is_completed=='P'?"bg-[#909090]":item?.is_completed=="I"?"bg-[#BCA2FF]":"bg-[#3E3E3E]"} rounded-full`}>
                      <Image
                        src={item?.is_completed!='C'?
                          require("../../../../public/star.png"):require("../../../../public/tick.png")
                        }
                        height={30}
                        width={30}
                        alt="logo"
                      />
                    </div>
                    <div className="w-full flex flex-row justify-between  ">
                      <div className="px-3">
                        <p className={`text-[16px] font-medium ${item?.is_completed!='C'?"text-[#E0E0E0]":"text-[#A8A8A8]"}`}>
                          {item?.title}
                        </p>
                      </div>
                      {item.is_completed!='C' &&(<div className="flex justify-end items-center mr-8">
                          <Image
                            src={require("../../../../public/honorsimage.png")}
                            alt="coin"
                            width={16}  // Adjust this to the actual width you want
                            height={16} // Adjust this to the actual height you want
                          />  
                        <div className="text-[12px]">
                        &nbsp;{item?.honor ? item?.honor : "10"}
                          </div>
                      </div>)}

                    </div>
                  </div>
                  <div className="flex justify-start md:justify-between w-full md:w-[50%] ">
                    <div className="w-10 mx-3 md:mx-5 flex justify-center items-center"></div>
                    <div className="flex items-center md:justify-end justify-between    w-full ">
                      <div className=" flex items-center  justify-start ">
                        <div className="font-[400] py-1 mr-2 md:pl-0 md:px-3 text-[12px] text-center text-[#7D7D7D]">
                          {item?.type == "Invite-Friend" ? (
                            user?.total_referral == item?.content ? (
                              <button
                                onClick={() => HandelClaim(item)}
                                disabled={item.is_completed == "C"}
                                className={`text-black  bg-green px-3 py-1 rounded-full ${
                                  item.is_completed == "C"
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                {item.is_completed == "C" ? "claimed" : "Claim"}
                              </button>
                            ) : (
                              <div className="px-1">
                                {user?.total_referral} / {item?.content}
                              </div>
                            )
                          ) : (
                            ` `
                          )}
                        </div>
                        {/* <div className="border border-borderDark rounded-full px-3  text-center  ">
                          <p className="font-[400] py-1  md:pl-0  text-[12px] text-center text-[#7D7D7D]">
                            {item?.honor ? item?.honor : "10"} honors
                          </p>
                        </div> */}
                      </div>
                      {/* <div className="relative w-10 p-1 mx-5  end-0 ">
                        <Image
                          src={require("../../../../public/backgroud/task-arrow.png")}
                          alt="task-arrow.png"
                          className={`transform ${
                            isOpen ? "-rotate-45" : ""
                          } bg-white/5 rounded-full`}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    ''
                  } max-h-screenoverflow-hidden flex  justify-start items-start transform transition-all duration-500 `}
                >
                  <div className="w-10 mx-2 flex justify-center items-center"></div>
                  <div className="  flex flex-row-reverse md:flex-row justify-start items-start ">
                    {currentTime < endTime ? (
                      item?.type == "Invite-Friend" ? (
                        <>
                          {item?.type == "Invite-Friend" &&
                          user?.total_referral != item?.content ? (
                            <CopyLink userData={user} type={"Q"} />
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <>
                          {!item?.verification_needed ? (
                            <></>
                          ) : item?.is_completed == "I" ||
                            item?.is_completed == "C" ? (
                            <></>
                          ) : (
                            <ButtonTg
                              leftIcon={''}
                              title="Submit"
                              onClick={() =>
                                handleSubmitVerificationClick(item)
                              }
                              secondary={item}
                              buttonProps={{
                                type: "submit",
                              }}
                            />
                          )}

                          {item?.verification_needed ? (
                            item?.is_completed == "P" ? (
                              <div>
                                <Link
                                  href={item?.content}
                                  target="_blank"
                                  className={`bg-[#272626]   hover:bg-[#272626] text-[14px] w-9 h-9 mr-2 font-semibold  flex items-center justify-center rounded-xl shadow transition-colors hover:shadow-xl text-black`}
                                >
                                  {/* <BsFillRocketTakeoffFill size={15} /> &nbsp; */}
                                  <img src="/play-task.png" alt="play-task" className="w-[16px] h-[17px] text-black fill-current" />
                                </Link>
                              </div>
                            ) : (
                              <ButtonTg
                                leftIcon={<img src="/play-task.png" alt="play-task" className="w-[16px] h-[17px] text-black fill-current" />}
                                title={
                                  item?.is_completed == "I"
                                    ? "In Progress"
                                    : item.is_completed == "C"
                                    ? "Claimed"
                                    : ""
                                }
                                onClick={() => {
                                  item?.is_completed == "P"
                                    ? handleSubmitClick(item)
                                    : console.log("done");
                                }}
                                secondary={item}
                                buttonProps={{
                                  type: "submit",
                                }}
                              />
                            )
                          ) : item?.is_completed == "P" ? (
                            <ButtonTg
                              leftIcon={<img src="/play-task.png" alt="play-task" className="w-[16px] h-[17px] text-black fill-current" />}
                              title=""
                              onClick={() => SingleStart(item)}
                              secondary={item}
                              buttonProps={{
                                type: "submit",
                              }}
                            />
                          ) : (
                            <ButtonTg
                              leftIcon={<img src="/play-task.png" alt="play-task" className="w-[16px] h-[17px] text-black fill-current" />}
                              title={
                                item?.is_completed == "I"
                                  ? "In Progress"
                                  : item.is_completed == "C"
                                  ? "Claimed"
                                  : ""
                              }
                              onClick={() => {
                                item?.is_completed == "P"
                                  ? handleSubmitClick(item)
                                  : console.log("done");
                              }}
                              secondary={item}
                              buttonProps={{
                                type: "submit",
                              }}
                            />
                          )}
                        </>
                      )
                    ) : (
                      <button
                        disabled={true}
                        className={`${
                          item.is_completed !== "C"
                            ? "bg-red-500 text-white"
                            : "bg-[#181818] border border-[#1F1F1F] text-[#A1A1A1] text-[14px] font-medium"
                        }  px-4 py-[9px] rounded-xl cursor-not-allowed text-sm `}
                      >
                        {item.is_completed === "C" ? (
                          <span className=" flex items-center gap-2">
                            <img src="/claim.png" alt="play-task" className="w-[16px] h-[17px] text-black fill-current" />
                            Claimed
                          </span>
                        ) : (
                          "Expired"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {isPopupOpen && (
        <Modale
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
          }}
          onOuterClosed={() => {
            setIsPopupOpen(false);
          }}
          closable
          title=""
        >
          <div className="  bg-white/60  px-6 py-16 w-full h-full rounded-lg  flex items-center justify-center ">
            <div className="">
              <h2 className="text-lg font-semibold text-center mb-4  text-black">
                Start Your Quest
              </h2>
              <p className="text-center mb-6 px-4 text-black">
                {/* Do you want to start the quest now? */}
                Have you Completed the Quest ?
              </p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => {
                    setYes(true);
                    closePopup();
                  }}
                  className="bg-borderDark text-white  hover:border border-gray-100  transition duration-300 px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={closePopup}
                  className="bg-borderDark tracking-wider hover:border border-gray-100 transition duration-300 px-4 py-2 rounded-lg"
                >
                  Do it later
                </button>
              </div>
            </div>
          </div>
        </Modale>
      )}
    </>
  );
};

export default TaskCardComponentTgToggle;
