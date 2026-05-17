import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileSearch, Target, Sparkles, FileSignature, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Upload & Extract",
      description: "Securely upload your resume in any common format (PDF, DOCX, TXT) or even an image. Our advanced OCR and parsing engine intelligently extracts your key skills, experience, and education.",
      icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-200 dark:border-blue-900",
      delay: 0.1
    },
    {
      id: 2,
      title: "Job Description Analysis",
      description: "Paste the exact job description you are targeting. SkillSynq analyzes the requirements, highlighting the most critical hard skills, soft skills, and keywords the employer is seeking.",
      icon: <FileSearch className="w-8 h-8 text-indigo-500" />,
      color: "bg-indigo-500/10 border-indigo-200 dark:border-indigo-900",
      delay: 0.2
    },
    {
      id: 3,
      title: "ATS Compatibility Scoring",
      description: "Our proprietary AI compares your extracted profile against the JD, generating an instant ATS match score. It clearly identifies matched skills and flags critical missing keywords.",
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-200 dark:border-emerald-900",
      delay: 0.3
    },
    {
      id: 4,
      title: "Hyper-Personalized Generation",
      description: "Generate a perfectly tailored, corporate-grade cover letter. The AI intelligently weaves your specific experiences and missing JD keywords into a highly persuasive narrative.",
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-200 dark:border-amber-900",
      delay: 0.4
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 shadow-sm">
            <Zap className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">The Smart Application Pipeline</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">SkillSynq</span> Works
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            From parsing your raw resume to exporting a polished, ATS-beating cover letter. Discover how our AI-driven workflow maximizes your hiring potential.
          </p>
        </motion.div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative">
        {/* Connecting Lines for Desktop */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent -z-10"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent -z-10"></div>

        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: step.delay }}
            className="bg-white dark:bg-slate-800 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${step.color} opacity-20 transition-transform group-hover:scale-110`}></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="flex-shrink-0 w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Step 0{step.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Highlight Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-slate-900 rounded-[2rem] p-12 shadow-2xl relative overflow-hidden text-center md:text-left"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-900/40 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to beat the ATS?</h2>
            <ul className="space-y-4 mb-8">
              {['Format-agnostic parsing (PDF, DOCX, Image)', 'Smart keyword extraction & scoring', 'Corporate DOCX document generation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <Link to="/analyzer" className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg">
              <Target className="w-5 h-5" /> Start Analyzer
            </Link>
            <Link to="/cover-letter" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
              <FileSignature className="w-5 h-5" /> Generate Letter <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
