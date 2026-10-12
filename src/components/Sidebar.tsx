import React from 'react';
import {
  LayoutDashboard, Globe, Server, Key, FileText, Variable, Users, Megaphone,
  ListOrdered, ScrollText, BarChart3, ShieldOff, UserMinus, Paperclip,
  Webhook, Settings, UserCircle, ChevronLeft, ChevronRight, Mail,
  ChevronDown, ChevronUp, X
} from 'lucide-react';

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
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set());

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
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          width: collapsed ? '68px' : '240px',
        }}
      >
        {/* Logo & Mobile Close */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-100">
              <Mail className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-gray-900 text-lg whitespace-nowrap">
                Mail<span className="text-indigo-600">Flow</span>
              </span>
            )}
          </div>

          {/* Close button on mobile */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin">
          {groups.map((group) => {
            const items = navItems.filter((i) => i.group === group);
            const isGroupCollapsed = collapsedGroups.has(group);
            return (
              <div key={group} className="mb-1">
                {!collapsed && (
                  <button
                    onClick={() => toggleGroup(group)}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                  >
                    <span>{group}</span>
                    {isGroupCollapsed ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronUp className="w-3 h-3" />
                    )}
                  </button>
                )}
                {!isGroupCollapsed && (
                  <div className="space-y-0.5">
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          title={collapsed ? item.label : undefined}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon
                            className={`w-4.5 h-4.5 flex-shrink-0 ${
                              isActive
                                ? 'text-indigo-600'
                                : 'text-gray-500 group-hover:text-gray-700'
                            }`}
                            style={{ width: '18px', height: '18px' }}
                          />
                          {!collapsed && (
                            <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                          )}
                          {!collapsed && item.badge && (
                            <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {collapsed && item.badge && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
                          )}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-r" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Collapse toggle */}
        <div className="p-3 border-t border-gray-100 flex-shrink-0 hidden md:block">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
