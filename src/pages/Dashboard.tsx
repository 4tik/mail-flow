import React from 'react';
import {
  Mail, Send, CheckCircle, Eye, MousePointer, AlertTriangle, XCircle, Globe,
  TrendingUp, TrendingDown, ArrowUpRight, Zap
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  emailActivityData, monthlyData, providerData, deliveryStatsData,
  emailLogs, templates
} from '../data/mockData';

const StatCard = ({
  title, value, description, trend, trendUp, icon: Icon, color, bgColor, chartData, chartColor
}: {
  title: string; value: string; description: string; trend: string; trendUp: boolean;
  icon: React.ElementType; color: string; bgColor: string; chartData: number[]; chartColor: string;
}) => {
  const miniData = chartData.map((v, i) => ({ v, i }));
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </span>
      </div>
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <div className="h-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={miniData}>
            <defs>
              <linearGradient id={`grad-${chartColor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={chartColor} strokeWidth={1.5} fill={`url(#grad-${chartColor})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const statCards = [
  {
    title: 'Total Emails', value: '2.28M', description: 'All time sent',
    trend: '+12.4%', trendUp: true, icon: Mail, color: 'text-indigo-600', bgColor: 'bg-indigo-50',
    chartData: [3800, 4200, 5100, 4800, 6200, 7100, 8200, 9100, 8600, 7300, 9800, 10200],
    chartColor: '#4F46E5'
  },
  {
    title: 'Sent Today', value: '18,642', description: 'Updated just now',
    trend: '+8.2%', trendUp: true, icon: Send, color: 'text-sky-600', bgColor: 'bg-sky-50',
    chartData: [2100, 2800, 3100, 2600, 3400, 4100, 3800, 4500, 5100, 4800, 5600, 6200],
    chartColor: '#0EA5E9'
  },
  {
    title: 'Delivered', value: '17,948', description: '96.3% delivery rate',
    trend: '+2.1%', trendUp: true, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50',
    chartData: [1900, 2700, 2900, 2500, 3300, 3900, 3600, 4300, 4900, 4600, 5400, 5900],
    chartColor: '#22C55E'
  },
  {
    title: 'Open Rate', value: '38.4%', description: 'Industry avg: 21.3%',
    trend: '+4.7%', trendUp: true, icon: Eye, color: 'text-purple-600', bgColor: 'bg-purple-50',
    chartData: [28, 31, 34, 30, 36, 39, 37, 40, 42, 39, 44, 46],
    chartColor: '#9333EA'
  },
  {
    title: 'Click Rate', value: '9.8%', description: 'Unique clicks',
    trend: '+1.2%', trendUp: true, icon: MousePointer, color: 'text-amber-600', bgColor: 'bg-amber-50',
    chartData: [6, 7, 8, 7, 9, 10, 9, 11, 12, 11, 13, 14],
    chartColor: '#F59E0B'
  },
  {
    title: 'Bounce Rate', value: '2.1%', description: 'Hard + soft bounces',
    trend: '-0.3%', trendUp: true, icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50',
    chartData: [3.2, 2.9, 2.8, 3.0, 2.7, 2.5, 2.4, 2.3, 2.2, 2.4, 2.1, 2.0],
    chartColor: '#F97316'
  },
  {
    title: 'Failed Emails', value: '694', description: 'Requires attention',
    trend: '+0.8%', trendUp: false, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50',
    chartData: [420, 380, 450, 410, 390, 480, 520, 460, 440, 500, 520, 580],
    chartColor: '#EF4444'
  },
  {
    title: 'Active Domains', value: '4', description: '2 pending verification',
    trend: '0%', trendUp: true, icon: Globe, color: 'text-teal-600', bgColor: 'bg-teal-50',
    chartData: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
    chartColor: '#14B8A6'
  },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    delivered: 'bg-green-100 text-green-700',
    bounced: 'bg-amber-100 text-amber-700',
    failed: 'bg-red-100 text-red-700',
    spam: 'bg-gray-100 text-gray-700',
    pending: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
    retrying: 'bg-amber-100 text-amber-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500 capitalize">{p.name}:</span>
            <span className="font-medium text-gray-800">{typeof p.value === 'number' && p.value > 100 ? p.value.toLocaleString() : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Email Activity</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 14 days</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {['14D', '30D', '90D'].map((p, i) => (
                <button key={p} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${i === 0 ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={emailActivityData}>
              <defs>
                {[['sent','#4F46E5'],['delivered','#22C55E'],['opened','#0EA5E9'],['bounced','#F59E0B']].map(([key, color]) => (
                  <linearGradient key={key} id={`grad${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px', color: '#6B7280' }} />
              <Area type="monotone" dataKey="sent" stroke="#4F46E5" strokeWidth={2} fill="url(#gradsent)" dot={false} />
              <Area type="monotone" dataKey="delivered" stroke="#22C55E" strokeWidth={2} fill="url(#graddelivered)" dot={false} />
              <Area type="monotone" dataKey="opened" stroke="#0EA5E9" strokeWidth={2} fill="url(#gradopened)" dot={false} />
              <Area type="monotone" dataKey="bounced" stroke="#F59E0B" strokeWidth={2} fill="url(#gradbounced)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Delivery Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Delivery Stats</h3>
              <p className="text-xs text-gray-400 mt-0.5">This month</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={deliveryStatsData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {deliveryStatsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-2">
            {deliveryStatsData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Volume */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Volume</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
            </div>
            <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px', color: '#6B7280' }} />
              <Bar dataKey="sent" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delivered" fill="#22C55E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opened" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Provider Usage */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Provider Usage</h3>
              <p className="text-xs text-gray-400 mt-0.5">By volume</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={providerData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={3} dataKey="value">
                {providerData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {providerData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 w-7 text-right">{d.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Email Logs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-semibold text-gray-900">Recent Email Logs</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest activity</p>
            </div>
            <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700 flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {emailLogs.slice(0, 6).map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm text-gray-800 font-medium">{log.recipient}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">{log.subject}</td>
                    <td className="px-5 py-3 text-xs text-gray-500">{log.provider}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Queue + Top Templates */}
        <div className="space-y-4">
          {/* Queue Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Queue Status</h3>
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Pending', count: 8, color: 'bg-blue-500', light: 'text-blue-600' },
                { label: 'Processing', count: 3, color: 'bg-indigo-500', light: 'text-indigo-600' },
                { label: 'Retrying', count: 2, color: 'bg-amber-500', light: 'text-amber-600' },
                { label: 'Failed', count: 1, color: 'bg-red-500', light: 'text-red-600' },
              ].map(q => (
                <div key={q.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${q.color}`} />
                    <span className="text-sm text-gray-600">{q.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${q.light}`}>{q.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-gray-500">Avg. delivery time: <span className="font-semibold text-gray-800">0.9s</span></span>
              </div>
            </div>
          </div>

          {/* Top Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Top Templates</h3>
              <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700">View all</button>
            </div>
            <div className="space-y-3">
              {templates.slice(0, 4).map((t, i) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300 w-4">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.opens}% open rate</p>
                  </div>
                  <div className="w-12 h-1.5 rounded-full bg-gray-100">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${t.opens}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
