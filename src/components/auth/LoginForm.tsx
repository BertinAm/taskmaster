import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema, LoginFormValues } from "@/lib/validation/loginSchema";
import { useAuth } from "@/lib/auth/useAuth";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setFormError(null);
    
    try {
      const success = await login(data);
      if (success) {
        router.push("/");
        router.refresh(); // Refresh the page to update auth state
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      {/* Server-side or form error display */}
      {(formError || authError) && (
        <div
          className="p-3 mb-3 text-sm border border-red-500 bg-red-50 text-red-600 rounded-md dark:bg-red-900/30 dark:text-red-400"
          role="alert"
        >
          {formError || authError}
        </div>
      )}

      {/* Email Input */}
      <FormInput
        id="email"
        type="email"
        label="Email"
        error={errors.email}
        isLoading={isLoading}
        placeholder="your.email@example.com"
        autoComplete="email"
        {...register("email")}
        aria-required="true"
      />

      {/* Password Input */}
      <FormInput
        id="password"
        type="password"
        label="Password"
        error={errors.password}
        isLoading={isLoading}
        placeholder="********"
        autoComplete="current-password"
        {...register("password")}
        aria-required="true"
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded"
            disabled={isLoading}
            {...register("rememberMe")}
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        className="mt-6"
      >
        Sign in
      </Button>

      {/* Register Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
} 