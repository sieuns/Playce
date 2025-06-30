import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "../Common/Button";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";

interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
  width?: string;
  className?: string;
}

const ModalBase = ({
  children,
  onClose,
  title,
  hideHeader = false,
  width = "600px",
  className,
}: ModalBaseProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] sm:pt-[12vh] bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={classNames(
          "bg-white rounded-xl shadow-lg max-h-[90vh] overflow-hidden flex flex-col",
          className
        )}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between pl-4 pr-2 py-1 border-b">
            <h2 className="text-lg font-bold pt-1 text-mainText">{title}</h2>
            <Button
              onClick={onClose}
              scheme="close"
              size="icon"
              className="text-subText"
            >
              <FaTimes />
            </Button>
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
