"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggeredAnimationProps {
  children: ReactNode;
  staggerDelay?: number;
  containerDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom";
}

export default function StaggeredAnimation({
  children,
  staggerDelay = 0.1,
  containerDelay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  animation = "fade",
}: StaggeredAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const getAnimationVariants = () => {
    const variants = {
      hidden: {},
      visible: {},
    };

    switch (animation) {
      case "fade":
        variants.hidden = { opacity: 0 };
        variants.visible = { opacity: 1 };
        break;
      case "slide-up":
        variants.hidden = { opacity: 0, y: 50 };
        variants.visible = { opacity: 1, y: 0 };
        break;
      case "slide-down":
        variants.hidden = { opacity: 0, y: -50 };
        variants.visible = { opacity: 1, y: 0 };
        break;
      case "slide-left":
        variants.hidden = { opacity: 0, x: -50 };
        variants.visible = { opacity: 1, x: 0 };
        break;
      case "slide-right":
        variants.hidden = { opacity: 0, x: 50 };
        variants.visible = { opacity: 1, x: 0 };
        break;
      case "zoom":
        variants.hidden = { opacity: 0, scale: 0.8 };
        variants.visible = { opacity: 1, scale: 1 };
        break;
      default:
        break;
    }

    return variants;
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = getAnimationVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div 
              key={index} 
              variants={childVariants}
              transition={{ duration }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
} 