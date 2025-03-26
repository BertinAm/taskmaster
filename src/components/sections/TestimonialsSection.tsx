"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  // Testimonials data structure
  const testimonials = [
    {
      rating: 5,
      text: "TaskMaster has completely transformed how our team manages projects. The intuitive interface and powerful features make it a joy to use every day.",
      author: "Jane Smith",
      position: "Product Manager at Tech Inc."
    },
    {
      rating: 4,
      text: "We've tried many project management tools, but TaskMaster stands out with its simplicity and powerful collaboration features. It's been a game-changer for our design team.",
      author: "Michael Chen",
      position: "Lead Designer at Design Co."
    },
    {
      rating: 5,
      text: "The automation features in TaskMaster have saved us countless hours on repetitive tasks. Our productivity has increased by 30% since we started using it.",
      author: "Sarah Johnson",
      position: "Operations Director at Agency Ltd."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto">
          Don&apos;t just take our word for it - hear from some of our satisfied customers!
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, j) => (
                    <svg 
                      key={j} 
                      className="w-5 h-5"
                      fill={j < testimonial.rating ? "currentColor" : "none"}
                      stroke={j < testimonial.rating ? "none" : "currentColor"}
                      strokeWidth={j < testimonial.rating ? "0" : "1.5"}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mb-4 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
