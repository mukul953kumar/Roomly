import React from "react";

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-5 h-5 border-2",
  lg: "w-8 h-8 border-3",
};

export default function Spinner({ size = "md", className = "text-primary" }) {
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${selectedSize} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
