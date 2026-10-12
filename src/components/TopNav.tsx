import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Plus, X, Check, AlertTriangle, Info, Menu, Globe, LogOut, User } from 'lucide-react';
import { PageType } from './Sidebar';
import { useAuth } from '../context/AuthContext';

interface TopNavProps {
  activePage: PageType;
  sidebarCollapsed: boolean;
  onToggleSidebar?: () => void;
  onNavigate?: (page: PageType) => void;
  onCreateNew?: () => void;
}

const pageLabels: Record<PageType, string> = {
  dashboard: 'Dashboard',
  domains: 'Domains',
  smtp: 'SMTP Providers',
  apikeys: 'API Keys',
  templates: 'Email Templates',
  variables: 'Variables',
  contacts: 'Contacts',
  campaigns: 'Campaigns',
  queue: 'Email Queue',
  logs: 'Email Logs',
  analytics: 'Analytics',
  suppression: 'Suppression List',
  unsubscribed: 'Unsubscribed',
  attachments: 'Attachments',
  webhooks: 'Webhooks',
  settings: 'Settings',
  profile: 'Profile',
};

const notifications = [
  { id: 1, type: 'success', message: 'Domain mail.acme.com verified successfully', time: '2m ago', read: false },
  { id: 2, type: 'warning', message: 'API Key "CI/CD Pipeline" expires in 45 days', time: '1h ago', read: false },
  { id: 3, type: 'error', message: '124 emails failed in last hour on Brevo', time: '2h ago', read: false },
  { id: 4, type: 'info', message: 'Campaign "January Newsletter" scheduled for Jan 15', time: '3h ago', read: true },
  { id: 5, type: 'success', message: 'SMTP connection to SendGrid restored', time: '5h ago', read: true },
];

const notifIcon: Record<string, React.ElementType> = {
  success: Check,
  warning: AlertTriangle,
  error: X,
  info: Info,
};

const notifColors: Record<string, string> = {
  success: 'bg-green-100 text-green-600',
  warning: 'bg-amber-100 text-amber-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

export default function TopNav({
  activePage,
  sidebarCollapsed: _sidebarCollapsed,
  onToggleSidebar,
  onNavigate,
  onCreateNew,
}: TopNavProps) {
  const { user, logout, setCurrentView } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayName = user?.name || 'John Doe';
  const displayEmail = user?.email || 'john@acme.com';
  const displayAvatar = user?.avatar || 'JD';
  const displayRole = user?.role || 'Admin';

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center gap-3 sm:gap-4 px-4 sm:px-6 z-30 transition-all duration-300 left-0 md:left-[240px]"
      style={{
        left: undefined, // Let CSS handle mobile vs desktop
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Page title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className="text-sm text-gray-400 hover:text-indigo-600 transition-colors hidden sm:inline"
            title="Go to Landing Page"
          >
            MailFlow
          </button>
          <span className="text-gray-300 hidden sm:inline">/</span>
          <span className="text-sm font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-none">
            {pageLabels[activePage]}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Public Landing link */}
      <button
        onClick={() => setCurrentView('landing')}
        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-colors"
        title="View Public Landing Page"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-500" />
        <span>Landing Page</span>
      </button>

      {/* Global Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emails, contacts, logs…"
          className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all focus:w-72"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Create New */}
      <button
        onClick={onCreateNew}
        className="flex items-center gap-1.5 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-all shadow-sm shadow-indigo-200 whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Create New</span>
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotif(!showNotif);
            setShowProfile(false);
          }}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        {showNotif && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-semibold text-gray-800 text-sm">Notifications</span>
              <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">
                {unreadCount} unread
              </span>
            </div>
            <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = notifIcon[n.type];
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !n.read ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${notifColors[n.type]}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100">
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotif(false);
          }}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-lg pl-1.5 pr-2 py-1.5 transition-all"
          aria-label="User profile menu"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {displayAvatar}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-tight">{displayName}</p>
            <p className="text-2xs text-gray-400 leading-tight">{displayRole}</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden animate-in fade-in duration-100">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <p className="font-semibold text-gray-800 text-sm">{displayName}</p>
              <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  onNavigate?.('profile');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  onNavigate?.('settings');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span>Workspace Settings</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Public Landing Page</span>
              </button>
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  setShowProfile(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdowns */}
      {(showNotif || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotif(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
}
