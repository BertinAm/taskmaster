"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Step1BasicInfo, Step2Password, Step3Terms } from "./RegistrationSteps";
import { RegisterFormValues } from "@/lib/validation/registerSchema";
import { Step1FormValues } from "@/lib/validation/registerSchema";
import { Step2FormValues } from "@/lib/validation/registerSchema";
import { Step3FormValues } from "@/lib/validation/registerSchema";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<RegisterFormValues>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  
  // Function to check if email or username exists
  const checkUserExists = useCallback(async (type: 'email' | 'username', value: string) => {
    if (!value) return false;
    
    try {
      if (type === 'email') {
        setIsCheckingEmail(true);
      } else {
        setIsCheckingUsername(true);
      }
      
      // In a real app, this would be an API call to your backend
      const response = await new Promise<boolean>((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
          // For demo purposes, let's say these emails/usernames are taken
          if (type === 'email') {
            resolve(['admin@example.com', 'test@example.com', 'user@example.com'].includes(value));
          } else {
            resolve(['admin', 'test', 'user'].includes(value));
          }
        }, 500);
      });
      
      return response;
    } catch (error) {
      console.error(`Error checking if ${type} exists:`, error);
      return false;
    } finally {
      if (type === 'email') {
        setIsCheckingEmail(false);
      } else {
        setIsCheckingUsername(false);
      }
    }
  }, []);
  
  // Check if email/username exists when step 1 data changes
  useEffect(() => {
    const checkExistingCredentials = async () => {
      if (formData.email) {
        const exists = await checkUserExists('email', formData.email);
        setEmailExists(exists);
      }
      
      if (formData.username) {
        const exists = await checkUserExists('username', formData.username);
        setUsernameExists(exists);
      }
    };
    
    if (currentStep === 1) {
      checkExistingCredentials();
    }
  }, [currentStep, formData.email, formData.username, checkUserExists]);

  const handleNextStep = (stepData: Step1FormValues | Step2FormValues) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCompleteRegistration = async (stepData: Step3FormValues) => {
    setIsLoading(true);
    setError(null);
    
    // Combine all form data
    const completeFormData: RegisterFormValues = {
      ...formData as RegisterFormValues,
      ...stepData,
    };
    
    try {
      // In a real app, this would be an API call to register the user
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      console.log("Registration data:", completeFormData);
      
      // Redirect to email verification page
      router.push("/verify-email?email=" + encodeURIComponent(completeFormData.email));
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Display server error message if there is one
  if (error) {
    return (
      <div className="p-4 mb-4 text-sm border border-red-500 bg-red-50 text-red-600 rounded-md dark:bg-red-900/30 dark:text-red-400" role="alert">
        <p>{error}</p>
        <button 
          className="mt-2 text-red-700 dark:text-red-300 underline" 
          onClick={() => setError(null)}
        >
          Try again
        </button>
      </div>
    );
  }

  // Render the current step
  switch (currentStep) {
    case 1:
      return (
        <Step1BasicInfo
          onNextStep={handleNextStep}
          defaultValues={formData}
          isCheckingEmail={isCheckingEmail}
          isCheckingUsername={isCheckingUsername}
          emailExists={emailExists}
          usernameExists={usernameExists}
        />
      );
    case 2:
      return (
        <Step2Password
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          defaultValues={formData}
        />
      );
    case 3:
      return (
        <Step3Terms
          onCompleteRegistration={handleCompleteRegistration}
          onPrevStep={handlePrevStep}
          defaultValues={formData}
          isLoading={isLoading}
        />
      );
    default:
      return null;
  }
} 