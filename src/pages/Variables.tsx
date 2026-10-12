import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Search, Variable } from 'lucide-react';

const variables = [
  { id: 1, name: 'company_name', value: 'Acme Corp', type: 'string', scope: 'global', used: 14 },
  { id: 2, name: 'support_email', value: 'support@acme.com', type: 'email', scope: 'global', used: 8 },
  { id: 3, name: 'dashboard_url', value: 'https://app.acme.com', type: 'url', scope: 'global', used: 12 },
  { id: 4, name: 'trial_days', value: '14', type: 'number', scope: 'global', used: 3 },
  { id: 5, name: 'primary_color', value: '#4F46E5', type: 'color', scope: 'branding', used: 7 },
  { id: 6, name: 'logo_url', value: 'https://acme.com/logo.png', type: 'url', scope: 'branding', used: 11 },
  { id: 7, name: 'unsubscribe_url', value: 'https://app.acme.com/unsub', type: 'url', scope: 'system', used: 14 },
  { id: 8, name: 'current_year', value: '2025', type: 'number', scope: 'system', used: 14 },
];

const scopeColors: Record<string, string> = {
  global: 'bg-indigo-100 text-indigo-700',
  branding: 'bg-purple-100 text-purple-700',
  system: 'bg-gray-100 text-gray-600',
};

const typeColors: Record<string, string> = {
  string: 'bg-blue-50 text-blue-600',
  email: 'bg-green-50 text-green-600',
  url: 'bg-amber-50 text-amber-600',
  number: 'bg-pink-50 text-pink-600',
  color: 'bg-purple-50 text-purple-600',
};

export default function Variables() {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = variables.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Variables</h1>
          <p className="text-sm text-gray-500 mt-0.5">Reusable variables for email templates</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> Add Variable
        </button>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Create Variable</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Variable Name</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm font-mono">{"{{ "}</span>
                  <input placeholder="variable_name" className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                  <span className="text-gray-400 text-sm font-mono">{" }}"}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Value</label>
                <input placeholder="Enter default value" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  {['string', 'email', 'url', 'number', 'color'].map(t => <option key={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Scope</label>
                <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  {['global', 'branding', 'system'].map(s => <option key={s} className="capitalize">{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Cancel</button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">Create Variable</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search variables…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Variable', 'Default Value', 'Type', 'Scope', 'Used In', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(v => (
              <tr key={v.id} className="hover:bg-gray-50/60 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Variable className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <code className="text-sm font-mono font-medium text-gray-800">{`{{${v.name}}}`}</code>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600 font-mono max-w-xs truncate">{v.value}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium font-mono ${typeColors[v.type] || 'bg-gray-100 text-gray-600'}`}>{v.type}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${scopeColors[v.scope]}`}>{v.scope}</span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{v.used} templates</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"><Copy className="w-3.5 h-3.5" /></button>
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
  );
}
