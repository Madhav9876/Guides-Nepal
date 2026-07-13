# 🔒 SECURITY GUIDE - Guides Nepal

## Overview
This document outlines all security measures implemented in the Guides Nepal project to protect against common vulnerabilities and abuse.

---

## 🛡️ SECURITY IMPLEMENTATION SUMMARY

### Backend Security (FastAPI)
- ✅ **HTTPS Enforcement** - Requires HTTPS in production
- ✅ **Security Headers** - HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- ✅ **CORS Protection** - Restricted to specific origins only
- ✅ **Rate Limiting** - Prevents brute force and DoS attacks
- ✅ **Input Validation** - SQL injection, XSS, path traversal protection
- ✅ **Request Logging** - Monitor all requests for security issues
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - Bcrypt with cost factor 12
- ✅ **Environment Variables** - SECRET_KEY validation
- ✅ **Exception Handling** - Prevents information leakage

### Frontend Security (React)
- ✅ **Environment Validation** - Requires HTTPS Supabase URL
- ✅ **Input Sanitization** - XSS prevention
- ✅ **Rate Limiting** - Login attempt throttling
- ✅ **Secure Token Storage** - SessionStorage (cleared on close)
- ✅ **HTTPS Enforcement** - Production only
- ✅ **CSP Headers** - Set by backend

---

## 📋 CRITICAL SECURITY CHECKLIST

### Before Deployment

#### 1. Environment Variables
```bash
# CRITICAL: Verify these are set in production
[ ] SECRET_KEY - Changed from default (generate strong key: openssl rand -hex 32)
[ ] DATABASE_URL - Using Supabase connection string
[ ] ENV - Set to "production"
[ ] BACKEND_CORS_ORIGINS - Updated with actual Vercel URLs
```

**Generate Strong SECRET_KEY:**
```bash
# On Unix/Linux/Mac:
openssl rand -hex 32

# On Windows PowerShell:
[Convert]::ToHexString([byte[]](1..32 | ForEach-Object {Get-Random -Max 256}))
```

#### 2. Database Security
```bash
[ ] Supabase database password is strong (12+ characters, mixed case, numbers, special chars)
[ ] Database backups are configured
[ ] Database encryption is enabled
[ ] Connection using SSL/TLS only
```

#### 3. API Security
```bash
[ ] API documentation disabled in production (/docs not accessible)
[ ] Health endpoints don't expose sensitive info
[ ] Error messages don't leak system details
[ ] Rate limiting is enabled
[ ] CORS origins are restrictive (not "*")
[ ] HTTPS enforced for all API calls
```

#### 4. Frontend Security
```bash
[ ] No hardcoded API keys or secrets in code
[ ] .env.local not committed to git
[ ] Sensitive tokens only in sessionStorage
[ ] All external scripts from trusted sources
[ ] CSP headers properly configured
```

#### 5. Deployment Security
```bash
[ ] Render environment variables set securely
[ ] Vercel environment variables set securely
[ ] SSL certificates installed (auto for both Render & Vercel)
[ ] HTTPS redirects configured
[ ] Security headers deployed
```

---

## 🔐 SECURITY FEATURES EXPLAINED

### 1. **HTTPS Enforcement**
**What it does:** Forces all connections to use HTTPS in production
**Why it matters:** Prevents man-in-the-middle attacks
**File:** `backend/app/core/middleware.py` - `HTTPSEnforcementMiddleware`

### 2. **Security Headers**
**Implemented Headers:**
- `Strict-Transport-Security`: Enforces HTTPS for 1 year
- `X-Frame-Options: DENY`: Prevents clickjacking
- `X-Content-Type-Options: nosniff`: Prevents MIME type sniffing
- `X-XSS-Protection`: Enable browser XSS filters
- `Content-Security-Policy`: Restricts resource loading
- `Referrer-Policy`: Controls referrer information

**File:** `backend/app/core/middleware.py`

### 3. **CORS Protection**
**Default Allowed Origins (Development):**
- http://localhost:5173 (Frontend)
- http://localhost:5174 (Frontend backup)
- http://localhost:5175 (Dashboard)
- http://localhost:5176 (Dashboard backup)
- http://localhost:4173
- http://localhost:3000

**Production:** Must be set via `BACKEND_CORS_ORIGINS` env variable
**Blocked Methods:** Only GET, POST, PUT, DELETE, PATCH allowed
**Blocked Headers:** Most sensitive headers require explicit CORS

**Why it matters:** Prevents Cross-Origin attacks
**File:** `backend/app/main.py`

### 4. **Input Validation & Sanitization**
**Protects Against:**
- SQL Injection
- XSS (Cross-Site Scripting)
- Path Traversal
- Command Injection
- Null Byte Injection

**Pattern Detection:**
```python
# SQL patterns: "union select", "delete from", "drop table"
# Path traversal: "../", "..\\", "%2e%2e"
# Command injection: ";", "|", "&", "`", "$"
# Null bytes: "%00", "\x00"
```

**File:** `backend/app/core/middleware.py` - `InputValidationMiddleware`

### 5. **Authentication & Password Security**
**Password Requirements:**
- Minimum 8 characters
- Must contain uppercase letter
- Must contain number
- Must contain special character (!@#$%^&*)

**Password Hashing:** Bcrypt with cost factor 12
**Token Expiration:** 30 minutes for access, 7 days for refresh

**File:** `backend/app/core/security.py`

### 6. **Rate Limiting**
**Implemented for:**
- Login attempts: 5 attempts per 15 minutes
- API requests: 100 requests per minute
- Automatically blocks abusive clients

**File:** `frontend/src/config/security.ts`

### 7. **Request Logging**
**Logs include:**
- Request method and path
- Client IP address
- User agent
- Response status and duration
- Errors and exceptions

**Note:** Password and sensitive data are NOT logged
**File:** `backend/app/core/middleware.py` - `RequestLoggingMiddleware`

### 8. **Environment Variable Protection**
**Critical Settings:**
- `SECRET_KEY` - Must be changed from default in production
- `DATABASE_URL` - Should be encrypted in deployment
- `ENV` - Must be "production" in production
- API keys are never logged or exposed

**Validation:**
```python
if SECRET_KEY == "CHANGEME_IN_PRODUCTION_SECRET_KEY_12345" and ENV == "production":
    raise ValueError("❌ SECURITY ERROR: SECRET_KEY must be set in production!")
```

**File:** `backend/app/core/config.py`

### 9. **JWT Token Security**
**Token Structure:**
```json
{
  "sub": "user_id",
  "type": "access",  // or "refresh"
  "exp": 1234567890,
  "iat": 1234567800
}
```

**Validation:**
- Token type verified (access vs refresh)
- Expiration checked
- User ID extracted safely

**File:** `backend/app/core/security.py`

### 10. **Frontend XSS Prevention**
**Input Sanitization:** Removes dangerous HTML/JS patterns
**Secure Storage:** SessionStorage instead of localStorage
**HTTPS Validation:** Enforces HTTPS URLs in production

**File:** `frontend/src/config/security.ts`

---

## 🚨 COMMON SECURITY VULNERABILITIES & FIXES

### 1. **SQL Injection**
**Vulnerability:** Untrusted input in database queries
**Fix:** 
- SQLAlchemy ORM prevents SQL injection
- Input validation in middleware catches obvious patterns
- Database user has minimal permissions

### 2. **Cross-Site Scripting (XSS)**
**Vulnerability:** Injected scripts running in user browser
**Fix:**
- CSP headers restrict script execution
- Input sanitization removes script tags
- Frontend sanitizes all user input

### 3. **Cross-Site Request Forgery (CSRF)**
**Vulnerability:** Unauthorized actions on behalf of user
**Fix:**
- Same-origin CORS policy
- CSRF tokens can be added for state-changing operations
- SameSite cookie attribute (recommended for backends)

### 4. **Brute Force Attacks**
**Vulnerability:** Unlimited login attempts
**Fix:**
- Rate limiting: 5 attempts per 15 minutes
- Progressive delays
- Account lockout after threshold

### 5. **Information Disclosure**
**Vulnerability:** Stack traces and errors expose system details
**Fix:**
- Generic error messages in production
- Detailed errors only in development
- Sensitive data never logged

### 6. **Insecure Direct Object Reference (IDOR)**
**Vulnerability:** Users access other users' data
**Fix:**
- JWT validation ensures user ownership
- Database queries filtered by user_id
- API authorization on every endpoint

### 7. **Missing HTTPS**
**Vulnerability:** Data transmitted in plaintext
**Fix:**
- HTTPS enforced in production
- HSTS headers force HTTPS
- Automatic redirects http → https

### 8. **Weak Password Policy**
**Vulnerability:** Easy-to-guess passwords
**Fix:**
- Minimum 8 characters
- Requires mix of uppercase, numbers, special characters
- Bcrypt hashing with cost 12

---

## 🔄 SECURITY BEST PRACTICES FOR DEVELOPMENT

### 1. **Never Commit Secrets**
```bash
# ❌ WRONG
.env  # Contains secrets

# ✅ RIGHT
.env.example  # Template without secrets
```

### 2. **Use Environment Variables**
```bash
# ✅ Good
DATABASE_URL=postgresql://user:pass@host/db

# ❌ Bad
password = "SecretPassword123"  # In source code
```

### 3. **Validate All Input**
```typescript
// ✅ Good
const sanitized = sanitizeInput(userInput);

// ❌ Bad
const html = userInput;  // Potential XSS
```

### 4. **Use HTTPS URLs**
```typescript
// ✅ Good
const url = "https://api.example.com";

// ❌ Bad
const url = "http://api.example.com";
```

### 5. **Don't Log Passwords**
```python
# ✅ Good
logger.info(f"Login attempt for user {user_id}")

# ❌ Bad
logger.info(f"Login attempt: {email}:{password}")
```

---

## 📊 SECURITY TESTING CHECKLIST

### Manual Testing
- [ ] Try SQL injection in form inputs
- [ ] Try XSS payloads (e.g., `<script>alert('xss')</script>`)
- [ ] Try path traversal (`../../../etc/passwd`)
- [ ] Try rapid requests (rate limiting)
- [ ] Try accessing other users' data
- [ ] Inspect network requests for sensitive data
- [ ] Check browser console for exposed credentials

### Automated Testing
```bash
# Backend security scan
bandit -r backend/app

# Dependency vulnerabilities
pip install safety
safety check

# Frontend dependencies
npm audit

# OWASP check (optional)
docker run -it -v $(pwd):/target owasp/zap:stable
```

---

## 🚀 PRODUCTION DEPLOYMENT SECURITY

### Before Going Live

1. **Secret Management**
   - [ ] Generate strong SECRET_KEY using `openssl rand -hex 32`
   - [ ] Set all environment variables
   - [ ] Use secrets manager if available

2. **Database**
   - [ ] Enable SSL connections
   - [ ] Set strong password (16+ characters)
   - [ ] Enable backups
   - [ ] Enable encryption at rest
   - [ ] Restrict database access by IP

3. **Frontend**
   - [ ] Build with `npm run build`
   - [ ] Enable HTTPS
   - [ ] Set security headers in Vercel
   - [ ] Enable caching for static assets

4. **Backend**
   - [ ] Rebuild Docker image for production
   - [ ] Set ENV=production
   - [ ] Update BACKEND_CORS_ORIGINS
   - [ ] Enable HTTPS only mode
   - [ ] Configure logging and monitoring

5. **Monitoring**
   - [ ] Setup error tracking (Sentry recommended)
   - [ ] Enable audit logging
   - [ ] Monitor failed authentication attempts
   - [ ] Setup alerts for unusual activity

---

## 🆘 SECURITY INCIDENTS

### If Compromised:

1. **Immediately:**
   - Rotate SECRET_KEY
   - Reset all user passwords
   - Review access logs
   - Invalidate all JWT tokens

2. **Investigation:**
   - Check logs for unauthorized access
   - Verify data integrity
   - Check for malware/backdoors

3. **Communication:**
   - Notify affected users
   - Document incident
   - File security report

---

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [NIST Security Guidelines](https://csrc.nist.gov/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

---

## 📞 Security Support

If you discover a security vulnerability:
1. Do NOT open a public issue
2. Email security details to project maintainer
3. Provide steps to reproduce
4. Allow time for fix before disclosure

---

**Last Updated:** July 2026
**Security Level:** 🟢 PRODUCTION-READY
