'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Star, Loader2, X, Sparkles, PartyPopper, MessageCircle, ThumbsUp } from 'lucide-react';

// Mock messages data
interface Message {
  id: number;
  type: 'interview_request' | 'feedback' | 'offer';
  company: string;
  companyLogo: string;
  title: string;
  message: string;
  messageMy: string;
  timestamp: string;
  read: boolean;
  status: 'pending' | 'accepted' | 'rejected' | 'offer' | 'hired' | 'negotiating';
  interviewDate?: string;
  position: string;
  salary?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'interview_request',
    company: 'KBZ Bank',
    companyLogo: 'KBZ',
    title: 'Interview Request - Data Scientist Position',
    message: 'We have reviewed your AI Portfolio and would like to invite you for an interview.',
    messageMy: 'ကျွန်ုပ်တို့သည်သင်၏ AI Portfolio ကို စစ်ဆေးပါပါး။ အင်တာဗျူးအတွက် ဖိတ်ကြားလိုပါပါး။',
    timestamp: '2 hours ago',
    read: false,
    status: 'pending',
    interviewDate: 'December 15, 2024',
    position: 'Data Scientist'
  },
  {
    id: 2,
    type: 'feedback',
    company: 'Wave Money',
    companyLogo: 'WM',
    title: 'Interview Feedback - Software Engineer',
    message: 'Thank you for your interest in Wave Money. While we have moved forward with other candidates.',
    messageMy: 'Wave Money မှာစိတ်ဝင်းစားတဲ့အတွက် ကေးဇူးတင်ပါပါး။',
    timestamp: '1 day ago',
    read: true,
    status: 'rejected',
    position: 'Software Engineer'
  },
  {
    id: 3,
    type: 'offer',
    company: 'NexLabs',
    companyLogo: 'NL',
    title: 'Job Offer - Junior Data Analyst',
    message: 'Congratulations! We are pleased to offer you the position of Junior Data Analyst at NexLabs.',
    messageMy: 'ဂုဏ်ယူပါပါး! သင်သည် NexLabs မှာ Junior Data Analyst ရာထူးနှင့်ပါဝင်ပါပါး။',
    timestamp: '3 days ago',
    read: true,
    status: 'offer',
    position: 'Junior Data Analyst',
    salary: '800,000 MMK/month'
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
  const [language, setLanguage] = useState<'en' | 'my'>('en');
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const unreadCount = messages.filter(m => !m.read).length;

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleAcceptInterview = async (message: Message) => {
    setLoadingId(message.id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, status: 'accepted' as const } : m
    ));
    if (selectedMessage?.id === message.id) {
      setSelectedMessage({ ...selectedMessage, status: 'accepted' });
    }
    setLoadingId(null);
    showSuccessToast('Interview Confirmed!');
  };

  const handleAcceptOffer = async (message: Message) => {
    setLoadingId(message.id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, status: 'hired' as const } : m
    ));
    if (selectedMessage?.id === message.id) {
      setSelectedMessage({ ...selectedMessage, status: 'hired' });
    }
    setLoadingId(null);
    showSuccessToast('Congratulations! You have officially joined ' + message.company);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'accepted': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'hired': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'negotiating': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'offer': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'hired': return 'Hired';
      case 'negotiating': return 'Negotiating';
      case 'offer': return 'Offer';
      case 'rejected': return 'Not Selected';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <CheckCircle size={20} />
            <span>{toastMessage}</span>
            <button onClick={() => setShowToast(false)} className="ml-2 hover:bg-white/20 p-1 rounded">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Inbox</h1>
              <p className="text-[var(--text-secondary)] mt-1">
                You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="bg-[var(--bg-tertiary)] rounded-lg p-1 flex">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm ${language === 'en' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-secondary)]'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('my')}
                className={`px-3 py-1 rounded text-sm ${language === 'my' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-secondary)]'}`}
              >
                မြန်မာ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Messages</h2>
            <div className="space-y-2">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedMessage?.id === msg.id 
                      ? 'bg-[var(--bg-tertiary)] border border-[var(--accent-cyan)]/30' 
                      : 'hover:bg-[var(--bg-tertiary)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-xs font-bold text-[var(--accent-blue)]">
                        {msg.companyLogo}
                      </div>
                      <span className="font-medium text-sm text-[var(--text-primary)]">{msg.company}</span>
                    </div>
                  </div>
                  <p className={`text-sm truncate ${!msg.read ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>
                    {msg.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-[var(--text-muted)]">{msg.timestamp}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(msg.status)}`}>
                      {getStatusText(msg.status)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="md:col-span-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6">
            {selectedMessage ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-lg font-bold text-[var(--accent-blue)]">
                      {selectedMessage.companyLogo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{selectedMessage.company}</h3>
                      <p className="text-[var(--text-secondary)] text-sm">{selectedMessage.position}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusText(selectedMessage.status)}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{selectedMessage.title}</h4>
                <div className="bg-[var(--bg-tertiary)] rounded-lg p-4 mb-4">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {language === 'en' ? selectedMessage.message : selectedMessage.messageMy}
                  </p>
                </div>

                {/* Pending Interview Date */}
                {selectedMessage.status === 'pending' && selectedMessage.interviewDate && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 text-yellow-700 dark:text-yellow-400 mb-2">
                      <Clock size={18} />
                      <span className="font-medium">Interview Date</span>
                    </div>
                    <p className="text-[var(--text-primary)]">{selectedMessage.interviewDate}</p>
                  </div>
                )}

                {/* Offer with Salary */}
                {selectedMessage.status === 'offer' && selectedMessage.salary && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-400 mb-2">
                      <Star size={18} />
                      <span className="font-medium">Salary Offer</span>
                    </div>
                    <p className="text-[var(--text-primary)]">{selectedMessage.salary}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedMessage.status === 'pending' && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => handleAcceptInterview(selectedMessage)}
                      disabled={loadingId === selectedMessage.id}
                      className="flex items-center space-x-2 px-4 py-2 bg-[var(--accent-blue)] hover:opacity-90 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loadingId === selectedMessage.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                      <span>Accept Interview</span>
                    </button>
                  </div>
                )}

                {selectedMessage.status === 'offer' && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => handleAcceptOffer(selectedMessage)}
                      disabled={loadingId === selectedMessage.id}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loadingId === selectedMessage.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <ThumbsUp size={18} />
                      )}
                      <span>Accept Offer</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
