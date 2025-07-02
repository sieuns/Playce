import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";

interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
  className?: string;
}

const ModalBase = ({
  children,
  onClose,
  title,
  hideHeader = false,
  className,
}: ModalBaseProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] sm:pt-[12vh] bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={classNames(
          "bg-white rounded-xl shadow-lg max-h-[90vh] overflow-hidden flex flex-col w-[600px]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-mainTextitems-center m-0">
              {title}
            </h2>
            <button onClick={onClose} className="hover:text-primary5 text-lg">
              <FaTimes />
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
