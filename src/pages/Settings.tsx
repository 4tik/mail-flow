import { useState } from 'react';
import { Save, Bell, Shield, Palette, CreditCard, Users, Globe, Server, Key, Settings as SettingsIcon } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'smtp', label: 'SMTP', icon: Server },
  { id: 'api', label: 'API', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'team', label: 'Team Members', icon: Users },
];

function Toggle({ defaultChecked = false, label, description }: { defaultChecked?: boolean; label: string; description?: string }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-indigo-600' : 'bg-gray-200'}`}
        style={{ height: '22px', width: '40px' }}
      >
        <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-4.5' : 'translate-x-0'}`}
          style={{ width: '18px', height: '18px', transform: on ? 'translateX(18px)' : 'translateX(0)' }} />
      </button>
    </div>
  );
}

const teamMembers = [
  { name: 'John Doe', email: 'john@acme.com', role: 'Admin', avatar: 'JD', status: 'active' },
  { name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Developer', avatar: 'SC', status: 'active' },
  { name: 'Mike Ross', email: 'mike@acme.com', role: 'Marketer', avatar: 'MR', status: 'active' },
  { name: 'Emma White', email: 'emma@acme.com', role: 'Viewer', avatar: 'EW', status: 'pending' },
];

const avatarColors = ['bg-indigo-100 text-indigo-700', 'bg-purple-100 text-purple-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700'];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure your MailFlow workspace</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all border-b border-gray-50 last:border-0 ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h2 className="font-semibold text-gray-900">General Settings</h2>
              {[
                { label: 'Organization Name', placeholder: 'Acme Corp', default: 'Acme Corp' },
                { label: 'From Name', placeholder: 'Your Name or Company', default: 'Acme Notifications' },
                { label: 'Reply-To Email', placeholder: 'reply@yourdomain.com', default: 'support@acme.com' },
                { label: 'Default Timezone', type: 'select', options: ['UTC (GMT+0)', 'US Eastern', 'US Pacific', 'Europe/London'] },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input defaultValue={f.default} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  )}
                </div>
              ))}
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-1">
              <h2 className="font-semibold text-gray-900 mb-4">Security Settings</h2>
              <Toggle label="Two-Factor Authentication" description="Require 2FA for all team members" defaultChecked />
              <Toggle label="IP Allowlist" description="Restrict API access to specific IPs" />
              <Toggle label="Session Timeout" description="Auto-logout after 24 hours of inactivity" defaultChecked />
              <Toggle label="Audit Logs" description="Keep detailed logs of all admin actions" defaultChecked />
              <Toggle label="Email Signing" description="Sign outbound emails with S/MIME" />
              <div className="pt-4">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm">
                  <Save className="w-4 h-4" /> Save Security Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-1">
              <h2 className="font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <Toggle label="Email Delivery Failures" description="Alert when emails fail to deliver" defaultChecked />
              <Toggle label="Bounce Rate Threshold" description="Alert when bounce rate exceeds 5%" defaultChecked />
              <Toggle label="Domain Verification" description="Notify when domain DNS is verified" defaultChecked />
              <Toggle label="API Key Expiry" description="Alert 30 days before API key expires" defaultChecked />
              <Toggle label="Campaign Completion" description="Notify when a campaign finishes sending" />
              <Toggle label="Queue Backlog" description="Alert when queue exceeds 500 items" />
              <Toggle label="Weekly Report" description="Receive weekly email analytics summary" defaultChecked />
              <div className="pt-4">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h2 className="font-semibold text-gray-900">Branding</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue="#4F46E5" className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                  <input defaultValue="#4F46E5" className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono w-32" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo URL</label>
                <input placeholder="https://yoursite.com/logo.png" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Footer Text</label>
                <textarea rows={3} defaultValue="© 2025 Acme Corp · Unsubscribe · Privacy Policy"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm">
                <Save className="w-4 h-4" /> Save Branding
              </button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">Pro Plan</span>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Current</span>
                    </div>
                    <p className="text-sm text-gray-500">500,000 emails/month · 10 domains · Unlimited templates</p>
                    <p className="text-sm text-gray-500 mt-0.5">Next billing: Feb 1, 2025 · $79/month</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all">Upgrade Plan</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Usage This Month</h2>
                {[
                  { label: 'Emails Sent', used: 228042, total: 500000, pct: 45.6 },
                  { label: 'Domains', used: 6, total: 10, pct: 60 },
                  { label: 'API Requests', used: 1842, total: 10000, pct: 18.4 },
                ].map(u => (
                  <div key={u.label} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700">{u.label}</span>
                      <span className="text-xs text-gray-500">{u.used.toLocaleString()} / {u.total.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${u.pct > 80 ? 'bg-red-500' : u.pct > 60 ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${u.pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{u.pct}% used</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Team Members</h2>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
                  <Users className="w-4 h-4" /> Invite Member
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {teamMembers.map((m, i) => (
                  <div key={m.email} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${avatarColors[i]} flex items-center justify-center text-sm font-bold`}>
                        {m.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {m.status === 'pending' && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>}
                      <select defaultValue={m.role} className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700">
                        <option>Admin</option>
                        <option>Developer</option>
                        <option>Marketer</option>
                        <option>Viewer</option>
                      </select>
                      {m.name !== 'John Doe' && (
                        <button className="text-xs text-red-500 hover:text-red-700 transition-colors">Remove</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!['general', 'security', 'notifications', 'branding', 'billing', 'team'].includes(activeTab) && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <SettingsIcon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Settings for <strong className="capitalize">{activeTab}</strong> coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
