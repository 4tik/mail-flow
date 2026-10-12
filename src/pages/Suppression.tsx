import { useState } from 'react';
import { Search, Download, Trash2, Plus, ShieldOff, AlertTriangle, XCircle } from 'lucide-react';
import { suppressionList } from '../data/mockData';

const typeColors: Record<string, string> = {
  bounce: 'bg-amber-100 text-amber-700',
  complaint: 'bg-red-100 text-red-700',
};

export default function Suppression() {
  const [search, setSearch] = useState('');
  const filtered = suppressionList.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Suppression List</h1>
          <p className="text-sm text-gray-500 mt-0.5">Emails that are permanently blocked from receiving messages</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
            <Plus className="w-4 h-4" /> Add Manually
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Suppressed', value: suppressionList.length, icon: ShieldOff, color: 'text-gray-700', bg: 'bg-gray-50' },
          { label: 'Hard Bounces', value: suppressionList.filter(s => s.reason.includes('Hard')).length, icon: XCircle, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Spam Complaints', value: suppressionList.filter(s => s.type === 'complaint').length, icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-50' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100 flex items-center gap-3`}>
              <Icon className={`w-5 h-5 ${s.color}`} />
              <div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppressed emails…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Email', 'Reason', 'Type', 'Domain', 'Date Added', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/60 transition-colors group">
                <td className="px-5 py-4 text-sm font-medium text-gray-800 font-mono">{s.email}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{s.reason}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[s.type]}`}>
                    {s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{s.domain}</td>
                <td className="px-5 py-4 text-xs text-gray-500">{s.date}</td>
                <td className="px-5 py-4">
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
