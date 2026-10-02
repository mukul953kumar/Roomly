import React from "react";

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  onClick,
  ...props
}) {
  const hoverClasses = hoverEffect
    ? "hover:border-outline-variant hover:shadow-elevation transition-all cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-surface-container-lowest border border-secondary-container rounded-xl p-5 shadow-subtle ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
