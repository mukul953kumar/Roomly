import React from "react";

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  accentColor,
  onClick,
  ...props
}) {
  const hoverClasses = hoverEffect
    ? "hover:border-[#c7c7c0] hover:shadow-md transition-all cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`stitch-card bg-white border border-[#e2dfd9] rounded-xl p-5 shadow-xs relative overflow-hidden ${hoverClasses} ${className}`}
      {...props}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {children}
    </div>
  );
}
