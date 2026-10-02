import React from "react";

const variantStyles = {
  default: "bg-[#f4f3f1] text-[#111110] border-[#e2dfd9]",
  live: "badge-live bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]",
  study: "badge-study bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]",
  dsa: "badge-dsa bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
  doubt: "badge-doubt bg-[#fffbeb] text-[#d97706] border-[#fde68a]",
  interview: "badge-interview bg-[#f0fdfa] text-[#0d9488] border-[#99f6e4]",
  gaming: "badge-gaming bg-[#eef2ff] text-[#6366f1] border-[#c7d2fe]",
  party: "badge-party bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]",
  chill: "badge-chill bg-[#fefce8] text-[#ca8a04] border-[#fef08a]",
  brainstorm: "badge-brainstorm bg-[#f0f9ff] text-[#0284c7] border-[#bae6fd]",
  outline: "bg-transparent text-[#5f5e5a] border-[#e2dfd9]",
};

const dotColors = {
  default: "bg-[#5f5e5a]",
  live: "bg-[#e11d48] animate-pulse",
  study: "bg-[#2563eb]",
  dsa: "bg-[#059669]",
  doubt: "bg-[#d97706]",
  interview: "bg-[#0d9488]",
  gaming: "bg-[#6366f1]",
  party: "bg-[#e11d48]",
  chill: "bg-[#ca8a04]",
  brainstorm: "bg-[#0284c7]",
  outline: "bg-[#777871]",
};

export default function Badge({
  children,
  variant = "default",
  dot = false,
  size = "md",
  className = "",
  onClick,
}) {
  const selectedVariant = variantStyles[variant] || variantStyles.default;
  const selectedDot = dotColors[variant] || dotColors.default;
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  const interactiveClass = onClick ? "cursor-pointer hover:opacity-85 transition-opacity" : "";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${sizeClass} ${selectedVariant} ${interactiveClass} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${selectedDot}`} />}
      {children}
    </span>
  );
}
