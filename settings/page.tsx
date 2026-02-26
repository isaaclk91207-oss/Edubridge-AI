'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Save } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: 'Demo',
    lastName: 'Student',
    email: 'student@demo.com',
    major: 'Business Administration',
    studentType: 'Public'
  });

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignmentReminders: true,
    communityMessages: false,
    marketingEmails: false
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password updated');
    setPassword({ current: '', new: '', confirm: '' });
  };

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Settings</h1>
        <p className="text-[var(--text-secondary)]">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <motion.div
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <User className="text-[var(--accent-blue)]" size={24} />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Profile Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Major</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Student Type</label>
              <select
                value={profile.studentType}
                onChange={(e) => setProfile(prev => ({ ...prev, studentType: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--accent-blue)] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>Save Profile</span>
            </button>
          </form>
        </motion.div>

        {/* Password Settings */}
        <motion.div
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="text-[var(--accent-blue)]" size={24} />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] text-[var(--text-primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--accent-blue)] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Lock size={18} />
              <span>Update Password</span>
            </button>
          </form>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="text-[var(--accent-blue)]" size={24} />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Course Updates</h3>
                <p className="text-sm text-[var(--text-secondary)]">Get notified about course progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.courseUpdates}
                  onChange={(e) => handleNotificationUpdate('courseUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Assignment Reminders</h3>
                <p className="text-sm text-[var(--text-secondary)]">Receive reminders for assignments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.assignmentReminders}
                  onChange={(e) => handleNotificationUpdate('assignmentReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Community Messages</h3>
                <p className="text-sm text-[var(--text-secondary)]">Notifications for discussions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.communityMessages}
                  onChange={(e) => handleNotificationUpdate('communityMessages', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Marketing Emails</h3>
                <p className="text-sm text-[var(--text-secondary)]">Updates about new features</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketingEmails}
                  onChange={(e) => handleNotificationUpdate('marketingEmails', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)]"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm rounded-xl p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="text-[var(--accent-blue)]" size={24} />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-[var(--accent-blue)] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-colors">
              Download My Data
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
