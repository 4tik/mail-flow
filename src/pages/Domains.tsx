import { useState } from 'react';
import { Plus, Check, X, AlertTriangle, Search, Eye, Edit, Trash2, RefreshCw, Globe } from 'lucide-react';
import { domains } from '../data/mockData';

const statusBadge = (status: string) => {
  if (status === 'valid') return 'bg-green-100 text-green-700';
  if (status === 'invalid') return 'bg-red-100 text-red-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-600';
};

const domainStatusBadge = (status: string) => {
  if (status === 'active') return 'bg-green-100 text-green-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  if (status === 'error') return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-600';
};

type DomainModalProps = { open: boolean; onClose: () => void };

function AddDomainModal({ open, onClose }: DomainModalProps) {
  const [domain, setDomain] = useState('');
  const [provider, setProvider] = useState('Amazon SES');
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Add New Domain</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Domain Name</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="mail.yourdomain.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">SMTP Provider</label>
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {['Amazon SES', 'SendGrid', 'Mailgun', 'Brevo', 'SMTP'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Daily Send Limit</label>
            <input
              defaultValue="10000"
              type="number"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium mb-1">After adding, you'll need to configure:</p>
            <ul className="text-xs text-indigo-600 space-y-1">
              <li>• SPF record in your DNS</li>
              <li>• DKIM keys in your DNS</li>
              <li>• DMARC policy (recommended)</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Cancel</button>
          <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm">Add Domain</button>
        </div>
      </div>
    </div>
  );
}

export default function Domains() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = domains.filter(d => {
    const matchSearch = d.domain.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Domains</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your sending domains and DNS records</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> Add Domain
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Domains', value: '6', color: 'text-gray-900', bg: 'bg-gray-50' },
          { label: 'Active', value: '4', color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Pending', value: '1', color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Error', value: '1', color: 'text-red-700', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search domains…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['all', 'active', 'pending', 'error'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterStatus === s ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Domain', 'SPF', 'DKIM', 'Verified', 'Provider', 'Daily Limit', 'Sent Today', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{d.domain}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(d.spf)}`}>
                      {d.spf === 'valid' ? <Check className="w-3 h-3" /> : d.spf === 'invalid' ? <X className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {d.spf.charAt(0).toUpperCase() + d.spf.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(d.dkim)}`}>
                      {d.dkim === 'valid' ? <Check className="w-3 h-3" /> : d.dkim === 'invalid' ? <X className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {d.dkim.charAt(0).toUpperCase() + d.dkim.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {d.verified
                      ? <span className="flex items-center gap-1 text-xs text-green-700 font-medium"><Check className="w-3.5 h-3.5" /> Yes</span>
                      : <span className="flex items-center gap-1 text-xs text-gray-400 font-medium"><X className="w-3.5 h-3.5" /> No</span>}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{d.provider}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{d.dailyLimit.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{d.sent.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${domainStatusBadge(d.status)}`}>
                      {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-all" title="Verify DNS">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all" title="View DNS">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {domains.length} domains</p>
          <div className="flex gap-1">
            {[1].map(p => (
              <button key={p} className="w-7 h-7 rounded-lg text-xs font-medium bg-indigo-600 text-white">{p}</button>
            ))}
          </div>
        </div>
      </div>

      <AddDomainModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
