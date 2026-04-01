import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import ResumeUploader from '../components/ResumeUploader';
import ToggleAnalysis from '../components/ToggleAnalysis';
import Results from '../components/Results';

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [mode, setMode] = useState('basic');
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) {
      setError('Please provide both a resume file and a job description.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('An error occurred during analysis. Make sure the backend servers are running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          AI Resume Analyzer <Sparkles className="text-secondary w-8 h-8" />
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Upload your resume and the job description to get an AI-powered compatibility score and actionable feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Upload Section */}
        <div className="glassmorphism p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 text-white/90">1. Upload Resume</h2>
          <div className="flex-1">
             <ResumeUploader file={file} setFile={setFile} />
          </div>
        </div>

        {/* Job Description Section */}
        <div className="glassmorphism p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 text-white/90">2. Job Description</h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full flex-1 min-h-[16rem] bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none glassmorphism"
            placeholder="Paste the target job description here..."
          />
        </div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger text-center mb-8">
          {error}
        </motion.div>
      )}

      {/* Analyze Button */}
      <div className="flex justify-center mb-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={loading || !file || !jobDescription}
          className="relative px-12 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-sm"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <div className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing using AI...
              </>
            ) : (
              'Analyze Resume'
            )}
          </div>
        </motion.button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <ToggleAnalysis mode={mode} setMode={setMode} />
            <Results results={results} mode={mode} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Analyzer;
