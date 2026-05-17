import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight, Target } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/'); // Redirect to home on success
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 relative">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-slate-700 shadow-sm">
                <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400">Join SkillSynq and beat the ATS.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><UserPlus className="w-5 h-5" /> Sign Up</>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 dark:text-slate-400 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center justify-center gap-1 mt-2">
              Log in instead <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
