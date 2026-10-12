import { useState } from 'react';
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
  success: 'bg-emerald-50 text-[#16A34A]',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-[#DC2626]',
  info: 'bg-[#ECFEFF] text-[#0891B2]',
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
      className="fixed top-0 right-0 h-16 bg-white border-b border-[#E2E8F0] flex items-center gap-3 sm:gap-4 px-4 sm:px-6 z-30 transition-all duration-300 left-0 md:left-[240px]"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F5F3FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Page title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className="text-sm text-[#64748B] hover:text-[#7C3AED] transition-colors hidden sm:inline cursor-pointer"
            title="Go to Landing Page"
          >
            MailFlow
          </button>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-sm font-semibold text-[#172033] truncate max-w-[150px] sm:max-w-none">
            {pageLabels[activePage]}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Public Landing link */}
      <button
        onClick={() => setCurrentView('landing')}
        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors cursor-pointer"
        title="View Public Landing Page"
      >
        <Globe className="w-3.5 h-3.5 text-[#0891B2]" />
        <span>Landing Page</span>
      </button>

      {/* Global Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-[#64748B]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emails, contacts, logs…"
          className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-[#E2E8F0] rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all focus:w-72 text-[#172033] placeholder:text-slate-400"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 cursor-pointer">
            <X className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        )}
      </div>

      {/* Create New */}
      <button
        onClick={onCreateNew}
        className="flex items-center gap-1.5 sm:gap-2 bg-button-gradient hover:opacity-95 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-all shadow-sm shadow-violet-200 whitespace-nowrap cursor-pointer"
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
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F5F3FF] text-[#64748B] hover:text-[#7C3AED] transition-all cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891B2] rounded-full" />
          )}
        </button>

        {showNotif && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]">
              <span className="font-semibold text-[#172033] text-sm">Notifications</span>
              <span className="text-xs text-[#7C3AED] font-medium cursor-pointer hover:underline">
                {unreadCount} unread
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = notifIcon[n.type];
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F5F3FF]/40 transition-colors cursor-pointer ${
                      !n.read ? 'bg-[#F5F3FF]/20' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${notifColors[n.type]}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#172033] leading-snug">{n.message}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-2.5 border-t border-[#E2E8F0]">
              <button className="text-sm text-[#7C3AED] font-medium hover:text-[#6D28D9] transition-colors cursor-pointer">
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
          className="flex items-center gap-2 hover:bg-[#F5F3FF] rounded-lg pl-1.5 pr-2 py-1.5 transition-all cursor-pointer"
          aria-label="User profile menu"
        >
          <div className="w-7 h-7 rounded-full bg-button-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-2xs">
            {displayAvatar}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[#172033] leading-tight">{displayName}</p>
            <p className="text-2xs text-[#64748B] leading-tight">{displayRole}</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden sm:block" />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 overflow-hidden animate-in fade-in duration-100">
            <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <p className="font-semibold text-[#172033] text-sm">{displayName}</p>
              <p className="text-xs text-[#64748B] truncate">{displayEmail}</p>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  onNavigate?.('profile');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#172033] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-[#7C3AED]" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  onNavigate?.('settings');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#172033] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Workspace Settings</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setShowProfile(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2 cursor-pointer font-medium"
              >
                <Globe className="w-4 h-4 text-[#0891B2]" />
                <span>Public Landing Page</span>
              </button>
            </div>

            <div className="border-t border-[#E2E8F0] py-1">
              <button
                onClick={() => {
                  setShowProfile(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-red-50 transition-colors font-medium flex items-center gap-2 cursor-pointer"
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
