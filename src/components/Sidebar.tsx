import React, { useEffect } from 'react';
import {
  LayoutDashboard, Globe, Server, Key, FileText, Variable, Users, Megaphone,
  ListOrdered, ScrollText, BarChart3, ShieldOff, UserMinus, Paperclip,
  Webhook, Settings, UserCircle, ChevronLeft, ChevronRight, Mail,
  ChevronDown, ChevronUp, X, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type PageType =
  | 'dashboard' | 'domains' | 'smtp' | 'apikeys' | 'templates' | 'variables'
  | 'contacts' | 'campaigns' | 'queue' | 'logs' | 'analytics' | 'suppression'
  | 'unsubscribed' | 'attachments' | 'webhooks' | 'settings' | 'profile';

interface NavItem {
  id: PageType;
  label: string;
  icon: React.ElementType;
  group?: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Main' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, group: 'Main' },
  { id: 'domains', label: 'Domains', icon: Globe, group: 'Configuration' },
  { id: 'smtp', label: 'SMTP Providers', icon: Server, group: 'Configuration' },
  { id: 'apikeys', label: 'API Keys', icon: Key, group: 'Configuration' },
  { id: 'templates', label: 'Templates', icon: FileText, group: 'Content' },
  { id: 'variables', label: 'Variables', icon: Variable, group: 'Content' },
  { id: 'attachments', label: 'Attachments', icon: Paperclip, group: 'Content' },
  { id: 'contacts', label: 'Contacts', icon: Users, group: 'Audience' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, group: 'Audience' },
  { id: 'suppression', label: 'Suppression List', icon: ShieldOff, group: 'Audience' },
  { id: 'unsubscribed', label: 'Unsubscribed', icon: UserMinus, group: 'Audience' },
  { id: 'queue', label: 'Email Queue', icon: ListOrdered, group: 'Activity', badge: 12 },
  { id: 'logs', label: 'Email Logs', icon: ScrollText, group: 'Activity' },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook, group: 'Activity' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'Account' },
  { id: 'profile', label: 'Profile', icon: UserCircle, group: 'Account' },
];

const groups = ['Main', 'Configuration', 'Content', 'Audience', 'Activity', 'Account'];

interface SidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggle,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set());

  // Listen for Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen && onCloseMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleItemClick = (page: PageType) => {
    onNavigate(page);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop with Blur */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200 cursor-pointer"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Solid White Sidebar */}
      <aside
        role="navigation"
        aria-label="Sidebar Navigation"
        className={`fixed top-0 left-0 h-full bg-white border-r border-[#E2E8F0] flex flex-col z-50 md:z-30 transition-all duration-300 shadow-xl md:shadow-none ${
          mobileOpen
            ? 'translate-x-0 w-[300px] max-w-[85vw]'
            : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-[76px]' : 'md:w-[280px]'}`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Logo Header - Height matched with TopNav */}
          <div className="h-20 flex items-center justify-between px-5 border-b border-[#E2E8F0] flex-shrink-0 bg-white">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Mail className="w-4 h-4 text-white" />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#172033] text-lg whitespace-nowrap tracking-tight">
                    Mail<span className="text-[#7C3AED]">Flow</span>
                  </span>
                  <span className="text-3xs font-semibold px-1.5 py-0.5 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">
                    v2.4
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            {mobileOpen && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F5F3FF] transition-colors cursor-pointer"
                aria-label="Close sidebar navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Scrollable Body */}
          <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin">
            {groups.map((group, groupIdx) => {
              const items = navItems.filter((i) => i.group === group);
              const isGroupCollapsed = collapsedGroups.has(group);
              const showGroupHeader = !collapsed || mobileOpen;

              return (
                <div key={group} className="mb-2">
                  {/* Category Header in Expanded View */}
                  {showGroupHeader && (
                    <button
                      onClick={() => toggleGroup(group)}
                      className="flex items-center justify-between w-full px-3 py-1.5 text-2xs font-bold text-[#64748B] uppercase tracking-wider hover:text-[#7C3AED] transition-colors cursor-pointer rounded-md"
                    >
                      <span>{group}</span>
                      {isGroupCollapsed ? (
                        <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                      ) : (
                        <ChevronUp className="w-3 h-3 text-[#94A3B8]" />
                      )}
                    </button>
                  )}

                  {/* Divider in Collapsed Desktop View */}
                  {collapsed && !mobileOpen && groupIdx > 0 && (
                    <div className="my-2 mx-2 border-t border-[#E2E8F0]" />
                  )}

                  {/* Group Items */}
                  {!isGroupCollapsed && (
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;
                        const isExpandedView = !collapsed || mobileOpen;

                        return (
                          <div key={item.id} className="relative group">
                            <button
                              onClick={() => handleItemClick(item.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                                isActive
                                  ? 'bg-[#7C3AED] text-white shadow-2xs'
                                  : 'text-[#475569] hover:bg-[#F5F3FF] hover:text-[#6D28D9]'
                              }`}
                            >
                              <Icon
                                className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${
                                  isActive
                                    ? 'text-white'
                                    : 'text-[#7C3AED] group-hover:text-[#6D28D9]'
                                }`}
                                style={{ width: '18px', height: '18px' }}
                              />

                              {isExpandedView && (
                                <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                              )}

                              {isExpandedView && item.badge && (
                                <span
                                  className={`ml-auto text-2xs font-semibold px-1.5 py-0.5 rounded-full ${
                                    isActive
                                      ? 'bg-white/20 text-white'
                                      : 'bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}

                              {!isExpandedView && item.badge && (
                                <span
                                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                                    isActive ? 'bg-white' : 'bg-[#0891B2]'
                                  }`}
                                />
                              )}
                            </button>

                            {/* Floating Tooltip in Collapsed Desktop View */}
                            {collapsed && !mobileOpen && (
                              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-[#172033] text-white text-xs font-medium rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 pointer-events-none whitespace-nowrap flex items-center gap-2">
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="bg-[#7C3AED] text-white text-2xs px-1.5 py-0.2 rounded-full font-bold">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer Info & Desktop Collapse Toggle */}
          <div className="p-3 border-t border-[#E2E8F0] flex-shrink-0 bg-white space-y-2">

            {/* Mobile Drawer User Card */}
            {mobileOpen && user && (
              <div className="p-2.5 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user.avatar || 'JD'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#172033] truncate">{user.name}</p>
                    <p className="text-3xs text-[#64748B] truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (onCloseMobile) onCloseMobile();
                    logout();
                  }}
                  className="p-1.5 text-[#DC2626] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggle}
              className="w-full hidden md:flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-[#475569] hover:bg-[#F5F3FF] hover:text-[#7C3AED] transition-all cursor-pointer font-medium"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {!collapsed && <span className="text-xs">Collapse Sidebar</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
