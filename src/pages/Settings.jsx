import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAgent } from '../contexts/AgentContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiServer, FiSave, FiRefreshCw, FiWifi, FiSettings, FiKey, FiBell, FiShield } = FiIcons;

const Settings = () => {
  const { serverUrl, setServerUrl, isConnected, checkConnection } = useAgent();
  const [localServerUrl, setLocalServerUrl] = useState(serverUrl);
  const [config, setConfig] = useState({
    apiKeys: {
      openai: '',
      anthropic: '',
      google: ''
    },
    notifications: {
      taskComplete: true,
      errors: true,
      warnings: false
    },
    security: {
      enableAuth: false,
      sessionTimeout: 30
    },
    performance: {
      maxConcurrentTasks: 5,
      logLevel: 'info',
      autoCleanupDays: 7
    }
  });

  const handleSaveServerUrl = () => {
    setServerUrl(localServerUrl);
    toast.success('Server URL updated');
  };

  const handleTestConnection = async () => {
    try {
      await checkConnection();
    } catch (error) {
      toast.error('Connection test failed');
    }
  };

  const handleSaveConfig = () => {
    // In a real app, this would save to the server
    localStorage.setItem('agentConfig', JSON.stringify(config));
    toast.success('Settings saved');
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('agentConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const settingSections = [
    {
      title: 'Server Connection',
      icon: FiServer,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Server URL
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={localServerUrl}
                onChange={(e) => setLocalServerUrl(e.target.value)}
                placeholder="http://localhost:8000"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleTestConnection}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <SafeIcon 
                icon={FiWifi} 
                className={`w-4 h-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} 
              />
              <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <button
            onClick={handleSaveServerUrl}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            Save Server URL
          </button>
        </div>
      )
    },
    {
      title: 'API Keys',
      icon: FiKey,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={config.apiKeys.openai}
              onChange={(e) => setConfig({
                ...config,
                apiKeys: { ...config.apiKeys, openai: e.target.value }
              })}
              placeholder="sk-..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anthropic API Key
            </label>
            <input
              type="password"
              value={config.apiKeys.anthropic}
              onChange={(e) => setConfig({
                ...config,
                apiKeys: { ...config.apiKeys, anthropic: e.target.value }
              })}
              placeholder="sk-ant-..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google API Key
            </label>
            <input
              type="password"
              value={config.apiKeys.google}
              onChange={(e) => setConfig({
                ...config,
                apiKeys: { ...config.apiKeys, google: e.target.value }
              })}
              placeholder="AIza..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Notifications',
      icon: FiBell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Task Completion</h4>
              <p className="text-xs text-gray-600">Get notified when tasks complete</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifications.taskComplete}
                onChange={(e) => setConfig({
                  ...config,
                  notifications: { ...config.notifications, taskComplete: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Error Notifications</h4>
              <p className="text-xs text-gray-600">Get notified about errors</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifications.errors}
                onChange={(e) => setConfig({
                  ...config,
                  notifications: { ...config.notifications, errors: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Warning Notifications</h4>
              <p className="text-xs text-gray-600">Get notified about warnings</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.notifications.warnings}
                onChange={(e) => setConfig({
                  ...config,
                  notifications: { ...config.notifications, warnings: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      )
    },
    {
      title: 'Performance',
      icon: FiSettings,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Concurrent Tasks
            </label>
            <input
              type="number"
              value={config.performance.maxConcurrentTasks}
              onChange={(e) => setConfig({
                ...config,
                performance: { ...config.performance, maxConcurrentTasks: parseInt(e.target.value) }
              })}
              min="1"
              max="20"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Level
            </label>
            <select
              value={config.performance.logLevel}
              onChange={(e) => setConfig({
                ...config,
                performance: { ...config.performance, logLevel: e.target.value }
              })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto Cleanup (Days)
            </label>
            <input
              type="number"
              value={config.performance.autoCleanupDays}
              onChange={(e) => setConfig({
                ...config,
                performance: { ...config.performance, autoCleanupDays: parseInt(e.target.value) }
              })}
              min="1"
              max="90"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your Agent Zero instance</p>
        </div>
        <button
          onClick={handleSaveConfig}
          className="bg-blue-500 text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 transition-colors"
        >
          <SafeIcon icon={FiSave} className="w-4 h-4" />
          <span>Save All</span>
        </button>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={section.icon} className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;