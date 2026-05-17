import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Github, Linkedin, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setIsSubmitting(false);
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError('Server connection failed. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Email",
      value: "dhanraj84@gmail.com",
      link: "mailto:dhanraj84@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-500" />,
      title: "Phone",
      value: "+91 9241633878",
      link: "tel:+919241633878"
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-500" />,
      title: "Location",
      value: "Mohali, Punjab, India",
      link: null
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
        >
          Whether you have a question about SkillSynq, want to discuss a potential collaboration, or are hiring for a software engineering role, I'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Contact Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-800 dark:border-slate-700 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              {contactMethods.map((method, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1 font-medium">{method.title}</p>
                    {method.link ? (
                      <a href={method.link} className="text-white hover:text-blue-400 font-semibold transition-colors">
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <p className="text-sm text-slate-400 mb-4 font-medium">Connect via Social</p>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/dhanraj8409" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/Dhanraj84" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-slate-700 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-700 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isSubmitted 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
              } disabled:opacity-80`}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : isSubmitted ? (
                <><CheckCircle className="w-5 h-5" /> Message Sent Successfully!</>
              ) : (
                <><Send className="w-5 h-5" /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
