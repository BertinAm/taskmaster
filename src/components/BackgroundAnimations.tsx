"use client";

import { motion } from "framer-motion";

interface BackgroundAnimationsProps {
  variant?: "circles" | "dots" | "gradient" | "grid";
  className?: string;
  intensity?: "light" | "medium" | "strong";
  primaryColor?: boolean;
}

export default function BackgroundAnimations({
  variant = "circles",
  className = "",
  intensity = "medium",
  primaryColor = true,
}: BackgroundAnimationsProps) {
  // Base opacity mapping based on intensity
  const opacityMap = {
    light: { base: 0.03, accent: 0.05 },
    medium: { base: 0.05, accent: 0.1 },
    strong: { base: 0.08, accent: 0.15 },
  };

  // Set color based on primary flag
  const baseColor = primaryColor ? "primary" : "gray";
  
  // Convert decimal opacity to tailwind opacity class
  const getOpacityClass = (opacity: number) => {
    const opacityPercent = Math.round(opacity * 100);
    return opacityPercent <= 5 ? '5' : 
           opacityPercent <= 10 ? '10' :
           opacityPercent <= 20 ? '20' :
           opacityPercent <= 30 ? '30' :
           opacityPercent <= 40 ? '40' :
           opacityPercent <= 50 ? '50' : '60';
  };

  // Render different background animations based on variant
  const renderVariant = () => {
    switch (variant) {
      case "circles":
        return (
          <>
            <motion.div
              className={`absolute top-1/4 right-1/4 h-96 w-96 rounded-full ${primaryColor ? 'bg-primary' : 'bg-gray-500'} opacity-[${opacityMap[intensity].base}]`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [
                  opacityMap[intensity].base * 0.8,
                  opacityMap[intensity].base,
                  opacityMap[intensity].base * 0.8,
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className={`absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full ${primaryColor ? 'bg-primary' : 'bg-gray-500'} opacity-[${opacityMap[intensity].accent}]`}
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [
                  opacityMap[intensity].accent,
                  opacityMap[intensity].accent * 0.7,
                  opacityMap[intensity].accent,
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className={`absolute top-2/3 right-1/2 h-48 w-48 rounded-full ${primaryColor ? 'bg-primary' : 'bg-gray-500'} opacity-[${opacityMap[intensity].base * 0.8}]`}
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [
                  opacityMap[intensity].base * 0.6,
                  opacityMap[intensity].base * 0.8,
                  opacityMap[intensity].base * 0.6,
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        );

      case "dots":
        return (
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${primaryColor ? 'bg-primary' : 'bg-gray-500'} opacity-[${opacityMap[intensity].base}]`}
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>
        );

      case "gradient":
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );

      case "grid":
        return (
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: primaryColor ? 
                "linear-gradient(to right, #18cb96 1px, transparent 1px), linear-gradient(to bottom, #18cb96 1px, transparent 1px)" : 
                "linear-gradient(to right, #6b7280 1px, transparent 1px), linear-gradient(to bottom, #6b7280 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {renderVariant()}
    </div>
  );
} 