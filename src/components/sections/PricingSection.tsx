"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

const pricingPlans = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Perfect for individuals and small tasks",
    features: [
      "Up to 5 projects",
      "Basic task management",
      "1 GB storage",
      "Email support",
      "1 user",
    ],
    highlighted: false,
    buttonText: "Start for Free",
  },
  {
    name: "Pro",
    price: {
      monthly: 12,
      yearly: 108, // 10% discount for yearly
    },
    description: "Ideal for professionals and small teams",
    features: [
      "Unlimited projects",
      "Advanced task management",
      "10 GB storage",
      "Priority support",
      "Up to 10 users",
      "Team collaboration",
      "Advanced reporting",
      "Custom fields",
    ],
    highlighted: true,
    buttonText: "Get Started",
  },
  {
    name: "Business",
    price: {
      monthly: 49,
      yearly: 468, // 20% discount for yearly
    },
    description: "For organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "100 GB storage",
      "Premium support",
      "Advanced security",
      "API access",
      "SSO integration",
      "Custom branding",
      "Dedicated account manager",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="pricing"
      className="section bg-[rgb(var(--background))] relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-primary/20 blur-3xl"
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
            Simple, <span className="text-primary">Transparent Pricing</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that works best for you and your team. All plans include a 14-day free trial.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span
              className={`mr-3 text-lg ${
                billingPeriod === "monthly" ? "text-primary font-medium" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
              }
              className="relative w-14 h-7 bg-gray-700 rounded-full p-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-pressed={billingPeriod === "yearly"}
              aria-label="Toggle billing period"
            >
              <div
                className={`bg-primary w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  billingPeriod === "yearly" ? "translate-x-7" : ""
                }`}
              />
            </button>
            <span
              className={`ml-3 text-lg ${
                billingPeriod === "yearly" ? "text-primary font-medium" : "text-gray-400"
              }`}
            >
              Yearly <span className="text-xs text-primary">(Save 10-20%)</span>
            </span>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`rounded-xl overflow-hidden border ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10 relative z-10"
                  : "border-gray-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              {plan.highlighted && (
                <div className="bg-primary text-white text-sm font-medium py-1 text-center">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="heading-md mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-scandia font-bold">
                    ${plan.price[billingPeriod]}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {billingPeriod === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium mb-8 ${
                    plan.highlighted
                      ? "bg-primary text-white hover:brightness-110"
                      : "border border-primary text-primary hover:bg-primary/10"
                  } transition-all`}
                >
                  {plan.buttonText}
                </button>
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-lg text-gray-300">
            Need a custom plan for your enterprise?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 