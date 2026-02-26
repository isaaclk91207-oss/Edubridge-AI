"use client";

import { useState, useEffect } from "react";
import { Search, User, ExternalLink, X, MapPin, Clock, Briefcase, Star, Mail, Loader2, Github, Linkedin, Twitter } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Candidate {
  id: number;
  name: string;
  role: string;
  skills: string[];
  match_score: number;
  experience?: string;
  summary?: string;
  location?: string;
}

export default function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      setIsLoading(true);
      setError(null);

      try {
        if (!supabase) {
          throw new Error("Supabase client not initialized");
        }

        const { data, error: supabaseError } = await supabase
          .from("candidates")
          .select("*")
          .order("match_score", { ascending: false });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        const candidatesData = data || [];
        
        const transformed = candidatesData.map((c) => ({
          ...c,
          skills: typeof c.skills === "string" 
            ? c.skills.split(",").map((s: string) => s.trim())
            : c.skills || []
        }));
        
        setCandidates(transformed);
        setFilteredCandidates(transformed);
      } catch (err: any) {
        console.error("Error fetching candidates:", err);
        setError(err.message || "Failed to load candidates");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCandidates(candidates);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = candidates.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(query) ||
          candidate.role?.toLowerCase().includes(query) ||
          candidate.skills?.some((skill) => skill.toLowerCase().includes(query))
      );
      setFilteredCandidates(filtered);
    }
  }, [searchQuery, candidates]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-700 border border-green-200";
    if (score >= 80) return "bg-blue-100 text-blue-700 border border-blue-200";
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  const handleViewPortfolio = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  const handleHire = (candidate: Candidate) => {
    console.log("Hire clicked for:", candidate.name);
    alert(`Hire request sent for ${candidate.name}!`);
  };

  const handleContact = (candidate: Candidate) => {
    console.log("Contact clicked for:", candidate.name);
    alert(`Contact request sent to ${candidate.name}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-slate-800">AI Portfolios</h1>
          <p className="text-slate-500">Browse candidates from AI-generated portfolios</p>
        </div>
        
        {/* Social Media Links */}
        <div className="flex gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Github className="w-5 h-5 text-blue-600" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Linkedin className="w-5 h-5 text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Twitter className="w-5 h-5 text-blue-600" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, role or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-blue-100 rounded-xl py-3 pl-12 pr-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-2" />
            <span className="text-slate-500">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="max-w-7xl mx-auto mb-4">
            <p className="text-slate-500 text-sm">Showing {filteredCandidates.length} candidates</p>
          </div>

          {/* Candidate Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white border border-blue-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-700">{candidate.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(candidate.match_score)}`}>
                    {candidate.match_score}%
                  </span>
                </div>

                <p className="text-slate-500 text-sm mb-3">{candidate.role}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {(candidate.skills || []).map((skill, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => handleViewPortfolio(candidate)}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  View Portfolio
                  <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="max-w-7xl mx-auto bg-white border border-blue-100 rounded-lg p-8 text-center">
              <p className="text-slate-500">
                {searchQuery ? "No candidates match your search." : "No candidates available."}
              </p>
            </div>
          )}
        </>
      )}

      {/* Modal for Candidate Details */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white border border-blue-100 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-2xl">
              <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30">
                <X size={18} className="text-white" />
              </button>
            </div>
            <div className="px-6 pb-6 -mt-12">
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center border-4 border-white shadow-md">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mt-3">{selectedCandidate.name}</h2>
              <p className="text-blue-600 font-medium">{selectedCandidate.role}</p>
              <span className={`inline-block px-3 py-1 rounded text-sm font-medium mt-2 ${getScoreColor(selectedCandidate.match_score)}`}>
                {selectedCandidate.match_score}% Match
              </span>

              <div className="mt-5 space-y-3">
                <div className="flex gap-4 text-slate-500 text-sm">
                  {selectedCandidate.location && (
                    <span className="flex items-center gap-1"><MapPin size={14} /> {selectedCandidate.location}</span>
                  )}
                  {selectedCandidate.experience && (
                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedCandidate.experience}</span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {(selectedCandidate.skills || []).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-2">About</h4>
                  <p className="text-slate-600 text-sm bg-blue-50 p-3 rounded-lg">
                    {selectedCandidate.summary || "No summary available."}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={() => handleContact(selectedCandidate)} className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                    <Mail size={16} /> Contact
                  </button>
                  <button onClick={() => handleHire(selectedCandidate)} className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                    <Briefcase size={16} /> Hire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
