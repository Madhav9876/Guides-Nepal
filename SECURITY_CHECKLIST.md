# 🔒 Pre-Deployment Security Checklist

## Critical Security Items (MUST DO BEFORE DEPLOYMENT)

### Environment Variables Security
- [ ] **SECRET_KEY** - Changed from default value
  - Generate: `openssl rand -hex 32`
  - Store securely in Render dashboard
  - DO NOT commit to git

- [ ] **DATABASE_URL** - Verified correct
  - Uses postgresql:// protocol
  - Has strong password (<SUPABASE_DB_PASSWORD> not strong enough!)
  - Uses SSL/TLS connection to Supabase
  - DO NOT commit to git

- [ ] **ENV** - Set to "production" on Render
  - This enables all security features
  - Missing security headers if set to "development"

- [ ] **BACKEND_CORS_ORIGINS** - Updated with production URLs
  - Set to: `https://guides-nepal-frontend.vercel.app,https://guides-nepal-dashboard.vercel.app`
  - NO localhost origins in production
  - NO http:// origins (must be https://)

### Backend Security (FastAPI)
- [ ] **HTTPS Enforcement** - Enabled in production
  - `HTTPSEnforcementMiddleware` is active
  - All non-HTTPS requests rejected
  
- [ ] **Security Headers** - Present in responses
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security present
  - Content-Security-Policy configured
  - Check with: `curl -i https://api.example.com/health`

- [ ] **Input Validation** - Active
  - All SQL injection patterns blocked
  - Path traversal attempts blocked
  - XSS patterns removed from input
  - Request logging enabled

- [ ] **Rate Limiting** - Configured
  - Login endpoint limited to 5 attempts/15 min
  - API endpoint limited to 100 requests/min
  - Abusive IPs automatically blocked

- [ ] **Error Handling** - Secure
  - Debug mode OFF in production
  - Stack traces not exposed
  - Generic error messages returned
  - Sensitive data not in responses

- [ ] **JWT Tokens** - Properly configured
  - Token type verified (access vs refresh)
  - Expiration enforced (30 min for access)
  - Algorithm: HS256 with strong SECRET_KEY

- [ ] **Password Policy** - Enforced
  - Minimum 8 characters required
  - Uppercase letter required
  - Number required
  - Special character required (!@#$%^&*)
  - Hashing: Bcrypt with cost 12

- [ ] **Logging** - Enabled
  - All requests logged
  - Passwords/tokens NOT logged
  - Errors logged with context
  - Logs stored securely

### Frontend Security (Vercel)
- [ ] **HTTPS** - Enforced
  - Automatic redirect http → https
  - HSTS header set
  - All API calls use https://

- [ ] **Environment Variables** - Set in Vercel dashboard
  - VITE_SUPABASE_URL: https://wuyxvqkokyhjbfzemjyw.supabase.co
  - VITE_SUPABASE_PUBLISHABLE_KEY: (your key)
  - VITE_API_URL: https://guides-nepal-backend.onrender.com/api/v1
  - NO secrets in these (publishable key only)

- [ ] **.env.local** - NOT committed
  - File exists in `.gitignore`
  - Not in git history
  - Local development only

- [ ] **Input Sanitization** - Configured
  - All user input sanitized
  - XSS patterns removed
  - HTML/scripts rejected
  - Length limits enforced

- [ ] **Token Storage** - Secure
  - Tokens in sessionStorage (NOT localStorage)
  - Cleared on browser close
  - Not exposed in HTML
  - Not transmitted in cookies (vulnerable to CSRF)

### Dashboard Security (Vercel)
- [ ] **Same security checks as Frontend**
  - HTTPS enforced
  - Environment variables set
  - .env.local not committed
  - Input sanitization active

### Database (Supabase)
- [ ] **Connection Security**
  - Using postgres:// with SSL
  - Connection restricted to Render backend
  - Network access limited

- [ ] **Password Policy**
  - Database password: 16+ characters
  - Mix of uppercase, lowercase, numbers, special chars
  - NOT the same as any other password
  - Changed from default

- [ ] **Backups**
  - Automatic backups enabled
  - Backup retention >= 7 days
  - Test backup restoration

- [ ] **Encryption**
  - Encryption at rest enabled
  - Encryption in transit (SSL) enabled

- [ ] **Access Control**
  - Only Render backend can access
  - No direct internet access
  - IP whitelisting enabled (if available)

### Deployment Infrastructure (Render)
- [ ] **Docker Security**
  - Image built from secure base (python:3.11-slim)
  - Non-root user created (appuser)
  - Only necessary files copied
  - `docker-compose.yml` not used in production

- [ ] **Environment Configuration**
  - All secrets in environment variables
  - Render secrets manager used
  - NOT hardcoded in Dockerfile
  - NOT visible in source code

- [ ] **Health Checks**
  - Health endpoint configured: `/health`
  - Returns 200 OK when healthy
  - Render auto-restarts if unhealthy

- [ ] **Resource Limits**
  - CPU limits set (prevent resource exhaustion)
  - Memory limits set
  - File upload size limits enforced

### Git Repository Security
- [ ] **.gitignore** - Complete
  - .env files ignored
  - *.pem, *.key ignored (certificates)
  - Secrets files ignored
  - No sensitive files tracked

- [ ] **Commit History** - Clean
  - No API keys in commits
  - No passwords in commits
  - No .env files in history
  - Use `git secrets` to prevent

- [ ] **Branch Protection**
  - main branch requires code review
  - No direct pushes to main
  - CI/CD checks before merge

### API Security
- [ ] **Documentation** - Hidden in production
  - /api/v1/docs not accessible
  - /api/v1/redoc not accessible
  - /openapi.json not exposed
  - Debug mode disabled

- [ ] **CORS** - Properly configured
  - Specific origins only (no *)
  - Methods: GET, POST, PUT, DELETE, PATCH only
  - No wildcard headers allowed
  - Credentials requires same-origin

- [ ] **Rate Limiting** - Active
  - Per-IP rate limiting
  - Per-user rate limiting (if authenticated)
  - Automatic cooldown periods
  - Proper 429 responses

### Monitoring & Logging
- [ ] **Error Tracking**
  - Sentry or similar configured (optional)
  - Errors captured without sensitive data
  - Alerts set for critical errors

- [ ] **Access Logs**
  - All API requests logged
  - Failed auth attempts tracked
  - Suspicious activity flagged
  - Logs retained for audit

- [ ] **Performance Monitoring**
  - Response times monitored
  - Unusual spikes alert team
  - Database query performance checked

### Dependency Security
- [ ] **Python Dependencies**
  - Run `safety check` - no critical vulns
  - All packages from PyPI only
  - Pinned versions in requirements.txt
  - Updated within 30 days of release

- [ ] **NPM Dependencies**
  - Run `npm audit` - no critical vulns
  - All packages from npmjs only
  - package-lock.json committed
  - Updated within 30 days of release

- [ ] **Vulnerability Scanning**
  - GitHub security alerts enabled
  - Dependabot enabled
  - Security updates applied promptly

### Testing
- [ ] **Security Testing**
  - SQL injection payloads tested
  - XSS payloads tested
  - CORS headers tested
  - Rate limiting tested
  - Authentication tested

- [ ] **HTTPS Testing**
  - `curl -k https://api.example.com` - certificate valid
  - Certificate is not self-signed
  - Certificate not expired

## Score Card

Count checks:
- Total checks: 75+
- Your score: ____ / ____ (aim for 100%)

**Deployment allowed if score >= 95%**

---

## Quick Commands to Verify Security

### Backend
```bash
# Check for common vulnerabilities
cd backend
bandit -r app/

# Check dependencies
safety check
pip list  # Look for outdated packages

# Test API security
curl -i https://api.example.com/health
curl -i -H "Origin: http://attacker.com" https://api.example.com/api/v1/guides
```

### Frontend
```bash
# Check dependencies
npm audit

# Build for production
npm run build

# Check build size (should be < 500KB)
du -sh dist/
```

### Database
```bash
# Test connection (from anywhere except production)
psql -h db.wuyxvqkokyhjbfzemjyw.supabase.co -U postgres -d postgres

# (Will require password - this proves password works)
```

---

## If You Find Issues

1. **Don't deploy** - Fix first
2. **Document issue** - Note what's wrong
3. **Fix in code** - Update security settings
4. **Test fix** - Verify it works
5. **Re-check list** - Go through checklist again
6. **Deploy** - Only when score is 100%

---

## After Deployment

- [ ] Test frontend at https://guides-nepal-frontend.vercel.app
- [ ] Test dashboard at https://guides-nepal-dashboard.vercel.app
- [ ] Test backend at https://guides-nepal-backend.onrender.com/health
- [ ] Test API docs (should be inaccessible): https://guides-nepal-backend.onrender.com/api/v1/docs
- [ ] Test CORS with curl
- [ ] Monitor logs for errors
- [ ] Check Render dashboard for alerts

---

**⚠️ CRITICAL: DO NOT SKIP ANY ITEM IF DEPLOYING TO PRODUCTION**

Last Updated: July 2026
