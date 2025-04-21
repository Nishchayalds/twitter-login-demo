"use client";
import { memo, useCallback, useEffect } from "react";

interface IModal {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  closable?: boolean;
  onOuterClosed?: () => void;
  height: number;
}

const BottomDrawer = memo(
  ({
    isOpen,
    onClose,
    children,
    title = "",
    closable = true,
    onOuterClosed,
    height,
  }: IModal) => {
    const handleEscapeKey = useCallback(
      (event: any) => {
        if (event.key === "Escape") {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleEscapeKey);
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.body.style.overflow = "";
      };
    }, [isOpen, handleEscapeKey]);

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && onOuterClosed) {
        onOuterClosed();
      }
    };

    const drawerStyles = `fixed bottom-0 left-0 w-full bg-black opacity-100 rounded-t-[40px] shadow-2xl z-50 transform transition-transform duration-400 ease-out  ${
      isOpen ? "translate-y-0 " : "translate-y-full"
    }`;

    const backdropStyles = `fixed inset-0   bg-opacity-50 transition-opacity ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`;

    return (
      <>
        {/* Overlay */}
        <div className={backdropStyles} onClick={handleOverlayClick}></div>

        <div
          className={`${drawerStyles}
         overflow-y-scroll `}
          style={{ height: height }}
        >
          {/* Drawer */}
          <div
            // className={drawerStyles}
            aria-modal="true"
            role="dialog"
          >
            {/* Header */}
            {closable && (
              <div className="flex justify-end items-end px-4 py-2  ">
                {title && (
                  <h2 className=" text-lg font-semibold text-gray-800">
                    {title}
                  </h2>
                )}
                <button
                  className="text-white"
                  onClick={onClose}
                  aria-label="Close Drawer"
                >
                  {/* <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 010-1.414 1 1 0 011.414 0l2.93 2.93 2.93-2.93a1 1 0 011.414 0 1 1 0 010 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z" />
                  </svg> */}
                </button>
              </div>
            )}

            {/* Body */}
            <div className="px-3 pt-2   h-full overflow-y-auto">{children}</div>
          </div>
        </div>
      </>
    );
  }
);

export default BottomDrawer;
