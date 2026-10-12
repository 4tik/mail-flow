import { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Play, Pause, ChevronRight, Check, Users, Calendar, FileText, Rocket, BarChart2 } from 'lucide-react';
import { campaigns } from '../data/mockData';

const statusColors: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  sending: 'bg-indigo-100 text-indigo-700',
  paused: 'bg-amber-100 text-amber-700',
  draft: 'bg-gray-100 text-gray-600',
};

type WizardStep = 1 | 2 | 3 | 4 | 5;

const steps = [
  { num: 1, label: 'Template', icon: FileText },
  { num: 2, label: 'Recipients', icon: Users },
  { num: 3, label: 'Schedule', icon: Calendar },
  { num: 4, label: 'Review', icon: Eye },
  { num: 5, label: 'Launch', icon: Rocket },
];

function CampaignWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Create Campaign</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">×</button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? 'bg-indigo-600 text-white' : isActive ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-indigo-700' : isDone ? 'text-gray-600' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 mt-[-10px] sm:mt-[-14px] transition-all ${isDone ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Choose a Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Monthly Newsletter', 'Welcome Email', 'Promotional Blast', 'Order Confirmation'].map(t => (
                  <button key={t} onClick={() => setSelectedTemplate(t)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedTemplate === t ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className={`w-8 h-8 ${selectedTemplate === t ? 'text-indigo-500' : 'text-gray-300'}`} />
                    </div>
                    <p className="text-sm font-medium text-gray-800">{t}</p>
                    {selectedTemplate === t && <Check className="w-4 h-4 text-indigo-600 mt-1" />}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Choose Recipients</h3>
              {['All Contacts', 'Subscribed Only', 'VIP Customers', 'Custom Segment'].map((opt, i) => (
                <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <input type="radio" name="recipients" defaultChecked={i === 0} className="text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{opt}</p>
                    <p className="text-xs text-gray-400">{[8, 6, 2, 0][i]} contacts</p>
                  </div>
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Schedule Campaign</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Send Date</label>
                  <input type="date" defaultValue="2025-01-20" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Send Time</label>
                  <input type="time" defaultValue="09:00" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option>UTC (GMT+0)</option>
                    <option>US Eastern (GMT-5)</option>
                    <option>US Pacific (GMT-8)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Review Campaign</h3>
              <div className="space-y-3">
                {[
                  { label: 'Template', value: selectedTemplate || 'Monthly Newsletter' },
                  { label: 'Recipients', value: 'Subscribed Only (6 contacts)' },
                  { label: 'Scheduled', value: 'Jan 20, 2025 at 09:00 UTC' },
                  { label: 'Subject', value: 'January Updates from MailFlow' },
                  { label: 'From', value: 'noreply@acme.com' },
                ].map(row => (
                  <div key={row.label} className="flex items-start justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium text-gray-800 text-right max-w-xs">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-700 font-medium">⚠️ Please review all details before launching</p>
                <p className="text-xs text-amber-600 mt-1">This campaign will be sent to 6 subscribers and cannot be undone.</p>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Campaign Launched!</h3>
              <p className="text-sm text-gray-500">Your campaign is scheduled for Jan 20, 2025 at 09:00 UTC</p>
              <p className="text-xs text-gray-400 mt-1">6 recipients will receive this campaign</p>
              <button onClick={onClose} className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all">
                Back to Campaigns
              </button>
            </div>
          )}
        </div>

        {step < 5 && (
          <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
            <button
              onClick={() => setStep(prev => Math.max(1, prev - 1) as WizardStep)}
              disabled={step === 1}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={() => setStep(prev => Math.min(5, prev + 1) as WizardStep)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {step === 4 ? 'Launch Campaign' : 'Continue'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [showWizard, setShowWizard] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage email campaigns</p>
        </div>
        <button onClick={() => setShowWizard(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length.toString(), bg: 'bg-gray-50', color: 'text-gray-900' },
          { label: 'Sending', value: '1', bg: 'bg-indigo-50', color: 'text-indigo-700' },
          { label: 'Scheduled', value: '1', bg: 'bg-blue-50', color: 'text-blue-700' },
          { label: 'Completed', value: '2', bg: 'bg-green-50', color: 'text-green-700' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Campaign', 'Template', 'Recipients', 'Scheduled', 'Status', 'Progress', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Rocket className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.template}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-700">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {c.recipients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{c.scheduled}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{c.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all"><BarChart2 className="w-3.5 h-3.5" /></button>
                      {c.status === 'sending' && <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all"><Pause className="w-3.5 h-3.5" /></button>}
                      {c.status === 'paused' && <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all"><Play className="w-3.5 h-3.5" /></button>}
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showWizard && <CampaignWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
