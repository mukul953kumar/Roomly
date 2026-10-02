import React from "react";

const variantStyles = {
  default: "bg-surface-container-low text-on-surface border-secondary-container",
  live: "bg-error-container text-error border-error/20",
  study: "bg-mode-study-bg text-mode-study border-blue-200",
  dsa: "bg-mode-dsa-bg text-mode-dsa border-emerald-200",
  doubt: "bg-mode-doubt-bg text-mode-doubt border-amber-200",
  interview: "bg-mode-interview-bg text-mode-interview border-teal-200",
  gaming: "bg-mode-gaming-bg text-mode-gaming border-indigo-200",
  party: "bg-mode-party-bg text-mode-party border-rose-200",
  chill: "bg-mode-chill-bg text-mode-chill border-yellow-200",
  brainstorm: "bg-mode-brainstorm-bg text-mode-brainstorm border-sky-200",
  outline: "bg-transparent text-secondary border-secondary-container",
};

const dotColors = {
  default: "bg-secondary",
  live: "bg-error animate-pulse",
  study: "bg-mode-study",
  dsa: "bg-mode-dsa",
  doubt: "bg-mode-doubt",
  interview: "bg-mode-interview",
  gaming: "bg-mode-gaming",
  party: "bg-mode-party",
  chill: "bg-mode-chill",
  brainstorm: "bg-mode-brainstorm",
  outline: "bg-outline",
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
  const interactiveClass = onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : "";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClass} ${selectedVariant} ${interactiveClass} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${selectedDot}`} />}
      {children}
    </span>
  );
}
