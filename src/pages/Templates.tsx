import { useState } from 'react';
import { Plus, Search, Eye, Copy, Edit, Trash2, Send, Grid, List, Tag, Clock, CheckCircle, FileText } from 'lucide-react';
import { templates } from '../data/mockData';

const categoryColors: Record<string, string> = {
  Transactional: 'bg-blue-100 text-blue-700',
  Marketing: 'bg-purple-100 text-purple-700',
  Billing: 'bg-green-100 text-green-700',
  Lifecycle: 'bg-amber-100 text-amber-700',
};

const TemplateCard = ({ t, onEdit }: { t: typeof templates[0]; onEdit: () => void }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
    {/* Thumbnail */}
    <div className="h-32 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      <div className="w-28 bg-white rounded-lg shadow-sm border border-gray-200 p-2 transform rotate-1 group-hover:rotate-0 transition-transform">
        <div className="h-2 bg-indigo-200 rounded mb-1.5 w-3/4" />
        <div className="h-1.5 bg-gray-200 rounded mb-1 w-full" />
        <div className="h-1.5 bg-gray-200 rounded mb-1 w-5/6" />
        <div className="h-1.5 bg-gray-200 rounded mb-2 w-4/6" />
        <div className="h-4 bg-indigo-400 rounded w-16 mx-auto" />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <button className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-1">
          <Eye className="w-3 h-3" /> Preview
        </button>
        <button onClick={onEdit} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-1">
          <Edit className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
        </span>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{t.name}</h3>
        <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[t.category] || 'bg-gray-100 text-gray-600'}`}>
          {t.category}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3 truncate">{t.subject}</p>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {t.variables} vars</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.updated}</span>
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {t.opens}%</span>
      </div>

      <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
          <Eye className="w-3 h-3" /> Preview
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
          <Send className="w-3 h-3" /> Test
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
          <Copy className="w-3 h-3" /> Clone
        </button>
        <button className="flex items-center justify-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

export default function Templates() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTemplate, setEditingTemplate] = useState<typeof templates[0] | null>(null);

  const categories = ['all', 'Transactional', 'Marketing', 'Billing', 'Lifecycle'];

  const filtered = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || t.category === filterCat;
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  if (editingTemplate) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setEditingTemplate(null)} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">← Back to Templates</button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-600">{editingTemplate.name}</span>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
          {/* Template List */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-3 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-600">Templates</p>
            </div>
            <div className="overflow-y-auto h-full divide-y divide-gray-50">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setEditingTemplate(t)}
                  className={`w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors ${editingTemplate.id === t.id ? 'bg-indigo-50' : ''}`}
                >
                  <p className={`text-xs font-medium truncate ${editingTemplate.id === t.id ? 'text-indigo-700' : 'text-gray-700'}`}>{t.name}</p>
                  <p className="text-xs text-gray-400">{t.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="col-span-6 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {['Save', 'Preview', 'Send Test', 'Publish'].map((btn, i) => (
                  <button key={btn} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    i === 3
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}>
                    {btn}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span>Saved</span>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100">
              <input
                defaultValue={editingTemplate.subject}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email Subject Line…"
              />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="min-h-full border border-gray-200 rounded-xl p-4 font-mono text-xs text-gray-700 bg-gray-50">
{`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>{{subject}}</title>
  <style>
    body { font-family: Inter, sans-serif; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #4F46E5; padding: 32px; }
    .content { padding: 32px; }
    .btn { background: #4F46E5; color: #fff; padding: 12px 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{company_name}}</h1>
    </div>
    <div class="content">
      <h2>Hello, {{first_name}}!</h2>
      <p>{{email_body}}</p>
      <a href="{{cta_url}}" class="btn">
        {{cta_text}}
      </a>
    </div>
  </div>
</body>
</html>`}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-4 space-y-4 overflow-y-auto">
            {/* Variables */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Template Variables</h3>
              <div className="space-y-2">
                {['first_name', 'company_name', 'email_body', 'cta_url', 'cta_text'].map(v => (
                  <div key={v} className="flex items-center justify-between py-1.5 px-2.5 bg-gray-50 rounded-lg">
                    <code className="text-xs text-indigo-600 font-mono">{`{{${v}}}`}</code>
                    <button className="text-xs text-gray-400 hover:text-gray-600">Insert</button>
                  </div>
                ))}
              </div>
              <button className="mt-2 w-full text-xs text-indigo-600 font-medium hover:text-indigo-700 py-1.5">+ Add Variable</button>
            </div>
            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Live Preview</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-indigo-600 p-4">
                  <div className="text-white font-bold text-sm">MailFlow</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Hello, John!</h4>
                  <p className="text-xs text-gray-600 mb-3">Your email body content goes here with all the details about your message.</p>
                  <div className="bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg w-fit">Get Started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-sm text-gray-500 mt-0.5">{templates.length} templates · {templates.filter(t => t.status === 'published').length} published</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterCat === c ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {['all', 'published', 'draft'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filterStatus === s ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1 ml-auto">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(t => <TemplateCard key={t.id} t={t} onEdit={() => setEditingTemplate(t)} />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Template', 'Subject', 'Category', 'Variables', 'Open Rate', 'Updated', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 max-w-xs truncate">{t.subject}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[t.category] || 'bg-gray-100 text-gray-600'}`}>{t.category}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{t.variables}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">{t.opens}%</td>
                  <td className="px-5 py-4 text-xs text-gray-500">{t.updated}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditingTemplate(t)} className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all"><Send className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
