import { useState } from 'react';
import { Search, Filter, Download, Eye, RotateCcw, ChevronDown, CheckCircle, XCircle, AlertTriangle, MousePointer, Mail } from 'lucide-react';
import { emailLogs } from '../data/mockData';

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
  bounced: { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle },
  failed: { color: 'bg-red-100 text-red-700', icon: XCircle },
  spam: { color: 'bg-gray-100 text-gray-600', icon: AlertTriangle },
};

export default function EmailLogs() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProvider, setFilterProvider] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const providers = ['all', 'Amazon SES', 'SendGrid', 'Mailgun', 'Brevo'];

  const filtered = emailLogs.filter(l => {
    const matchSearch = l.recipient.toLowerCase().includes(search.toLowerCase())
      || l.subject.toLowerCase().includes(search.toLowerCase())
      || l.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchProvider = filterProvider === 'all' || l.provider === filterProvider;
    return matchSearch && matchStatus && matchProvider;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Email Logs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Full audit trail of all email activity</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Delivered', value: emailLogs.filter(l => l.status === 'delivered').length, color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Bounced', value: emailLogs.filter(l => l.status === 'bounced').length, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Failed', value: emailLogs.filter(l => l.status === 'failed').length, color: 'text-red-700', bg: 'bg-red-50' },
          { label: 'Spam', value: emailLogs.filter(l => l.status === 'spam').length, color: 'text-gray-600', bg: 'bg-gray-50' },
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by recipient, subject, ID…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['all', 'delivered', 'bounced', 'failed', 'spam'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterStatus === s ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            value={filterProvider}
            onChange={e => setFilterProvider(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
          >
            {providers.map(p => <option key={p} value={p}>{p === 'all' ? 'All Providers' : p}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
          <Filter className="w-4 h-4" /> More Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Message ID', 'Recipient', 'Subject', 'Template', 'Provider', 'Status', 'Delivery', 'Open', 'Click', 'Time', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(log => {
                const cfg = statusConfig[log.status] || statusConfig.delivered;
                const StatusIcon = cfg.icon;
                const isExpanded = expandedRow === log.id;
                return (
                  <>
                    <tr key={log.id} className={`hover:bg-gray-50/60 transition-colors cursor-pointer group ${isExpanded ? 'bg-indigo-50/20' : ''}`} onClick={() => setExpandedRow(isExpanded ? null : log.id)}>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{log.id}</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{log.recipient}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 max-w-36 truncate">{log.subject}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-500">{log.template}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-500">{log.provider}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-500">{log.deliveryTime}</td>
                      <td className="px-4 py-3.5">
                        {log.opened ? <Mail className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4 text-gray-200" />}
                      </td>
                      <td className="px-4 py-3.5">
                        {log.clicked ? <MousePointer className="w-4 h-4 text-blue-500" /> : <MousePointer className="w-4 h-4 text-gray-200" />}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all" onClick={e => { e.stopPropagation(); }}>
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all" onClick={e => { e.stopPropagation(); }}>
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${log.id}-detail`}>
                        <td colSpan={11} className="px-5 py-4 bg-indigo-50/30 border-b border-indigo-100">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Message ID</p>
                              <p className="text-xs font-mono text-gray-700 break-all">{log.messageId}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Delivery Time</p>
                              <p className="text-xs text-gray-700">{log.deliveryTime}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Opened</p>
                              <p className={`text-xs font-medium ${log.opened ? 'text-green-600' : 'text-gray-400'}`}>{log.opened ? '✓ Yes' : 'No'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Clicked</p>
                              <p className={`text-xs font-medium ${log.clicked ? 'text-blue-600' : 'text-gray-400'}`}>{log.clicked ? '✓ Yes' : 'No'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {emailLogs.length} logs</p>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">Prev</button>
            <button className="w-7 h-7 rounded-lg text-xs font-medium bg-indigo-600 text-white">1</button>
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
