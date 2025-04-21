import { useClickOutside } from "@/hooks/useClickOutSide";
import Image from "next/image";
import { Fragment, MouseEvent, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoDiamondSharp } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  content: React.ReactNode;
  onClose: () => void;
  honers: any;
  tg?: any;
  desc?: string;
  icon?: any;
};

export const Modal = ({
  isOpen,
  title,
  content,
  onClose,
  honers,
  tg,
  desc,
  icon,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const handleCloseModal = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // useClickOutside(modalRef, onClose);

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-[#0000002b] ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>
            {tg ? (
              <div
                ref={modalRef}
                className=" backdrop-blur-[50px] border border-gray-800 rounded-3xl w-full"
                onClick={(e) => e.stopPropagation()} // Prevent click events inside the modal from closing it
              >
                {/* <div className=" flex justify-end p-2">
                  <div className="sm:hidden p-[9px] rounded-full bg-tggreen text-black flex items-center justify-center">
                    <button
                      type="button"
                      className=""
                      onClick={(e) => handleCloseModal(e)}
                    >
                      <CgClose size={10} />
                    </button>
                  </div>
                </div> */}
                <div className="flex flex-col items-center justify-center px-12 mt-14 text-center">
                  <div className="w-6 h-6 ">
                    <Image src={icon} alt="icon" />
                  </div>
                  <div className="text-sm mt-4"> {title}</div>
                  <div className="text-xs text-[#DFDFDF]">{desc}</div>
                </div>
                <div className="mt-6">{content}</div>
                <div className=" px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* <div>
                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      {title && (
                        <div className="flex justify-between items-start gap-5">
                          <div className="text-lg flex items-center gap-2 font-normal">
                            <IoDiamondSharp />
                            {honers && honers}
                          </div>
                          <h3 className="md:text-lg text-sm leading-6 font-normal text-center text-gray-300 tracking-wide">
                            {title}
                          </h3>
                          {tg ? (
                            <div className="sm:hidden p-[9px] rounded-full bg-green text-black flex items-center justify-center">
                              <button
                                type="button"
                                className=""
                                onClick={(e) => handleCloseModal(e)}
                              >
                                <CgClose size={10} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className=""
                              onClick={(e) => handleCloseModal(e)}
                            >
                              <CgClose size={30} className="" />
                            </button>
                          )}
                        </div>
                      )}
                      <div className="mt-2">{content}</div>
                    </div>
                  </div> */}
                </div>
              </div>
            ) : (
              <div
                ref={modalRef}
                className="inline-block align-bottom  p-14  backdrop-blur-md border border-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                onClick={(e) => e.stopPropagation()} // Prevent click events inside the modal from closing it
              >
                <div className=" px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      {title && (
                        <div className="flex justify-between items-start gap-5">
                          <div className="text-lg flex items-center gap-2 font-normal">
                            <IoDiamondSharp />
                            {honers && honers}
                          </div>
                          <h3 className="md:text-lg text-sm leading-6 font-normal text-center text-gray-300 tracking-wide">
                            {title}
                          </h3>
                          {tg ? (
                            <div className="sm:hidden p-[9px] rounded-full bg-green text-black flex items-center justify-center">
                              <button
                                type="button"
                                className=""
                                onClick={(e) => handleCloseModal(e)}
                              >
                                <CgClose size={10} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className=""
                              onClick={(e) => handleCloseModal(e)}
                            >
                              <CgClose size={30} className="" />
                            </button>
                          )}
                        </div>
                      )}
                      <div className="mt-2">{content}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
