# Guides Nepal

A comprehensive tourism guide platform for Nepal featuring city experiences across Kathmandu, Pokhara, Lalitpur, Bhaktapur, and Bharatpur. Built with React + Vite frontend and FastAPI backend, offering AI-powered chat assistance and seamless booking experiences.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Scripts](#scripts)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Experience Browsing**: Browse curated city experiences with consistent booking UI
- **User Authentication**: Secure JWT-based auth with OAuth support (Google, Facebook)
- **Booking System**: Integrated booking management across all experiences
- **User Profile**: Customizable user profiles with avatar upload and photo gallery
- **Favorites/Bookmarks**: Save and manage favorite places
- **AI Chat Assistant**: Powered by Ollama (local FOSS) or OpenAI with streaming support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Admin Dashboard**: RBAC-based dashboard for Admin, Host, Guide, and Content Writer roles

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **Backend** | Python, FastAPI, SQLAlchemy, Alembic |
| **Database** | PostgreSQL |
| **Authentication** | JWT, OAuth 2.0 |
| **AI** | Ollama (local), OpenAI (optional) |
| **Deployment** | Vercel (frontend), Render (backend) |

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** 8 or higher
- **Python** 3.9 or higher
- **PostgreSQL** 12 or higher (for backend)

## 🚀 Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview -- --host
```

The frontend runs at `http://localhost:5175` (dev) or `http://localhost:4173` (preview).

### Backend Setup

```bash
# Create Python virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Set environment variables (see Environment Setup section)
export DATABASE_URL="postgresql://user:pass@localhost:5432/guides_nepal"
export SECRET_KEY="your-secret-key"
export ENV="development"

# Run backend server
cd backend
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000`.

## 📁 Project Structure

```
guides-nepal/
├── src/                          # Frontend source code
│   ├── pages/                   # Page components
│   │   ├── user/               # User pages (Profile, Favorites, Chat)
│   │   └── experiences/        # City experience pages
│   ├── components/             # Reusable UI components
│   ├── store/                  # Zustand state management
│   │   ├── authStore.ts       # Authentication state
│   │   └── profileStore.ts    # User profile state
│   ├── data/                   # Static data files
│   └── App.tsx                # Main app component
├── dashboard/                  # Admin dashboard app
│   ├── src/
│   │   ├── pages/            # Dashboard pages per role
│   │   ├── components/       # Dashboard components
│   │   ├── mock/             # Mock data
│   │   └── docs/             # Documentation
│   └── vite.config.ts
├── backend/                   # Backend source code
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── uploads/         # User uploads
│   │   └── main.py          # FastAPI app
│   ├── migrations/          # Alembic migrations
│   ├── scripts/            # Utility scripts
│   └── requirements.txt    # Python dependencies
├── public/                 # Static assets
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
├── vercel.json           # Vercel deployment config
├── render.yaml           # Render deployment config
└── README.md             # This file
```

## 🔧 Environment Setup

### Frontend Environment Variables

Create a `.env` file in the root directory:

```env
# API endpoint
VITE_API_URL=http://localhost:8000

# OAuth redirect (for production)
FRONTEND_OAUTH_REDIRECT=https://<your-domain>/auth/callback

# Optional: Override backend OAuth URLs
VITE_GOOGLE_OAUTH_URL=https://<backend-domain>/api/v1/auth/oauth/google/start
VITE_FACEBOOK_OAUTH_URL=https://<backend-domain>/api/v1/auth/oauth/facebook/start
```

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/guides_nepal

# Security
SECRET_KEY=your-secret-key-here
ENV=development

# CORS
BACKEND_CORS_ORIGINS=http://localhost:5175,http://localhost:4173

# AI Configuration
AI_PROVIDER=auto  # Options: auto, ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest

# OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_REDIRECT_URI=https://<backend-domain>/api/v1/auth/oauth/google/callback

FACEBOOK_CLIENT_ID=your-client-id
FACEBOOK_CLIENT_SECRET=your-secret
FACEBOOK_REDIRECT_URI=https://<backend-domain>/api/v1/auth/oauth/facebook/callback

# OpenAI (optional)
OPENAI_API_KEY=your-api-key
```

## 📝 Scripts

### Frontend Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run check      # TypeScript type checking
npm run lint       # Run ESLint
```

### Backend Scripts

```bash
# Quality checks (requires backend/ directory)
cd backend && ./scripts/run_checks.sh

# Individual checks
black .            # Format code
ruff check .       # Lint code
mypy .            # Type checking
pytest             # Run tests
bandit -r .       # Security analysis

# Database migrations
alembic revision -m "description"  # Generate migration
alembic upgrade head               # Apply migrations
alembic upgrade head --sql         # Dry-run SQL
```

## 💻 Development

### Adding New Experiences

Edit experience data files in `src/data/*RichData.ts`:

```typescript
export const kathmandu Experiences = [
  {
    id: "exp-1",
    title: "Experience Title",
    price: 50,
    guides: [...],
    bookingUI: {...}
  }
];
```

### Working with Bookings

- **Booking UI**: Consistent across all experience pages (`src/pages/*/`)
- **Features**: Date selection, guest count, guide selection, price breakdown
- **API**: `POST /api/v1/bookings` for creating bookings

### Using AI Chat

The application supports two AI providers:

1. **Ollama (Recommended - Local FOSS)**
   ```bash
   brew install ollama
   ollama serve
   ollama pull llama3.2
   ```

2. **OpenAI (Optional)**
   - Set `OPENAI_API_KEY` environment variable

AI endpoints:
- `POST /api/v1/ai/chat` - JSON response
- `POST /api/v1/ai/chat/stream` - Streaming response (text/plain)

### Profile & Avatar Upload

- Upload endpoint: `POST /api/v1/profile/photos/upload` (multipart form data)
- Fallback to local preview if backend is offline
- Static files served at `/uploads`

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Import repository into Vercel
2. Framework: Auto-detected as Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables from `.env`
6. Configure SPA routing via `vercel.json` (already included)

### Backend Deployment (Render)

1. Use provided `render.yaml` blueprint
2. Automatically provisions PostgreSQL database
3. Deploys FastAPI with Gunicorn
4. Set required environment variables in Render dashboard

### Backend Deployment (Alternative Providers)

The backend is containerized and can be deployed to:
- Railway, Fly.io, DigitalOcean App Platform
- AWS ECS, Google Cloud Run, Azure Container Instances

## 📚 API Documentation

### Base URL

```
/api/v1
```

### Authentication

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/auth/*` | * | Authentication & OAuth |
| `/bookings/*` | * | Booking management |
| `/profile/me` | GET/PATCH | User profile |
| `/profile/bookmarks` | GET/POST/DELETE | User bookmarks |
| `/profile/photos/upload` | POST | Upload photos |
| `/ai/chat` | POST | AI chat (JSON) |
| `/ai/chat/stream` | POST | AI chat (streaming) |

### Detailed API Routes

**Profile Management**
```
GET    /api/v1/profile/me                          # Get current user profile
PATCH  /api/v1/profile/me                          # Update profile (firstName, lastName, email, phone, bio, avatar_url)
POST   /api/v1/profile/photos/upload               # Upload travel photo
GET    /api/v1/profile/bookmarks                   # List bookmarks
POST   /api/v1/profile/bookmarks                   # Create bookmark
DELETE /api/v1/profile/bookmarks/{bookmark_id}     # Delete bookmark
```

**AI Chat**
```
POST   /api/v1/ai/chat                             # Chat (JSON response)
POST   /api/v1/ai/chat/stream                      # Chat (streaming response)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Quality Requirements

Before pushing, run quality checks:

```bash
# Frontend
npm run check
npm run lint

# Backend
cd backend && ./scripts/run_checks.sh
```

### Coding Standards

- **TypeScript**: Strict mode enabled, follow ESLint rules
- **Python**: Format with Black, lint with Ruff, type check with Mypy
- **Git**: Use conventional commits (feat:, fix:, docs:, etc.)

## 📋 Dashboard

The admin dashboard is located under `dashboard/` with separate README:

- **Roles**: Admin, Host, Guide, Content Writer
- **Features**: User management, KPI tracking, scheduling, content management
- **Documentation**: See `dashboard/docs/` for detailed role and permission documentation

## 🔒 Security Notes

- Never commit `.env` files or secrets to version control
- Use environment variables for all sensitive configuration
- JWT tokens stored in localStorage with secure HTTP-only cookies recommended
- CORS configured to prevent unauthorized cross-origin requests
- Bandit security scans recommended before deployment

## 📞 Support

For issues, questions, or contributions:
- Create an Issue on GitHub
- Check existing documentation in `/docs` and `/dashboard/docs`
- Review backend security scan reports (`bandit`)

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Last Updated**: 2025  
**Version**: 1.0.0
