# ⚙️ VERCEL BUILD CONFIGURATION

## For BOTH Frontend and Dashboard

Since both are Vite projects, use the SAME configuration:

---

## 📝 FRONTEND Configuration

### Build Command
```
npm run build
```

### Output Directory
```
dist
```

### Install Command
```
npm install
```

---

## 📝 DASHBOARD Configuration

### Build Command
```
npm run build
```

### Output Directory
```
dist
```

### Install Command
```
npm install
```

---

## ✅ Quick Reference

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

**Same for BOTH frontend and dashboard!**

---

## 🎯 Where to Enter These

When deploying on Vercel, in the configuration page:

```
Project Name: guides-nepal-frontend (or guides-nepal-dashboard)
Framework: Vite
Root Directory: frontend (or dashboard)

    ↓ Scroll down ↓

Build and Output Settings:
  Install Command: npm install
  Build Command: npm run build
  Output Directory: dist

    ↓ Continue ↓

Environment Variables:
  VITE_SUPABASE_URL = https://wuyxvqkokyhjbfzemjyw.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_CSVybNBa1ZK_mqg-5Gr3DA_-wmXhfrL
  VITE_API_URL = https://guides-nepal.onrender.com
```

---

## 🚀 Copy-Paste Ready

### Install Command
```
npm install
```

### Build Command
```
npm run build
```

### Output Directory
```
dist
```

---

**Use these exact values for BOTH projects! ✅**
