import { useState } from 'react';
import { Search, RefreshCw, Trash2, Clock, Zap, RotateCcw, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { emailQueue } from '../data/mockData';

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  pending: { color: 'bg-blue-100 text-blue-700', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-indigo-100 text-indigo-700', icon: Loader2, label: 'Processing' },
  success: { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Success' },
  failed: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Failed' },
  retrying: { color: 'bg-amber-100 text-amber-700', icon: RotateCcw, label: 'Retrying' },
};

const priorityColors: Record<string, string> = {
  high: 'text-red-600 bg-red-50',
  normal: 'text-gray-600 bg-gray-50',
  low: 'text-green-600 bg-green-50',
};

export default function EmailQueue() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filtered = emailQueue.filter(q => {
    const matchSearch = q.recipient.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    pending: emailQueue.filter(q => q.status === 'pending').length,
    processing: emailQueue.filter(q => q.status === 'processing').length,
    retrying: emailQueue.filter(q => q.status === 'retrying').length,
    failed: emailQueue.filter(q => q.status === 'failed').length,
    success: emailQueue.filter(q => q.status === 'success').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Email Queue</h1>
          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
            Live monitor
            <span className="flex items-center gap-1 text-green-600 font-medium text-xs">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-gray-50 ${refreshing ? 'cursor-wait' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-red-100">
            <Trash2 className="w-4 h-4" /> Clear Failed
          </button>
        </div>
      </div>

      {/* Queue Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(counts).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className={`rounded-xl p-4 border border-gray-100 ${
              status === 'failed' ? 'bg-red-50' : status === 'processing' ? 'bg-indigo-50' : status === 'retrying' ? 'bg-amber-50' : status === 'success' ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${
                  status === 'failed' ? 'text-red-500' : status === 'processing' ? 'text-indigo-500 animate-spin' : status === 'retrying' ? 'text-amber-500' : status === 'success' ? 'text-green-500' : 'text-gray-400'
                }`} />
                <span className={`text-2xl font-bold ${
                  status === 'failed' ? 'text-red-700' : status === 'processing' ? 'text-indigo-700' : status === 'retrying' ? 'text-amber-700' : status === 'success' ? 'text-green-700' : 'text-gray-700'
                }`}>{count}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{cfg.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or recipient…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['all', 'pending', 'processing', 'retrying', 'failed', 'success'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterStatus === s ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
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
                {['Queue ID', 'Recipient', 'Subject', 'Provider', 'Priority', 'Attempts', 'Status', 'Scheduled Time', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(q => {
                const cfg = statusConfig[q.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={q.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{q.id}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-800">{q.recipient}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 max-w-xs truncate">{q.subject}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{q.provider}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${priorityColors[q.priority]}`}>
                        {q.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        {q.attempts > 0 && <AlertCircle className={`w-3.5 h-3.5 ${q.attempts >= 3 ? 'text-red-400' : 'text-amber-400'}`} />}
                        {q.attempts}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                        <StatusIcon className={`w-3 h-3 ${q.status === 'processing' ? 'animate-spin' : q.status === 'retrying' ? 'animate-spin' : ''}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {q.scheduled}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {(q.status === 'failed' || q.status === 'retrying') && (
                          <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all" title="Retry">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all" title="Prioritize">
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all" title="Remove">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">Showing {filtered.length} items · Updates every 30s</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin text-indigo-500' : ''}`} />
            Last updated just now
          </div>
        </div>
      </div>
    </div>
  );
}
