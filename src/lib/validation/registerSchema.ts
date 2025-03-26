import { z } from "zod";

// Common password list
const commonPasswords = [
  "password", "123456", "qwerty", "admin", "welcome", 
  "12345678", "123456789", "abc123", "password123",
  "admin123", "iloveyou", "1234567890", "letmein", "monkey"
];

const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(50, { message: "Name cannot exceed 50 characters" });

const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username cannot exceed 30 characters" })
  .regex(/^[a-zA-Z0-9._-]+$/, {
    message: "Username can only contain letters, numbers, and ._-",
  });

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(100, { message: "Password is too long" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "Password must contain at least one special character",
  })
  .refine((password) => !commonPasswords.includes(password.toLowerCase()), {
    message: "This password is too common and easily guessed",
  });

// Step 1: Basic Information
export const step1Schema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
});

// Step 2: Password
export const step2Schema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 3: Terms and Privacy
export const step3Schema = z.object({
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
  receiveUpdates: z.boolean().optional(),
});

// Complete registration schema
export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean(),
  receiveUpdates: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.agreeToTerms === true, {
  message: "You must agree to the terms and conditions",
  path: ["agreeToTerms"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type Step1FormValues = z.infer<typeof step1Schema>;
export type Step2FormValues = z.infer<typeof step2Schema>;
export type Step3FormValues = z.infer<typeof step3Schema>; 