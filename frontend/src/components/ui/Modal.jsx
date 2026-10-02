import React, { useEffect } from "react";
import { X } from "lucide-react";

const maxWidthStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const selectedMaxWidth = maxWidthStyles[maxWidth] || maxWidthStyles.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${selectedMaxWidth} bg-surface-container-lowest border border-secondary-container rounded-xl shadow-modal overflow-hidden z-10 flex flex-col`}
      >
        <div className="flex items-start justify-between p-5 border-b border-secondary-container">
          <div className="flex flex-col gap-0.5">
            {title && <h3 className="font-display font-bold text-lg text-primary">{title}</h3>}
            {description && <p className="text-sm text-secondary">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto max-h-[75vh]">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2.5 p-4 border-t border-secondary-container bg-surface-container-low">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
