import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, UploadCloud, FileText, Loader2, CheckCircle, Copy, Download, RefreshCw, Wand2, Briefcase, Building, Check, AlertCircle, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } from 'docx';
import { saveAs } from 'file-saver';

const CoverLetter = () => {
  // Step 1: Upload & Extract
  const [resumeFile, setResumeFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Step 2: Generation Inputs
  const [jobRole, setJobRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [tone, setTone] = useState('Professional');
  const tones = ['Professional', 'Formal', 'Modern', 'Confident'];

  // Step 3: Generated Output
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    setUploadError('');
    const validTypes = [
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/plain', 'image/png', 'image/jpeg', 'image/jpg'
    ];
    if (!validTypes.includes(file.type)) {
      setUploadError('Unsupported file type. Please upload PDF, DOCX, TXT, or Image (PNG/JPG).');
      return;
    }
    setResumeFile(file);
    extractResumeData(file);
  };

  const extractResumeData = (file) => {
    setIsExtracting(true);
    setExtractedData(null);
    setGeneratedLetter('');

    // Simulate OCR / Text Extraction based on Dhanraj Kumar's Resume
    setTimeout(() => {
      setExtractedData({
        name: "Dhanraj Kumar",
        title: "Software Developer Intern Candidate",
        contact: "dhanraj84@gmail.com | +91 9241633878",
        email: "dhanraj84@gmail.com",
        phone: "+91 9241633878",
        linkedin: "linkedin.com/in/dhanraj8409",
        github: "github.com/Dhanraj84",
        educationDetails: "B.Tech, CSE | Chandigarh College of Engineering, Mohali",
        skills: ["C++", "Python", "JavaScript", "React.js", "Node.js", "Tailwind CSS"],
        experience: "Full-Stack Web Development Intern at CodeTech IT Solutions. Developed responsive frontend components and integrated REST APIs.",
        projects: ["InfraCharge (EV Route Optimization)", "SkillSynq (AI Resume Matching)"],
        education: "B.Tech Computer Science & Engineering (2024-2027)",
        keywords: ["Full-Stack", "React", "Problem Solving", "REST APIs", "DSA"]
      });
      setIsExtracting(false);
    }, 2500);
  };

  const handleGenerate = () => {
    if (!extractedData || !jobRole || !companyName) return;
    setIsGenerating(true);

    // Simulate AI Generation with hyper-personalized content based on tone
    setTimeout(() => {
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      let opening = '';
      let closing = '';

      if (tone === 'Formal') {
        opening = `It is with great respect and enthusiasm that I submit my application for the ${jobRole} position at ${companyName}. As a disciplined Software Engineering student with a robust foundation in Data Structures and full-stack architecture, I am eager to contribute my technical rigor to your esteemed organization.`;
        closing = `I deeply admire ${companyName}'s legacy of innovation and would be honored to bring my dedication to your upcoming initiatives. Thank you for your time and consideration.`;
      } else if (tone === 'Modern') {
        opening = `I was thrilled to see the opening for the ${jobRole} role at ${companyName}. I'm a results-driven full-stack developer who loves turning complex problems into elegant, scalable solutions, and I'd love to bring this energy to your team.`;
        closing = `I'm a huge fan of what you're building at ${companyName} and would love the chance to jump in and contribute from day one. Thanks for considering my application!`;
      } else if (tone === 'Confident') {
        opening = `I am exactly the kind of high-impact engineer you need for the ${jobRole} position at ${companyName}. With a relentless focus on performance and a proven track record of shipping full-stack features, I am ready to accelerate your engineering goals.`;
        closing = `I am confident that my technical skills and agile mindset will make an immediate impact at ${companyName}. I look forward to discussing how we can build great things together.`;
      } else {
        // Professional
        opening = `I am writing to express my strong interest in the ${jobRole} position at ${companyName}. As a results-driven Software Engineering student with a solid foundation in Data Structures, Algorithms, and full-stack development, I am eager to bring my technical expertise and problem-solving mindset to your team.`;
        closing = `I deeply admire ${companyName}'s commitment to innovation and would be thrilled to contribute my dedication, technical skills, and agile workflow experience to your upcoming projects. Thank you for considering my application.`;
      }

      const letterBody = `${today}

Hiring Manager
${companyName}

Dear Hiring Manager,

${opening}

During my internship at CodeTech IT Solutions, I engineered responsive frontend components using React.js and Tailwind CSS, and integrated robust REST APIs using Node.js and Express.js. This experience, coupled with my commitment to solving 300+ DSA problems on LeetCode and GeeksforGeeks, has honed my ability to build scalable, high-performance enterprise applications. 

Additionally, I have architected complex projects such as InfraCharge, an EV route optimization platform, and SkillSynq, an AI-based resume matching system. These projects demonstrate my proficiency in ${extractedData.skills.slice(0, 4).join(', ')}, as well as my passion for creating intelligent, user-centric solutions. ${jobDesc ? "I noted from your job description that you are looking for these exact capabilities, and my background aligns perfectly with your requirements." : ""}

${closing} I have attached my resume for your review and look forward to the possibility of discussing this exciting opportunity with you.

Sincerely,

${extractedData.name}`;

      setGeneratedLetter(letterBody);
      setIsGenerating(false);
    }, 1500);
  };

  const handleOptimize = () => {
    if (!generatedLetter) return;
    setIsOptimizing(true);
    setTimeout(() => {
      let optimized = generatedLetter
        .replace(/worked on/gi, 'architected')
        .replace(/made/gi, 'spearheaded')
        .replace(/developed/gi, 'engineered')
        .replace(/good/gi, 'exceptional');
      
      setGeneratedLetter(optimized);
      setIsOptimizing(false);
    }, 1000);
  };

  const handleInsertKeyword = (keyword) => {
    if (!generatedLetter || generatedLetter.includes(keyword)) return;
    const paragraphs = generatedLetter.split('\n\n');
    if (paragraphs.length >= 4) {
      paragraphs[3] += ` My agile workflow experience also encompasses ${keyword}, ensuring smooth and efficient project delivery.`;
      setGeneratedLetter(paragraphs.join('\n\n'));
    } else {
      setGeneratedLetter(generatedLetter + `\n\nMy experience also encompasses ${keyword}.`);
    }
  };

  const handlePowerVerb = (oldVerb, newVerb) => {
    if (!generatedLetter) return;
    setGeneratedLetter(generatedLetter.replace(new RegExp(oldVerb, 'gi'), newVerb));
  };

  const handleCopy = () => {
    const fullText = `${extractedData.name}\n${extractedData.title}\n${extractedData.contact}\n${extractedData.linkedin} | ${extractedData.github}\n\n${generatedLetter}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadDocx = async () => {
    if (!generatedLetter || !extractedData) return;

    // Create the header table mimicking the resume design
    const headerTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 60, type: WidthType.PERCENTAGE },
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                new Paragraph({ children: [new TextRun({ text: extractedData.name, bold: true, size: 48, font: "Segoe UI", color: "FFFFFF" })], spacing: { after: 100 } }),
                new Paragraph({ children: [new TextRun({ text: extractedData.title, italics: true, size: 24, font: "Segoe UI", color: "CBD5E1" })], spacing: { after: 200 } }),
                new Paragraph({ children: [new TextRun({ text: extractedData.educationDetails, size: 20, font: "Segoe UI", color: "FF8A65" })] }),
              ],
            }),
            new TableCell({
              width: { size: 40, type: WidthType.PERCENTAGE },
              shading: { fill: "FF8A65", type: ShadingType.CLEAR },
              margins: { top: 200, bottom: 200, left: 200, right: 200 },
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                new Paragraph({ children: [new TextRun({ text: `📧 ${extractedData.email}`, size: 20, font: "Segoe UI", color: "000000" })], spacing: { after: 100 } }),
                new Paragraph({ children: [new TextRun({ text: `📱 ${extractedData.phone}`, size: 20, font: "Segoe UI", color: "000000" })], spacing: { after: 100 } }),
                new Paragraph({ children: [new TextRun({ text: `🔗 ${extractedData.linkedin}`, size: 20, font: "Segoe UI", color: "000000" })], spacing: { after: 100 } }),
                new Paragraph({ children: [new TextRun({ text: `💻 ${extractedData.github}`, size: 20, font: "Segoe UI", color: "000000" })] }),
              ],
            }),
          ],
        }),
      ],
    });

    // Create the body paragraphs
    const paragraphs = generatedLetter.split('\n').map(line => {
      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24, // 12pt
            font: "Georgia",
            color: "E2E8F0" // Light slate grey to match UI
          })
        ],
        spacing: { after: line === '' ? 0 : 240 } // 240 = 12pt spacing
      });
    });

    // Add some spacing between header table and letter body
    const spacingParagraph = new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 400 } });

    const doc = new Document({
      background: {
        color: "1A1C23" // Dark navy/grey background to match UI preview and Resume
      },
      sections: [{
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        children: [headerTable, spacingParagraph, ...paragraphs]
      }]
    });

    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Cover_Letter_${extractedData?.name.replace(/\s+/g, '_')}_${companyName.replace(/\s+/g, '_')}.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
      alert("Failed to generate DOCX file. Check console for details.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3 text-slate-900 dark:text-white">
          Cover Letter Generator <Wand2 className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Upload your resume and let AI draft a highly personalized, ATS-friendly cover letter tailored to your exact profile and target job.
        </p>
      </div>

      {/* SECTION 1: RESUME UPLOAD & PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Upload Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">1</div>
            Upload Resume
          </h2>
          
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all min-h-[16rem]"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.txt,image/*"
              capture="environment"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
            {isExtracting ? (
              <div className="flex flex-col items-center text-blue-500">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-semibold text-lg">Extracting & Normalizing OCR...</p>
              </div>
            ) : resumeFile ? (
              <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-12 h-12 mb-4" />
                <p className="font-semibold text-slate-900 dark:text-white text-center max-w-full truncate px-4">{resumeFile.name}</p>
                <p className="text-sm mt-1">Format accepted. Click to replace.</p>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
                <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2 text-center text-lg">Click to upload or drag & drop</p>
                <p className="text-slate-500 text-sm text-center">PDF, DOCX, TXT, PNG, JPG (OCR Supported)</p>
              </>
            )}
          </div>
          {uploadError && <p className="text-red-500 text-sm mt-4 text-center font-medium">{uploadError}</p>}
        </div>

        {/* Extracted Data Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-slate-400" />
            Extracted Profile
          </h2>
          
          <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden">
            {!extractedData && !isExtracting && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 p-6 text-center">
                Upload your resume to see your parsed enterprise-level profile here.
              </div>
            )}
            
            <AnimatePresence>
              {extractedData && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Name & Title</p>
                    <p className="text-slate-900 dark:text-white font-bold text-lg">{extractedData.name}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{extractedData.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Top Skills Detected</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {extractedData.skills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded text-xs font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Key Experience & Projects</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-2 flex items-start gap-2">
                      <Briefcase className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" /> {extractedData.experience}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" /> {extractedData.projects.join(' • ')}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION 2: GENERATION PANEL */}
      <AnimatePresence>
        {extractedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">2</div>
              Job Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Target Job Role
                </label>
                <input 
                  type="text" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Frontend Developer Intern"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" /> Company Name
                </label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google, TechCorp"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Job Description (Optional, for better context)</label>
              <textarea 
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description to align your cover letter perfectly..."
                className="w-full min-h-[100px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-y"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Select Tone</label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        tone === t 
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!jobRole || !companyName || isGenerating}
                className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 disabled:opacity-50 transition-all mt-4 md:mt-6 text-lg"
              >
                {isGenerating ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Drafting Professional Letter...</>
                ) : (
                  <><Sparkles className="w-6 h-6" /> Generate Cover Letter</>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 3: GENERATED OUTPUT & AI SUGGESTIONS */}
      <AnimatePresence>
        {generatedLetter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Professional Document Editor Panel */}
            <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-900 rounded-[2rem] p-4 md:p-8 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col">
               <div className="flex items-center justify-between mb-6 px-2">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">3</div>
                   Corporate Format Output
                 </h2>
                 <div className="flex gap-2">
                    <button 
                      onClick={handleCopy}
                      className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold shadow-sm bg-white/50 dark:bg-slate-800/50"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button 
                      onClick={downloadDocx}
                      className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold shadow-sm bg-white/50 dark:bg-slate-800/50"
                    >
                      <Download className="w-4 h-4" /> <span className="hidden sm:inline">DOCX</span>
                    </button>
                 </div>
               </div>

               {/* Realistic Document Paper View */}
               <div className="flex-1 bg-white dark:bg-[#1a1c23] shadow-2xl rounded-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12 mx-auto w-full max-w-4xl font-serif">
                 
                 {/* Resume-matching Header Layout */}
                 <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-slate-300 dark:border-slate-700 pb-8">
                   <div className="mb-6 md:mb-0 max-w-md">
                     <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-wide font-sans">{extractedData.name}</h1>
                     <h2 className="text-xl md:text-2xl italic text-slate-600 dark:text-slate-300 mb-3 font-sans">{extractedData.title}</h2>
                     <p className="text-sm md:text-base text-[#ff8a65] font-sans font-semibold">{extractedData.educationDetails}</p>
                   </div>
                   
                   {/* Orange Contact Block */}
                   <div className="bg-[#ff8a65] p-5 text-slate-900 text-sm flex flex-col gap-2 min-w-[280px] font-sans font-semibold rounded-bl-xl shadow-md">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {extractedData.email}</div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {extractedData.phone}</div>
                      <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> {extractedData.linkedin}</div>
                      <div className="flex items-center gap-2"><Github className="w-4 h-4" /> {extractedData.github}</div>
                   </div>
                 </div>

                 {/* Editable Letter Body */}
                 <textarea 
                    value={generatedLetter}
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    className="w-full min-h-[500px] bg-transparent border-none text-slate-900 dark:text-slate-200 focus:outline-none resize-none text-sm md:text-base leading-relaxed tracking-wide whitespace-pre-wrap"
                    style={{ lineHeight: '1.8' }}
                 />
               </div>

               <div className="flex justify-end gap-3 mt-8 px-2">
                 <button 
                   onClick={handleGenerate}
                   disabled={isGenerating}
                   className="px-5 py-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                 >
                   <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} /> 
                   {isGenerating ? 'Regenerating...' : 'Regenerate'}
                 </button>
                 <button 
                   onClick={handleOptimize}
                   disabled={isOptimizing}
                   className="px-5 py-2.5 text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                 >
                   {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />} 
                   {isOptimizing ? 'Optimizing...' : 'Optimize Wording'}
                 </button>
               </div>
            </div>

            {/* AI Suggestions Side Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-700 shadow-xl h-fit sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" /> ATS Optimization
              </h3>

              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-blue-500" /> Missing JD Keywords
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">Click to naturally insert into your letter:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Agile Methodology', 'CI/CD Pipelines', 'Team Leadership'].map(kw => {
                      const isAdded = generatedLetter.includes(kw);
                      return (
                        <button 
                          key={kw} 
                          onClick={() => handleInsertKeyword(kw)}
                          disabled={isAdded}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors shadow-sm ${
                            isAdded 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-default'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-500 hover:text-blue-600'
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3 inline mr-1"/> : '+ '} {kw}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3">
                    <Wand2 className="w-4 h-4 text-emerald-500" /> Power Verbs
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">Swap weak verbs to match your resume tone:</p>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                    <li className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                      <span className="line-through text-slate-400 text-xs">worked on</span> 
                      <button onClick={() => handlePowerVerb('worked on', 'architected')} className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer">architected</button>
                    </li>
                    <li className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                      <span className="line-through text-slate-400 text-xs">made</span> 
                      <button onClick={() => handlePowerVerb('made', 'spearheaded')} className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer">spearheaded</button>
                    </li>
                    <li className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                      <span className="line-through text-slate-400 text-xs">developed</span> 
                      <button onClick={() => handlePowerVerb('developed', 'engineered')} className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer">engineered</button>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" /> Formatting Check
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Your header matches your resume contact layout. The <b>"{tone}"</b> tone perfectly mirrors your software engineering profile.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CoverLetter;
