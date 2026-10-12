import { useState } from 'react';
import { Save, Camera, Lock, Shield, Globe } from 'lucide-react';

export default function Profile() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your personal account settings</p>
      </div>

      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        {[['profile', 'Profile'], ['security', 'Security'], ['preferences', 'Preferences']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${tab === id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                JD
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-all shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">John Doe</h3>
            <p className="text-sm text-gray-500 mt-0.5">Administrator</p>
            <p className="text-xs text-gray-400 mt-0.5">john@acme.com</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div><p className="text-lg font-bold text-gray-900">142</p><p className="text-xs text-gray-500">Campaigns</p></div>
                <div><p className="text-lg font-bold text-gray-900">2.28M</p><p className="text-xs text-gray-500">Emails Sent</p></div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input defaultValue="John" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input defaultValue="Doe" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input defaultValue="john@acme.com" type="email" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title</label>
              <input defaultValue="Head of Engineering" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input defaultValue="+1 555-0100" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm">
                <Save className="w-4 h-4" /> Save Profile
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div className="max-w-lg space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Lock className="w-4 h-4 text-indigo-600" /> Change Password</h2>
            {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
              <div key={f}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f}</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            ))}
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4"><Shield className="w-4 h-4 text-indigo-600" /> Two-Factor Authentication</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Authenticator App</p>
                <p className="text-xs text-gray-400 mt-0.5">Use Google Authenticator or similar</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">Enable</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'preferences' && (
        <div className="max-w-lg bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-600" /> Preferences</h2>
          {[
            { label: 'Language', type: 'select', options: ['English (US)', 'English (UK)', 'French', 'German', 'Spanish'] },
            { label: 'Timezone', type: 'select', options: ['UTC', 'US Eastern', 'US Pacific', 'Europe/London'] },
            { label: 'Date Format', type: 'select', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
            { label: 'Time Format', type: 'select', options: ['12 Hour', '24 Hour'] },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
