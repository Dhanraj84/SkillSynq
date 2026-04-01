import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleAnalysis = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center mb-8 w-full">
      <div className="relative flex items-center glassmorphism p-1 rounded-full border-white/10  min-w-[300px]">
        
        {/* Animated Background Selector */}
        <div 
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-primary to-secondary rounded-full transition-transform duration-300 ease-out"
          style={{ 
            transform: mode === 'basic' ? 'translateX(0)' : 'translateX(100%)',
          }}
        />

        <button
          onClick={() => setMode('basic')}
          className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            mode === 'basic' ? 'text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          Basic Analysis
        </button>

        <button
          onClick={() => setMode('advanced')}
          className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            mode === 'advanced' ? 'text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          Advanced AI Insights
        </button>

      </div>
    </div>
  );
};

export default ToggleAnalysis;
