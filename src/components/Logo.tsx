"use client";

import { useTheme } from "./ThemeProvider";

interface LogoProps {
  height?: number;
  width?: number;
}

export default function Logo({ height = 32, width = 160 }: LogoProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";
  const accentColor = "#18cb96"; // Primary color

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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