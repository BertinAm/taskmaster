"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  BellAlertIcon,
  ArrowPathIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <ClockIcon className="h-8 w-8" />,
    title: "Time Tracking",
    description:
      "Track time spent on tasks with precision. Analyze productivity patterns and optimize your workflow.",
  },
  {
    icon: <ChartBarIcon className="h-8 w-8" />,
    title: "Advanced Analytics",
    description:
      "Gain insights through comprehensive reports and visualizations. Make data-driven decisions.",
  },
  {
    icon: <UserGroupIcon className="h-8 w-8" />,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team. Share tasks, communicate, and collaborate in real-time.",
  },
  {
    icon: <BellAlertIcon className="h-8 w-8" />,
    title: "Smart Notifications",
    description:
      "Stay informed with customizable notifications for deadlines, mentions, and important updates.",
  },
  {
    icon: <ArrowPathIcon className="h-8 w-8" />,
    title: "Workflow Automation",
    description:
      "Automate repetitive processes with custom triggers and actions. Save time and reduce errors.",
  },
  {
    icon: <CalendarIcon className="h-8 w-8" />,
    title: "Calendar Integration",
    description:
      "Sync with your favorite calendar apps. View and manage tasks alongside your schedule.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="features" className="section bg-[rgb(var(--background))]" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Powerful Features for
            <span className="text-primary"> Maximum Productivity</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TaskMaster combines cutting-edge technology with intuitive design to deliver
            a comprehensive task management solution.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[rgb(var(--background))] p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="heading-sm mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 