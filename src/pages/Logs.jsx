import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAgent } from '../contexts/AgentContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { FiFilter, FiDownload, FiRefreshCw, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } = FiIcons;

const Logs = () => {
  const { logs, fetchLogs, isConnected } = useAgent();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isConnected) {
      fetchLogs();
    }
  }, [isConnected]);

  const getLogIcon = (level) => {
    switch (level) {
      case 'error': return FiX;
      case 'warning': return FiAlertTriangle;
      case 'info': return FiInfo;
      default: return FiAlertCircle;
    }
  };

  const getLogColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = searchTerm === '' || 
      log.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const logLevels = [
    { value: 'all', label: 'All Logs', count: logs.length },
    { value: 'error', label: 'Errors', count: logs.filter(l => l.level === 'error').length },
    { value: 'warning', label: 'Warnings', count: logs.filter(l => l.level === 'warning').length },
    { value: 'info', label: 'Info', count: logs.filter(l => l.level === 'info').length }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs</h1>
          <p className="text-gray-600">System and agent activity logs</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchLogs}
            disabled={!isConnected}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SafeIcon icon={FiFilter} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex space-x-2 overflow-x-auto">
          {logLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setFilter(level.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === level.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level.label} ({level.count})
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-2">
        {filteredLogs.map((log, index) => (
          <motion.div
            key={log.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-lg border p-4 ${getLogColor(log.level || 'info')}`}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon 
                icon={getLogIcon(log.level)} 
                className="w-5 h-5 mt-0.5 flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {log.level || 'info'}
                    </span>
                    {log.source && (
                      <span className="text-xs opacity-75">
                        [{log.source}]
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-75">
                    {log.timestamp ? format(new Date(log.timestamp), 'HH:mm:ss') : 'Unknown time'}
                  </span>
                </div>
                <p className="text-sm font-medium mb-1">
                  {log.message || 'No message'}
                </p>
                {log.details && (
                  <pre className="text-xs opacity-75 whitespace-pre-wrap break-words">
                    {typeof log.details === 'string' ? log.details : JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
                {log.agentId && (
                  <div className="mt-2 text-xs opacity-75">
                    Agent ID: {log.agentId}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiAlertCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching logs found' : 'No logs available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Logs will appear here as your agents become active'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;