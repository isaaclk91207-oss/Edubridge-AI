"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Download, Brain, Award, CheckCircle, Terminal as TerminalIcon, Loader2 } from "lucide-react";

export default function AIPortfolio() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Mock Data
  const [data, setData] = useState({
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
    summary: "Based on AI analysis of 50+ learning interactions, this student demonstrates high proficiency in modern web architecture and cloud deployments."
  });

  const systemMessages = [
    "Initializing EduBridge Neural Engine...",
    "Fetching learning logs from database...",
    "Analyzing chat history with AI Mentor...",
    "Identifying recurring skill patterns...",
    "Cross-referencing with industry standards...",
    "Generating professional career profile...",
    "Finalizing AI-Verified Portfolio..."
  ];

  const handleScan = () => {
    setIsScanning(true);
    setLogs([]);
    
    systemMessages.forEach((msg, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${msg}`]);
      }, index * 700);
    });

    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 5500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 selection:bg-cyan-500/30">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 tracking-tight">
          <Sparkles className="text-[var(--accent-cyan)] animate-pulse" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)]">
            AI Portfolio Analyzer
          </span>
        </h1>
        <p className="text-[var(--text-secondary)] mt-3 font-medium">Transforming your learning data into a professional career</p>
      </motion.div>

      {/* Hero / Start Button */}
      {!isScanning && !showResults && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center py-20">
          <button
            onClick={handleScan}
            className="group relative px-10 py-5 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] rounded-2xl font-bold text-xl overflow-hidden transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
            style={{ boxShadow: '0 0 30px var(--accent-glow)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 group-hover:opacity-100 opacity-0 transition-opacity" />
            <span className="relative flex items-center gap-2 text-white">
              Generate AI Portfolio <Sparkles size={20} />
            </span>
          </button>
        </motion.div>
      )}

      {/* Futuristic Scanner UI */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
            <div className="relative aspect-video bg-[var(--bg-secondary)]/40 backdrop-blur-xl border-2 border-[var(--border-color)] rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: '0 0 50px var(--accent-glow)' }}>
              {/* Scan Line Animation */}
              <motion.div
                className="absolute left-0 right-0 h-1 z-20 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                style={{ boxShadow: '0 0 20px var(--accent-cyan)' }}
              />
              
              <div className="p-8 font-mono h-full flex flex-col">
                <div className="flex items-center gap-2 text-[var(--accent-cyan)] mb-6 border-b border-[var(--accent-cyan)]/20 pb-2">
                  <TerminalIcon size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Neural Link Active</span>
                </div>
                
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-[var(--accent-cyan)]/80">
                      {log}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-2 text-[var(--accent-cyan)] mt-4 italic">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results View */}
      {showResults && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
          <div className="bg-[var(--bg-secondary)]/40 backdrop-blur-2xl border border-[var(--border-color)] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-blue)] to-[var(--accent-blue)]" />
            
            <div className="p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-blue)] flex items-center justify-center p-1 shadow-lg" style={{ boxShadow: '0 0 30px var(--accent-glow)' }}>
                      <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                        <User className="w-12 h-12 text-[var(--accent-cyan)]" />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-4 border-[var(--bg-primary)]">
                       <CheckCircle size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">Student Name</h2>
                    <p className="text-[var(--accent-cyan)] text-xl font-bold mt-1 tracking-wide uppercase">{data.role}</p>
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-[var(--bg-tertiary)] rounded-full border border-[var(--border-color)]">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-bold text-[var(--accent-blue)] uppercase">AI-Verified Talent</span>
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg" style={{ boxShadow: '0 0 20px var(--accent-glow)' }}>
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Skills Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[var(--accent-cyan)]" /> Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] font-medium text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary Section */}
                <div className="space-y-4">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--accent-cyan)]" /> Executive Summary
                  </h3>
                  <div className="bg-[var(--bg-tertiary)]/50 backdrop-blur-md rounded-2xl p-6 border border-[var(--border-color)] relative">
                    <p className="text-[var(--text-primary)] leading-relaxed text-sm italic">
                      "{data.summary}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
