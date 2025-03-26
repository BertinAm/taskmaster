"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your Productivity?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of teams who have already transformed their workflow with TaskMaster.
            Start your free trial today, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary font-medium px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="bg-transparent border-2 border-white font-medium px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No credit card required. Free plan includes all essential features.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
