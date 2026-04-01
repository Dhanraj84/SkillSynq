import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, CheckCircle} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeUploader = ({ file, setFile }) => {
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('Please upload a valid PDF or Image file (PNG, JPG, JPEG)');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
          isDragActive 
          ? 'border-primary bg-primary/10 scale-[1.02]' 
          : file 
            ? 'border-success/50 bg-success/5'
            : 'border-white/20 bg-white/5 hover:border-primary/50 hover:bg-white/10'
        }`}
      >
        <input {...getInputProps()} />
        
        {/* Animated Background Pulse when Dragging */}
        <AnimatePresence>
          {isDragActive && (
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 -z-10"
             />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="p-4 bg-primary/20 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                <UploadCloud className="w-10 h-10 text-primary" />
              </div>
              <p className="text-lg font-medium text-white/90 mb-2">
                Drag & Drop your resume here
              </p>
              <p className="text-sm text-white/50">
                Supports PDF, PNG, JPG, JPEG up to 5MB
              </p>
              <div className="mt-4 px-6 py-2 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors pointer-events-none">
                Browse Files
              </div>
              {error && (
                 <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-danger text-sm mt-3 font-medium">
                    {error}
                 </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="file"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center p-6 w-full"
            >
              <div className="relative p-6 glassmorphism border-success/30 bg-success/10 flex items-center gap-4 w-3/4 max-w-sm">
                <File className="w-10 h-10 text-success" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button 
                  onClick={removeFile}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 text-white/50 group-hover:text-danger" />
                </button>
                <div className="absolute -top-3 -right-3 bg-dark rounded-full">
                  <CheckCircle className="w-6 h-6 text-success bg-white rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUploader;
