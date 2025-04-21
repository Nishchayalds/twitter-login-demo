"use client";
import { useEffect } from "react";

interface IModal {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  closable?: boolean;
  onOuterClosed?: () => void;
}

const Modale = ({
  isOpen,
  onClose,
  children,
  title = "",
  closable,
  onOuterClosed,
}: IModal) => {
  useEffect(() => {
    const handleEscapeKey = (event: any) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`transition-all fixed ${
          isOpen
            ? "bottom-0 opacity-100 z-50"
            : "-bottom-[20px] opacity-0 -z-10"
        }  left-0 bg-black  backdrop-blur-[5px] bg-opacity-20 h-screen w-full overflow-x-hidden flex items-center justify-center scrollbar-hide  px-6`}
      >
        <div className="modal-container bg-turnery lg:w-[40%] md:w-3/4 sm:w-11/12 w-full rounded-xl shadow-lg z-50 overflow-y-auto">
          <div className="modal-content  relative">
            {closable && (
              <button
                className="absolute right-0 px-2 py-2 top-0 text-black rounded-bl-md  "
                onClick={onClose}
              >
                <div className="cursor-pointer h-10 w-10 flex justify-center items-center">
                  <svg
                    className="fill-current h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 010-1.414 1 1 0 011.414 0l2.93 2.93 2.93-2.93a1 1 0 011.414 0 1 1 0 010 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z" />
                  </svg>
                </div>
              </button>
            )}
            {title?.length > 0 && (
              <div className=" mt-5 justify-start items-center">
                <h3 className="text-2xl font-semibold text-center text-white   ">
                  {title}
                </h3>
              </div>
            )}
            <div
              className={`modal-body ${
                title.length > 0 && "mt-6"
              } w-full h-full `}
            >
              {children}
            </div>
          </div>
        </div>
        <div
          className="w-full h-full opacity-30 absolute top-0 left-0 z-40 bg-popup bg-cover bg-bottom"
          onClick={onOuterClosed}
        ></div>
      </div>
    </>
  );
};

export default Modale;
