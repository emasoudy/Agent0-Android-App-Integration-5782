import React from 'react';
import { useAgent } from '../../contexts/AgentContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiWifi, FiWifiOff, FiSettings } = FiIcons;

const Header = () => {
  const { isConnected, systemStats } = useAgent();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A0</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Agent Zero</h1>
            <div className="flex items-center space-x-1">
              <SafeIcon 
                icon={isConnected ? FiWifi : FiWifiOff} 
                className={`w-3 h-3 ${isConnected ? 'text-green-500' : 'text-red-500'}`} 
              />
              <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-600">
            <span>CPU: {systemStats.cpu}%</span>
            <span>RAM: {systemStats.memory}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;