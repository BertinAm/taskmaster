"use client";

import { motion } from "framer-motion";

export default function IntegrationsSection() {
  // Example integration logos
  const integrations = [
    { name: "Slack", icon: "✨" },
    { name: "Google Drive", icon: "📁" },
    { name: "Github", icon: "🐙" },
    { name: "Figma", icon: "🎨" },
    { name: "Zoom", icon: "🎥" },
    { name: "Notion", icon: "📝" },
    { name: "Jira", icon: "🔄" },
    { name: "Dropbox", icon: "📦" },
  ];

  return (
    <section id="integrations" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Connect With Your Favorite Tools</h2>
        <p className="text-center mb-16 max-w-2xl mx-auto">
          TaskMaster integrates seamlessly with over 30+ tools and platforms to enhance your productivity.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{integration.icon}</div>
              <h3 className="font-medium">{integration.name}</h3>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View All Integrations
          </motion.button>
        </div>
      </div>
    </section>
  );
}
