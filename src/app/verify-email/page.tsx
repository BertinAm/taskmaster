"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (countdown > 0 || !email) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      // In a real app, this would make an API call to resend the verification email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful email resend
      setResendSuccess(true);
      
      // Start countdown for resend button (60 seconds)
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error resending verification email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mx-auto w-full max-w-md sm:max-w-lg">
        <div className="flex justify-center">
          <Link href="/" aria-label="Go to homepage">
            <Logo size={50} className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 px-6 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Verify your email address</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We&apos;ve sent a verification email to:
            </p>
            <p className="mt-1 font-medium break-all">{email || "your email address"}</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300">
              <p>
                <strong>Please check your inbox and follow the link in the email to verify your account.</strong>
              </p>
              <p className="mt-1">
                If you don&apos;t see the email, check your spam folder or request a new verification email.
              </p>
            </div>
            
            <div className="pt-2">
              <button
                onClick={handleResendEmail}
                disabled={isResending || countdown > 0}
                className={`w-full py-3 px-4 rounded-lg transition-colors text-center font-medium 
                  ${isResending || countdown > 0
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                  }`}
              >
                {isResending
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend verification email"}
              </button>
              
              {resendSuccess && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 text-center">
                  Verification email sent successfully!
                </p>
              )}
            </div>
            
            <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already verified your email?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 