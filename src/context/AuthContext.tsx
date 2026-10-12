import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  company?: string;
}

export type ViewType = 'landing' | 'login' | 'app';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; password: string; company?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_USER: User = {
  id: 'usr_01h92k4j5',
  name: 'John Doe',
  email: 'john@acme.com',
  role: 'Administrator',
  avatar: 'JD',
  company: 'Acme Mail Tech',
};

const STORAGE_KEY = 'mailflow_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentViewInternal] = useState<ViewType>('landing');

  // Sync with URL hash and localStorage on initial mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
        if (hash === 'landing') {
          setCurrentViewInternal('landing');
        } else if (hash === 'login') {
          setCurrentViewInternal('login');
        } else {
          setCurrentViewInternal('app');
        }
      } else {
        if (hash === 'login') {
          setCurrentViewInternal('login');
        } else if (hash === 'app' || hash === 'dashboard') {
          setCurrentViewInternal('login');
        } else {
          setCurrentViewInternal('landing');
        }
      }
    } catch {
      setCurrentViewInternal('landing');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setCurrentView = useCallback((view: ViewType) => {
    setCurrentViewInternal(view);
    if (view === 'app') {
      window.location.hash = 'app';
    } else if (view === 'login') {
      window.location.hash = 'login';
    } else {
      window.location.hash = 'landing';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback(
    async (email: string, password: string, remember: boolean = true): Promise<{ success: boolean; error?: string }> => {
      // Simulate real auth network latency
      await new Promise((resolve) => setTimeout(resolve, 500));

      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !password) {
        return { success: false, error: 'Email and password are required.' };
      }

      // Basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      if (password.length < 5) {
        return { success: false, error: 'Password must be at least 5 characters.' };
      }

      // Allow any valid password for john@acme.com or generate matching user profile
      const loggedUser: User = {
        id: trimmedEmail === DEFAULT_USER.email ? DEFAULT_USER.id : `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: trimmedEmail === DEFAULT_USER.email ? DEFAULT_USER.name : trimmedEmail.split('@')[0].replace('.', ' '),
        email: trimmedEmail,
        role: trimmedEmail === DEFAULT_USER.email ? 'Administrator' : 'Workspace Member',
        avatar: (trimmedEmail === DEFAULT_USER.email ? 'JD' : trimmedEmail.slice(0, 2).toUpperCase()),
        company: 'Acme Mail Tech',
      };

      setUser(loggedUser);
      if (remember) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
      }

      setCurrentView('app');
      return { success: true };
    },
    [setCurrentView]
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string; company?: string }): Promise<{ success: boolean; error?: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const trimmedEmail = data.email.trim().toLowerCase();
      const initials = data.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'MF';

      const newUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: data.name.trim(),
        email: trimmedEmail,
        role: 'Workspace Owner',
        avatar: initials,
        company: data.company?.trim() || 'Organization',
      };

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setCurrentView('app');
      return { success: true };
    },
    [setCurrentView]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setCurrentView('landing');
  }, [setCurrentView]);

  const requestPasswordReset = useCallback(async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    return {
      success: true,
      message: `Password reset instructions have been sent to ${trimmed}. Please check your inbox.`,
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        currentView,
        setCurrentView,
        login,
        register,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
