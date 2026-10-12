import { useState } from 'react';
import {
  Mail,
  Server,
  Zap,
  ShieldCheck,
  BarChart3,
  FileCode2,
  ListOrdered,
  ArrowRight,
  Menu,
  X,
  Radio,
  Check,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { smtpProviders } from '../data/mockData';

export default function Landing() {
  const { isAuthenticated, user, setCurrentView } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCta = () => {
    if (isAuthenticated) {
      setCurrentView('app');
    } else {
      setCurrentView('login');
    }
  };

  const features = [
    {
      icon: Server,
      title: 'Multi-Provider SMTP Routing',
      description:
        'Route across Amazon SES, SendGrid, Mailgun, and custom relays with automated failover and rate-limit balancing.',
      badge: 'Core Engine',
    },
    {
      icon: FileCode2,
      title: 'Dynamic Template & Variable Engine',
      description:
        'Author transactional and marketing templates with dynamic placeholder variables and instant rendering previews.',
      badge: 'Templates',
    },
    {
      icon: ListOrdered,
      title: 'Real-Time Delivery Queue & Logs',
      description:
        'Inspect email statuses in transit, configure retry policies, and analyze comprehensive per-message delivery logs.',
      badge: 'Real-Time',
    },
    {
      icon: ShieldCheck,
      title: 'Reputation & Suppression Shield',
      description:
        'Protect sender score with automated bounce isolation, global suppression lists, and real-time SPF/DKIM verification.',
      badge: 'Deliverability',
    },
    {
      icon: BarChart3,
      title: 'Granular Performance Analytics',
      description:
        'Track delivery rates, open rates, click tracking, client device telemetry, and provider efficiency in real time.',
      badge: 'Telemetry',
    },
    {
      icon: Radio,
      title: 'Developer APIs & Webhook Feeds',
      description:
        'Generate scoped API keys and receive real-time HTTP callbacks for delivered, opened, clicked, and bounced events.',
      badge: 'Webhooks',
    },
  ];

  const faqs = [
    {
      q: 'How does multi-provider failover work in MailFlow?',
      a: 'If a primary provider like Amazon SES or SendGrid encounters downtime, throttling, or connection errors, MailFlow automatically re-routes queued messages to your designated backup provider within milliseconds.',
    },
    {
      q: 'Can I verify multiple custom domains and DKIM records?',
      a: 'Yes. MailFlow includes built-in domain verification tools that check SPF, DKIM, and DMARC status to ensure your messages pass strict mailbox security filters.',
    },
    {
      q: 'Does MailFlow handle unsubscribes and suppression automatically?',
      a: 'Yes. When recipients opt out or emails hard-bounce, MailFlow immediately updates your suppression registry to prevent future sending attempts and protect your reputation.',
    },
    {
      q: 'Can I integrate MailFlow with my existing backend services?',
      a: 'Absolutely. MailFlow provides REST API keys and inbound webhook triggers so you can programmatically dispatch transactional emails and subscribe to real-time delivery webhooks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col font-sans">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 transition-transform group-hover:scale-105">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Mail<span className="text-indigo-600">Flow</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#routing" className="hover:text-indigo-600 transition-colors">
              SMTP Routing
            </a>
            <a href="#architecture" className="hover:text-indigo-600 transition-colors">
              Architecture
            </a>
            <a href="#stats" className="hover:text-indigo-600 transition-colors">
              Metrics
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-medium">
                  Signed in as <strong className="text-gray-800">{user?.name}</strong>
                </span>
                <Button variant="primary" size="sm" onClick={() => setCurrentView('app')}>
                  Open Console
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('login')}
                  className="font-medium text-gray-700"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentView('login')}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-gray-700">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Features
              </a>
              <a
                href="#routing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                SMTP Routing
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Architecture
              </a>
              <a
                href="#stats"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Metrics
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('app');
                  }}
                  className="w-full justify-center"
                >
                  Open Console
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('login');
                    }}
                    className="w-full justify-center"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('login');
                    }}
                    className="w-full justify-center"
                  >
                    Get Started Free
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-radial from-indigo-50/70 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Multi-Provider Email Delivery Infrastructure</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Unified Email Relay with{' '}
              <span className="text-indigo-600">Zero-Downtime</span> Failover
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Deliver transactional messages and scheduled campaigns across Amazon SES, SendGrid,
              Mailgun, and Brevo. Inspect queues, guard your domain reputation, and monitor
              deliverability in real time.
            </p>

            {/* Hero CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCta}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md shadow-indigo-200"
              >
                {isAuthenticated ? 'Open MailFlow Console' : 'Launch Workspace Demo'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentView(isAuthenticated ? 'app' : 'login')}
                className="w-full sm:w-auto bg-white hover:bg-gray-50"
              >
                {isAuthenticated ? 'View Dashboard' : 'Sign In with Account'}
              </Button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                96.3% Inbox Delivery Rate
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Multi-SMTP Automatic Failover
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                SPF & DKIM Domain Verification
              </span>
            </div>
          </div>

          {/* Interactive Live Platform Preview */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden">
              {/* Window Bar */}
              <div className="h-10 bg-gray-50 border-b border-gray-200 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-medium text-gray-400 hidden sm:inline">
                    mailflow.internal/console/overview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Routing Engine Live
                  </span>
                </div>
              </div>

              {/* Console preview content */}
              <div className="p-4 sm:p-6 space-y-5 bg-slate-50/50">
                {/* 3 Metric Pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                    <p className="text-xs text-gray-500">Total Volume Sent</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">2,284,109</p>
                    <span className="text-xs font-medium text-emerald-600">+12.4% this month</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                    <p className="text-xs text-gray-500">Delivery Success</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">96.3%</p>
                    <span className="text-xs font-medium text-emerald-600">Optimal threshold</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                    <p className="text-xs text-gray-500">Relay Latency</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">&lt;118 ms</p>
                    <span className="text-xs font-medium text-indigo-600">Real-time SMTP dispatch</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                    <p className="text-xs text-gray-500">Connected Relays</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">5 Providers</p>
                    <span className="text-xs font-medium text-sky-600">SES, SendGrid, Mailgun</span>
                  </div>
                </div>

                {/* Live Provider Failover Strip */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Active SMTP Providers Status
                    </h3>
                    <span className="text-xs text-gray-400">Auto failover active</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🟠</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">Amazon SES</p>
                          <p className="text-2xs text-gray-500">Primary • 142k sent</p>
                        </div>
                      </div>
                      <Badge variant="success" size="sm" dot>
                        Operational
                      </Badge>
                    </div>

                    <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🔵</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">SendGrid</p>
                          <p className="text-2xs text-gray-500">Failover • 89.4k sent</p>
                        </div>
                      </div>
                      <Badge variant="success" size="sm" dot>
                        Operational
                      </Badge>
                    </div>

                    <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🟤</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">Mailgun</p>
                          <p className="text-2xs text-gray-500">Fallback • 52.1k sent</p>
                        </div>
                      </div>
                      <Badge variant="success" size="sm" dot>
                        Operational
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className="py-20 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Platform Capabilities</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Engineered for Bulletproof Deliverability
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Everything required to manage complex email infrastructure, templates, and outbound
              campaigns from one centralized dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={i}
                  hoverable
                  className="flex flex-col justify-between border-gray-200/90"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        {feature.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Multi-Provider SMTP Routing & Resilience Section */}
      <section id="routing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="sky">Smart Routing Engine</Badge>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Never miss an inbox due to provider outages
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Traditional setups lock you into a single SMTP vendor. When they suffer a rate-limit
                spike or an IP block, your password resets and order notifications stall. MailFlow
                dynamically detects throttles and switches queues automatically.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Automated failover across SES, SendGrid, Mailgun, and custom relays',
                  'Dynamic daily limit balancing based on domain quotas',
                  'TLS 1.3 enforced connections on ports 587 and 465',
                  'Automatic exponential retry backoff for transient 4xx errors',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleCta}>
                  Configure Your Providers
                </Button>
              </div>
            </div>

            {/* Provider table showcase */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-md p-5 sm:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <span className="text-sm font-bold text-gray-900">Configured SMTP Relays</span>
                <span className="text-xs text-gray-400">Port 587 / 465</span>
              </div>

              <div className="space-y-3">
                {smtpProviders.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.logo}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400 font-mono truncate max-w-[180px] sm:max-w-xs">
                          {p.host}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'connected'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {p.status === 'connected' ? 'Connected' : 'Offline'}
                      </span>
                      <p className="text-2xs text-gray-400 mt-1">
                        {p.emails.toLocaleString()} sent
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visual Pipeline / Architecture Flow */}
      <section id="architecture" className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">End-to-End Pipeline</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              How MailFlow Powers Your Delivery
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              From an API call or scheduled campaign to recipient inbox and webhook confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Trigger & Payload',
                detail: 'REST API, SDK, or Scheduled campaign pushes payload with variables.',
                icon: Zap,
              },
              {
                step: '02',
                title: 'Template & Variables',
                detail: 'Engine compiles HTML with dynamic variables and verifies suppression.',
                icon: FileCode2,
              },
              {
                step: '03',
                title: 'Smart SMTP Routing',
                detail: 'Dispatches via healthiest provider (SES, SendGrid, Mailgun) with TLS.',
                icon: Server,
              },
              {
                step: '04',
                title: 'Analytics & Webhooks',
                detail: 'Tracks open, click, bounce metrics and streams webhooks back to you.',
                icon: BarChart3,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-gray-200 rounded-xl p-5 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        STEP {step.step}
                      </span>
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Stats & Trust Section */}
      <section id="stats" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">2.28M+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Monthly Emails Sent</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">96.3%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Verified Delivery Rate</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">&lt;120ms</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Average Relay Latency</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">99.98%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Infrastructure Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="neutral">Frequently Asked Questions</Badge>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Common Questions about MailFlow
            </h2>
            <p className="text-sm text-gray-600">
              Details on deliverability, integrations, and operational safeguards.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200/90 overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'transform rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/40 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl shadow-indigo-100 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Email Deliverability?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
              Join thousands of applications running their transactional and marketing infrastructure
              through MailFlow.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleCta}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-indigo-700 font-bold bg-white hover:bg-gray-100"
              >
                {isAuthenticated ? 'Enter Console' : 'Access MailFlow Now'}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setCurrentView('login')}
                className="w-full sm:w-auto text-white hover:bg-indigo-700 hover:text-white"
              >
                Sign In to Existing Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Clean Footer */}
      <footer className="bg-white border-t border-gray-200 text-xs text-gray-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-gray-900 text-base">
                  Mail<span className="text-indigo-600">Flow</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enterprise email delivery platform with multi-provider SMTP routing, dynamic templates,
                and real-time analytics.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-800 uppercase tracking-wider text-2xs">Platform</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="#features" className="hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#routing" className="hover:text-gray-900 transition-colors">
                    SMTP Relays
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-gray-900 transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#stats" className="hover:text-gray-900 transition-colors">
                    Performance Stats
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-800 uppercase tracking-wider text-2xs">Resources</p>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => setCurrentView('app')}
                    className="hover:text-gray-900 transition-colors text-left"
                  >
                    Interactive Console
                  </button>
                </li>
                <li>
                  <a href="#faq" className="hover:text-gray-900 transition-colors">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">API Documentation</span>
                </li>
                <li>
                  <span className="text-gray-400">Webhook Reference</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-800 uppercase tracking-wider text-2xs">Security</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Systems Operational</span>
                </li>
                <li>
                  <span className="text-gray-500">SPF / DKIM Enforced</span>
                </li>
                <li>
                  <span className="text-gray-500">TLS 1.3 Transport</span>
                </li>
                <li>
                  <span className="text-gray-500">Suppression Registry</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 MailFlow Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-gray-700 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-700 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-700 cursor-pointer">Deliverability SLA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
