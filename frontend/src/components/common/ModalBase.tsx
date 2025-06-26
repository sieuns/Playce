import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
}

const ModalBase = ({
  children,
  onClose,
  title,
  hideHeader = false,
}: ModalBaseProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        )}


        {/* 콘텐츠 */}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalBase;
