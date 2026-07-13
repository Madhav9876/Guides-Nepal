# 🚀 DEPLOY FRONTEND & DASHBOARD ON VERCEL

## ✅ Backend Status
```
✅ Backend is LIVE
URL: https://guides-nepal.onrender.com
Health: {"status":"ok","environment":"development"}
```

---

## 📋 PART 1: Deploy Frontend on Vercel

### Step 1.1: Go to Vercel
1. Open https://vercel.com/dashboard
2. Click **"Add New..."** (top right)
3. Click **"Project"**

### Step 1.2: Import GitHub Repository
1. Click **"Import Git Repository"**
2. Under "By connecting to a Git provider", click **GitHub**
3. Search for: `Guides-Nepal` (your repository name)
4. Click on the repository to select it
5. Click **"Import"**

### Step 1.3: Configure Project

**Project Name:**
```
guides-nepal-frontend
```

**Framework Preset:**
```
Vite
```

**Root Directory:**
```
Click on "frontend" folder
(OR type: frontend)
```

⚠️ **IMPORTANT**: Make sure "frontend" is selected as root directory

### Step 1.4: Environment Variables

1. Scroll down to **"Environment Variables"**
2. Add these 3 variables:

| Name | Value |
|------|-------|
| VITE_SUPABASE_URL | https://YOUR_PROJECT_REF.supabase.co |
| VITE_SUPABASE_PUBLISHABLE_KEY | <SUPABASE_PUBLISHABLE_KEY> |
| VITE_API_URL | https://guides-nepal.onrender.com |

For each variable:
- Type the **Name**
- Paste the **Value**
- Click **"Add"**

### Step 1.5: Deploy

1. Click **"Deploy"** button
2. Wait 3-5 minutes
3. Should show **"Ready"** with a checkmark ✅
4. Click **"Visit"** to see your frontend
5. **Copy and save the URL** (e.g., `https://guides-nepal-frontend.vercel.app`)

✅ **Frontend deployed!**

---

## 📋 PART 2: Deploy Dashboard on Vercel

### Step 2.1: Go to Vercel
1. Open https://vercel.com/dashboard
2. Click **"Add New..."** (top right)
3. Click **"Project"**

### Step 2.2: Import GitHub Repository
1. Click **"Import Git Repository"**
2. Click **GitHub**
3. Search for: `Guides-Nepal`
4. Click on the repository
5. Click **"Import"**

### Step 2.3: Configure Project

**Project Name:**
```
guides-nepal-dashboard
```

**Framework Preset:**
```
Vite
```

**Root Directory:**
```
Click on "dashboard" folder
(OR type: dashboard)
```

⚠️ **IMPORTANT**: Use "dashboard" NOT "frontend" this time!

### Step 2.4: Environment Variables

Same as frontend:

| Name | Value |
|------|-------|
| VITE_SUPABASE_URL | https://YOUR_PROJECT_REF.supabase.co |
| VITE_SUPABASE_PUBLISHABLE_KEY | <SUPABASE_PUBLISHABLE_KEY> |
| VITE_API_URL | https://guides-nepal.onrender.com |

### Step 2.5: Deploy

1. Click **"Deploy"**
2. Wait 3-5 minutes
3. Should show **"Ready"** ✅
4. Click **"Visit"**
5. **Copy and save the URL** (e.g., `https://guides-nepal-dashboard.vercel.app`)

✅ **Dashboard deployed!**

---

## 📋 PART 3: Update CORS on Backend

Now that frontend and dashboard are deployed, update CORS:

### Step 3.1: Get Your URLs

**Frontend URL:** (from Vercel)
```
https://guides-nepal-frontend.vercel.app
```

**Dashboard URL:** (from Vercel)
```
https://guides-nepal-dashboard.vercel.app
```

### Step 3.2: Update Backend CORS

1. Open https://render.com/dashboard
2. Click **guides-nepal** (backend service)
3. Click **"Environment"** (left menu)
4. Find **BACKEND_CORS_ORIGINS**
5. Edit the value to:
   ```
   https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app
   ```
   - Use comma to separate (NO SPACES)
   - Both must start with `https://`

6. Click **"Save"**
7. Render will auto-redeploy (wait 2-3 minutes)

✅ **CORS updated!**

---

## ✅ VERIFY EVERYTHING WORKS

### Test 1: Backend Health
```bash
curl https://guides-nepal.onrender.com/health
```
Should return: `{"status":"ok"}`

### Test 2: Frontend Loads
1. Open https://guides-nepal-frontend.vercel.app
2. Should load without errors
3. Open browser console (F12)
4. No red errors?

### Test 3: Dashboard Loads
1. Open https://guides-nepal-dashboard.vercel.app
2. Should load without errors
3. Open browser console (F12)
4. No red errors?

### Test 4: Frontend Can Reach Backend
1. Open frontend URL
2. Press F12 to open console
3. Run this command:
   ```javascript
   fetch('https://guides-nepal.onrender.com/health')
     .then(r => r.json())
     .then(d => console.log('✅ Backend OK:', d))
     .catch(e => console.log('❌ Error:', e.message))
   ```
4. Should show: `✅ Backend OK: {status: "ok"}`

### Test 5: Check CORS Headers
```bash
curl -i -H "Origin: https://guides-nepal-frontend.vercel.app" https://guides-nepal.onrender.com/health
```

Should see:
```
access-control-allow-origin: https://guides-nepal-frontend.vercel.app
```

---

## 🆘 TROUBLESHOOTING

### Frontend/Dashboard shows blank page
1. Open browser console (F12)
2. Look for error messages
3. Common issues:
   - VITE_API_URL is wrong
   - Backend is down
   - CORS error

### CORS error in console
```
Access to XMLHttpRequest at 'https://guides-nepal.onrender.com/...'
from origin 'https://guides-nepal-frontend.vercel.app' 
has been blocked by CORS policy
```

**Fix:**
1. Check BACKEND_CORS_ORIGINS on Render
2. Make sure it includes the Vercel URL
3. No typos
4. No trailing slashes
5. Save and wait 2-3 minutes

### Vercel deployment fails
1. Check build logs (click "View")
2. Common issues:
   - Wrong root directory
   - Missing environment variables
   - Build error in code

---

## 📊 Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Frontend URL saved
- [ ] Dashboard deployed on Vercel
- [ ] Dashboard URL saved
- [ ] CORS updated on backend
- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] Dashboard loads without errors
- [ ] Frontend can reach backend (console test)
- [ ] No CORS errors in console
- [ ] All 3 services are LIVE ✅

---

## 🎉 You're Almost Done!

Once all 3 are deployed:
1. ✅ Backend on Render
2. ✅ Frontend on Vercel
3. ✅ Dashboard on Vercel

Your **Guides Nepal** app is live and ready to use!

---

**Need help with any step? Let me know!**
