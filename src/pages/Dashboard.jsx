import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAgent } from '../contexts/AgentContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiUsers, FiList, FiCpu, FiHardDrive, FiClock } = FiIcons;

const Dashboard = () => {
  const { agents, tasks, systemStats, fetchAgents, fetchTasks, isConnected } = useAgent();

  useEffect(() => {
    if (isConnected) {
      fetchAgents();
      fetchTasks();
    }
  }, [isConnected]);

  const stats = [
    {
      title: 'Active Agents',
      value: agents.filter(a => a.status === 'active').length,
      total: agents.length,
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Running Tasks',
      value: tasks.filter(t => t.status === 'running').length,
      total: tasks.length,
      icon: FiList,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'CPU Usage',
      value: systemStats.cpu,
      unit: '%',
      icon: FiCpu,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Memory Usage',
      value: systemStats.memory,
      unit: '%',
      icon: FiHardDrive,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your Agent Zero instance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}{stat.unit}
                {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
              </p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <SafeIcon icon={FiActivity} className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <SafeIcon icon={FiClock} className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Uptime</p>
            <p className="text-lg font-semibold text-gray-900">
              {Math.floor(systemStats.uptime / 3600)}h {Math.floor((systemStats.uptime % 3600) / 60)}m
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-sm text-gray-600">Connection</p>
            <p className="text-lg font-semibold text-gray-900">
              {isConnected ? 'Online' : 'Offline'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <SafeIcon icon={FiUsers} className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Agents</p>
            <p className="text-lg font-semibold text-gray-900">{agents.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task, index) => (
            <div key={task.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                task.status === 'completed' ? 'bg-green-500' :
                task.status === 'running' ? 'bg-blue-500' :
                task.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{task.name || 'Unnamed Task'}</p>
                <p className="text-xs text-gray-600">{task.description || 'No description'}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'running' ? 'bg-blue-100 text-blue-800' :
                task.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {task.status || 'pending'}
              </span>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;