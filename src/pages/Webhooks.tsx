import { useState } from 'react';
import { Plus, Edit, Trash2, Play, Pause, Copy, Check, Webhook, Zap } from 'lucide-react';
import { webhooks } from '../data/mockData';

const eventColors: Record<string, string> = {
  'email.delivered': 'bg-green-100 text-green-700',
  'email.opened': 'bg-blue-100 text-blue-700',
  'email.clicked': 'bg-indigo-100 text-indigo-700',
  'email.bounced': 'bg-amber-100 text-amber-700',
  'email.failed': 'bg-red-100 text-red-700',
  'email.complaint': 'bg-orange-100 text-orange-700',
};

export default function Webhooks() {
  const [copied, setCopied] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const handleCopy = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Webhooks</h1>
          <p className="text-sm text-gray-500 mt-0.5">Receive real-time notifications for email events</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> Add Webhook
        </button>
      </div>

      {/* Supported Events */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">Supported Events</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(eventColors).map(([event, color]) => (
            <span key={event} className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${color}`}>
              <Zap className="w-3 h-3" />
              {event}
            </span>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Create Webhook</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Endpoint URL</label>
                <input placeholder="https://api.yoursite.com/webhooks/email" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Events to subscribe</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Object.keys(eventColors).map(event => (
                    <label key={event} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" defaultChecked className="text-indigo-600 rounded" />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${eventColors[event]}`}>{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Secret (optional)</label>
                <input type="password" placeholder="Webhook signing secret" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <p className="text-xs text-gray-400 mt-1">Used to verify webhook payloads</p>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Cancel</button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">Create Webhook</button>
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
                {['Event', 'Endpoint URL', 'Secret', 'Status', 'Last Trigger', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {webhooks.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${eventColors[w.event] || 'bg-gray-100 text-gray-600'}`}>
                      <Zap className="w-3 h-3" />
                      {w.event}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <Webhook className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 font-mono max-w-xs truncate">{w.url}</span>
                      </div>
                      <button onClick={() => handleCopy(w.id)} className="text-gray-400 hover:text-indigo-600 transition-colors flex-shrink-0">
                        {copied === w.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono">{w.secret}</code>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${w.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${w.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                      {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{w.lastTrigger}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all" title={w.status === 'active' ? 'Pause' : 'Activate'}>
                        {w.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
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
