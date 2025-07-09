import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAgent } from '../contexts/AgentContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiPlay, FiPause, FiStop, FiRefreshCw, FiClock, FiCheckCircle, FiXCircle } = FiIcons;

const Tasks = () => {
  const { tasks, fetchTasks, isConnected } = useAgent();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isConnected) {
      fetchTasks();
    }
  }, [isConnected]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return FiPlay;
      case 'completed': return FiCheckCircle;
      case 'failed': return FiXCircle;
      case 'paused': return FiPause;
      default: return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'running', label: 'Running' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Monitor and manage agent tasks</p>
        </div>
        <button
          disabled={!isConnected}
          className="bg-blue-500 text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.name || 'Unnamed Task'}
                  </h3>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status || 'pending')}`}>
                    <SafeIcon icon={getStatusIcon(task.status)} className="w-3 h-3" />
                    <span>{task.status || 'pending'}</span>
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {task.description || 'No description available'}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">Agent:</span>
                    <p>{task.agentName || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>
                    <p>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>
                    <p>{task.duration || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Priority:</span>
                    <p className={`capitalize ${
                      task.priority === 'high' ? 'text-red-600' :
                      task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {task.priority || 'normal'}
                    </p>
                  </div>
                </div>

                {task.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {task.status === 'running' ? (
                  <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors">
                    <SafeIcon icon={FiPause} className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                    <SafeIcon icon={FiPlay} className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                  <SafeIcon icon={FiStop} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiClock} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No tasks found' : `No ${filter} tasks`}
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? 'Create your first task to get started' 
                : `No tasks with ${filter} status`
              }
            </p>
            {filter === 'all' && (
              <button
                disabled={!isConnected}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                Create Task
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;