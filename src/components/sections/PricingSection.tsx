"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto">
          Choose the plan that works best for you and your team.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {['Basic', 'Pro', 'Enterprise'].map((plan, i) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg ${i === 1 ? 'border-2 border-primary' : 'border border-gray-200 dark:border-gray-700'}`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${i === 0 ? '0' : i === 1 ? '12' : '49'}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Feature 1</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Feature 2</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Feature 3</span>
                </li>
              </ul>
              <Link 
                href="/register" 
                className={`block text-center py-3 px-6 rounded-lg transition-colors w-full ${
                  i === 1 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {i === 0 ? 'Start Free' : 'Get Started'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
