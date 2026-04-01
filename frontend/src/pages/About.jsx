import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, BrainCircuit, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          About SkillSynq
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          SkillSynq is a premium AI-powered platform designed to bridge the gap between job seekers and employers. 
          We leverage advanced Natural Language Processing to analyze your resume against job requirements, providing actionable insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Core Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 text-primary opacity-5 group-hover:opacity-10 transition-opacity">
             <Globe className="w-64 h-64" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
             <Sparkles className="text-secondary w-6 h-6" /> Our Mission
          </h2>
          <p className="text-white/70 leading-relaxed relative z-10">
            To empower professionals globally by optimizing their application materials, ensuring their true potential is never overlooked by automated tracking systems (ATS).
          </p>
        </motion.div>

        {/* Technology */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 text-primary opacity-5 group-hover:opacity-10 transition-opacity">
            <BrainCircuit className="w-64 h-64" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
             <Code className="text-primary w-6 h-6" /> The Technology
          </h2>
          <p className="text-white/70 leading-relaxed relative z-10">
            Powered by React, Node.js, and a robust Python microservice using spaCy and scikit-learn. We utilize TF-IDF vectorization and cosine similarity to generate accurate, helpful metrics.
          </p>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-white/5"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to optimize your career?</h3>
        <p className="text-white/60 mb-6">Head over to the analyzer and see how your resume stacks up.</p>
        <a href="/analyzer" className="inline-block px-8 py-3 bg-white text-dark font-bold rounded-full hover:bg-gray-200 transition-colors shadow-xl">
           Get Started Now
        </a>
      </motion.div>

    </div>
  );
};

export default About;
