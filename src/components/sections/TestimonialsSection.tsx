"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    avatar: "/images/avatar-1.jpg",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "TaskMaster revolutionized our team's workflow. The intuitive interface and powerful features have significantly improved our productivity. I can't imagine managing our projects without it now.",
    rating: 5,
  },
  {
    id: 2,
    avatar: "/images/avatar-2.jpg",
    name: "Michael Chen",
    role: "Senior Developer",
    company: "InnovateSoft",
    content:
      "As a developer, I need tools that don't get in my way. TaskMaster seamlessly integrates with our development process, making task management effortless. The automation features are game-changing.",
    rating: 5,
  },
  {
    id: 3,
    avatar: "/images/avatar-3.jpg",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthBrand",
    content:
      "My marketing team handles dozens of campaigns simultaneously. TaskMaster helps us stay organized and meet all our deadlines. The analytics provide valuable insights that help us improve our processes.",
    rating: 4,
  },
  {
    id: 4,
    avatar: "/images/avatar-4.jpg",
    name: "David Thompson",
    role: "Project Coordinator",
    company: "BuildWell Construction",
    content:
      "Before TaskMaster, we were drowning in spreadsheets and email chains. Now, everything is centralized and accessible. The collaborative features have improved communication across our entire organization.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Handle autoplay testimonial carousel
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <section
      id="testimonials"
      className="section bg-[rgb(var(--background))] relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/3 left-1/4 w-1/3 h-1/3 rounded-full bg-primary/20 blur-3xl"
        ></motion.div>
      </div>

      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our <span className="text-primary">Users Say</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thousands of teams rely on TaskMaster to manage their workflow and boost productivity.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex transition-all duration-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4 flex flex-col items-center"
                >
                  <div className="bg-[rgb(var(--background))] border border-gray-800 rounded-xl p-8 relative mb-8 shadow-xl">
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[rgb(var(--background))] border-b border-r border-gray-800 transform rotate-45"></div>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary bg-gray-800 flex items-center justify-center text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-scandia text-lg font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-primary scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 