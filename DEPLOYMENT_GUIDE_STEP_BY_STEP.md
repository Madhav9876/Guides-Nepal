# 🚀 COMPLETE DEPLOYMENT GUIDE - STEP BY STEP

## Part 1: BACKEND DEPLOYMENT (Render)

### Step 1: Fix Requirements.txt ✅ (DONE)
Removed invalid "cors" package. FastAPI includes CORS middleware built-in.

### Step 2: Prepare GitHub Repository

**Important:** Commit all changes to GitHub first!

```bash
# From your project root
git init  # (if not already a git repo)
git add .
git commit -m "Fix deployment configuration"
git remote add origin https://github.com/YOUR_USERNAME/guides-nepal.git
git push -u origin main
```

**Don't have GitHub?**
1. Go to https://github.com/new
2. Create repository named "guides-nepal"
3. Follow instructions to push code

---

### Step 3: Deploy Backend on Render

#### A. Connect GitHub to Render

1. Go to https://render.com
2. Click **"New +"** button
3. Select **"Blueprint"**
4. Click **"Connect account"** (GitHub)
5. Authorize Render to access your GitHub
6. Select your repository: **guides-nepal**

#### B. Configure Blueprint

Render will read `render.yaml` automatically.

**Important: Edit environment variables BEFORE deploying**

1. Click **"Edit"** next to `render.yaml`
2. Scroll down to `envVars` section
3. **Fix these values:**

   ```yaml
   - key: DATABASE_URL
     value: postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
   ```
   ⚠️ **IMPORTANT:** The password has `@` symbol, so use `%40` in URL

   ```yaml
   - key: SECRET_KEY
     generateValue: true  # Render will auto-generate a strong one
   ```

   ```yaml
   - key: ENV
     value: production
   ```

   ```yaml
   - key: BACKEND_CORS_ORIGINS
     value: https://your-frontend-vercel-url.vercel.app,https://your-dashboard-vercel-url.vercel.app
   ```
   
   (Keep these as placeholders for now, update after frontend deploys)

4. Click **"Create New Blueprint"**

#### C. Monitor Deployment

1. Watch the build logs in Render dashboard
2. Wait for "Build successful" message
3. Your backend URL will be shown: `https://guides-nepal-backend.onrender.com`

**Note:** First deployment takes 5-10 minutes

#### D: Test Backend Health

Once deployed:

```bash
curl https://guides-nepal-backend.onrender.com/health
```

Should return:
```json
{"status":"ok","environment":"production"}
```

---

## Part 2: FRONTEND DEPLOYMENT (Vercel)

### Step 1: Deploy Frontend

#### A. Go to Vercel

1. Go to https://vercel.com
2. Click **"Add New"**
3. Select **"Project"**
4. Import your GitHub repository: **guides-nepal**

#### B. Configure Frontend

1. **Select Framework:** Vite (auto-detected)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

#### C. Environment Variables

Click **"Environment Variables"** and add:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_PUBLISHABLE_KEY>

VITE_API_URL=https://guides-nepal-backend.onrender.com/api/v1
```

**Note:** Wait until backend is fully deployed before using its URL

#### D. Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. You'll get URL: `https://guides-nepal-frontend.vercel.app`

#### E. Test Frontend

```bash
curl https://guides-nepal-frontend.vercel.app
```

Should return HTML (working!)

---

## Part 3: DASHBOARD DEPLOYMENT (Vercel)

### Step 1: Deploy Dashboard

Repeat **Part 2** but for dashboard:

#### A. Go to Vercel

1. Click **"Add New"**
2. Select **"Project"**
3. Import same repository: **guides-nepal**

#### B. Configure Dashboard

1. **Framework:** Vite
2. **Root Directory:** `dashboard`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

#### C. Environment Variables

Same as frontend:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co

VITE_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_PUBLISHABLE_KEY>

VITE_API_URL=https://guides-nelson-backend.onrender.com/api/v1
```

#### D. Deploy

Click **"Deploy"** and wait

You'll get URL: `https://guides-nepal-dashboard.vercel.app`

---

## Part 4: UPDATE CORS ON BACKEND

After frontend and dashboard are deployed:

### Step 1: Get Your Vercel URLs

- Frontend: `https://guides-nepal-frontend.vercel.app`
- Dashboard: `https://guides-nepal-dashboard.vercel.app`

### Step 2: Update Render Environment

1. Go to https://render.com/dashboard
2. Click **guides-nepal-backend** service
3. Click **"Settings"** tab
4. Find **Environment** section
5. Edit **BACKEND_CORS_ORIGINS**:

```
https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app
```

6. Click **"Save"**
7. Service will auto-redeploy

---

## Part 5: VERIFICATION

### Test All Three Services

#### 1. Test Backend

```bash
# Health check
curl https://guides-nepal-backend.onrender.com/health

# Should show: {"status":"ok","environment":"production"}

# API health
curl https://guides-nepal-backend.onrender.com/api/v1/health

# Should show: {"status":"ok","version":"1.0"}
```

#### 2. Test Frontend

```bash
# Visit in browser
https://guides-nepal-frontend.vercel.app

# Should load app without errors
```

#### 3. Test Dashboard

```bash
# Visit in browser
https://guides-nepal-dashboard.vercel.app

# Should load app without errors
```

#### 4. Test Connectivity

In browser console (F12), run:

```javascript
// Test if frontend can reach backend
fetch('https://guides-nepal-backend.onrender.com/api/v1/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend reachable:', d))
  .catch(e => console.log('❌ Backend unreachable:', e.message))
```

Should see: `✅ Backend reachable: {status: 'ok', version: '1.0'}`

---

## 🚨 COMMON ERRORS & FIXES

### Error 1: "Build failed in Render"

**Symptoms:** Red error message in Render logs

**Solutions:**

1. **Check requirements.txt**
   ```bash
   # Verify no invalid packages
   cat backend/requirements.txt
   ```

2. **Check Dockerfile path**
   ```yaml
   dockerfilePath: backend/Dockerfile  # ✅ Correct
   dockerfilePath: Dockerfile          # ❌ Wrong
   ```

3. **Check environment variables**
   - Make sure DATABASE_URL is complete
   - Use `%40` for `@` symbol
   - Don't use quotes

### Error 2: "Database connection failed"

**Symptoms:** Backend crashes with connection error

**Solutions:**

1. **Check DATABASE_URL format**
   ```
   ✅ postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
   ❌ postgresql://postgres:<SUPABASE_DB_PASSWORD>@... (wrong, @ not encoded)
   ```

2. **Check password special characters**
   - `@` → `%40`
   - `#` → `%23`
   - `/` → `%2F`
   - Use URL encoder: https://www.urlencode.org/

3. **Verify Supabase is running**
   - Go to https://app.supabase.com
   - Check database status

### Error 3: "CORS errors in browser"

**Symptoms:** Frontend can't call backend (blocked by CORS)

**Solutions:**

1. **Verify BACKEND_CORS_ORIGINS is set**
   ```bash
   # Check in Render dashboard under Environment
   BACKEND_CORS_ORIGINS=https://your-frontend-vercel-url.vercel.app
   ```

2. **Check your actual URLs**
   ```
   ✅ https://guides-nepal-frontend.vercel.app
   ❌ http://... (must be HTTPS)
   ❌ localhost:3000 (production only)
   ❌ * (wildcard not allowed)
   ```

3. **Redeploy backend after changing CORS**
   - Render auto-redeployes when env changes
   - Wait 2-3 minutes for restart

### Error 4: "Cannot reach backend from frontend"

**Symptoms:** Frontend loads but API calls fail with timeout

**Solutions:**

1. **Check VITE_API_URL in Vercel**
   ```
   ✅ https://guides-nepal-backend.onrender.com/api/v1
   ❌ http://localhost:8000/api/v1 (wrong)
   ```

2. **Check backend is actually running**
   ```bash
   curl https://guides-nepal-backend.onrender.com/health
   ```

3. **Redeploy frontend in Vercel**
   - Go to frontend project
   - Click "Redeploy"
   - Wait for build

### Error 5: "Vercel build fails for frontend"

**Symptoms:** Frontend/dashboard won't build on Vercel

**Solutions:**

1. **Check Node version**
   - Vercel uses Node 18+ by default ✅
   - Check `.nvmrc` if needed

2. **Check build command**
   ```
   ✅ npm run build
   ❌ npm build (wrong)
   ```

3. **Check output directory**
   ```
   ✅ dist
   ❌ build
   ```

4. **Test locally**
   ```bash
   cd frontend
   npm run build
   # Should create dist/ folder
   ```

### Error 6: "SECRET_KEY is insecure"

**Symptoms:** Backend warning on startup

**Solutions:**

1. **Let Render generate it**
   ```yaml
   SECRET_KEY:
     generateValue: true  # ✅ Auto-generates strong key
   ```

2. **OR generate your own**
   ```bash
   openssl rand -hex 32
   # Copy output and paste in Render dashboard
   ```

---

## 📋 DEPLOYMENT CHECKLIST

### Before Deploying Backend
- [ ] Fix requirements.txt (removed cors) ✅
- [ ] Commit code to GitHub
- [ ] Verify render.yaml exists
- [ ] Check DATABASE_URL format
- [ ] Prepare DATABASE_URL value:
  ```
  postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
  ```

### Before Deploying Frontend
- [ ] Backend deployed successfully
- [ ] Backend health check works
- [ ] Vercel project created
- [ ] Frontend environment variables set
- [ ] npm run build works locally

### Before Deploying Dashboard
- [ ] Frontend deployed successfully
- [ ] Vercel project created for dashboard
- [ ] Dashboard environment variables set
- [ ] npm run build works locally

### After All Deployments
- [ ] Test backend: `curl https://guides-nepal-backend.onrender.com/health`
- [ ] Test frontend in browser
- [ ] Test dashboard in browser
- [ ] Test API calls from frontend
- [ ] Check no 404 errors
- [ ] Verify HTTPS everywhere
- [ ] Check CORS not blocking

---

## 🔄 REDEPLOY INSTRUCTIONS

If something breaks:

### Redeploy Backend (Render)
1. Go to https://render.com/dashboard
2. Click **guides-nepal-backend**
3. Click **"Manual Deploy"**
4. Select **"Deploy Latest Commit"**
5. Wait 5-10 minutes

### Redeploy Frontend (Vercel)
1. Go to https://vercel.com/dashboard
2. Click **guides-nepal-frontend**
3. Click **"Deployments"**
4. Click **"Redeploy"** on latest
5. Wait 2-5 minutes

### Redeploy Dashboard (Vercel)
1. Go to https://vercel.com/dashboard
2. Click **guides-nepal-dashboard**
3. Click **"Deployments"**
4. Click **"Redeploy"** on latest
5. Wait 2-5 minutes

---

## 📊 FINAL DEPLOYMENT SUMMARY

```
┌─────────────────────────────────────────────┐
│         DEPLOYMENT ARCHITECTURE            │
├─────────────────────────────────────────────┤
│                                             │
│   Frontend (Vercel)  Dashboard (Vercel)    │
│   https://guides...   https://guides...    │
│           │                  │             │
│           └────────┬─────────┘             │
│                    │ API Calls             │
│                    ↓                       │
│   Backend (Render)                        │
│   https://guides-nepal-backend.onrender.com
│           │                               │
│           ↓                               │
│   Supabase Database                       │
│   postgresql://...@db.supabase.co         │
│                                            │
└─────────────────────────────────────────────┘
```

---

## ✅ SUCCESS INDICATORS

When everything is working:

✅ **Backend**
- Health endpoint returns JSON
- No error logs in Render dashboard
- CPU/Memory usage is normal

✅ **Frontend**
- Loads without 404 errors
- Can call backend API
- HTTPS shows green lock

✅ **Dashboard**
- Loads without 404 errors
- Can call backend API
- HTTPS shows green lock

✅ **Integration**
- Frontend can reach backend
- No CORS errors in browser console
- All API calls succeed

---

## 📞 QUICK LINKS

| Platform | URL | What To Do |
|----------|-----|-----------|
| Render | https://render.com/dashboard | Monitor backend |
| Vercel | https://vercel.com/dashboard | Monitor frontend & dashboard |
| Supabase | https://app.supabase.com | Check database |
| GitHub | https://github.com/username/guides-nepal | Manage code |

---

## 🎓 NEXT STEPS

1. ✅ Fix requirements.txt (DONE)
2. ⏭️ Commit code to GitHub
3. ⏭️ Deploy backend on Render (follow Part 1)
4. ⏭️ Deploy frontend on Vercel (follow Part 2)
5. ⏭️ Deploy dashboard on Vercel (follow Part 3)
6. ⏭️ Update CORS on backend (follow Part 4)
7. ⏭️ Test all services (follow Part 5)

---

**Ready to deploy? Start with committing code to GitHub!** 🚀

If you get stuck on any step, let me know the error message and I'll help you fix it!
