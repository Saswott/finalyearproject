import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, Lock, Volume2, Palette } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    sound: true,
    language: 'english',
    privacy: 'friends',
    theme: 'system'
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const TabButton = ({ id, active, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors
        ${active 
          ? 'bg-purple-100 text-purple-700' 
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      {children}
    </button>
  );

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
        checked ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2">
          <Palette className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b pb-4">
          <TabButton id="general" active={activeTab === 'general'}>
            General
          </TabButton>
          <TabButton id="notifications" active={activeTab === 'notifications'}>
            Notifications
          </TabButton>
          <TabButton id="privacy" active={activeTab === 'privacy'}>
            Privacy
          </TabButton>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
              <p className="text-gray-500">Manage your app preferences</p>

              <div className="space-y-6">
                {/* Dark Mode Setting */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {settings.darkMode ? 
                      <Moon className="w-5 h-5 text-purple-500" /> : 
                      <Sun className="w-5 h-5 text-yellow-500" />
                    }
                    <div>
                      <h3 className="font-medium text-gray-900">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Toggle dark theme</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.darkMode}
                    onChange={() => toggleSetting('darkMode')}
                  />
                </div>

                {/* Sound Setting */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Volume2 className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Sound Effects</h3>
                      <p className="text-sm text-gray-500">Enable interface sounds</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.sound}
                    onChange={() => toggleSetting('sound')}
                  />
                </div>

                {/* Language Setting */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Language</h3>
                      <p className="text-sm text-gray-500">Choose your preferred language</p>
                    </div>
                  </div>
                  <select className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              <p className="text-gray-500">Customize your notification settings</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Receive push notifications</p>
                  </div>
                </div>
                <ToggleSwitch 
                  checked={settings.notifications}
                  onChange={() => toggleSetting('notifications')}
                />
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
              <p className="text-gray-500">Manage your privacy preferences</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Lock className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                    <p className="text-sm text-gray-500">Control who can see your profile</p>
                  </div>
                </div>
                <select className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;