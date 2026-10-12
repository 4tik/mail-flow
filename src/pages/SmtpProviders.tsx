import { useState } from 'react';
import { Plus, X, Edit, Trash2, Wifi, WifiOff, CheckCircle, Server, ChevronRight } from 'lucide-react';
import { smtpProviders } from '../data/mockData';

const providerLogos: Record<string, { bg: string; label: string; abbr: string }> = {
  'Amazon SES': { bg: 'bg-orange-100', label: 'SES', abbr: 'AWS' },
  'SendGrid': { bg: 'bg-blue-100', label: 'SG', abbr: 'SG' },
  'Mailgun': { bg: 'bg-red-100', label: 'MG', abbr: 'MG' },
  'Brevo': { bg: 'bg-green-100', label: 'BR', abbr: 'BR' },
  'Gmail SMTP': { bg: 'bg-red-100', label: 'GM', abbr: 'GM' },
  'SMTP': { bg: 'bg-gray-100', label: 'SMTP', abbr: 'SMTP' },
};

const providerColors: Record<string, string> = {
  'Amazon SES': 'text-orange-700',
  'SendGrid': 'text-blue-700',
  'Mailgun': 'text-red-700',
  'Brevo': 'text-green-700',
  'Gmail SMTP': 'text-red-700',
  'SMTP': 'text-gray-700',
};

type ModalProps = { open: boolean; onClose: () => void };

function AddProviderModal({ open, onClose }: ModalProps) {
  const [selected, setSelected] = useState('');
  if (!open) return null;
  const providers = ['Amazon SES', 'SendGrid', 'Mailgun', 'Brevo', 'Gmail SMTP', 'Custom SMTP'];
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Add SMTP Provider</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">Choose a provider to configure</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {providers.map(p => {
              const logo = providerLogos[p] || { bg: 'bg-gray-100', label: p.slice(0,2), abbr: p.slice(0,2) };
              return (
                <button
                  key={p}
                  onClick={() => setSelected(p)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${selected === p ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`w-9 h-9 rounded-lg ${logo.bg} flex items-center justify-center font-bold text-xs ${providerColors[p] || 'text-gray-700'}`}>
                    {logo.abbr}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{p}</span>
                  {selected === p && <CheckCircle className="w-4 h-4 text-indigo-600 ml-auto" />}
                </button>
              );
            })}
          </div>
          {selected && (
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <h3 className="font-semibold text-gray-800 text-sm">{selected} Configuration</h3>
              {['SMTP Host', 'Port', 'Username', 'Password'].map(field => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{field}</label>
                  <input
                    type={field === 'Password' ? 'password' : 'text'}
                    placeholder={field === 'Port' ? '587' : `Enter ${field.toLowerCase()}`}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="tls" defaultChecked className="rounded" />
                <label htmlFor="tls" className="text-sm text-gray-600">Enable TLS/STARTTLS</label>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Cancel</button>
          <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm" disabled={!selected}>
            Add Provider
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SmtpProviders() {
  const [showModal, setShowModal] = useState(false);
  const [testingId, setTestingId] = useState<number | null>(null);
  const [testedId, setTestedId] = useState<number | null>(null);

  const handleTest = (id: number) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setTestedId(id);
      setTimeout(() => setTestedId(null), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">SMTP Providers</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your email delivery providers</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {smtpProviders.map(p => {
          const logo = providerLogos[p.name] || { bg: 'bg-gray-100', label: p.name.slice(0,2), abbr: p.name.slice(0,2) };
          const isConnected = p.status === 'connected';
          return (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${logo.bg} flex items-center justify-center font-bold text-sm ${providerColors[p.name] || 'text-gray-700'}`}>
                    {logo.abbr}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {isConnected
                        ? <><Wifi className="w-3 h-3 text-green-500" /><span className="text-xs text-green-600 font-medium">Connected</span></>
                        : <><WifiOff className="w-3 h-3 text-gray-400" /><span className="text-xs text-gray-400">Disconnected</span></>
                      }
                    </div>
                  </div>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full mt-1 ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <Server className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Host</p>
                    <p className="text-xs text-gray-700 truncate">{p.host}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Port</p>
                    <p className="text-xs text-gray-700 font-mono">{p.port}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">TLS</p>
                    <p className="text-xs text-gray-700">{p.tls ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Username</p>
                  <p className="text-xs text-gray-700 font-mono truncate">{p.username}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Emails sent</p>
                  <p className="text-sm font-bold text-gray-800">{p.emails.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTest(p.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      testingId === p.id
                        ? 'bg-indigo-100 text-indigo-600 cursor-wait'
                        : testedId === p.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {testingId === p.id ? 'Testing…' : testedId === p.id ? '✓ OK' : 'Test'}
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Card */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all min-h-48 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-200 group-hover:bg-indigo-100 flex items-center justify-center transition-all">
            <Plus className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-all" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 group-hover:text-indigo-700 transition-all">Add Provider</p>
            <p className="text-xs text-gray-400 mt-0.5">Connect a new SMTP provider</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-all" />
        </button>
      </div>

      <AddProviderModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
