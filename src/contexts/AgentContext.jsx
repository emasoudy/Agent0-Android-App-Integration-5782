import React, { createContext, useContext, useState, useEffect } from 'react';
import { agentAPI } from '../services/agentAPI';
import toast from 'react-hot-toast';

const AgentContext = createContext();

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};

export const AgentProvider = ({ children }) => {
  const [serverUrl, setServerUrl] = useState(
    localStorage.getItem('agentServerUrl') || 'http://localhost:8000'
  );
  const [isConnected, setIsConnected] = useState(false);
  const [agents, setAgents] = useState([]);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    uptime: 0
  });

  useEffect(() => {
    localStorage.setItem('agentServerUrl', serverUrl);
    agentAPI.setBaseURL(serverUrl);
    checkConnection();
  }, [serverUrl]);

  const checkConnection = async () => {
    try {
      const response = await agentAPI.getStatus();
      setIsConnected(true);
      setSystemStats(response.stats || systemStats);
      toast.success('Connected to Agent Zero server');
    } catch (error) {
      setIsConnected(false);
      toast.error('Failed to connect to server');
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await agentAPI.getAgents();
      setAgents(response.agents || []);
    } catch (error) {
      toast.error('Failed to fetch agents');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await agentAPI.getTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await agentAPI.getLogs();
      setLogs(response.logs || []);
    } catch (error) {
      toast.error('Failed to fetch logs');
    }
  };

  const sendMessage = async (message, agentId = null) => {
    try {
      const response = await agentAPI.sendMessage({
        message,
        agentId: agentId || currentAgent?.id
      });
      return response;
    } catch (error) {
      toast.error('Failed to send message');
      throw error;
    }
  };

  const createAgent = async (config) => {
    try {
      const response = await agentAPI.createAgent(config);
      await fetchAgents();
      toast.success('Agent created successfully');
      return response;
    } catch (error) {
      toast.error('Failed to create agent');
      throw error;
    }
  };

  const value = {
    serverUrl,
    setServerUrl,
    isConnected,
    agents,
    currentAgent,
    setCurrentAgent,
    tasks,
    logs,
    systemStats,
    checkConnection,
    fetchAgents,
    fetchTasks,
    fetchLogs,
    sendMessage,
    createAgent
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
};