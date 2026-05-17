import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Image as ImageIcon, CheckCircle, Zap, ShieldCheck, Clock, Layers, ArrowRight, Download, Edit3, Briefcase, Target } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col pb-20">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] pt-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-6 border border-blue-200 dark:border-blue-800 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-400"></span>
            </span>
            SaaS Job Compatibility Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900 dark:text-white">
            Optimize Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Job Applications</span> <br/>
            with Precision
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-lg">
            Analyze your resume against any job description, uncover skill gaps, and generate perfectly tailored cover letters in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/analyzer')}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 group"
            >
              Analyze Resume <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/cover-letter')}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold rounded-xl hover:border-primary transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
            >
              Create Cover Letter <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Hero Visual Area */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-300/20 blur-3xl rounded-full -z-10 transform translate-x-10 translate-y-10" />
          <div className="glassmorphism p-2 rounded-2xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Platform Dashboard Preview" 
              className="rounded-xl w-full h-[450px] object-cover opacity-90"
            />
            {/* Overlay floating cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -left-10 top-24 glassmorphism p-5 rounded-xl flex items-center gap-4 shadow-xl"
            >
              <div className="w-14 h-14 rounded-full bg-green-100/80 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                <span className="font-bold text-xl">92%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Match Score</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Highly Compatible</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-20 glassmorphism p-5 rounded-xl shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Matched Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-600">React.js</span>
                <span className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-600">Python</span>
                <span className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-600">Node.js</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features for Your Job Search</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Everything you need to bypass ATS filters and make a lasting impression.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Feature 1: Resume Analyzer */}
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100%] -z-10 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Resume Analyzer</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Upload your resume and a target job description to get an instant compatibility score. Identify exactly what skills you're missing before you apply.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-primary/10"><CheckCircle className="w-4 h-4 text-primary" /></div> Upload Resume PDF or DOCX</li>
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-primary/10"><ImageIcon className="w-4 h-4 text-primary" /></div> Paste JD text, document, or upload a photo</li>
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-primary/10"><Target className="w-4 h-4 text-primary" /></div> Get Compatibility Score & Skill Gap Analysis</li>
              </ul>
              <button onClick={() => navigate('/analyzer')} className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all bg-primary/5 px-6 py-3 rounded-xl hover:bg-primary/10 w-fit">
                Try Resume Analyzer <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Feature 2: Cover Letter Generator */}
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-10 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-bl-[100%] -z-10 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cover Letter Generator</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Stop staring at a blank page. Generate a personalized, highly relevant cover letter based directly on your resume and the target job description.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-blue-500/10"><Zap className="w-4 h-4 text-blue-500" /></div> Instantly generate from uploaded resume</li>
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-blue-500/10"><Edit3 className="w-4 h-4 text-blue-500" /></div> Fully editable and customizable drafts</li>
                <li className="flex items-center gap-4 text-slate-700 dark:text-slate-300"><div className="p-1 rounded bg-blue-500/10"><Download className="w-4 h-4 text-blue-500" /></div> Download as PDF or copy to clipboard</li>
              </ul>
              <button onClick={() => navigate('/cover-letter')} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all bg-blue-500/5 px-6 py-3 rounded-xl hover:bg-blue-500/10 w-fit">
                Create Cover Letter <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Three simple steps to supercharge your application.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-10" />
          
          {[
            { step: '01', title: 'Upload Resume', desc: 'Securely upload your current resume in PDF or Word format.' },
            { step: '02', title: 'Add Job Description', desc: 'Paste text, upload a document, or even snap a photo of the JD.' },
            { step: '03', title: 'Get Results', desc: 'View your compatibility score or generate a tailored cover letter.' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-xl flex items-center justify-center mb-8 relative">
                <span className="text-2xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 px-4 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SKILLSYNQ */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose SkillSynq?</h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                We take the guesswork out of job hunting. By leveraging advanced parsing and analysis, we ensure your application speaks directly to what employers are looking for.
              </p>
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: 'Better Job Matching', desc: 'Align your skills with real market demands.' },
                  { icon: Clock, title: 'Fast & Efficient', desc: 'Get deep analysis and generated letters in seconds.' },
                  { icon: Layers, title: 'Multiple Inputs', desc: 'Support for text, docs, and image parsing for JDs.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-blue-200">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-10 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-2xl">
               <h3 className="text-3xl font-bold mb-4">Ready to upgrade your career?</h3>
               <p className="text-blue-100 mb-10 text-lg">Join thousands of professionals optimizing their resumes today. Clean user experience, zero friction.</p>
               <button onClick={() => navigate('/analyzer')} className="w-full py-5 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 hover:scale-[1.02] transition-all shadow-xl text-lg">
                 Get Started Now
               </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
