import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({
  trigger,
  items = [],
  children,
  align = "right",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClass = align === "left" ? "left-0" : "right-0";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${alignmentClass} mt-2 w-52 rounded-xl bg-surface-container-lowest border border-secondary-container shadow-elevation py-1.5 z-50`}
        >
          {items.length > 0
            ? items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      item.danger
                        ? "text-error hover:bg-error-container/40"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-outline" />}
                    <span>{item.label}</span>
                  </button>
                );
              })
            : children}
        </div>
      )}
    </div>
  );
}
