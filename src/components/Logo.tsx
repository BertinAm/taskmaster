"use client";

import { useTheme } from "./ThemeProvider";

interface LogoProps {
  height?: number;
  width?: number;
  size?: number;
  className?: string;
}

export default function Logo({ height, width, size = 32, className = "" }: LogoProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";
  const accentColor = "#18cb96"; // Primary color
  
  // If size is provided, use it to calculate height and width
  const finalHeight = height || size;
  const finalWidth = width || size * 5; // Maintain aspect ratio

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Text part */}
      <text
        x="10"
        y="38"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill={textColor}
      >
        taskmaster
      </text>
      
      {/* Arrow icons */}
      <path
        d="M220 15 L230 25 L240 15"
        stroke={accentColor}
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M220 30 L230 40 L240 30"
        stroke={accentColor}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
} 