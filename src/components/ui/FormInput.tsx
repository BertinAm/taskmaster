import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  isLoading?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, isLoading, className, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-3 py-2.5 sm:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 
            ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"} 
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            bg-white dark:bg-gray-800 
            text-base sm:text-sm
            ${className || ""}`}
          disabled={isLoading}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-red-500"
            role="alert"
          >
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput; 