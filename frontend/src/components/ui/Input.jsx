import React from "react";

export default function Input({
  label,
  error,
  icon: Icon,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-secondary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-outline">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`h-10 w-full rounded-lg bg-surface-container-lowest border text-on-surface text-sm placeholder:text-outline transition-colors disabled:opacity-50 disabled:bg-surface-container-low disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-primary ${
            Icon ? "pl-9" : "pl-3"
          } pr-3 ${error ? "border-error focus:border-error focus:ring-error/20" : "border-secondary-container focus:border-primary"} ${className}`}
          {...props}
        />
      </div>

      {error && <span className="text-xs text-error font-medium">{error}</span>}
    </div>
  );
}
