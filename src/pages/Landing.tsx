import { useState } from 'react';
import {
  Mail,
  Server,
  Workflow,
  ShieldCheck,
  Activity,
  RefreshCw,
  Zap,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Check,
  ChevronDown,
  CheckCircle2,
  AlertTriangle
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
  const [simulatedFailover, setSimulatedFailover] = useState(false);

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
      title: 'Multi-Provider SMTP Relays',
      description:
        'Connect Amazon SES, SendGrid, Mailgun, and custom relays with unified credential vaults and port 587/465 TLS encryption.',
      badge: 'Infrastructure',
      color: 'violet',
    },
    {
      icon: Workflow,
      title: 'Smart Routing Engine',
      description:
        'Intelligently distribute transactional emails and campaigns based on domain health, delivery reputation, and throughput quotas.',
      badge: 'Routing',
      color: 'cyan',
    },
    {
      icon: RefreshCw,
      title: 'Automatic Failover Protection',
      description:
        'Continuous health monitoring immediately reroutes traffic to hot-standby providers within milliseconds when rate limits or outages occur.',
      badge: 'Reliability',
      color: 'violet',
    },
    {
      icon: ShieldCheck,
      title: 'Reputation & Suppression Shield',
      description:
        'Proactively isolate hard bounces, enforce global opt-out suppressions, and continuously monitor SPF, DKIM, and DMARC status.',
      badge: 'Compliance',
      color: 'cyan',
    },
    {
      icon: Activity,
      title: 'Live Telemetry & Queue Tracking',
      description:
        'Inspect per-message delivery logs, track open and click rates, and monitor queue progression with detailed transmission diagnostics.',
      badge: 'Monitoring',
      color: 'violet',
    },
    {
      icon: Zap,
      title: 'High-Throughput REST APIs',
      description:
        'Dispatch emails via unified REST APIs and receive real-time webhook feeds for delivered, opened, clicked, and bounced events.',
      badge: 'Performance',
      color: 'cyan',
    },
  ];

  const faqs = [
    {
      q: 'How does MailFlow execute automatic failover?',
      a: 'MailFlow constantly tracks delivery latency and HTTP/SMTP response codes from your connected relays. If your primary provider (e.g. Amazon SES) responds with connection errors or 4xx/5xx throttles, MailFlow immediately diverts subsequent messages to your backup relay (e.g. SendGrid) with zero message loss.',
    },
    {
      q: 'Can I verify multiple sender domains with DKIM and SPF?',
      a: 'Yes. MailFlow includes built-in DNS health verification tools for all your sender domains, checking valid SPF, DKIM, and DMARC records to ensure optimal inbox placement across Gmail, Outlook, and Yahoo.',
    },
    {
      q: 'How does suppression list management protect sender reputation?',
      a: 'Whenever a recipient opts out or a mailbox returns a permanent hard-bounce, MailFlow immediately updates your suppression registry so subsequent campaigns automatically bypass invalid addresses.',
    },
    {
      q: 'Is MailFlow compatible with existing transactional email frameworks?',
      a: 'Yes. MailFlow provides standard SMTP credentials as well as REST APIs and webhook integrations, making it straightforward to plug into any backend service or application stack.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] selection:bg-[#F5F3FF] selection:text-[#7C3AED] flex flex-col font-sans">
      {/* 1. Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-lg p-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-button-gradient flex items-center justify-center text-white shadow-sm shadow-violet-200 transition-transform group-hover:scale-105">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-bold text-[#172033] text-lg tracking-tight">
              Mail<span className="text-[#7C3AED]">Flow</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <a href="#features" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              Features
            </a>
            <a href="#routing" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              Routing & Failover
            </a>
            <a href="#reliability" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              Reliability
            </a>
            <a href="#docs" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              Docs & API
            </a>
            <a href="#faq" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#64748B] font-medium">
                  Signed in as <strong className="text-[#172033]">{user?.name}</strong>
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
                  className="font-medium text-[#172033]"
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
              className="p-2 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F5F3FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-[#172033]">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F5F3FF] cursor-pointer"
              >
                Features
              </a>
              <a
                href="#routing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F5F3FF] cursor-pointer"
              >
                Routing & Failover
              </a>
              <a
                href="#reliability"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F5F3FF] cursor-pointer"
              >
                Reliability
              </a>
              <a
                href="#docs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F5F3FF] cursor-pointer"
              >
                Docs & API
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F5F3FF] cursor-pointer"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
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

      {/* 2. Hero Section with Light Violet-to-Cyan Gradient Background */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 bg-hero-gradient border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Violet-to-Cyan Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DDD6FE] shadow-2xs text-xs font-semibold text-[#7C3AED]">
              <span className="w-2 h-2 rounded-full bg-[#0891B2] animate-pulse" />
              <span>Multi-Provider Email Relay & Automatic Failover</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight leading-[1.15]">
              Unified Email Relay with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#0891B2]">
                Zero-Downtime Failover
              </span>
            </h1>

            {/* Hero Description */}
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Deliver critical transactional messages and campaigns across Amazon SES, SendGrid,
              Mailgun, and Brevo. Guard domain reputation with automated circuit-breaking and real-time
              health routing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCta}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md shadow-violet-200"
              >
                {isAuthenticated ? 'Open MailFlow Console' : 'Launch Workspace Demo'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentView(isAuthenticated ? 'app' : 'login')}
                className="w-full sm:w-auto bg-white hover:bg-[#F5F3FF] border-[#E2E8F0]"
              >
                {isAuthenticated ? 'View Dashboard' : 'Sign In with Account'}
              </Button>
            </div>

            {/* Deliverability proof tags */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#64748B] font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                96.3% Verified Delivery Rate
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                Automated Primary & Standby Failover
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                SPF, DKIM & DMARC Enforcement
              </span>
            </div>
          </div>

          {/* Visual Routing Illustration */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl overflow-hidden">
              {/* Window Header */}
              <div className="h-11 bg-white border-b border-[#E2E8F0] px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="ml-2 text-xs font-mono text-[#64748B] hidden sm:inline">
                    relay.mailflow.io • live routing circuit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <span className="text-2xs font-semibold text-[#0891B2] bg-[#ECFEFF] px-2.5 py-0.5 rounded-full border border-[#A5F3FC]">
                    Failover Active
                  </span>
                </div>
              </div>

              {/* Interactive Routing Architecture Diagram */}
              <div className="p-6 sm:p-8 bg-[#F8FAFC]">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#172033]">Live Email Transmission Pipeline</h3>
                    <p className="text-xs text-[#64748B]">Simulated traffic stream through MailFlow routing node</p>
                  </div>
                  <button
                    onClick={() => setSimulatedFailover(!simulatedFailover)}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#DDD6FE] bg-white text-[#7C3AED] hover:bg-[#F5F3FF] transition-all cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${simulatedFailover ? 'animate-spin' : ''}`} />
                    <span>{simulatedFailover ? 'Reset to SES Primary' : 'Simulate Primary Throttle'}</span>
                  </button>
                </div>

                {/* 3-Stage Diagram: Source -> Router -> Target Relays */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Stage 1: Inbound App / API (3 cols) */}
                  <div className="md:col-span-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#172033]">Inbound Trigger</p>
                    <p className="text-2xs text-[#64748B]">REST API / Webhook</p>
                    <div className="pt-1 border-t border-[#E2E8F0] text-2xs text-[#64748B] flex items-center justify-between">
                      <span>Rate: 18,640/day</span>
                      <span className="text-[#16A34A] font-semibold">&lt;15ms</span>
                    </div>
                  </div>

                  {/* Stage 2: Central Router Node (4 cols) */}
                  <div className="md:col-span-4 bg-white p-5 rounded-xl border-2 border-[#DDD6FE] shadow-sm relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-button-gradient text-white flex items-center justify-center">
                        <Workflow className="w-4 h-4" />
                      </div>
                      <Badge variant="cyan" size="sm">
                        Router Engine
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-[#172033]">MailFlow Circuit Breaker</p>
                    <p className="text-xs text-[#64748B] mt-1 leading-snug">
                      {simulatedFailover
                        ? 'Primary SES throttled. Dynamic reroute engaged.'
                        : 'Health score: 99.8%. Active traffic via SES.'}
                    </p>
                    <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-2xs">
                      <span className="text-[#64748B]">TLS 1.3 Strict</span>
                      <span className={`font-semibold ${simulatedFailover ? 'text-[#0891B2]' : 'text-[#7C3AED]'}`}>
                        {simulatedFailover ? 'Standby Routed' : 'Primary Active'}
                      </span>
                    </div>
                  </div>

                  {/* Stage 3: Target SMTP Providers (5 cols) */}
                  <div className="md:col-span-5 space-y-2.5">
                    {/* Primary Provider: Amazon SES */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulatedFailover
                          ? 'border-amber-200 bg-amber-50/40 opacity-75'
                          : 'border-[#DDD6FE] bg-[#F5F3FF]/50 ring-1 ring-[#DDD6FE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🟠</span>
                          <div>
                            <p className="text-xs font-bold text-[#172033]">Primary: Amazon SES</p>
                            <p className="text-2xs text-[#64748B]">Port 587 • Daily quota: 50,000</p>
                          </div>
                        </div>
                        {simulatedFailover ? (
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Throttled (429)
                          </span>
                        ) : (
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">
                            Delivering
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Standby Provider: SendGrid */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulatedFailover
                          ? 'border-[#A5F3FC] bg-[#ECFEFF]/60 ring-2 ring-[#0891B2]'
                          : 'border-[#E2E8F0] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🔵</span>
                          <div>
                            <p className="text-xs font-bold text-[#172033]">Standby: SendGrid Relay</p>
                            <p className="text-2xs text-[#64748B]">Port 587 • Hot-standby enabled</p>
                          </div>
                        </div>
                        {simulatedFailover ? (
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC] animate-pulse">
                            Active Failover
                          </span>
                        ) : (
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Hot Standby
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-5 p-3 rounded-xl bg-white border border-[#E2E8F0] flex flex-wrap items-center justify-between text-2xs text-[#64748B] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span>Average Failover Latency: <strong>84 ms</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Zero Dropped Messages Guarantee</span>
                    <span className="text-slate-300">•</span>
                    <span>Multi-Region AWS & EU Fallback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Features Section */}
      <section id="features" className="py-20 bg-section-gradient border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="violet">Core Capabilities</Badge>
            <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">
              Enterprise Email Delivery & Resiliency
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Everything you need to orchestrate transactional relays, safeguard sender scores, and
              eliminate single-provider dependency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isViolet = feature.color === 'violet';
              return (
                <Card
                  key={i}
                  hoverable
                  className="flex flex-col justify-between border-[#E2E8F0] bg-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isViolet
                            ? 'bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]'
                            : 'bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant={isViolet ? 'violet' : 'cyan'} size="sm">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-[#172033]">{feature.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Routing & Failover Architecture Deep Dive */}
      <section id="routing" className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="cyan">Zero-Downtime Architecture</Badge>
              <h2 className="text-3xl font-bold text-[#172033] tracking-tight">
                Never miss an inbox due to vendor throttles or outages
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Standard architectures lock you into a single SMTP vendor. When they encounter API
                rate-limits, IP degradation, or transient downtime, your critical user verifications
                and billing receipts stall. MailFlow monitors relay health and switches queues seamlessly.
              </p>

              <div className="space-y-3 pt-1">
                {[
                  'Automated circuit-breaking switches from primary to backup in <100ms',
                  'Daily quota balancing across Amazon SES, SendGrid, Mailgun, and custom relays',
                  'Enforced TLS 1.3 encrypted handshakes across port 587 and 465 relays',
                  'Exponential backoff retries with per-message transmission telemetry',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-[#172033] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleCta}>
                  Configure Provider Relays
                </Button>
              </div>
            </div>

            {/* Configured Relays Status Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#172033]">Configured Provider Network</h3>
                  <p className="text-xs text-[#64748B]">Real-time connection status</p>
                </div>
                <span className="text-xs font-mono text-[#0891B2] bg-[#ECFEFF] px-2 py-0.5 rounded border border-[#A5F3FC]">
                  Port 587 / 465
                </span>
              </div>

              <div className="space-y-3">
                {smtpProviders.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#DDD6FE] transition-colors bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.logo}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#172033]">{p.name}</p>
                        <p className="text-xs text-[#64748B] font-mono truncate max-w-[170px] sm:max-w-xs">
                          {p.host}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'connected'
                            ? 'bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p.status === 'connected' ? 'Connected' : 'Offline'}
                      </span>
                      <p className="text-2xs text-[#64748B] mt-1">
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

      {/* 5. Reliability & Deliverability Shield */}
      <section id="reliability" className="py-20 bg-section-gradient border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan">Deliverability Safeguards</Badge>
            <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">
              Maintain Clean Inboxes and High Sender Scores
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Protect your sender domain from spam classification, blacklists, and high bounce penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#E2E8F0] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">DNS & DKIM Verification</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Automated DNS record inspection validates SPF alignment, DKIM cryptographic signatures,
                and DMARC policies for all sending domains.
              </p>
            </Card>

            <Card className="border-[#E2E8F0] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">Suppression Registry</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Automatic blackhole protection isolates hard bounces and spam complaints instantly to
                prevent sending to inactive or hostile inboxes.
              </p>
            </Card>

            <Card className="border-[#E2E8F0] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172033]">Real-Time Health Monitoring</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Track bounce trends, open rates, and spam markers. If bounce rates exceed 2%,
                MailFlow notifies your engineering team immediately.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Documentation & REST API Section */}
      <section id="docs" className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="violet">Developer Experience</Badge>
              <h2 className="text-3xl font-bold text-[#172033] tracking-tight">
                Simple integration with unified REST endpoints
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Send transactional emails using your favorite programming language or existing HTTP client.
                Use our unified relay API without managing provider-specific SDKs.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#172033]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Scoped API keys with per-domain permission control</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#172033]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Webhooks for delivered, opened, clicked, and bounced callbacks</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#172033]">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Dynamic Handlebars-like template variables</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button variant="primary" size="md" onClick={handleCta} leftIcon={<BookOpen className="w-4 h-4" />}>
                  Explore API Reference
                </Button>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] cursor-pointer"
                >
                  <span>Read FAQ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Code Snippet Card */}
            <div className="bg-[#172033] text-white rounded-2xl p-6 shadow-xl border border-[#E2E8F0]/20 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
                <span className="text-[#A78BFA] font-semibold">POST /v1/email/send</span>
                <span className="text-slate-400 text-2xs">Bearer mfk_live_...</span>
              </div>
              <pre className="text-slate-300 leading-relaxed">
{`curl -X POST https://api.mailflow.io/v1/send \\
  -H "Authorization: Bearer mfk_live_7x89q2" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "alice@customer.com",
    "template_id": "tpl_welcome_user",
    "variables": {
      "company_name": "Acme SaaS",
      "user_name": "Alice"
    },
    "routing_policy": "failover_optimal"
  }'`}
              </pre>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-2xs text-[#67E8F9]">
                <span>Response: 200 OK • Message Queued</span>
                <span>Latency: 42ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Performance & Reliability Metrics (Clean Light Card Design) */}
      <section id="metrics" className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
              <div className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">2.28M+</p>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">Monthly Relayed Volume</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#0891B2]">96.3%</p>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">Inbox Delivery Rate</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">&lt;120ms</p>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">Average Relay Latency</p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#16A34A]">99.98%</p>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">Circuit Uptime SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="violet">Frequently Asked Questions</Badge>
            <h2 className="text-3xl font-bold text-[#172033] tracking-tight">
              Common Questions About MailFlow
            </h2>
            <p className="text-sm text-[#64748B]">
              Details on multi-provider failover, API keys, and deliverability safeguards.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#E2E8F0] overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-[#172033] hover:bg-[#F5F3FF]/40 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748B] transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'transform rotate-180 text-[#7C3AED]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC] animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action with Soft Violet-to-Cyan Accent */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-hero-gradient rounded-2xl p-8 sm:p-12 text-center border border-[#DDD6FE] shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
              Ready to Upgrade Your Email Infrastructure?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto leading-relaxed">
              Experience multi-provider failover, automated domain verification, and high-deliverability
              routing in your workspace today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCta}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md shadow-violet-200"
              >
                {isAuthenticated ? 'Enter Console' : 'Access MailFlow Now'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentView('login')}
                className="w-full sm:w-auto bg-white border-[#E2E8F0] text-[#172033]"
              >
                Sign In to Existing Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] text-xs text-[#64748B] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-button-gradient flex items-center justify-center text-white">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[#172033] text-base">
                  Mail<span className="text-[#7C3AED]">Flow</span>
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Light SaaS email relay platform with multi-provider SMTP routing, automatic failover,
                and real-time delivery telemetry.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-[#172033] uppercase tracking-wider text-2xs">Platform</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="#features" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#routing" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    Routing & Failover
                  </a>
                </li>
                <li>
                  <a href="#reliability" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    Reliability Shield
                  </a>
                </li>
                <li>
                  <a href="#metrics" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    Performance Telemetry
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-[#172033] uppercase tracking-wider text-2xs">Resources</p>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => setCurrentView('app')}
                    className="hover:text-[#7C3AED] transition-colors text-left cursor-pointer"
                  >
                    Interactive Console
                  </button>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#docs" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
                    REST API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-[#172033] uppercase tracking-wider text-2xs">Security</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5 text-[#16A34A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span>Systems Operational</span>
                </li>
                <li>
                  <span className="text-[#64748B]">SPF & DKIM Enforced</span>
                </li>
                <li>
                  <span className="text-[#64748B]">TLS 1.3 Transport</span>
                </li>
                <li>
                  <span className="text-[#64748B]">Global Suppression Guard</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 MailFlow Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#172033] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#172033] cursor-pointer">Terms of Service</span>
              <span className="hover:text-[#172033] cursor-pointer">Failover SLA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
