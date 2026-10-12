import { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, ChevronDown, Plus, X, Check, AlertTriangle, Info,
  Menu, Globe, LogOut, User, CheckCheck, Radio
} from 'lucide-react';
import { PageType } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

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

interface NotificationItem {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  { id: 1, type: 'success', message: 'Domain mail.acme.com verified successfully', time: '2m ago', read: false },
  { id: 2, type: 'warning', message: 'API Key "CI/CD Pipeline" expires in 45 days', time: '1h ago', read: false },
  { id: 3, type: 'error', message: '124 emails failed on Brevo; failover rerouted to SendGrid', time: '2h ago', read: false },
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
  sidebarCollapsed,
  onToggleSidebar,
  onNavigate,
  onCreateNew,
}: TopNavProps) {
  const { user, logout, setCurrentView } = useAuth();
  const [notifs, setNotifs] = useState<NotificationItem[]>(initialNotifications);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filteredNotifs = notifFilter === 'unread' ? notifs.filter((n) => !n.read) : notifs;

  const displayName = user?.name || 'John Doe';
  const displayEmail = user?.email || 'john@acme.com';
  const displayAvatar = user?.avatar || 'JD';
  const displayRole = user?.role || 'Administrator';

  // Auto focus mobile search when opened
  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleAsRead = (id: number) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-20 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-8 z-30 transition-all duration-300 left-0 shadow-2xs',
        sidebarCollapsed ? 'md:left-[76px]' : 'md:left-[280px]'
      )}
    >
      {/* Mobile Search Overlay Bar */}
      {mobileSearchOpen ? (
        <div className="flex-1 flex items-center gap-2 animate-in fade-in duration-150">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#7C3AED]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains, logs, templates…"
              className="w-full pl-9 pr-9 py-2 text-sm bg-[#F8FAFC] border border-[#DDD6FE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-[#172033]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-[#64748B] hover:text-[#172033] cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="p-2 text-sm font-medium text-[#64748B] hover:text-[#172033] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* Left Side: Hamburger & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F5F3FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5 text-[#172033]" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#7C3AED] transition-colors hidden sm:inline cursor-pointer"
                title="Return to Public Landing Page"
              >
                MailFlow
              </button>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="text-xs sm:text-sm font-bold text-[#172033] truncate bg-[#F5F3FF] text-[#7C3AED] px-2.5 py-1 rounded-md border border-[#DDD6FE]">
                {pageLabels[activePage]}
              </span>
            </div>

            {/* Hot-Standby Indicator on Desktop */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFEFF] border border-[#A5F3FC] text-3xs font-medium text-[#0891B2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] animate-pulse" />
              <span>Failover Ready</span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="md:hidden p-2 text-[#64748B] hover:text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors cursor-pointer"
              aria-label="Open search input"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Desktop Search Input with Shortcut Hint */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources…"
                className="pl-9 pr-14 py-1.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg w-44 lg:w-64 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:bg-white transition-all text-[#172033] placeholder:text-slate-400"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-0.5 text-[#64748B] hover:text-[#172033] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="absolute right-2.5 text-3xs bg-white border border-[#E2E8F0] text-[#64748B] px-1.5 py-0.5 rounded shadow-2xs font-mono pointer-events-none">
                  /
                </kbd>
              )}
            </div>

            {/* Public Landing Shortcut Link */}
            <button
              onClick={() => setCurrentView('landing')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#7C3AED] hover:bg-[#F5F3FF] rounded-lg transition-colors cursor-pointer"
              title="View Public Landing Page"
            >
              <Globe className="w-3.5 h-3.5 text-[#0891B2]" />
              <span>Landing</span>
            </button>

            {/* Create New Solid Button */}
            <button
              onClick={onCreateNew}
              className="flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Create New Resource"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Create New</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotif(!showNotif);
                  setShowProfile(false);
                }}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F5F3FF] text-[#64748B] hover:text-[#7C3AED] transition-all cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891B2] rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotif && (
                <div className="absolute right-[-45px] sm:right-0 top-16 w-[calc(100vw-24px)] sm:w-84 max-w-sm bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 animate-in fade-in duration-100 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] bg-white">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-2xs bg-[#ECFEFF] text-[#0891B2] font-bold px-1.5 py-0.5 rounded-full border border-[#A5F3FC]">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  {/* Filter tabs */}
                  <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 pt-1 text-xs">
                    <button
                      onClick={() => setNotifFilter('all')}
                      className={`px-3 py-1.5 font-medium border-b-2 cursor-pointer transition-colors ${
                        notifFilter === 'all'
                          ? 'border-[#7C3AED] text-[#7C3AED]'
                          : 'border-transparent text-[#64748B] hover:text-[#172033]'
                      }`}
                    >
                      All ({notifs.length})
                    </button>
                    <button
                      onClick={() => setNotifFilter('unread')}
                      className={`px-3 py-1.5 font-medium border-b-2 cursor-pointer transition-colors ${
                        notifFilter === 'unread'
                          ? 'border-[#7C3AED] text-[#7C3AED]'
                          : 'border-transparent text-[#64748B] hover:text-[#172033]'
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>

                  {/* Notification items list */}
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {filteredNotifs.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#64748B]">
                        No notifications to display.
                      </div>
                    ) : (
                      filteredNotifs.map((n) => {
                        const Icon = notifIcon[n.type];
                        return (
                          <div
                            key={n.id}
                            onClick={() => markSingleAsRead(n.id)}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F5F3FF]/40 transition-colors cursor-pointer ${
                              !n.read ? 'bg-[#F5F3FF]/25' : ''
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${notifColors[n.type]}`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-[#172033] leading-snug">{n.message}</p>
                              <p className="text-3xs text-[#64748B] mt-0.5">{n.time}</p>
                            </div>
                            {!n.read && (
                              <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
                    <span className="text-2xs text-[#64748B]">
                      Real-time alerts via automated failover monitor
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotif(false);
                }}
                className="flex items-center gap-2 hover:bg-[#F5F3FF] rounded-lg p-1 sm:pl-1.5 sm:pr-2 sm:py-1.5 transition-all cursor-pointer"
                aria-label="Open user profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-2xs">
                  {displayAvatar}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-[#172033] leading-tight truncate max-w-[120px]">{displayName}</p>
                  <p className="text-3xs text-[#64748B] leading-tight truncate max-w-[120px]">{displayRole}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden md:block" />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-16 w-[calc(100vw-32px)] sm:w-60 max-w-xs bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 overflow-hidden animate-in fade-in duration-100">
                  <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <p className="font-bold text-[#172033] text-sm truncate">{displayName}</p>
                    <p className="text-xs text-[#64748B] truncate">{displayEmail}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-3xs text-[#0891B2] font-semibold">
                      <Radio className="w-3 h-3 text-[#0891B2]" />
                      <span>{user?.company || 'Acme Mail Tech'}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate?.('profile');
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-[#172033] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#7C3AED]" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate?.('settings');
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-[#172033] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <span className="w-4 h-4 flex items-center justify-center font-bold text-xs text-[#7C3AED]">⚙</span>
                      <span>Workspace Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('landing');
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-[#7C3AED] hover:bg-[#F5F3FF] transition-colors flex items-center gap-2.5 cursor-pointer font-medium"
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
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-[#DC2626] hover:bg-red-50 transition-colors font-medium flex items-center gap-2.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

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
