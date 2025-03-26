"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "span" | "section" | "header" | "footer" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "li";
}

export default function AnimateOnScroll({
  children,
  animation = "fade",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
  as = "div",
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const animations = {
    "fade": {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
    },
    "slide-left": {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    "slide-right": {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    "zoom": {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    "none": {
      initial: {},
      animate: {},
    }
  };

  // Create the motion component based on the 'as' prop
  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <MotionComponent
      ref={ref}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
