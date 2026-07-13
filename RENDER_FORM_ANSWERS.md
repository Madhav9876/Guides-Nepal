# 📝 Render Deployment Form - Exact Answers

## Fill Out These Fields in Render

### 1. **Language / Runtime Environment**
```
✅ Docker (ALREADY SELECTED - CORRECT)
```
Keep it as "Docker"

---

### 2. **Branch**
```
main
```
This is the branch to deploy from (your main branch)

---

### 3. **Region**
```
✅ Ohio (US East) - SELECTED OR
   Oregon (US West) - BETTER FOR ASIA
```

**Choose One:**
- **Ohio (US East)** - Good for US users
- **Oregon (US West)** - Better if your users are in Asia
- **Singapore** - Best for Asia (closest to Nepal)

**For Guides Nepal (Nepal-based):**
→ Choose **Singapore** or **Oregon**

---

### 4. **Root Directory** (Optional)
```
Leave EMPTY
```

**Why:** Your render.yaml and backend/Dockerfile are in repo root

---

### 5. **Dockerfile Path**
```
backend/Dockerfile
```

**Exactly this** (relative to repo root)

---

## Summary: Quick Reference

| Field | Answer |
|-------|--------|
| Language | Docker |
| Branch | main |
| Region | Singapore (or Oregon) |
| Root Directory | (leave empty) |
| Dockerfile Path | backend/Dockerfile |

---

## Visual Layout

When you see the form:

```
┌─────────────────────────────────────────┐
│ Language: [Docker] ✓                    │
│ Branch: [main] ✓                        │
│ Region: [Singapore ▼] (or Oregon)       │
│ Root Directory: [] (leave blank)        │
│ Dockerfile Path: [backend/Dockerfile]   │
└─────────────────────────────────────────┘
```

---

## Next: Environment Variables

After clicking "Create Service", you'll see environment variables:

Add these (if not already in render.yaml):

```
DATABASE_URL = postgresql://postgres:<SUPABASE_DB_PASSWORD>@db.wuyxvqkokyhjbfzemjyw.supabase.co:5432/postgres
ENV = production
SECRET_KEY = (leave empty - Render will generate)
BACKEND_CORS_ORIGINS = https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app
VITE_SUPABASE_URL = https://wuyxvqkokyhjbfzemjyw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_CSVybNBa1ZK_mqg-5Gr3DA_-wmXhfrL
```

**IMPORTANT**: DATABASE_URL must use `%40` for the @ symbol (NOT `@`)

---

## Click Deploy!

Once all fields are filled:
1. Click **"Deploy"**
2. Wait 5-10 minutes
3. Watch the build logs
4. Should see **"Live"** when done

---

## ✅ Verification

After deployment:
```bash
curl https://guides-nepal-backend.onrender.com/health
```

Should return:
```json
{"status":"ok","environment":"production"}
```

---

## If It Fails

1. Check the **exact error message** in red text in logs
2. Share the error with me
3. I'll give you the fix

Common issues:
- ❌ DATABASE_URL with @ instead of %40
- ❌ Wrong Dockerfile path
- ❌ Missing environment variables
- ❌ Invalid package in requirements.txt

---

**Ready? Fill in the form above and click Deploy! 🚀**
