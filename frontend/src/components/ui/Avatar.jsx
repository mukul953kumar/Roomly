import React from "react";

const sizeStyles = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export default function Avatar({
  src,
  name = "User",
  size = "md",
  isSpeaking = false,
  isLive = false,
  className = "",
}) {
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const speakingRing = isSpeaking ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : "";

  return (
    <div className={`relative inline-flex shrink-0 select-none ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${selectedSize} rounded-lg object-cover border border-secondary-container ${speakingRing}`}
        />
      ) : (
        <div
          className={`${selectedSize} rounded-lg bg-surface-container text-on-surface font-semibold flex items-center justify-center border border-secondary-container ${speakingRing}`}
        >
          {initials || "U"}
        </div>
      )}

      {isLive && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface" />
      )}
    </div>
  );
}
