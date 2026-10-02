import React from "react";
import Spinner from "./Spinner";

const variantStyles = {
  primary: "btn-primary bg-[#111110] text-[#ffffff] border-[#111110] hover:bg-[#2b2a27] active:bg-[#1c1c1a] shadow-xs",
  secondary: "btn-secondary bg-[#ffffff] text-[#111110] border-[#e2dfd9] hover:bg-[#f4f3f1] active:bg-[#efeeeb] shadow-xs",
  outline: "bg-transparent text-[#111110] border-[#e2dfd9] hover:bg-[#f4f3f1]",
  destructive: "bg-[#fff1f2] text-[#e11d48] border-[#fecdd3] hover:bg-[#ffe4e6] active:bg-[#fecdd3]",
  ghost: "bg-transparent text-[#5f5e5a] border-transparent hover:text-[#111110] hover:bg-[#f4f3f1]",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg border transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111110]/20";
  const selectedVariant = variantStyles[variant] || variantStyles.primary;
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Spinner size={size === "lg" ? "md" : "sm"} className={variant === "primary" ? "text-white" : "text-[#111110]"} />
      ) : Icon ? (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      ) : null}
      {children}
    </button>
  );
}
