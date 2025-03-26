"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import PasswordStrengthMeter from "@/components/auth/PasswordStrengthMeter";
import { Step2FormValues, step2Schema } from "@/lib/validation/registerSchema";

interface Step2Props {
  onNextStep: (data: Step2FormValues) => void;
  onPrevStep: () => void;
  defaultValues: Partial<Step2FormValues>;
  isLoading?: boolean;
}

export default function Step2Password({
  onNextStep,
  onPrevStep,
  defaultValues,
  isLoading = false,
}: Step2Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    watch,
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues,
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data: Step2FormValues) => {
    onNextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
            2
          </div>
        </div>
        <h2 className="text-xl font-semibold">Create Your Password</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Choose a secure password for your account
        </p>
      </div>

      <div className="relative">
        <FormInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          error={errors.password}
          isLoading={isSubmitting || isLoading}
          placeholder="********"
          autoComplete="new-password"
          {...register("password")}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 dark:text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
        {password && <PasswordStrengthMeter password={password} />}
      </div>

      <div className="relative">
        <FormInput
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          error={errors.confirmPassword}
          isLoading={isSubmitting || isLoading}
          placeholder="********"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 dark:text-gray-400"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          tabIndex={-1}
        >
          {showConfirmPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
        <p>Password must contain:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>At least 8 characters</li>
          <li>Uppercase and lowercase letters</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </div>

      <div className="pt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onPrevStep}
          disabled={isSubmitting || isLoading}
        >
          Back
        </Button>
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting || isLoading}
          disabled={!isDirty || !isValid || isSubmitting || isLoading}
        >
          Continue
        </Button>
      </div>
    </form>
  );
} 