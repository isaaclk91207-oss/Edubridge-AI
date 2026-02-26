"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Download, Brain, Award, CheckCircle } from "lucide-react";

export default function AIPortfolioPro() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-cyan-600" />
          AI Career Scanner
        </h1>
        <p className="text-slate-600 mt-2">Advanced AI-powered career profile analyzer</p>
      </motion.div>

      {!isScanning && !showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center py-20"
        >
          <button
            onClick={handleScan}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-blue-500/30 shadow-lg"
          >
            Start Scan
          </button>
        </motion.div>
      )}

      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative w-full h-96 bg-white/40 backdrop-blur-xl border border-blue-200/30 rounded-2xl overflow-hidden shadow-blue-500/10 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-[0_0_30px_#06b6d4,0_0_60px_#06b6d4]"
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="absolute bottom-8 left-8 right-8 h-40 bg-white/50 backdrop-blur-md border border-blue-200/30 rounded-xl p-4">
              <div className="text-cyan-600 text-sm font-bold mb-3">System Logs</div>
              <div className="space-y-1 text-xs font-mono">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-green-600"
                >
                  {'>'} Initializing EduBridge Neural Engine...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-green-600"
                >
                  {'>'} Connecting to Supabase database...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5 }}
                  className="text-green-600"
                >
                  {'>'} Analyzing skill patterns with Gemini 2.0...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="text-cyan-600 mt-2"
                >
                  Processing...
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/40 backdrop-blur-xl border border-blue-200/30 rounded-2xl overflow-hidden shadow-blue-500/10 shadow-2xl">
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600" />
            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-8">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-blue-500/30 shadow-xl">
                    <User className="w-14 h-14 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-slate-800">Student</h2>
                    <p className="text-cyan-600 text-2xl mt-1">Full Stack Developer</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-slate-600">AI-Verified Profile</span>
                    </div>
                  </div>
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-blue-500/30 shadow-lg">
                  <Download className="w-6 h-6" />
                  Download CV
                </button>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-cyan-600" />
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["React", "Node.js", "TypeScript", "Python", "AWS", "PostgreSQL"].map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-2.5 bg-blue-50 border border-blue-200/30 rounded-full text-blue-700 shadow-blue-500/10 shadow-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-blue-200/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-600" />
                  Professional Summary
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Experienced full-stack developer with 4+ years of expertise in building scalable web applications. 
                  Proficient in React, Node.js, TypeScript, and cloud technologies. Passionate about clean code 
                  and delivering exceptional user experiences.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
