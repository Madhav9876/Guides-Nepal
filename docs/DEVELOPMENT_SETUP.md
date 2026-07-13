# Development Setup Guide

## Quick Start
Get the Guides Nepal application running locally in under 10 minutes.

## Prerequisites

### Required Software
- **Node.js** 18+ and npm
- **Python** 3.11+ and pip
- **PostgreSQL** 15+
- **Git**

### Optional Software
- **Docker** and Docker Compose (for containerized setup)
- **Ollama** (for local AI chat)

## Setup Methods

### Method 1: Local Development (Recommended)

#### 1. Clone Repository
```bash
git clone https://github.com/your-username/guides-nepal.git
cd guides-nepal
```

#### 2. Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

#### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
```

#### 4. Database Setup
```bash
# Create database (PostgreSQL must be running)
createdb guides_nepal

# Run migrations
alembic upgrade head

# Seed initial data (optional)
python scripts/seed_guides.py
```

#### 5. Start Backend Server
```bash
# Start FastAPI server (venv active)
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`.

#### 6. Dashboard Setup (Optional)
```bash
cd dashboard
npm install
npm run dev
```

The dashboard will typically run at `http://localhost:5174` or the next available port.

### Method 2: Docker Setup

#### 1. Clone Repository
```bash
git clone https://github.com/your-username/guides-nepal.git
cd guides-nepal
```

#### 2. Start with Docker Compose
```bash
# Start all services
docker compose up --build
```

This will start:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

#### 3. Run Migrations
```bash
# In another terminal
docker compose exec backend alembic upgrade head
```

## Environment Configuration

### Frontend (.env)
```bash
# Create .env file in frontend root
cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8000
EOF
```

### Backend (.env)
```bash
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/guides_nepal
SECRET_KEY=your-development-secret-key-minimum-32-characters
ENV=development
AI_PROVIDER=auto
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest
BACKEND_CORS_ORIGINS=http://localhost:5173,http://localhost:4173
EOF
```

## Development Workflow

### Frontend Development
```bash
cd frontend

# Start development server with hot reload
npm run dev

# Run linting
npm run lint

# Type checking
npm run check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Dashboard Development
```bash
cd dashboard

npm run dev       # Start dev server
npm run lint      # Lint
npm run typecheck # TypeScript type checking
npm run build     # Production build
```

### Backend Development
```bash
cd backend
source venv/bin/activate

# Run all quality checks
./scripts/run_checks.sh

# Individual commands (venv active)
black .                    # Code formatting
ruff check .               # Linting
mypy .                     # Type checking
PYTHONPATH=. pytest        # Run tests

# Start server with auto-reload
uvicorn app.main:app --reload

# Access API documentation
open http://localhost:8000/docs
```

## Database Management

### Create New Migration
```bash
cd backend
alembic revision --autogenerate -m "Add new feature"
```

### Apply Migrations
```bash
alembic upgrade head
```

### Rollback Migration
```bash
alembic downgrade -1
```

### Database Reset (Development Only)
```bash
# Drop and recreate database
dropdb guides_nepal
createdb guides_nepal
alembic upgrade head
```

## AI Chat Setup (Optional)

### Local Ollama Setup
```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama
ollama serve

# Pull a model
ollama pull llama3.2

# Test the model
ollama run llama3.2 "What is the capital of Nepal?"
```

### Verify AI Integration
```bash
# Test AI endpoint
curl -X POST http://localhost:8000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the best places to visit in Kathmandu?"}'
```

## Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
cd backend

# Run all tests
pytest

# Run specific test file
pytest tests/test_main.py

# Run with coverage
pytest --cov=app
```

## Debugging

### Frontend Debugging
1. **Browser DevTools**: F12 → Console/Network tabs
2. **React DevTools**: Install browser extension
3. **Vite HMR Issues**: Check terminal for errors

### Backend Debugging
1. **API Errors**: Check terminal output
2. **Database Issues**: Check PostgreSQL logs
3. **Migration Errors**: Check Alembic output

### Common Issues and Solutions

#### Port Already in Use
```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Start PostgreSQL
brew services start postgresql

# Check connection
psql -h localhost -U postgres -d guides_nepal
```

#### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Python Environment Issues
```bash
# Recreate virtual environment
rm -rf backend/venv
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Code Quality

### Frontend
- **ESLint**: Enforces code style
- **TypeScript**: Type safety
- **Prettier**: Code formatting

### Backend
- **Black**: Code formatting
- **Ruff**: Linting
- **MyPy**: Type checking
- **Bandit**: Security analysis

### Pre-commit Hooks
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images with proper sizing
- Use production builds for testing

### Backend
- Enable connection pooling
- Use database indexes
- Implement caching strategies
- Monitor query performance

## Security Best Practices

### Development
- Never commit secrets to repository
- Use environment variables for sensitive data
- Validate all inputs
- Use HTTPS in production

### Testing Security
```bash
# Backend security scan
cd backend
bandit -r app/

# Check for secrets
git secrets --scan
```

## Contributing Guidelines

### Git Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes with descriptive commits
3. Run tests and quality checks
4. Create pull request
5. Code review and merge

### Commit Message Format
```
type(scope): description

feat(auth): add OAuth login
fix(booking): resolve date validation issue
docs(readme): update setup instructions
```

## Getting Help

### Documentation
- [Frontend README](../README.md)
- [Backend Documentation](backend/docs/)
- [API Documentation](API_DOCUMENTATION.md)

### Community
- Create GitHub issues for bugs
- Join development discussions
- Submit feature requests

---

Happy coding! 🚀
