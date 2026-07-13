# ⚡ QUICK START: Deploy Backend on Render

## 🎯 In 5 Steps

### Step 1: Push Code to GitHub
```bash
cd "c:\Users\poude\Desktop\Guides Nepal"
git init
git add .
git commit -m "Deploy: Guides Nepal full-stack app"
git remote add origin https://github.com/YOUR_USERNAME/guides-nepal.git
git branch -M main
git push -u origin main
```

**NOTE**: Replace `YOUR_USERNAME` with your actual GitHub username

### Step 2: Go to Render
1. Open https://render.com
2. Click **"Dashboard"** (top right, login if needed)
3. Click **"New +"** button
4. Select **"Blueprint"**

### Step 3: Connect GitHub
1. Click **"GitHub"**
2. Authorize if asked
3. Search for: `guides-nepal`
4. Click on your repo
5. Select **"main"** branch
6. Click **"Connect"**

### Step 4: Review & Deploy
1. Render shows the render.yaml
2. Check the **DATABASE_URL** value:
   - If it shows `***`: Click "Edit" and paste:
     ```
     postgresql://postgres:Guidesnepal%40123@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
     ```
   - **IMPORTANT**: Use `%40` NOT `@`

3. Click **"Deploy"**

### Step 5: Watch the Logs
1. You'll see deployment logs
2. **Wait 5-10 minutes**
3. Watch for status: **"Live"** or errors

---

## 🔍 Find the Error

If it says **"Deployment failed"**:

1. **Scroll down in the logs** - see all messages
2. **Look for red error text** - copy this exactly
3. Find your error type below:

### ERROR TYPE A: Build Failed
```
ERROR: Could not find a version that satisfies the requirement cors
ERROR: ERROR: Could not find a version of Python
ERROR: Command failed
```
→ **FIX**: See RENDER_DEPLOYMENT_TROUBLESHOOTING.md - ERROR: Build Failed section

### ERROR TYPE B: Database Error
```
FATAL: password authentication failed
could not connect to server: Connection refused
database "postgres" does not exist
```
→ **FIX**: See RENDER_DEPLOYMENT_TROUBLESHOOTING.md - ERROR: Database Connection Failed section

### ERROR TYPE C: Application Startup Failed
```
ERROR: Application startup failed
Uvicorn startup failed
ModuleNotFoundError
```
→ **FIX**: See RENDER_DEPLOYMENT_TROUBLESHOOTING.md - ERROR: Application Startup Failed section

### ERROR TYPE D: Health Check Failed
```
Health check failed
Health check timeout
Service crashed with exit status
```
→ **FIX**: See RENDER_DEPLOYMENT_TROUBLESHOOTING.md - ERROR: Health Check Failed section

---

## ✅ Verify Success

Once you see **"Live"** status:

### Test 1: Health Check
```bash
curl https://guides-nepal-backend.onrender.com/health
```
Should return: `{"status":"ok","environment":"production"}`

### Test 2: Check Logs Are Clean
Go to Render dashboard:
1. Click your backend service
2. Click **"Logs"** tab
3. Should show startup messages
4. Should NOT have red errors at bottom

### Test 3: Copy Backend URL
- You'll need this for frontend
- Format: `https://guides-nepal-backend.onrender.com`

---

## 📋 Next: Deploy Frontend & Dashboard

Once backend is live ✅:

1. **Deploy Frontend on Vercel** (see COMPLETE_DEPLOYMENT_GUIDE.md Part 3)
2. **Deploy Dashboard on Vercel** (see COMPLETE_DEPLOYMENT_GUIDE.md Part 4)
3. **Update CORS** with Vercel URLs (see COMPLETE_DEPLOYMENT_GUIDE.md Part 5)

---

## 🆘 Stuck? Do This:

1. **Tell me the error message** (copy-paste from red text in logs)
2. I'll give you exact fix
3. Usually: DATABASE_URL format or invalid package name

**Common fix:**
```
DATABASE_URL must be:
postgresql://postgres:Guidesnepal%40123@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres

NOT:
postgresql://postgres:Guidesnepal@123@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
```

---

Good luck! 🚀
