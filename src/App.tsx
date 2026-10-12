import { useState, useCallback, useEffect } from 'react';
import Sidebar, { PageType } from './components/Sidebar';
import TopNav from './components/TopNav';
import { ToastContainer, ToastType } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { cn } from './utils/cn';
import Landing from './pages/Landing';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Domains from './pages/Domains';
import SmtpProviders from './pages/SmtpProviders';
import Templates from './pages/Templates';
import Contacts from './pages/Contacts';
import Campaigns from './pages/Campaigns';
import EmailQueue from './pages/EmailQueue';
import EmailLogs from './pages/EmailLogs';
import Analytics from './pages/Analytics';
import ApiKeys from './pages/ApiKeys';
import Webhooks from './pages/Webhooks';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Suppression from './pages/Suppression';
import Unsubscribed from './pages/Unsubscribed';
import Attachments from './pages/Attachments';
import Variables from './pages/Variables';

const PageComponents: Record<PageType, React.ComponentType> = {
  dashboard: Dashboard,
  domains: Domains,
  smtp: SmtpProviders,
  apikeys: ApiKeys,
  templates: Templates,
  variables: Variables,
  contacts: Contacts,
  campaigns: Campaigns,
  queue: EmailQueue,
  logs: EmailLogs,
  analytics: Analytics,
  suppression: Suppression,
  unsubscribed: Unsubscribed,
  attachments: Attachments,
  webhooks: Webhooks,
  settings: Settings,
  profile: Profile,
};

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

function MainAppShell({
  toasts,
  addToast,
  removeToast,
}: {
  toasts: ToastItem[];
  addToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
}) {
  const { currentView } = useAuth();
  const [activePage, setActivePage] = useState<PageType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateNew = () => {
    const actions: Record<PageType, [ToastType, string, string?]> = {
      dashboard: ['info', 'Select a module', 'Navigate to a specific module to create new items'],
      domains: ['info', 'Add Domain', 'Opening domain setup wizard…'],
      smtp: ['info', 'Add SMTP Provider', 'Opening provider configuration…'],
      apikeys: ['info', 'Create API Key', 'Opening key creation dialog…'],
      templates: ['info', 'Create Template', 'Opening template editor…'],
      variables: ['info', 'Add Variable', 'Opening variable creator…'],
      contacts: ['info', 'Add Contact', 'Opening contact form…'],
      campaigns: ['info', 'New Campaign', 'Opening campaign wizard…'],
      queue: ['info', 'Queue', 'The queue is managed automatically'],
      logs: ['info', 'Email Logs', 'Logs are generated automatically when emails are sent'],
      analytics: ['info', 'Analytics', 'Data is collected automatically'],
      suppression: ['info', 'Add to Suppression', 'Opening suppression entry form…'],
      unsubscribed: ['info', 'Unsubscribed List', 'Users are added automatically on opt-out'],
      attachments: ['info', 'Upload File', 'Opening file upload dialog…'],
      webhooks: ['info', 'Create Webhook', 'Opening webhook configuration…'],
      settings: ['success', 'Settings', 'Configure your workspace settings below'],
      profile: ['success', 'Profile', 'Update your profile details below'],
    };
    const [type, title, message] = actions[activePage];
    addToast(type, title, message);
  };

  if (currentView === 'landing') {
    return (
      <>
        <Landing />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  if (currentView === 'login') {
    return (
      <>
        <Login onNotify={addToast} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  const PageComponent = PageComponents[activePage];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#172033] overflow-x-hidden"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setMobileSidebarOpen(false);
        }}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <TopNav
        activePage={activePage}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        onNavigate={(page) => setActivePage(page)}
        onCreateNew={handleCreateNew}
      />

      {/* Main Content */}
      <main
        className={cn(
          'pt-20 min-h-screen transition-all duration-300 pl-0',
          sidebarCollapsed ? 'md:pl-[76px]' : 'md:pl-[280px]'
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <PageComponent />
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AuthProvider>
      <MainAppShell toasts={toasts} addToast={addToast} removeToast={removeToast} />
    </AuthProvider>
  );
}
