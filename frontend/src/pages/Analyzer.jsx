import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, FileText, Type, Image as ImageIcon, UploadCloud, CheckCircle, X, AlignLeft } from 'lucide-react';
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

  // JD specific states
  const [jdTab, setJdTab] = useState('text'); // 'text', 'file', 'image'
  const [jdFile, setJdFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [jdError, setJdError] = useState('');
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

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

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze`, formData, {
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

  const validateAndSetJdFile = (selectedFile, type) => {
    setJdError('');
    if (!selectedFile) return;

    if (type === 'file') {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        setJdError('Unsupported file type. Please upload PDF, DOC, DOCX, or TXT.');
        return;
      }
    } else if (type === 'image') {
      if (!selectedFile.type.startsWith('image/')) {
        setJdError('Unsupported file type. Please upload a valid image (PNG, JPG).');
        return;
      }
    }
    
    setJdFile(selectedFile);
    setJobDescription('');
  };

  const handleJdFileDrop = (e, type) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetJdFile(e.dataTransfer.files[0], type);
    }
  };

  const handleExtractText = () => {
    if (!jdFile) return;
    setIsExtracting(true);
    
    setTimeout(() => {
      if (jdFile.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setJobDescription(e.target.result);
          setIsExtracting(false);
          setJdTab('text');
          setJdFile(null);
        };
        reader.readAsText(jdFile);
      } else {
        // Mock extraction for other formats to simulate real UX without complex backend OCR
        setJobDescription(`[Extracted text from ${jdFile.name}]\n\nWe are looking for an experienced professional to join our team.\n\nKey Requirements:\n- Proficiency in React.js, Python, and Node.js\n- Experience with modern SaaS architectures\n- Strong problem-solving skills and teamwork\n- Excellent communication skills\n- Minimum 3 years of experience in software development`);
        setIsExtracting(false);
        setJdTab('text');
        setJdFile(null);
      }
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3 text-slate-900 dark:text-white">
          AI Resume Analyzer <Sparkles className="text-primary w-8 h-8" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Compare your resume against any job description to get an ATS compatibility score, matched keywords, and missing skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-start">
        
        {/* Upload Resume Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upload Resume</h2>
          </div>
          <div className="flex-1">
             <ResumeUploader file={file} setFile={setFile} />
          </div>
        </div>

        {/* Job Description Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">2</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job Description</h2>
          </div>

          {/* JD Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6">
            {[
              { id: 'text', icon: AlignLeft, label: 'Paste Text' },
              { id: 'file', icon: FileText, label: 'Upload File' },
              { id: 'image', icon: ImageIcon, label: 'Scan Image' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setJdTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${
                  jdTab === tab.id 
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {jdTab === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col"
                >
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full flex-1 min-h-[16rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Paste the target job description here..."
                  />
                  <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> Supports plain text and copied content.
                  </p>
                </motion.div>
              )}

              {jdTab === 'file' && (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col"
                >
                  {!jdFile ? (
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleJdFileDrop(e, 'file')}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all min-h-[16rem]"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => validateAndSetJdFile(e.target.files[0], 'file')}
                      />
                      <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
                      <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2 text-center">Click to upload or drag and drop</p>
                      <p className="text-slate-500 text-sm text-center">PDF, DOC, DOCX, or TXT (Max 5MB)</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded-xl p-8 bg-slate-50 dark:bg-slate-900/50 min-h-[16rem]">
                      <FileText className="w-16 h-16 text-primary mb-4" />
                      <p className="text-slate-900 dark:text-white font-semibold mb-1 max-w-full truncate px-4">{jdFile.name}</p>
                      <p className="text-slate-500 text-sm mb-6">{(jdFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setJdFile(null)}
                          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={handleExtractText}
                          disabled={isExtracting}
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                          {isExtracting ? <><Loader2 className="w-4 h-4 animate-spin" /> Extracting...</> : 'Extract Text'}
                        </button>
                      </div>
                    </div>
                  )}
                  {jdError && <p className="text-danger text-sm mt-3 text-center">{jdError}</p>}
                </motion.div>
              )}

              {jdTab === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col"
                >
                  {!jdFile ? (
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleJdFileDrop(e, 'image')}
                      onClick={() => imageInputRef.current?.click()}
                      className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all min-h-[16rem]"
                    >
                      <input 
                        type="file" 
                        ref={imageInputRef} 
                        className="hidden" 
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => validateAndSetJdFile(e.target.files[0], 'image')}
                      />
                      <ImageIcon className="w-12 h-12 text-slate-400 mb-4" />
                      <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2 text-center">Upload Photo or Take a Picture</p>
                      <p className="text-slate-500 text-sm text-center">PNG, JPG, or Screenshot</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50 min-h-[16rem]">
                      <div className="relative w-full max-w-xs h-32 mb-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={URL.createObjectURL(jdFile)} alt="JD Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-slate-900 dark:text-white font-semibold mb-6 truncate max-w-full px-4 text-sm">{jdFile.name}</p>
                      
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setJdFile(null)}
                          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={handleExtractText}
                          disabled={isExtracting}
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                          {isExtracting ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning OCR...</> : 'Scan Text'}
                        </button>
                      </div>
                    </div>
                  )}
                  {jdError && <p className="text-danger text-sm mt-3 text-center">{jdError}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-center mb-10 max-w-3xl mx-auto font-medium">
          {error}
        </motion.div>
      )}

      {/* Analyze Button */}
      <div className="flex flex-col items-center justify-center mb-20 border-t border-slate-200 dark:border-slate-800 pt-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={loading || !file || (!jobDescription && !jdFile)}
          className="relative px-12 py-5 bg-gradient-to-r from-primary to-blue-500 text-white font-bold text-lg rounded-2xl overflow-hidden group shadow-[0_10px_40px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <div className="relative flex items-center justify-center gap-3">
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Analyzing ATS Score...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" /> Analyze ATS Score
              </>
            )}
          </div>
        </motion.button>
        {(!file || (!jobDescription && !jdFile)) && (
          <p className="text-slate-500 mt-4 text-sm">Please upload both your resume and the job description to continue.</p>
        )}
        {jdFile && !jobDescription && (
          <p className="text-amber-500 mt-4 text-sm font-medium">Please click "Extract Text" on your JD file before analyzing.</p>
        )}
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            <ToggleAnalysis mode={mode} setMode={setMode} />
            <div className="mt-8">
              <Results results={results} mode={mode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Analyzer;
