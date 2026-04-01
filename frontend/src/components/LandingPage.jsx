import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark cursor-pointer overflow-hidden"
      onClick={() => navigate('/analyzer')}
    >
      {/* Background Particles/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
           <Target className="w-24 h-24 mb-6 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </motion.div>
        
        <h1 className="text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary to-secondary drop-shadow-lg">
          SkillSynq
        </h1>
        
        <p className="text-2xl text-white/80 font-light tracking-wide max-w-2xl px-4">
          AI-Powered Resume & Job Compatibility Analyzer
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16"
        >
          <span className="animate-bounce inline-block text-white/50 tracking-widest uppercase text-sm font-semibold border border-white/10 px-6 py-2 rounded-full glassmorphism">
            {/* Click anywhere to start */}
          </span>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </motion.div>
  );
};

export default LandingPage;
