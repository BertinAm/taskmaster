"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PerformanceOptimizerProps {
  children: ReactNode;
  preset?: "fade-in" | "slide-up" | "slide-down" | "zoom-in" | "none";
  customAnimation?: {
    initial: any;
    animate: any;
  };
  delay?: number;
  threshold?: number;
  className?: string;
  id?: string;
}

export default function PerformanceOptimizer({
  children,
  preset = "fade-in",
  customAnimation,
  delay = 0,
  threshold = 0.1,
  className = "",
  id,
}: PerformanceOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Animation presets
  const presets = {
    "fade-in": {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
    },
    "zoom-in": {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    "none": {
      initial: {},
      animate: {},
    },
  };

  // Choose between preset or custom animation
  const animation = customAnimation || presets[preset];

  useEffect(() => {
    // Use Intersection Observer for detecting when element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before element is in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={animation.initial}
      animate={isVisible ? animation.animate : animation.initial}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
} 