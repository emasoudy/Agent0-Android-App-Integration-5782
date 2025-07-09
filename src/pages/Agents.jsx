import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAgent } from '../contexts/AgentContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiUser, FiActivity, FiTrash2, FiEdit3, FiPlay, FiPause } = FiIcons;

const Agents = () => {
  const { agents, fetchAgents, createAgent, currentAgent, setCurrentAgent, isConnected } = useAgent();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    model: 'gpt-4',
    systemPrompt: '',
    maxTokens: 2048
  });

  useEffect(() => {
    if (isConnected) {
      fetchAgents();
    }
  }, [isConnected]);

  const handleCreateAgent = async () => {
    if (!newAgent.name.trim()) return;
    
    try {
      await createAgent(newAgent);
      setNewAgent({
        name: '',
        description: '',
        model: 'gpt-4',
        systemPrompt: '',
        maxTokens: 2048
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create agent:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600">Manage your AI agents</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          disabled={!isConnected}
          className="bg-blue-500 text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Agent</span>
        </button>
      </div>

      {/* Create Agent Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newAgent.name}
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newAgent.description}
                onChange={(e) => setNewAgent({...newAgent, description: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agent description"
                rows="2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select
                  value={newAgent.model}
                  onChange={(e) => setNewAgent({...newAgent, model: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude-3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Tokens</label>
                <input
                  type="number"
                  value={newAgent.maxTokens}
                  onChange={(e) => setNewAgent({...newAgent, maxTokens: parseInt(e.target.value)})}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="100"
                  max="8192"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt</label>
              <textarea
                value={newAgent.systemPrompt}
                onChange={(e) => setNewAgent({...newAgent, systemPrompt: e.target.value})}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="System prompt for the agent"
                rows="3"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateAgent}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Create Agent
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Agents List */}
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl p-6 shadow-sm border ${
              currentAgent?.id === agent.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name || 'Unnamed Agent'}</h3>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status || 'idle')}`}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{agent.description || 'No description'}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Model: {agent.model || 'Unknown'}</span>
                    <span>Status: {agent.status || 'idle'}</span>
                    {agent.lastActive && (
                      <span>Last active: {new Date(agent.lastActive).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentAgent(agent)}
                  className={`p-2 rounded-lg transition-colors ${
                    currentAgent?.id === agent.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <SafeIcon icon={FiActivity} className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {agents.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600 mb-4">Create your first agent to get started</p>
            <button
              onClick={() => setShowCreateForm(true)}
              disabled={!isConnected}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              Create Agent
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;