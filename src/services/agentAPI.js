import axios from 'axios';

class AgentAPI {
  constructor() {
    this.baseURL = 'http://localhost:8000';
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  setBaseURL(url) {
    this.baseURL = url;
    this.client.defaults.baseURL = url;
  }

  async getStatus() {
    try {
      const response = await this.client.get('/api/status');
      return response.data;
    } catch (error) {
      return {
        status: 'disconnected',
        stats: { cpu: 0, memory: 0, uptime: 0 }
      };
    }
  }

  async getAgents() {
    try {
      const response = await this.client.get('/api/agents');
      return response.data;
    } catch (error) {
      return { agents: [] };
    }
  }

  async createAgent(config) {
    const response = await this.client.post('/api/agents', config);
    return response.data;
  }

  async deleteAgent(agentId) {
    const response = await this.client.delete(`/api/agents/${agentId}`);
    return response.data;
  }

  async getTasks() {
    try {
      const response = await this.client.get('/api/tasks');
      return response.data;
    } catch (error) {
      return { tasks: [] };
    }
  }

  async createTask(task) {
    const response = await this.client.post('/api/tasks', task);
    return response.data;
  }

  async getLogs() {
    try {
      const response = await this.client.get('/api/logs');
      return response.data;
    } catch (error) {
      return { logs: [] };
    }
  }

  async sendMessage(data) {
    const response = await this.client.post('/api/chat', data);
    return response.data;
  }

  async getConfig() {
    try {
      const response = await this.client.get('/api/config');
      return response.data;
    } catch (error) {
      return { config: {} };
    }
  }

  async updateConfig(config) {
    const response = await this.client.put('/api/config', config);
    return response.data;
  }
}

export const agentAPI = new AgentAPI();