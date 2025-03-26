"use client";

import { useEffect, useState } from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState({
    score: 0,
    label: "Too weak",
    color: "bg-red-500",
  });

  useEffect(() => {
    if (!password) {
      setStrength({
        score: 0,
        label: "Too weak",
        color: "bg-red-500",
      });
      return;
    }

    // Calculate password strength
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Variety check
    const uniqueChars = new Set(password).size;
    if (uniqueChars > 6) score += 1;
    if (uniqueChars > 10) score += 1;

    // Normalize score to 0-4 range
    const normalizedScore = Math.min(Math.floor(score / 2), 4);

    // Set strength label and color based on score
    switch (normalizedScore) {
      case 0:
        setStrength({
          score: normalizedScore,
          label: "Too weak",
          color: "bg-red-500",
        });
        break;
      case 1:
        setStrength({
          score: normalizedScore,
          label: "Weak",
          color: "bg-orange-500",
        });
        break;
      case 2:
        setStrength({
          score: normalizedScore,
          label: "Fair",
          color: "bg-yellow-500",
        });
        break;
      case 3:
        setStrength({
          score: normalizedScore,
          label: "Good",
          color: "bg-green-400",
        });
        break;
      case 4:
        setStrength({
          score: normalizedScore,
          label: "Strong",
          color: "bg-green-600",
        });
        break;
      default:
        setStrength({
          score: 0,
          label: "Too weak",
          color: "bg-red-500",
        });
    }
  }, [password]);

  return (
    <div className="mt-1 mb-1">
      <div className="flex items-center justify-between mb-1">
        <div className="flex space-x-1 w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < strength.score ? strength.color : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs ml-3 min-w-[60px] text-right">
          {password ? strength.label : ""}
        </span>
      </div>
    </div>
  );
} 