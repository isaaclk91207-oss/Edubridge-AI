"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  MapPin, 
  ExternalLink, 
  Play, 
  Loader2, 
  Sparkles, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Brain,
  Code,
  Cpu,
  Network,
  Rocket,
  Lightbulb,
  BookOpen,
  Terminal,
  Database,
  Cloud
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

interface RoadmapStep {
  step: string;
  description: string;
  duration: string;
}

interface YouTubeVideo {
  title: string;
  link: string;
}

interface Roadmap {
  steps: RoadmapStep[];
  videos: YouTubeVideo[];
}

// Mock roadmap with 5 visual steps
const mockRoadmapSteps = [
  {
    step: "1. AI Fundamentals",
    description: "Understand the core concepts of Artificial Intelligence, machine learning basics, and the history of AI development.",
    duration: "2-4 weeks",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    topics: ["Introduction to AI", "History of AI", "Types of Machine Learning", "AI Ethics"]
  },
  {
    step: "2. Python for AI",
    description: "Master Python programming with a focus on AI libraries including NumPy, Pandas, and data manipulation.",
    duration: "4-6 weeks",
    icon: Code,
    color: "from-cyan-500 to-green-500",
    topics: ["Python Basics", "NumPy & Pandas", "Data Structures", "AI Libraries"]
  },
  {
    step: "3. Machine Learning",
    description: "Deep dive into supervised and unsupervised learning, algorithms, model training, and evaluation techniques.",
    duration: "6-8 weeks",
    icon: Cpu,
    color: "from-green-500 to-yellow-500",
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Training", "Evaluation Metrics"]
  },
  {
    step: "4. Neural Networks",
    description: "Build and understand deep neural networks, CNNs, RNNs, and advanced deep learning architectures.",
    duration: "8-10 weeks",
    icon: Network,
    color: "from-yellow-500 to-orange-500",
    topics: ["Neural Network Basics", "CNN Architecture", "RNN & LSTM", "Transformers"]
  },
  {
    step: "5. Deploying AI Models",
    description: "Learn to deploy, scale, and maintain AI models in production environments using cloud platforms.",
    duration: "4-6 weeks",
    icon: Rocket,
    color: "from-orange-500 to-pink-500",
    topics: ["Model Optimization", "Cloud Deployment", "API Development", "Monitoring & Maintenance"]
  }
];

// Generate a simple user ID
const generateUserId = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("edubridge_user_id");
    if (stored) return stored;
    const newId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("edubridge_user_id", newId);
    return newId;
  }
  return "anonymous_user";
};

// Extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Vertical Timeline Step Component
function TimelineStep({ step, index, isDark }: { step: typeof mockRoadmapSteps[0]; index: number; isDark: boolean }) {
  const Icon = step.icon;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline connector */}
      {index < mockRoadmapSteps.length - 1 && (
        <div className="absolute left-6 top-16 bottom-[-2rem] w-1">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d={`M 6 0 L 6 ${(mockRoadmapSteps.length - index - 1) * 160}`}
              stroke={`url(#gradient-${index})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      )}
      
      {/* Step Number Circle */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
        className="relative z-10 flex-shrink-0"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl shadow-cyan-500/30`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {/* Pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl`}
        />
      </motion.div>
      
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`flex-1 p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
          isDark 
            ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
            : 'bg-white/40 backdrop-blur-xl border border-white/50 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {step.step}
          </h3>
          <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
            isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'
          }`}>
            <Clock size={14} />
            {step.duration}
          </span>
        </div>
        
        {/* Description */}
        <p className={isDark ? 'text-slate-300 mb-4' : 'text-slate-600 mb-4'}>
          {step.description}
        </p>
        
        {/* Topics */}
        <div className="flex flex-wrap gap-2">
          {step.topics.map((topic, i) => (
            <span 
              key={i}
              className={`text-xs px-3 py-1 rounded-lg ${
                isDark 
                  ? 'bg-slate-700/50 text-slate-300 border border-slate-600/50' 
                  : 'bg-blue-50 text-blue-600 border border-blue-200/50'
              }`}
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Premium Skeleton Loader
function PremiumSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-start gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-200 animate-pulse flex-shrink-0" />
          <div className="flex-1 bg-white/40 backdrop-blur-xl border border-blue-200/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-40 bg-blue-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-blue-200 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-blue-200 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-blue-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-blue-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-blue-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-blue-200 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import React from "react";

export default function AIRoadmap() {
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [error, setError] = useState("");
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const [showMockRoadmap, setShowMockRoadmap] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Show mock roadmap on mount for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMockRoadmap(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateRoadmap = async () => {
    if (!goal.trim()) return;

    setIsLoading(true);
    setError("");
    setRoadmap(null);
    setShowMockRoadmap(false);

    try {
      const userId = generateUserId();
      const response = await fetch(
        `http://localhost:8000/chat/roadmap`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            user_id: userId,
            message: goal 
          }),
        }
      );

      const data = await response.json();
      
      if (response.status === 429 || (data.error && data.error.includes("quota"))) {
        setError("AI is busy, retrying in 30 seconds...");
        setRetryAfter(30);
        
        const countdown = setInterval(() => {
          setRetryAfter(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(countdown);
              handleGenerateRoadmap();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
        
        setIsLoading(false);
        return;
      }
      
      if (data.error) {
        throw new Error(data.message || "Failed to generate roadmap");
      }

      const parsedRoadmap = parseRoadmapResponse(data.roadmap || "", data.videos || []);
      setRoadmap(parsedRoadmap);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate roadmap. Please make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const parseRoadmapResponse = (responseText: string, videoList: YouTubeVideo[]): Roadmap => {
    const steps: RoadmapStep[] = [];
    const videos: YouTubeVideo[] = [...videoList];

    const lines = responseText.split("\n");
    let currentStep: RoadmapStep | null = null;

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase();
      if (
        lowerLine.includes("phase 1") ||
        lowerLine.includes("step 1") ||
        lowerLine.includes("stage 1")
      ) {
        if (currentStep) steps.push(currentStep);
        currentStep = { step: "Phase 1", description: line.replace(/^[\d\.\)\-]*/, "").trim(), duration: "2-4 weeks" };
      } else if (
        lowerLine.includes("phase 2") ||
        lowerLine.includes("step 2") ||
        lowerLine.includes("stage 2")
      ) {
        if (currentStep) steps.push(currentStep);
        currentStep = { step: "Phase 2", description: line.replace(/^[\d\.\)\-]*/, "").trim(), duration: "4-6 weeks" };
      } else if (currentStep && line.trim()) {
        currentStep.description += " " + line.trim();
      }
    });

    if (currentStep) steps.push(currentStep);

    if (steps.length === 0) {
      steps.push(
        { step: "Phase 1", description: "Research & Planning", duration: "2 weeks" },
        { step: "Phase 2", description: "Development & Testing", duration: "4 weeks" },
        { step: "Phase 3", description: "Launch & Iterate", duration: "2 weeks" }
      );
    }

    return { steps, videos };
  };

  return (
    <div className={`min-h-screen p-8 ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-[#f0f9ff]'}`}>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-3xl font-bold mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <MapPin className="text-blue-600" />
          AI Roadmap Generator
        </h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          Describe your goal or startup idea, and let AI create your personalized visual roadmap
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`backdrop-blur-xl border rounded-xl p-6 ${
          isDark 
            ? 'bg-slate-800/50 border-slate-700/50' 
            : 'bg-white/40 border-blue-200/30'
        }`}>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            What is your goal or startup idea?
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., I want to become an AI engineer in 6 months..."
            className={`w-full px-4 py-3 backdrop-blur-md border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none ${
              isDark ? 'bg-slate-700/50 border-slate-600/50' : 'bg-white/50 border-blue-200/30'
            }`}
          />
          <button
            onClick={handleGenerateRoadmap}
            disabled={!goal.trim() || isLoading}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating your path...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate My Roadmap
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8 bg-amber-50 border border-amber-200/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-amber-800">
                {retryAfter ? `AI is busy, retrying in ${retryAfter} seconds...` : error}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Skeleton */}
      {isLoading && <PremiumSkeleton />}

      {/* Visual Roadmap with Vertical Timeline */}
      {(roadmap && roadmap.steps.length > 0) || showMockRoadmap ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`backdrop-blur-xl border rounded-2xl p-8 ${
              isDark 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/40 border-blue-200/30'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <Target className="text-blue-600 w-8 h-8" />
              Your AI Learning Journey
              <span className={`text-sm font-normal ml-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {mockRoadmapSteps.length} Steps • 6-12 Months
              </span>
            </h2>

            {/* Vertical Timeline with SVG Connectors */}
            <div className="relative pl-2">
              {mockRoadmapSteps.map((step, index) => (
                <TimelineStep 
                  key={index} 
                  step={step} 
                  index={index} 
                  isDark={isDark}
                />
              ))}
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`backdrop-blur-xl border rounded-xl p-6 ${
              isDark 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/40 border-blue-200/30'
            }`}
          >
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <Lightbulb className="text-yellow-500" />
              Quick Start Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: BookOpen, text: "Start with fundamentals before moving to advanced topics" },
                { icon: Terminal, text: "Practice coding daily - hands-on experience is key" },
                { icon: Database, text: "Join AI communities to stay updated with latest trends" }
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl ${
                    isDark ? 'bg-slate-700/50' : 'bg-blue-50'
                  }`}
                >
                  <tip.icon className={`w-6 h-6 mb-2 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {tip.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}
