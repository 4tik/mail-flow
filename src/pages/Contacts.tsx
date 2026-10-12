import { useState } from 'react';
import { Plus, Search, Upload, Download, Trash2, Send, Edit, Filter, CheckSquare, Square, Mail, Phone } from 'lucide-react';
import { contacts } from '../data/mockData';

const statusColors: Record<string, string> = {
  subscribed: 'bg-green-100 text-green-700',
  unsubscribed: 'bg-gray-100 text-gray-600',
  bounced: 'bg-red-100 text-red-700',
  complained: 'bg-amber-100 text-amber-700',
};

const tagColors = ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700', 'bg-pink-100 text-pink-700'];

export default function Contacts() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(c => c.id));
  };

  const avatarColors = ['bg-indigo-100 text-indigo-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700', 'bg-red-100 text-red-700', 'bg-pink-100 text-pink-700', 'bg-teal-100 text-teal-700'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your subscriber list</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-gray-50">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: '8', color: 'text-gray-900', bg: 'bg-gray-50' },
          { label: 'Subscribed', value: '6', color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Unsubscribed', value: '1', color: 'text-gray-600', bg: 'bg-gray-50' },
          { label: 'Bounced', value: '1', color: 'text-red-700', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bulk Actions Bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-indigo-700">{selected.length} selected</span>
          <div className="flex items-center gap-2 ml-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              <Send className="w-3.5 h-3.5" /> Send Campaign
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
          <button onClick={() => setSelected([])} className="ml-auto text-xs text-indigo-500 hover:text-indigo-700">Clear</button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['all', 'subscribed', 'unsubscribed', 'bounced'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterStatus === s ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 w-10">
                  <button onClick={toggleAll} className="text-gray-400 hover:text-indigo-600 transition-colors">
                    {selected.length === filtered.length && filtered.length > 0
                      ? <CheckSquare className="w-4 h-4 text-indigo-600" />
                      : <Square className="w-4 h-4" />
                    }
                  </button>
                </th>
                {['Contact', 'Email', 'Phone', 'Tags', 'Status', 'Last Email', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c, i) => {
                const avatarColor = avatarColors[i % avatarColors.length];
                const isSelected = selected.includes(c.id);
                return (
                  <tr key={c.id} className={`hover:bg-gray-50/60 transition-colors group ${isSelected ? 'bg-indigo-50/30' : ''}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleSelect(c.id)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                        {isSelected ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                          {c.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {c.email}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {c.phone}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((tag, ti) => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[ti % tagColors.length]}`}>{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500">{c.lastEmail}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"><Send className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {contacts.length} contacts</p>
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
