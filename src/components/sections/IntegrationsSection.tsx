"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

// Integration logos data
const integrations = [
  { name: "GitHub", logo: "/images/integrations/github.svg" },
  { name: "Slack", logo: "/images/integrations/slack.svg" },
  { name: "Google Drive", logo: "/images/integrations/google-drive.svg" },
  { name: "Zoom", logo: "/images/integrations/zoom.svg" },
  { name: "Figma", logo: "/images/integrations/figma.svg" },
  { name: "Notion", logo: "/images/integrations/notion.svg" },
  { name: "Dropbox", logo: "/images/integrations/dropbox.svg" },
  { name: "Trello", logo: "/images/integrations/trello.svg" },
  { name: "Jira", logo: "/images/integrations/jira.svg" },
  { name: "Microsoft Teams", logo: "/images/integrations/ms-teams.svg" },
  { name: "Asana", logo: "/images/integrations/asana.svg" },
  { name: "Monday", logo: "/images/integrations/monday.svg" },
];

// Platform logos data
const platforms = [
  { name: "iOS", logo: "/images/platforms/ios.svg" },
  { name: "Android", logo: "/images/platforms/android.svg" },
  { name: "Windows", logo: "/images/platforms/windows.svg" },
  { name: "macOS", logo: "/images/platforms/macos.svg" },
  { name: "Linux", logo: "/images/platforms/linux.svg" },
  { name: "Web", logo: "/images/platforms/web.svg" },
];

export default function IntegrationsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        stiffness: 50,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="integrations"
      className="section bg-[rgb(var(--background))] relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-primary/20 blur-3xl"
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
            Works With Your <span className="text-primary">Favorite Tools</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TaskMaster seamlessly integrates with over 100+ tools and platforms
            you already use, making your workflow smoother than ever.
          </motion.p>
        </div>

        {/* Integrations Grid */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h3
            className="heading-md mb-8 text-center"
            variants={itemVariants}
          >
            Integrations
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 bg-[rgb(var(--background))]"
                variants={itemVariants}
              >
                <div className="w-12 h-12 mb-3 relative flex items-center justify-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {integration.name.charAt(0)}
                  </div>
                </div>
                <span className="text-sm text-gray-300">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platforms */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h3
            className="heading-md mb-8 text-center"
            variants={itemVariants}
          >
            Available On All Platforms
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                className="flex flex-col items-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 mb-3 relative flex items-center justify-center bg-[rgb(var(--background))] rounded-full border border-gray-800 p-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {platform.name.charAt(0)}
                  </div>
                </div>
                <span className="text-sm text-gray-300">{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#" className="btn-primary inline-block">
            View All Integrations
          </a>
        </motion.div>
      </div>
    </section>
  );
} 