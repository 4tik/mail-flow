import { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, RefreshCw, Check, Shield, Clock, Key } from 'lucide-react';
import { apiKeys } from '../data/mockData';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  expiring: 'bg-amber-100 text-amber-700',
  revoked: 'bg-red-100 text-red-700',
};

const permColors: Record<string, string> = {
  send: 'bg-blue-100 text-blue-700',
  read: 'bg-indigo-100 text-indigo-700',
  manage: 'bg-purple-100 text-purple-700',
};

export default function ApiKeys() {
  const [showKey, setShowKey] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const handleCopy = (id: number, key: string) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">API Keys</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your API access keys and permissions</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> Create Key
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Keep your API keys secure</p>
          <p className="text-xs text-amber-700 mt-0.5">Never expose API keys in client-side code or public repositories. Rotate keys regularly for security.</p>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Create API Key</h2>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-all text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Key Name</label>
                <input placeholder="e.g. Production API Key" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  {[['send', 'Send emails via API'], ['read', 'Read logs and analytics'], ['manage', 'Manage domains, templates, contacts']].map(([perm, desc]) => (
                    <label key={perm} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                      <input type="checkbox" defaultChecked={perm === 'send'} className="text-indigo-600 rounded" />
                      <div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${permColors[perm]}`}>{perm}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option>Never</option>
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>Custom date</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Cancel</button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">Create Key</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Name', 'Key', 'Permissions', 'Created', 'Last Used', 'Expiry', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {apiKeys.map(k => (
                <tr key={k.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Key className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{k.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {showKey === k.id ? k.key.replace(/•+/, 'sk_real_key_here') : k.key}
                      </code>
                      <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        {showKey === k.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleCopy(k.id, k.key)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                        {copied === k.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {k.permissions.map(p => (
                        <span key={p} className={`px-2 py-0.5 rounded-full text-xs font-medium ${permColors[p]}`}>{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{k.created}</td>
                  <td className="px-5 py-4 text-xs text-gray-500">{k.lastUsed}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {k.expiry}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[k.status]}`}>
                      {k.status.charAt(0).toUpperCase() + k.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all" title="Rotate Key">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all" title="Revoke">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
