# PRODUCTION ENVIRONMENT VARIABLES TEMPLATE
# ⚠️  DO NOT COMMIT THIS FILE TO GIT
# ⚠️  ALL SENSITIVE VALUES MUST BE SET IN DEPLOYMENT PLATFORM DASHBOARDS

# Backend Environment Variables (Set in Render Dashboard)
# ============================================================

# Environment Mode
ENV=production

# CRITICAL: Generate with: openssl rand -hex 32
SECRET_KEY=GENERATE_STRONG_KEY_AND_SET_HERE_DO_NOT_USE_DEFAULT

# Database Connection (Supabase PostgreSQL)
# Format: postgresql://username:password@host:port/database
DB_URL=postgresql://postgres:YOUR_STRONG_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres

# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_PUBLISHABLE_KEY>

# CORS Origins (comma-separated, MUST be HTTPS in production)
# Replace with your actual Vercel deployment URLs
BACKEND_CORS_ORIGINS=https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app

# API Keys & Credentials
# ============================================================

# OpenAI API Key (optional, for AI features)
# Generate at: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here

# OAuth Credentials (optional, for social login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://guides-nepal-backend.onrender.com/api/v1/auth/callback/google

FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=https://guides-nepal-backend.onrender.com/api/v1/auth/callback/facebook

FRONTEND_OAUTH_REDIRECT=https://guides-nepal-frontend.vercel.app/auth/callback

# Logging & Monitoring
# ============================================================

LOG_LEVEL=INFO
ENABLE_REQUEST_LOGGING=true

# Optional: Sentry Error Tracking
# Get from: https://sentry.io/
# SENTRY_DSN=https://your-sentry-key@sentry.io/your-project-id


# Frontend Environment Variables (Set in Vercel Dashboard)
# ============================================================

# Supabase Configuration (MUST be accessible from frontend)
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_PUBLISHABLE_KEY>

# Backend API URL (production deployment URL)
VITE_API_URL=https://guides-nepal-backend.onrender.com/api/v1


# Dashboard Environment Variables (Set in Vercel Dashboard)
# ============================================================

# Same as Frontend
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_PUBLISHABLE_KEY>
VITE_API_URL=https://guides-nepal-backend.onrender.com/api/v1


# ============================================================
# SECURITY NOTES
# ============================================================

# ✅ DO NOT hardcode these values in source code
# ✅ DO set them in each platform's dashboard:
#    - Render: https://render.com/dashboard
#    - Vercel: https://vercel.com/dashboard
#    - Supabase: https://app.supabase.com
# ✅ DO rotate SECRET_KEY periodically (every 90 days recommended)
# ✅ DO use strong passwords (16+ characters minimum)
# ✅ DO enable 2FA on all service accounts
# ✅ DO audit environment variables monthly
# ✅ DO NOT share credentials via email/chat
# ✅ DO use a secure password manager
# ✅ DO restrict access to environment variables
# ✅ DO monitor environment variable changes

# ============================================================
# HOW TO GENERATE SECRETS
# ============================================================

# Generate SECRET_KEY (must be 32+ characters, hex-encoded)
# Command: openssl rand -hex 32
# Example output: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1

# Generate strong database password (16+ characters)
# Command: openssl rand -hex 16
# Or use: https://www.random.org/passwords/ (16+ characters, mixed case, numbers, special)

# Generate OAuth secrets (from respective platforms)
# - Google: https://console.cloud.google.com
# - Facebook: https://developers.facebook.com

# ============================================================
# PLATFORM-SPECIFIC INSTRUCTIONS
# ============================================================

# RENDER BACKEND:
# 1. Go to https://render.com/dashboard
# 2. Select your "guides-nepal-backend" service
# 3. Click "Environment" tab
# 4. Click "Add Environment Variable"
# 5. Set each variable from this file
# 6. Click "Deploy" to apply changes

# VERCEL FRONTEND & DASHBOARD:
# 1. Go to https://vercel.com/dashboard
# 2. Select "guides-nepal-frontend" project
# 3. Go to "Settings" → "Environment Variables"
# 4. Add each VITE_* variable
# 5. Repeat for "guides-nepal-dashboard" project
# 6. Redeploy both projects

# SUPABASE:
# 1. Go to https://app.supabase.com
# 2. Select your project
# 3. Settings → Database
# 4. Update database password (if needed)
# 5. Copy connection string to DB_URL

# ============================================================
# VERIFICATION CHECKLIST
# ============================================================

# After setting environment variables, verify:
# ✓ Backend starts without errors
# ✓ Database connection successful
# ✓ CORS headers correct
# ✓ Frontend can call backend API
# ✓ Auth endpoints working
# ✓ Rate limiting active
# ✓ Logs show correct environment (production)
# ✓ HTTPS enforced
# ✓ API docs hidden (/docs returns 404)

# Run health checks:
# curl https://guides-nepal-backend.onrender.com/health
# curl https://guides-nepal-backend.onrender.com/api/v1/health

# ============================================================
# LAST UPDATED: July 13, 2026
# VERSION: 1.0
# STATUS: Ready for Production
# ============================================================
