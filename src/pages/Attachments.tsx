import { useState } from 'react';
import { Upload, Search, Trash2, Download, File, FileText, Image, Table, Eye } from 'lucide-react';
import { attachments } from '../data/mockData';

const typeIcons: Record<string, { icon: typeof File; color: string; bg: string }> = {
  PDF: { icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  PNG: { icon: Image, color: 'text-blue-600', bg: 'bg-blue-50' },
  JPEG: { icon: Image, color: 'text-green-600', bg: 'bg-green-50' },
  Excel: { icon: Table, color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

export default function Attachments() {
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const filtered = attachments.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Attachments</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage reusable files for email templates</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
      >
        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Upload className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-sm font-medium text-gray-700">Drag & drop files here, or <span className="text-indigo-600">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPEG, Excel · Max 10MB</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search attachments…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['File', 'Type', 'Size', 'Used By', 'Uploaded', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(a => {
              const cfg = typeIcons[a.type] || { icon: File, color: 'text-gray-600', bg: 'bg-gray-50' };
              const Icon = cfg.icon;
              return (
                <tr key={a.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>{a.type}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{a.size}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{a.usedBy} templates</td>
                  <td className="px-5 py-4 text-xs text-gray-500">{a.uploaded}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all"><Download className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
