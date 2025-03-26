"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StaggeredListProps {
  children: ReactNode[];
  staggerDelay?: number;
  itemDelay?: number;
  className?: string;
  itemClassName?: string;
  preset?: "fade-in" | "slide-up" | "slide-down" | "zoom-in";
  threshold?: number;
}

export default function StaggeredList({
  children,
  staggerDelay = 0.08,
  itemDelay = 0,
  className = "",
  itemClassName = "",
  preset = "fade-in",
  threshold = 0.1,
}: StaggeredListProps) {
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
  };

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
        rootMargin: "0px 0px -50px 0px", // Trigger a bit before element is in view
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
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          initial={presets[preset].initial}
          animate={isVisible ? presets[preset].animate : presets[preset].initial}
          transition={{
            duration: 0.5,
            delay: itemDelay + index * staggerDelay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
} 