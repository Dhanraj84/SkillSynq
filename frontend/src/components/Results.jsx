import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

const Results = ({ results, mode }) => {
  if (!results) return null;

  const { matchScore, matchedSkills, missingSkills, suggestions, keywordsMatch, insights } = results;

  // Circle Progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const scoreColor = matchScore >= 80 ? 'text-success' 
                   : matchScore >= 60 ? 'text-blue-400' 
                   : 'text-danger';
  const scoreBgColor = matchScore >= 80 ? 'text-success/20' 
                     : matchScore >= 60 ? 'text-blue-400/20' 
                     : 'text-danger/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      {/* Top Section: Score & Basic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Match Score Card */}
        <div className="glassmorphism p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors" />
          <h3 className="text-lg font-semibold text-white/90 mb-6 relative z-10 w-full text-center flex items-center justify-center gap-2">
            Match Score <TrendingUp className="w-5 h-5 text-primary" />
          </h3>
          <div className="relative w-32 h-32 flex items-center justify-center z-10">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64" cy="64" r="40"
                stroke="currentColor" strokeWidth="8" fill="transparent"
                className={scoreBgColor}
              />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="64" cy="64" r="40"
                stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={circumference}
                className={scoreColor}
                strokeLinecap="round"
              />
            </svg>
            <div className={`absolute text-3xl font-bold ${scoreColor}`}>
              <motion.span
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 }}
              >
                  {matchScore}%
              </motion.span>
            </div>
          </div>
        </div>

        {/* Matched Skills */}
        <div className="glassmorphism p-6 md:col-span-2 relative">
          <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" /> 
            Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills?.length > 0 ? matchedSkills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            )) : <span className="text-white/50 text-sm italic">No perfect matches found.</span>}
          </div>
        </div>
      </div>

      {/* Mode Specific Sections */}
      <AnimatePresence mode="wait">
        {mode === 'basic' ? (
          <motion.div
            key="basic"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 gap-6"
          >
             <div className="glassmorphism p-6 relative">
                 <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-danger" /> 
                    Missing Skills (Skill Gap)
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {missingSkills?.length > 0 ? missingSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-danger/10 text-danger border border-danger/20 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    )) : <span className="text-white/50 text-sm italic">You have all the required skills!</span>}
                  </div>
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="advanced"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 gap-6"
          >
            {/* Advanced Insights Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Detailed Missing Skills container */}
                <div className="glassmorphism p-6 relative bg-gradient-to-br from-danger/5 to-transparent">
                     <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-danger" /> 
                        Critical Skill Gaps
                     </h3>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {missingSkills?.length > 0 ? missingSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-danger/10 text-danger border border-danger/20 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        )) : <span className="text-white/50 text-sm italic">Great! No major gaps detected.</span>}
                      </div>
                      <p className="text-sm text-white/60">
                         These are the exact keywords missing from your resume that ATS bots are looking for in the job description.
                      </p>
                </div>

                {/* AI Insights and Suggestions */}
                <div className="glassmorphism p-6 relative bg-gradient-to-bl from-primary/5 to-transparent">
                     <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" /> 
                        AI Keyword Analysis
                     </h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-white/70">Keyword Match Rate:</span>
                           <span className="font-bold text-white">{keywordsMatch || matchScore}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${keywordsMatch || matchScore}%` }} 
                              className="bg-primary h-2 rounded-full" 
                            />
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <h4 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-1">
                                <Lightbulb className="w-4 h-4 text-secondary" /> Suggestions
                            </h4>
                            <ul className="text-sm text-white/70 space-y-2 list-disc pl-4">
                                {suggestions?.map((sug, i) => (
                                    <li key={i}>{sug}</li>
                                )) || (
                                    <>
                                        <li>Add measurable achievements to your bullet points.</li>
                                        <li>Incorporate exactly matching missing keywords.</li>
                                    </>
                                )}
                            </ul>
                        </div>
                     </div>
                </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Results;
