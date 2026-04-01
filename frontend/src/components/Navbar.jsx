import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Analyze Resume', path: '/analyzer' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glassmorphism bg-dark/70 rounded-none border-x-0 border-t-0 py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Target className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
          </motion.div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            SkillSynq
          </span>
        </Link>
        
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-medium tracking-wide transition-colors hover:text-white text-white/70"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full mt-1 w-full h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
