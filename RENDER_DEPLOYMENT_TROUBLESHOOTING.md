# 🔧 RENDER DEPLOYMENT TROUBLESHOOTING GUIDE

## Quick Error Diagnostic

**What error are you seeing in Render?** Look for these common ones:

---

## ERROR: Build Failed

### If you see "Build failed" in Render logs:

**Step 1: Check build logs** (Click the failed deployment)

**Common issues:**

### Issue 1.1: Package Installation Error
```
ERROR: No matching distribution found for cors==...
ERROR: ERROR: Could not find a version that satisfies the requirement
```

**Fix:**
```bash
# Remove invalid packages from backend/requirements.txt
# ❌ Remove these lines:
cors
# (CORS is built into FastAPI)

# Then commit and push
git add backend/requirements.txt
git commit -m "Fix: Remove invalid cors package"
git push
```

### Issue 1.2: Python Version Error
```
ERROR: Python 3.x.x required
```

**Fix:**
1. Check `backend/Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim  # ✅ Should be 3.9+ and 3.11- preferred
   ```

2. If showing older version, update Dockerfile

### Issue 1.3: Missing Files
```
ERROR: No such file or directory: 'Dockerfile'
```

**Fix:**
1. Verify `render.yaml` has correct path:
   ```yaml
   dockerfilePath: backend/Dockerfile  # ✅ Correct
   ```

2. Verify Dockerfile exists:
   ```bash
   ls -la backend/Dockerfile  # Should exist
   ```

---

## ERROR: Database Connection Failed

### If backend crashes with connection error:

**Symptoms in Render logs:**
```
ERROR: could not connect to server: Connection refused
ERROR: FATAL: database "postgres" does not exist
```

**Step 1: Check DATABASE_URL format**

**Wrong formats:**
```
❌ postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co...
❌ postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co...
❌ DB_URL=postgresql://... (wrong variable name)
```

**Correct format:**
```
✅ DATABASE_URL=postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
```

**Key points:**
- `@` in password → `%40` (URL encoded)
- Variable name must be `DATABASE_URL` (not `DB_URL`)
- Port must be `:5432`
- Database name must be `postgres`

**Step 2: Fix in Render Dashboard**

1. Go to https://render.com/dashboard
2. Click **guides-nepal-backend**
3. Click **Environment** (in settings)
4. Find **DATABASE_URL**
5. Edit value to:
   ```
   postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
   ```
6. Save
7. Render will auto-redeploy

**Step 3: Verify Supabase Connection**

Test locally first:
```bash
# Set environment variable
export DATABASE_URL="postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres"

# Test connection
python -c "from sqlalchemy import create_engine; engine = create_engine('$DATABASE_URL'); print('✅ Connected!')" 2>&1
```

Should show `✅ Connected!` if URL is correct.

---

## ERROR: Application Startup Failed

### If backend deploys but then crashes:

**Symptoms:**
```
ERROR: Application startup failed
ERROR: Uvicorn startup failed
ERROR in startup
```

**Step 1: Check configuration error**

Common causes:
- Invalid SECRET_KEY
- Missing environment variables
- Configuration validation failed

**Step 2: Check Render environment variables**

Required variables:
```
✅ DATABASE_URL (checked above)
✅ SECRET_KEY (auto-generated is fine)
✅ ENV=production
✅ BACKEND_CORS_ORIGINS (should be set)
```

Missing any? Add them in Render dashboard → Environment

**Step 3: Check if SECRET_KEY is being validated**

In `backend/app/core/config.py`:
```python
if SECRET_KEY == "CHANGEME_IN_PRODUCTION_SECRET_KEY_12345" and ENV == "production":
    raise ValueError("❌ SECURITY ERROR: SECRET_KEY must be set in production!")
```

**Fix:** Make sure Render sets `generateValue: true` for SECRET_KEY:

```yaml
- key: SECRET_KEY
  generateValue: true  # ✅ Let Render auto-generate
```

---

## ERROR: Health Check Failed

### If Render shows "Health check failed":

**Symptoms:**
```
Health check failed. Received status code: 503
Health check timeout
```

**Step 1: Test health endpoint manually**

```bash
# Wait 2 minutes for startup, then test
curl https://guides-nepal-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok","environment":"production"}
```

**Step 2: Check health check configuration**

In `render.yaml`:
```yaml
healthCheckPath: /health  # ✅ Correct
healthCheckPath: /api/v1/health  # ❌ Wrong (backend needs time to start)
```

**Step 3: Increase health check timeout**

If failing due to slow startup:
1. Go to Render dashboard → Backend settings
2. Look for "Health Check" settings
3. Increase timeout to 60 seconds
4. Increase start period to 30 seconds

---

## ERROR: CORS Errors in Frontend

### If frontend gets CORS rejection:

**Browser error:**
```
Access to XMLHttpRequest at 'https://guides-nepal-backend.onrender.com/api/v1/guides' 
from origin 'https://guides-nepal-frontend.vercel.app' has been blocked by CORS policy
```

**Step 1: Check BACKEND_CORS_ORIGINS**

1. Go to Render dashboard → Backend → Environment
2. Find **BACKEND_CORS_ORIGINS**
3. Should contain your frontend URL:
   ```
   ✅ https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app
   ❌ http://localhost:3000 (wrong in production)
   ❌ * (wildcard not allowed)
   ```

**Step 2: Update if needed**

1. Edit the value in Render
2. Make sure URLs are HTTPS
3. Make sure no trailing slashes
4. Separate multiple with commas (no spaces)
5. Save
6. Render will auto-redeploy (wait 2-3 min)

**Step 3: Test CORS manually**

```bash
curl -H "Origin: https://guides-nepal-frontend.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -i https://guides-nepal-backend.onrender.com/api/v1/guides

# Look for these headers:
# ✅ Access-Control-Allow-Origin: https://guides-nepal-frontend.vercel.app
# ✅ Access-Control-Allow-Methods: GET, POST, ...
```

---

## ERROR: Service Crashes After Deployment

### If backend deploys but crashes minutes later:

**Symptoms:**
```
Service crashed
Crashed with exit status 1
Process exited with status 1
```

**Step 1: Check logs for errors**

1. Go to Render dashboard
2. Click backend service
3. Click "Logs" tab
4. Scroll to see the actual error
5. Look for traceback

**Common causes:**

### Cause 1: Database connection timeout
- Solution: Wait for Supabase to respond
- Check if Supabase is running: https://app.supabase.com
- Update DATABASE_URL if needed

### Cause 2: Missing migrations
- Solution: Check if Alembic migrations need to run
- Can be ignored for first deployment

### Cause 3: Configuration error
- Solution: Check all environment variables are set
- Check types are correct (not quoted when shouldn't be)

**Step 2: Restart service**

1. Go to Render dashboard → Backend
2. Look for "Restart" button
3. Click it
4. Wait for service to restart

---

## ERROR: 502 Bad Gateway

### If you get 502 error when accessing:

**Symptoms:**
```
502 Bad Gateway
The service is temporarily unavailable
```

**Causes:**
1. Backend is still starting (wait 2 min)
2. Backend crashed (check logs)
3. Too many requests (check rate limiting)
4. Database connection lost

**Step 1: Wait for startup**

- New deployments take 2-3 minutes
- Wait, then test again:
  ```bash
  curl https://guides-nepal-backend.onrender.com/health
  ```

**Step 2: Check backend logs**

1. Go to Render dashboard
2. Click backend service
3. Click "Logs"
4. Look for errors

**Step 3: Restart if needed**

1. Click "Restart"
2. Wait 2-3 minutes
3. Test health endpoint again

---

## ERROR: Build Takes Too Long

### If build is stuck or taking >30 minutes:

**Step 1: Cancel and restart**

1. Go to Render dashboard
2. Click the deployment
3. Click "Cancel"
4. Click "Redeploy"
5. Use latest commit

**Step 2: Optimize requirements.txt**

Remove unnecessary packages:
```bash
# Remove these if not needed:
black       # (only for development)
ruff        # (only for development)
mypy        # (only for development)
pytest      # (only for development)
bandit      # (only for development)
safety      # (only for testing)
```

Keep only:
```
fastapi
uvicorn
pydantic
email-validator
pydantic-settings
sqlalchemy
alembic
psycopg2-binary
python-jose[cryptography]
passlib[bcrypt]
python-multipart
python-dotenv
slowapi
cryptography
```

---

## FULL DEPLOYMENT VERIFICATION

Once deployed, run these checks:

### Check 1: Backend is running
```bash
curl -i https://guides-nepal-backend.onrender.com/health
# Should see 200 OK and JSON response
```

### Check 2: Security headers present
```bash
curl -i https://guides-nepal-backend.onrender.com/health | grep -i "Strict-Transport-Security"
# Should show HSTS header
```

### Check 3: CORS configured
```bash
curl -H "Origin: https://guides-nepal-frontend.vercel.app" \
  https://guides-nepal-backend.onrender.com/api/v1/guides
# Should NOT get CORS error (may get 401 if not authenticated, that's OK)
```

### Check 4: Database connected
```bash
# If you have an endpoint that uses database:
curl https://guides-nepal-backend.onrender.com/api/v1/guides
# Should not get "database connection" error
```

### Check 5: Frontend can reach backend
Open browser console (F12) and run:
```javascript
fetch('https://guides-nepal-backend.onrender.com/api/v1/health')
  .then(r => r.json())
  .then(d => console.log('✅', d))
  .catch(e => console.log('❌', e.message))
```

Should see: `✅ {status: "ok", environment: "production"}`

---

## RENDER DASHBOARD REFERENCE

### Important URLs

| Page | URL |
|------|-----|
| Dashboard | https://render.com/dashboard |
| Create Blueprint | https://render.com/new |
| Backend Service | https://render.com/dashboard → guides-nepal-backend |
| Logs | Service → Logs tab |
| Environment | Service → Settings → Environment Variables |

### Key Settings to Check

| Setting | Should Be |
|---------|-----------|
| Environment | docker |
| Region | oregon (or preferred) |
| Plan | starter |
| Health Check Path | /health |
| Docker file path | backend/Dockerfile |

---

## QUICK FIX CHECKLIST

- [ ] Removed `cors` from requirements.txt
- [ ] DATABASE_URL uses `%40` for `@` character
- [ ] DATABASE_URL ends with `/postgres`
- [ ] ENV=production is set
- [ ] SECRET_KEY is set (or generateValue: true)
- [ ] BACKEND_CORS_ORIGINS has your frontend URLs
- [ ] All URLs use HTTPS
- [ ] No trailing slashes in URLs
- [ ] Render blueprint deployed from render.yaml
- [ ] Health endpoint returns 200 OK

If all checked ✅, your backend should work!

---

## 🆘 STILL STUCK?

Share the **exact error message** from Render logs and I'll help you fix it!

Key info:
1. Full error message (copy-paste from logs)
2. Which section of logs (startup, build, running)
3. Which step you're on

Then I can provide specific fix!
