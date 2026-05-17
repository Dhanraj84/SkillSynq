import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Read user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    // Check local storage or system preference on mount
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Resume Analyzer', path: '/analyzer' },
    { name: 'Cover Letter', path: '/cover-letter' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glassmorphism rounded-none border-x-0 border-t-0 py-4 px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
            <Target className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
          </motion.div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
            SkillSynq
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-medium tracking-wide transition-colors hover:text-primary text-slate-600 dark:text-slate-300 dark:hover:text-white"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full mt-1 w-full h-[2px] bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 uppercase">
                  {user.name.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md shadow-blue-500/20"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button 
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-slate-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-slate-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-6 px-8 flex flex-col gap-6"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-medium tracking-wide transition-colors ${location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-2"></div>
          
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
              </div>
              <button 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="text-sm font-bold text-red-500 dark:text-red-400 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
