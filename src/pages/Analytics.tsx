import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, Mail, Eye, MousePointer, AlertTriangle, ShieldAlert } from 'lucide-react';
import { emailActivityData, monthlyData, providerData, deviceData, geoData } from '../data/mockData';

const metrics = [
  { label: 'Emails Sent', value: '228,042', change: '+12.4%', up: true, color: '#4F46E5', bg: 'bg-indigo-50', text: 'text-indigo-600', icon: Mail },
  { label: 'Delivery Rate', value: '95.8%', change: '+0.4%', up: true, color: '#22C55E', bg: 'bg-green-50', text: 'text-green-600', icon: TrendingUp },
  { label: 'Open Rate', value: '38.4%', change: '+4.7%', up: true, color: '#0EA5E9', bg: 'bg-sky-50', text: 'text-sky-600', icon: Eye },
  { label: 'Click Rate', value: '9.8%', change: '+1.2%', up: true, color: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-600', icon: MousePointer },
  { label: 'Bounce Rate', value: '2.1%', change: '-0.3%', up: true, color: '#F97316', bg: 'bg-orange-50', text: 'text-orange-600', icon: AlertTriangle },
  { label: 'Spam Rate', value: '0.07%', change: '-0.01%', up: true, color: '#EF4444', bg: 'bg-red-50', text: 'text-red-600', icon: ShieldAlert },
];

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

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Performance insights and trends</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {['7D', '30D', '90D', '1Y'].map((p, i) => (
            <button key={p} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${i === 1 ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all">
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${m.text}`} />
              </div>
              <p className="text-xl font-bold text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-2">{m.label}</p>
              <span className={`flex items-center gap-1 text-xs font-medium ${m.up ? 'text-green-600' : 'text-red-600'}`}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Email Activity Area Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-gray-900">Email Activity (Daily)</h3>
            <p className="text-xs text-gray-400 mt-0.5">Sent, Delivered, Opened, Clicked over last 14 days</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={emailActivityData}>
            <defs>
              {[['sent','#4F46E5'],['delivered','#22C55E'],['opened','#0EA5E9'],['clicked','#F59E0B']].map(([k, c]) => (
                <linearGradient key={k} id={`an${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px' }} />
            <Area type="monotone" dataKey="sent" stroke="#4F46E5" strokeWidth={2} fill="url(#ansent)" dot={false} />
            <Area type="monotone" dataKey="delivered" stroke="#22C55E" strokeWidth={2} fill="url(#andelivered)" dot={false} />
            <Area type="monotone" dataKey="opened" stroke="#0EA5E9" strokeWidth={2} fill="url(#anopened)" dot={false} />
            <Area type="monotone" dataKey="clicked" stroke="#F59E0B" strokeWidth={2} fill="url(#anclicked)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Row 2: Bar Chart + Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Comparison Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Monthly Volume</h3>
            <p className="text-xs text-gray-400 mt-0.5">Last 6 months comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="sent" fill="#4F46E5" radius={[4,4,0,0]} />
              <Bar dataKey="opened" fill="#0EA5E9" radius={[4,4,0,0]} />
              <Bar dataKey="clicked" fill="#F59E0B" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bounce + Spam Line */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Bounce & Failed Trends</h3>
            <p className="text-xs text-gray-400 mt-0.5">Daily bounce and failed email count</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={emailActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="bounced" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3, fill: '#F59E0B' }} />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} dot={{ r: 3, fill: '#EF4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Donut Charts + Geo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Provider Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-5">Provider Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={providerData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {providerData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {providerData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-5">Device Statistics</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                {deviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-3">
            {deviceData.map(d => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                <div className="w-20 h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                </div>
                <span className="text-xs font-bold text-gray-800 w-8 text-right">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-5">Geographic Opens</h3>
          <div className="space-y-3">
            {geoData.map((g, i) => (
              <div key={g.country} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs font-bold w-4">#{i+1}</span>
                    <span className="text-sm text-gray-700">{g.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{g.opens.toLocaleString()}</span>
                    <span className="text-xs font-bold text-gray-800 w-10 text-right">{g.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(g.pct / geoData[0].pct) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
