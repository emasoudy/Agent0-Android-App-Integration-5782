import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AgentProvider } from './contexts/AgentContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Tasks from './pages/Tasks';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Agents from './pages/Agents';
import './App.css';

function App() {
  return (
    <AgentProvider>
      <Router>
        <div className="app-container">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
              }
            }}
          />
        </div>
      </Router>
    </AgentProvider>
  );
}

export default App;