# 🚀 Deployment Guide - Guides Nepal

## Overview
- **Frontend**: Deployed on Vercel
- **Dashboard**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: Supabase PostgreSQL

---

## ✅ Prerequisites

### 1. Create Accounts
- Vercel account: https://vercel.com
- Render account: https://render.com
- Supabase project (already created): https://wuyxvqkokyhjbfzemjyw.supabase.co

### 2. Connect GitHub
- Push your project to GitHub repository
- Connect your GitHub account to both Vercel and Render

---

## 📋 Part 1: Frontend Deployment (Vercel)

### Step 1: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Select your GitHub repository (Guides Nepal)
4. Configure the project:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Under **Environment Variables**, add:
   ```
   VITE_SUPABASE_URL = https://wuyxvqkokyhjbfzemjyw.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_CSVybNBa1ZK_mqg-5Gr3DA_-wmXhfrL
   ```

6. Click **Deploy**

**After deployment, note your frontend URL** (e.g., `https://guides-nepal-frontend.vercel.app`)

---

## 📋 Part 2: Dashboard Deployment (Vercel)

### Step 1: Deploy Dashboard to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Select your GitHub repository again (same repo, different project)
4. Configure the project:
   - **Framework**: Vite
   - **Root Directory**: `dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Under **Environment Variables**, add:
   ```
   VITE_SUPABASE_URL = https://wuyxvqkokyhjbfzemjyw.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_CSVybNBa1ZK_mqg-5Gr3DA_-wmXhfrL
   ```

6. Click **Deploy**

**After deployment, note your dashboard URL** (e.g., `https://guides-nepal-dashboard.vercel.app`)

---

## 📋 Part 3: Backend Deployment (Render)

### Step 1: Connect GitHub to Render

1. Go to https://render.com and sign in
2. Connect your GitHub account

### Step 2: Deploy Backend from render.yaml

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Review the services:
   - **Service Name**: `guides-nepal-backend`
   - **Image**: Docker (from Dockerfile)
   - **Region**: Oregon
   - **Plan**: Starter

6. Click **"Create New Blueprint"**

### Step 3: Set Environment Variables on Render

After deployment, go to your backend service settings and verify/update:

1. **DATABASE_URL**: 
   ```
   postgresql://postgres:Guidesnepal%40123@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
   ```

2. **BACKEND_CORS_ORIGINS** (update with your actual Vercel URLs):
   ```
   https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app
   ```

3. **SECRET_KEY**: Generate a strong secret key (Render will auto-generate)

4. **ENV**: `production`

5. **VITE_SUPABASE_URL**:
   ```
   https://wuyxvqkokyhjbfzemjyw.supabase.co
   ```

6. **VITE_SUPABASE_PUBLISHABLE_KEY**:
   ```
   sb_publishable_CSVybNBa1ZK_mqg-5Gr3DA_-wmXhfrL
   ```

7. **OPENAI_API_KEY** (optional): Add if you use OpenAI

**After deployment, note your backend URL** (e.g., `https://guides-nepal-backend.onrender.com`)

---

## 🔗 Update Frontend/Dashboard Backend URLs

After backend deployment, update your frontend and dashboard to point to the Render backend:

### For Frontend (`frontend/src/services/guidesApi.ts`):
```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://guides-nepal-backend.onrender.com/api/v1'
  : 'http://localhost:8000/api/v1'
```

### For Dashboard (same change if applicable)

---

## ✅ Deployment Checklist

### Frontend (Vercel)
- [ ] Repository connected to Vercel
- [ ] Environment variables set
- [ ] Build successful
- [ ] Running on Vercel URL

### Dashboard (Vercel)
- [ ] Repository connected to Vercel
- [ ] Environment variables set
- [ ] Build successful
- [ ] Running on Vercel URL

### Backend (Render)
- [ ] GitHub connected to Render
- [ ] Docker image building successfully
- [ ] Environment variables set correctly
- [ ] Database connection working
- [ ] API responding at `/health` endpoint

---

## 🧪 Testing Deployments

### Test Frontend
```bash
curl https://guides-nepal-frontend.vercel.app
```

### Test Dashboard
```bash
curl https://guides-nepal-dashboard.vercel.app
```

### Test Backend Health
```bash
curl https://guides-nepal-backend.onrender.com/health
```

### Test Backend API
```bash
curl https://guides-nepal-backend.onrender.com/api/v1/docs
```

---

## 🔒 Important Security Notes

⚠️ **Never commit `.env` files to GitHub**
- Use `.env.example` for reference only
- Environment variables should be set in each platform's dashboard

⚠️ **Rotate credentials periodically**
- Change `SECRET_KEY` after initial deployment
- Rotate database password if needed

⚠️ **Check CORS settings**
- Make sure `BACKEND_CORS_ORIGINS` includes your actual deployed URLs
- Update when you change domain names

---

## 📚 Quick Reference URLs

| Service | URL |
|---------|-----|
| Frontend | https://guides-nepal-frontend.vercel.app |
| Dashboard | https://guides-nepal-dashboard.vercel.app |
| Backend API | https://guides-nepal-backend.onrender.com |
| API Docs | https://guides-nepal-backend.onrender.com/api/v1/docs |
| Supabase Dashboard | https://app.supabase.com |
| Render Dashboard | https://render.com/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## 🚨 Troubleshooting

### Frontend Won't Build
- Check Node version: `node --version` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check build command in vercel.json

### Backend Connection Issues
- Verify Supabase DATABASE_URL is correct (URL-encode special characters)
- Check CORS origins match your Vercel URLs
- Test database connection: `curl <backend>/health`

### Environment Variables Not Loading
- Check variable names match exactly (case-sensitive)
- Redeploy after setting variables
- Check `.env.local` is in `.gitignore`

### CORS Errors
- Update `BACKEND_CORS_ORIGINS` with correct Vercel URLs
- Restart the backend service on Render
- Check frontend API client is calling correct backend URL

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Supabase Docs: https://supabase.com/docs
