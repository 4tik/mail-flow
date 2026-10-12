import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Building, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

interface LoginProps {
  onNotify?: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export default function Login({ onNotify }: LoginProps) {
  const { login, register, requestPasswordReset, setCurrentView } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = 'Work email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@company.com).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 5) {
      errs.password = 'Password must be at least 5 characters.';
    }

    if (mode === 'register') {
      if (!name.trim()) {
        errs.name = 'Full name is required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password, rememberMe);
        if (!res.success) {
          setServerError(res.error || 'Invalid credentials.');
          onNotify?.('error', 'Authentication Failed', res.error || 'Please check your email and password.');
        } else {
          onNotify?.('success', 'Welcome Back', 'Successfully signed in to MailFlow.');
        }
      } else {
        const res = await register({ name, email, password, company });
        if (!res.success) {
          setServerError(res.error || 'Failed to create account.');
          onNotify?.('error', 'Registration Failed', res.error);
        } else {
          onNotify?.('success', 'Account Created', `Welcome to MailFlow, ${name}!`);
        }
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrefillDemo = () => {
    setEmail('john@acme.com');
    setPassword('demo12345');
    setErrors({});
    setServerError(null);
    onNotify?.('info', 'Demo Credentials Applied', 'Click "Sign In to MailFlow" to access John Doe’s workspace.');
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccessMessage(null);

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }

    setForgotLoading(true);
    const res = await requestPasswordReset(forgotEmail);
    setForgotLoading(false);

    if (res.success) {
      setForgotSuccessMessage(res.message);
      onNotify?.('success', 'Reset Link Dispatched', res.message);
    } else {
      setForgotError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col justify-between selection:bg-[#F5F3FF] selection:text-[#7C3AED]">
      {/* Top Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#172033] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-button-gradient flex items-center justify-center text-white shadow-sm shadow-violet-200">
            <Mail className="w-4 h-4" />
          </div>
          <span className="font-bold text-[#172033] text-lg tracking-tight">
            Mail<span className="text-[#7C3AED]">Flow</span>
          </span>
        </div>

        <div className="text-xs text-[#64748B] hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>Relay Engines Operational</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Clean White Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl shadow-slate-200/50 p-6 sm:p-8 transition-all">
            {/* Header info */}
            <div className="text-center space-y-1.5 mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
                {mode === 'login' ? 'Sign in to MailFlow' : 'Create your account'}
              </h1>
              <p className="text-sm text-[#64748B]">
                {mode === 'login'
                  ? 'Access your email infrastructure, queues & campaigns'
                  : 'Start relaying high-deliverability emails in minutes'}
              </p>
            </div>

            {/* Quick Demo Fill Helper Banner (When in login mode) with subtle cyan highlight */}
            {mode === 'login' && (
              <div className="mb-5 p-3 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-between text-xs text-[#172033]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                  <span>
                    Testing? Use <strong>john@acme.com</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrefillDemo}
                  className="font-semibold text-[#0891B2] hover:text-[#0E7490] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Quick Fill
                </button>
              </div>
            )}

            {/* Server Error Alert */}
            {serverError && (
              <div
                className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
                role="alert"
              >
                <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-1.5 flex-shrink-0" />
                <span className="flex-1 leading-snug">{serverError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {mode === 'register' && (
                <>
                  <Input
                    label="Full Name"
                    required
                    placeholder="Sarah Connor"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    error={errors.name}
                    leftIcon={<UserIcon className="w-4 h-4 text-[#7C3AED]" />}
                    autoComplete="name"
                    disabled={isLoading}
                  />

                  <Input
                    label="Company Name"
                    placeholder="Acme Global Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    leftIcon={<Building className="w-4 h-4 text-[#0891B2]" />}
                    autoComplete="organization"
                    disabled={isLoading}
                  />
                </>
              )}

              <Input
                label="Work Email Address"
                required
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4 text-[#7C3AED]" />}
                autoComplete="email"
                disabled={isLoading}
              />

              <Input
                label="Password"
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4 text-[#7C3AED]" />}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                disabled={isLoading}
                rightAction={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="text-[#64748B] hover:text-[#172033] focus:outline-none p-1 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#172033]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#7C3AED] rounded border-[#E2E8F0] focus:ring-[#7C3AED] focus:ring-2 cursor-pointer accent-[#7C3AED]"
                    />
                    <span>Remember this device</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotModalOpen(true);
                    }}
                    className="font-medium text-[#7C3AED] hover:text-[#6D28D9] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full font-semibold shadow-sm shadow-violet-300"
                >
                  {mode === 'login' ? 'Sign In to MailFlow' : 'Create Free Account'}
                </Button>
              </div>
            </form>

            {/* Toggle Login / Register */}
            <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center text-xs sm:text-sm text-[#64748B]">
              {mode === 'login' ? (
                <p>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrors({});
                      setServerError(null);
                    }}
                    className="font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors cursor-pointer"
                  >
                    Register now
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrors({});
                      setServerError(null);
                    }}
                    className="font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Security & compliance reassurance badge with cyan highlight */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0891B2]" />
              <span>TLS 1.3 & DKIM verified</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              <span>Zero-downtime failover</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-[#64748B]">
        <p>© 2026 MailFlow Inc. Protected by enterprise-grade SMTP infrastructure & access policies.</p>
      </footer>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => {
          setIsForgotModalOpen(false);
          setForgotSuccessMessage(null);
          setForgotError(null);
        }}
        title="Reset your password"
        description="Enter your registered work email and we'll send a secure password reset link."
      >
        {forgotSuccessMessage ? (
          <div className="space-y-4 py-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center mx-auto border border-[#DDD6FE]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#172033]">{forgotSuccessMessage}</p>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-2"
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotSuccessMessage(null);
              }}
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            {forgotError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-xs">
                {forgotError}
              </div>
            )}

            <Input
              label="Work Email"
              type="email"
              required
              placeholder="name@company.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-[#7C3AED]" />}
              autoFocus
            />

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => setIsForgotModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1"
                isLoading={forgotLoading}
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
