"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import OAuthButtons from "@/components/auth/OAuthButtons";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <Logo size={60} />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mx-auto w-full max-w-md sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" aria-label="Go to homepage">
            <Logo size={50} className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>
        <h1 className="mt-6 text-center text-2xl sm:text-3xl font-bold tracking-tight">
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Manage your tasks efficiently with TaskMaster
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-sm sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 px-6 py-8 shadow sm:rounded-lg sm:px-10">
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <OAuthButtons />
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