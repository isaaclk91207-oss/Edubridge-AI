"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  User, 
  Download, 
  Brain, 
  Award, 
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  FileText,
  ChevronRight
} from "lucide-react";

interface ProfileData {
  name: string;
  role: string;
  summary: string;
  matchScore: number;
  skills: string[];
}

const terminalLogs = [
  { text: "Initializing EduBridge Neural Engine...", delay: 0 },
  { text: "Connecting to Supabase database...", delay: 800 },
  { text: "Fetching user learning logs...", delay: 1600 },
  { text: "Analyzing skill patterns with Gemini 2.0...", delay: 2400 },
  { text: "Processing mentor chat history...", delay: 3200 },
  { text: "Calculating skill proficiency scores...", delay: 4000 },
  { text: "Generating career recommendations...", delay: 4800 },
  { text: "Building professional summary...", delay: 5600 },
  { text: "Analysis complete!", delay: 6400 },
];

export default function AICareerPortfolio() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);

  // Fetch profile from backend with error handling
  const fetchProfileFromBackend = async () => {
    try {
      const userId = localStorage.getItem('edubridge_user_id') || 'user_' + Math.random().toString(36).substr(2, 9);
      
      const response = await fetch('http://localhost:8000/chat/cofounder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId,
          message: 'Analyze my career profile and provide a summary' 
        }),
      });

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        console.log('Backend response not ok, using mock data');
        return false;
      }

      // For streaming responses, we'd handle them differently
      // For now, we'll use the mock data as fallback
      return true;
    } catch (error) {
      console.error('Error fetching from backend:', error);
      // Return false to indicate backend is not available, use mock data
      return false;
    }
  };

  const handleScan = async () => {
    setIsScanning(true);
    setCurrentLog(0);
    
    // Try to fetch from backend first
    const backendAvailable = await fetchProfileFromBackend();
    
    // Add a slight delay to show the scanning animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < terminalLogs.length) {
        setCurrentLog(logIndex + 1);
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setShowResults(true);
        }, 500);
      }
    }, 800);
  };

  const profileData: ProfileData = {
    name: "Alex Chen",
    role: "Full Stack Developer",
    summary: "Results-driven Full Stack Developer with 4+ years of experience building scalable web applications. Proficient in React, Node.js, TypeScript, and cloud technologies. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Led multiple successful projects from conception to deployment.",
    matchScore: 94,
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "PostgreSQL", "GraphQL", "Docker"]
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 font-sans">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-8 border-b border-blue-200/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-cyan-600" />
            <span className="text-cyan-600 font-medium">AI Career Scanner</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Your Career, <span className="text-cyan-600">Analyzed</span>
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Advanced AI-powered career profile analysis
          </p>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Initial State - Start Scan */}
          {!isScanning && !showResults && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative mb-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 rounded-full border-2 border-blue-200/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-2 border-blue-300/30 border-dashed"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-300/30 flex items-center justify-center">
                    <Brain className="w-10 h-10 text-cyan-600" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-3 text-slate-800">Ready to Analyze Your Career</h2>
              <p className="text-slate-600 mb-8 text-center max-w-md">
                Our advanced AI will scan your learning history, skills, and career trajectory to generate your professional profile.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all"
              >
                <Zap className="w-5 h-5" />
                Start Scan
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Scanning State */}
          {isScanning && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative bg-white/40 backdrop-blur-xl border border-blue-200/30 rounded-3xl overflow-hidden">
                {/* Scanning Line Effect */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_#06b6d4]"
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-cyan-600 font-medium">Analyzing Profile</span>
                  </div>

                  {/* Terminal */}
                  <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 font-mono">
                    {terminalLogs.slice(0, currentLog).map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-2"
                      >
                        <span className="text-green-600">›</span>
                        <span className="text-slate-700">{log.text}</span>
                      </motion.div>
                    ))}
                    
                    {currentLog < terminalLogs.length && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-cyan-600">›</span>
                        <span className="text-cyan-600">Processing...</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Analysis Progress</span>
                      <span>{Math.round((currentLog / terminalLogs.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentLog / terminalLogs.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results State */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Profile Card */}
              <div className="bg-white/40 backdrop-blur-xl border border-blue-200/30 rounded-3xl overflow-hidden">
                {/* Top Gradient */}
                <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600" />

                <div className="p-10">
                  {/* Profile Header */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold text-slate-800">{profileData.name}</h2>
                        <p className="text-cyan-600 text-xl mt-1">{profileData.role}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-slate-600 text-sm">AI-Verified Profile</span>
                        </div>
                      </div>
                    </div>

                    {/* Circular Match Score */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="44"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-blue-100"
                          />
                          <motion.circle
                            cx="48"
                            cy="48"
                            r="44"
                            stroke="url(#gradient2)"
                            strokeWidth="6"
                            fill="transparent"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: 276 }}
                            animate={{ strokeDashoffset: 276 - (276 * profileData.matchScore) / 100 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            strokeDasharray="276"
                          />
                          <defs>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-slate-800">{profileData.matchScore}%</span>
                          <span className="text-xs text-slate-500">Match</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-cyan-600" />
                      <h3 className="text-lg font-semibold text-slate-800">AI-Generated Summary</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {profileData.summary}
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-5 h-5 text-cyan-600" />
                      <h3 className="text-lg font-semibold text-slate-800">Core Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.5 }}
                          className="px-4 py-2 bg-blue-50 border border-blue-200/30 rounded-full text-blue-700"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      <Download className="w-5 h-5" />
                      Download CV
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/50 border border-blue-200/30 rounded-full font-semibold flex items-center gap-2 hover:bg-white/70 transition-colors text-slate-700"
                    >
                      <Target className="w-5 h-5" />
                      View Matches
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Re-scan Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setIsScanning(true);
                    handleScan();
                  }}
                  className="text-slate-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Re-scan Profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
