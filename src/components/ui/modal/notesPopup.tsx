import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import EditorJsonComponent from "../EditorJsonComponent";

interface SlugModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: any;
}

const SlugModal = ({ isOpen, onClose, campaign = null }: SlugModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-[#0000002b]">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose} // Click outside closes modal
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        <div
          ref={modalRef}
          className="relative backdrop-blur-[50px] border border-gray-800 rounded-3xl w-full max-w-md bg-black"
          onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition"
          >
            <CgClose size={24} />
          </button>

          {/* Modal Content */}
          {campaign?.notes ? (
            <div className="px-6 py-8 max-h-[60vh]  bg-[#0000002b]">
              <EditorJsonComponent jsonData={JSON?.parse(campaign.notes)} />
            </div>
          ) : (
            <div className="px-6 py-8 max-h-[60vh]  bg-[#0000002b]">
              Notes are not available for this campaign.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlugModal;
