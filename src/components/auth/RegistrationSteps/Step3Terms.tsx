"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Step3FormValues, step3Schema } from "@/lib/validation/registerSchema";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

interface Step3Props {
  onCompleteRegistration: (data: Step3FormValues) => void;
  onPrevStep: () => void;
  defaultValues: Partial<Step3FormValues>;
  isLoading?: boolean;
}

export default function Step3Terms({
  onCompleteRegistration,
  onPrevStep,
  defaultValues,
  isLoading = false,
}: Step3Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: Step3FormValues) => {
    // Verify reCAPTCHA
    if (!recaptchaVerified) {
      setRecaptchaError(true);
      return;
    }
    
    onCompleteRegistration(data);
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaVerified(!!token);
    if (token) {
      setRecaptchaError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
            3
          </div>
        </div>
        <h2 className="text-xl font-semibold">Almost There!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Accept the terms to complete your registration
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded"
              {...register("agreeToTerms")}
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="agreeToTerms"
              className={`font-medium ${
                errors.agreeToTerms ? "text-red-500" : ""
              }`}
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="receiveUpdates"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded"
              {...register("receiveUpdates")}
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="receiveUpdates" className="font-medium">
              I would like to receive updates about products, features, and news
              (optional)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test key for development 
          onChange={handleRecaptchaChange}
        />
      </div>
      {recaptchaError && (
        <p className="text-sm text-red-500 text-center">
          Please complete the reCAPTCHA verification
        </p>
      )}

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
          Create Account
        </Button>
      </div>
    </form>
  );
} 