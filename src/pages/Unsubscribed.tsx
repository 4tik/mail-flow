import { useState } from 'react';
import { Search, Download, UserMinus, RefreshCw } from 'lucide-react';

const unsubscribed = [
  { id: 1, email: 'opt.out@example.com', name: 'Jane Smith', date: '2025-01-12', reason: 'Too many emails', source: 'Unsubscribe Link' },
  { id: 2, email: 'noemail@client.net', name: 'Tom Brown', date: '2025-01-10', reason: 'Not relevant', source: 'Preference Center' },
  { id: 3, email: 'remove@domain.co', name: 'Lisa Ray', date: '2025-01-08', reason: 'Never signed up', source: 'Unsubscribe Link' },
  { id: 4, email: 'optout2@firm.com', name: 'Paul Adams', date: '2025-01-06', reason: 'Content not useful', source: 'API' },
  { id: 5, email: 'unsub@biz.org', name: 'Cathy Moore', date: '2024-12-30', reason: 'Prefer fewer emails', source: 'Preference Center' },
];

export default function Unsubscribed() {
  const [search, setSearch] = useState('');
  const filtered = unsubscribed.filter(u => u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Unsubscribed</h1>
          <p className="text-sm text-gray-500 mt-0.5">Users who have opted out of all emails</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-gray-50">
          <Download className="w-4 h-4" /> Export List
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Unsubscribed', value: unsubscribed.length, icon: UserMinus, color: 'text-gray-700', bg: 'bg-gray-50' },
          { label: 'This Month', value: 4, icon: RefreshCw, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Unsubscribe Rate', value: '0.2%', icon: UserMinus, color: 'text-green-700', bg: 'bg-green-50' },
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search unsubscribed…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Email', 'Name', 'Reason', 'Source', 'Date'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-gray-800 font-mono">{u.email}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{u.name}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{u.reason}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{u.source}</span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
