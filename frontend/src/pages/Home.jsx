import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import { FileSearch, Zap, TrendingUp } from 'lucide-react';

const Home = () => {
  const [showLanding, setShowLanding] = useState(true);
  const navigate = useNavigate();

  // Handle auto-hide or manual click of landing page
  useEffect(() => {
    const timer = setTimeout(() => {
      // Optional: Auto-transition after 4 seconds
      // setShowLanding(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLanding && (
          <div onClick={() => setShowLanding(false)}>
             <LandingPage />
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden flex items-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          
          {/* Left Side: Branding and Hero Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Career Potential
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
              Upload your resume and compare it with job descriptions using AI to discover skill gaps and compatibility scores in seconds.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/analyzer')}
              className="relative px-8 py-4 bg-primary text-white font-semibold rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative flex items-center gap-2">
                Start Analysis <Zap className="w-5 h-5 fill-current" />
              </div>
            </motion.button>
          </motion.div>

          {/* Right Side: Visual/Feature Showcase */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="glassmorphism p-8 relative z-10 border-white/20">
              <div className="grid gap-6">
                {[
                  { icon: FileSearch, title: 'Smart Parsing', desc: 'Extracts key skills from any PDF or Image layout.' },
                  { icon: TrendingUp, title: 'Match Score', desc: 'Calculates cosine similarity with the job description.' },
                  { icon: Zap, title: 'Actionable Insights', desc: 'Identifies missing keywords to bypass ATS filters.' },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default"
                  >
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white/90 mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/60">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Decorative blob behind card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl -z-10 rounded-[3rem]" />
          </motion.div>

        </div>
      </motion.div>
    </>
  );
};

export default Home;
