"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Simplify Task Management, <span className="text-primary">Amplify Productivity</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              TaskMaster helps teams organize, track, and manage work effectively. Streamline collaboration, 
              meet deadlines, and achieve your goals faster.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/register" 
                className="bg-primary text-white font-medium px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started Free
              </Link>
              <Link 
                href="/demo" 
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Watch Demo
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <p className="text-sm text-gray-500 mb-3">Trusted by 10,000+ teams worldwide</p>
              <div className="flex flex-wrap gap-6 items-center">
                {['Company A', 'Company B', 'Company C', 'Company D'].map((company, i) => (
                  <div key={company} className="text-gray-400 dark:text-gray-500 font-medium">
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Image/Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
              <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 dark:from-primary/30 dark:to-purple-500/30 absolute inset-0 z-0" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <p className="text-lg font-medium">Dashboard Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 