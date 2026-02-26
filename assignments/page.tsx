'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clipboard, Upload, Clock, CheckCircle, AlertCircle, X, FileText } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  status: string;
  deadline: string;
  description: string;
  grade?: string;
  submittedDate?: string;
}

// Initial assignments data
const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Business Analytics Case Study',
    subject: 'Business IT',
    status: 'Pending',
    deadline: '2024-02-15T23:59:00',
    description: 'Analyze sales data and create a comprehensive report on business trends.'
  },
  {
    id: 2,
    title: 'Database Design Project',
    subject: 'Computer Science',
    status: 'Pending',
    deadline: '2024-02-10T17:00:00',
    description: 'Design and implement a relational database for a student management system.'
  },
  {
    id: 3,
    title: 'Marketing Strategy Presentation',
    subject: 'Business Administration',
    status: 'Pending',
    deadline: '2024-02-08T12:00:00',
    description: 'Create a marketing strategy presentation for a new product launch.'
  },
  {
    id: 4,
    title: 'Web Development Portfolio',
    subject: 'Web Technologies',
    status: 'Pending',
    deadline: '2024-02-20T23:59:00',
    description: 'Build a personal portfolio website showcasing your projects.'
  }
];

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load submissions from localStorage on mount
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('assignmentSubmissions');
    if (savedSubmissions) {
      const submissions = JSON.parse(savedSubmissions);
      setAssignments(prev => prev.map(assignment => {
        const submission = submissions.find((s: any) => s.id === assignment.id);
        if (submission) {
          return {
            ...assignment,
            status: 'Submitted',
            submittedDate: submission.submittedDate
          };
        }
        return assignment;
      }));
    }
  }, []);

  // Save submissions to localStorage
  const saveToLocalStorage = (updatedAssignments: Assignment[]) => {
    const submissions = updatedAssignments
      .filter(a => a.status === 'Submitted')
      .map(a => ({
        id: a.id,
        submittedDate: a.submittedDate
      }));
    localStorage.setItem('assignmentSubmissions', JSON.stringify(submissions));
  };

  // File Upload State: Handle file upload for assignment
  const handleFileUpload = (assignmentId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.zip';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Uploading file for assignment ${assignmentId}:`, file.name);
        simulateUpload(assignmentId, file.name);
      }
    };
    input.click();
  };

  // Simulate file upload and update status
  const simulateUpload = (assignmentId: number, fileName: string) => {
    setTimeout(() => {
      const submittedDate = new Date().toISOString();
      
      setAssignments(prev => {
        const updated = prev.map(assignment => 
          assignment.id === assignmentId 
            ? { ...assignment, status: 'Submitted', submittedDate }
            : assignment
        );
        saveToLocalStorage(updated);
        return updated;
      });

      setToastMessage(`"${fileName}" submitted successfully!`);
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Submitted': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Graded': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <AlertCircle size={16} />;
      case 'Submitted': return <Clock size={16} />;
      case 'Graded': return <CheckCircle size={16} />;
      default: return null;
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatSubmittedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen">
      {/* Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-4 right-4 z-50 bg-green-500 dark:bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm text-green-100">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-2 hover:bg-white/20 p-1 rounded"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Assignments</h1>
        <p className="text-[var(--text-secondary)]">Track and manage your academic tasks</p>
      </motion.div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{assignment.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    <span>{assignment.status}</span>
                  </span>
                </div>
                <p className="text-[var(--accent-blue)] font-semibold mb-2">{assignment.subject}</p>
                <p className="text-[var(--text-secondary)] mb-4">{assignment.description}</p>
                <div className="flex items-center space-x-2 text-sm text-[var(--text-muted)]">
                  <Clock size={16} />
                  <span>Due: {formatDeadline(assignment.deadline)}</span>
                </div>
                
                {/* Show submitted date if available */}
                {assignment.submittedDate && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-[var(--accent-blue)]">
                    <FileText size={16} />
                    <span>Submitted: {formatSubmittedDate(assignment.submittedDate)}</span>
                  </div>
                )}
                
                {assignment.grade && (
                  <div className="mt-2 text-green-600 dark:text-green-400 font-semibold">
                    Grade: {assignment.grade}
                  </div>
                )}
              </div>
              <div className="ml-4">
                <motion.button
                  onClick={() => handleFileUpload(assignment.id)}
                  disabled={assignment.status === 'Graded'}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    assignment.status === 'Graded'
                      ? 'bg-[var(--bg-tertiary)] cursor-not-allowed text-[var(--text-muted)]'
                      : assignment.status === 'Submitted'
                      ? 'bg-[var(--accent-blue)] hover:opacity-90 text-white'
                      : 'bg-[var(--accent-blue)] hover:opacity-90 text-white'
                  }`}
                  whileHover={assignment.status !== 'Graded' ? { scale: 1.05 } : {}}
                  whileTap={assignment.status !== 'Graded' ? { scale: 0.95 } : {}}
                >
                  <Upload size={16} />
                  <span>
                    {assignment.status === 'Submitted' ? 'Resubmit' : 
                     assignment.status === 'Graded' ? 'Graded' : 'Upload'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
