import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Bell, Lock, Globe, CreditCard, Shield } from 'lucide-react';

export function Settings() {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);
  const [activeTab, setActiveTab] = useState('account');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(user?.name || '');

  const tabs = [
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'visibility', label: 'Visibility', icon: Globe },
  ];

  const handleUpdateUsername = () => {
    updateUser({ name: username });
  };

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      // In a real app, you would make an API call here
      console.log('Updating password...');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Account Settings</h2>
              
              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  value={user?.email}
                  disabled
                />
                <div className="space-y-2">
                  <Input
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button onClick={handleUpdateUsername}>Update Username</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button onClick={handleUpdatePassword}>Update Password</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <Button variant="secondary">Delete Account</Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              <div className="space-y-4">
                {['likes', 'comments', 'follows', 'mentions'].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{type}</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications when someone {type} your content
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add other tab contents as needed */}
        </div>
      </div>
    </div>
  );
}