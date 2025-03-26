"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import { Step1FormValues, step1Schema } from "@/lib/validation/registerSchema";

interface Step1Props {
  onNextStep: (data: Step1FormValues) => void;
  defaultValues: Partial<Step1FormValues>;
  isCheckingEmail: boolean;
  isCheckingUsername: boolean;
  emailExists: boolean;
  usernameExists: boolean;
}

export default function Step1BasicInfo({
  onNextStep,
  defaultValues,
  isCheckingEmail,
  isCheckingUsername,
  emailExists,
  usernameExists,
}: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    setError,
    trigger,
    watch,
  } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues,
    mode: "onChange",
  });

  const email = watch("email");
  const username = watch("username");

  // Apply server-side validation results
  useEffect(() => {
    if (emailExists && email) {
      setError("email", {
        type: "manual",
        message: "This email is already registered",
      });
    }
  }, [emailExists, email, setError]);

  useEffect(() => {
    if (usernameExists && username) {
      setError("username", {
        type: "manual",
        message: "This username is already taken",
      });
    }
  }, [usernameExists, username, setError]);

  const onSubmit = (data: Step1FormValues) => {
    onNextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
            1
          </div>
        </div>
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Let&apos;s start with your basic details
        </p>
      </div>

      <FormInput
        id="name"
        label="Full Name"
        error={errors.name}
        isLoading={isSubmitting}
        placeholder="Jane Doe"
        autoComplete="name"
        {...register("name")}
      />

      <FormInput
        id="username"
        label="Username"
        error={errors.username}
        isLoading={isSubmitting || isCheckingUsername}
        placeholder="janedoe"
        autoComplete="username"
        {...register("username")}
      />

      <FormInput
        id="email"
        type="email"
        label="Email Address"
        error={errors.email}
        isLoading={isSubmitting || isCheckingEmail}
        placeholder="jane.doe@example.com"
        autoComplete="email"
        {...register("email")}
      />

      <div className="pt-4">
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting || isCheckingEmail || isCheckingUsername}
          disabled={!isDirty || !isValid || isCheckingEmail || isCheckingUsername}
        >
          Continue
        </Button>
      </div>
    </form>
  );
} 