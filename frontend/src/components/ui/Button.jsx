import React from "react";
import Spinner from "./Spinner";

const variantStyles = {
  primary: "bg-primary text-on-primary border-transparent hover:bg-inverse-surface active:bg-primary-container",
  secondary: "bg-surface-container-lowest text-on-surface border-secondary-container hover:bg-surface-container-low active:bg-surface-container",
  outline: "bg-transparent text-on-surface border-secondary-container hover:bg-surface-container-low",
  destructive: "bg-error-container text-error border-error/20 hover:bg-error/10 active:bg-error/20",
  ghost: "bg-transparent text-secondary border-transparent hover:text-on-surface hover:bg-surface-container-low",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
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
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg border transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20";
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
        <Spinner size={size === "lg" ? "md" : "sm"} className={variant === "primary" ? "text-on-primary" : "text-primary"} />
      ) : Icon ? (
        <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      ) : null}
      {children}
    </button>
  );
}
