# Agent Zero Mobile App

A modern mobile-first web application for managing AI agents built with React, Vite, and Tailwind CSS.

## Features

- 📱 Mobile-first responsive design
- 🤖 AI agent management
- 💬 Real-time chat interface
- 📊 Task monitoring and management
- 📋 System logs and monitoring
- ⚙️ Configurable settings
- 🔄 Real-time updates

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router DOM (HashRouter)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build and run with Docker
docker build -t agent-zero-mobile .
docker run -p 3000:80 agent-zero-mobile

# Or use docker-compose
docker-compose up -d
```

### Coolify Deployment

1. Create a new application in Coolify
2. Connect your Git repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Agent Zero Mobile
```

### Backend Connection

Update the server URL in the Settings page or modify the default in `src/contexts/AgentContext.jsx`:

```javascript
const [serverUrl, setServerUrl] = useState(
  localStorage.getItem('agentServerUrl') || 'http://localhost:8000'
);
```

## Project Structure

```
src/
├── common/          # Shared components
├── components/      # UI components
├── contexts/        # React contexts
├── pages/          # Page components
├── services/       # API services
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## API Endpoints

The app expects the following backend endpoints:

- `GET /api/status` - System status
- `GET /api/agents` - List agents
- `POST /api/agents` - Create agent
- `DELETE /api/agents/:id` - Delete agent
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/logs` - Get logs
- `POST /api/chat` - Send message
- `GET /api/config` - Get configuration
- `PUT /api/config` - Update configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details