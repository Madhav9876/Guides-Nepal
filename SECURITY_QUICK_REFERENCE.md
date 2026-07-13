# 🔒 SECURITY QUICK REFERENCE CARD

## ⚡ Critical Before Deployment

| Item | Action | Status |
|------|--------|--------|
| SECRET_KEY | Generate with `openssl rand -hex 32` | ⚠️ DO THIS |
| Database Password | Change to 16+ characters | ⚠️ DO THIS |
| CORS Origins | Update with production URLs | ⚠️ DO THIS |
| ENV Variable | Set to `production` | ⚠️ DO THIS |
| HTTPS | Verify all URLs use https:// | ⚠️ DO THIS |
| API Docs | Confirm hidden (/docs → 404) | ⚠️ DO THIS |

---

## 🔐 What's Protected

```
┌─────────────────────────────────────────┐
│         SECURITY PROTECTIONS            │
├─────────────────────────────────────────┤
│ ✅ SQL Injection                        │
│ ✅ Cross-Site Scripting (XSS)          │
│ ✅ Cross-Site Request Forgery (CSRF)   │
│ ✅ Brute Force Attacks                 │
│ ✅ Man-in-the-Middle (HTTPS)           │
│ ✅ Information Disclosure               │
│ ✅ Weak Authentication                  │
│ ✅ Broken Access Control                │
│ ✅ Insecure Dependencies                │
│ ✅ Weak Passwords                       │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Commands

### Generate Secrets
```bash
# Strong SECRET_KEY (copy output)
openssl rand -hex 32

# Strong password
openssl rand -hex 16
```

### Test Security
```bash
# Test health endpoint
curl https://api.example.com/health

# Test HTTPS enforcement
curl http://api.example.com/health  # Should redirect

# Test security headers
curl -i https://api.example.com/health  # Look for security headers

# Test CORS
curl -H "Origin: http://other.com" https://api.example.com/api/v1/guides

# Test rate limiting
for i in {1..10}; do curl https://api.example.com/health; done
```

### Check Dependencies
```bash
# Python
safety check

# Node.js
npm audit
```

---

## 📋 Security Settings Summary

| Feature | Setting | Protection |
|---------|---------|-----------|
| Password Min Length | 8 chars | Weak passwords |
| Password Complexity | Upper+Num+Special | Brute force |
| Password Hashing | Bcrypt (cost 12) | Credential theft |
| Access Token | 30 minutes | Session hijacking |
| Refresh Token | 7 days | Long-term abuse |
| Rate Limit (Login) | 5/15min | Brute force |
| Rate Limit (API) | 100/min | DoS attacks |
| HTTPS | Required | MITM attacks |
| CORS | Restricted | CSRF attacks |
| HSTS | 1 year | SSL stripping |
| CSP | Restrictive | XSS attacks |
| X-Frame-Options | DENY | Clickjacking |

---

## 🚨 Incident Response

### If Compromised (Immediate Actions)
1. Rotate SECRET_KEY
2. Reset all user passwords
3. Review access logs
4. Update CORS origins
5. Notify affected users
6. Document incident

### If Attacked (DDoS/Abuse)
1. Check rate limit logs
2. Block offending IPs
3. Scale resources up
4. Monitor closely
5. Investigate patterns

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Backend API | https://guides-nepal-backend.onrender.com |
| Frontend | https://guides-nepal-frontend.vercel.app |
| Dashboard | https://guides-nepal-dashboard.vercel.app |
| API Health | https://guides-nepal-backend.onrender.com/health |
| Render Dashboard | https://render.com/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |
| Supabase Dashboard | https://app.supabase.com |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| SECURITY_GUIDE.md | Comprehensive security guide (12K words) |
| SECURITY_CHECKLIST.md | 75+ pre-deployment checks |
| SECURITY_SUMMARY.md | Implementation summary |
| ENVIRONMENT_VARIABLES_PRODUCTION.md | Env var template |
| DEPLOYMENT_GUIDE.md | Deployment instructions |

---

## ⚠️ Common Mistakes to Avoid

```
❌ Committing .env files
❌ Using weak SECRET_KEY
❌ Setting ENV=development in production
❌ Hardcoding API keys
❌ Allowing * in CORS origins
❌ Exposing /docs in production
❌ Not using HTTPS
❌ Ignoring security headers
❌ Skipping rate limiting
❌ Logging passwords
```

---

## ✅ Security Best Practices

```
✅ Use environment variables for secrets
✅ Enforce HTTPS everywhere
✅ Validate all input
✅ Use bcrypt for passwords
✅ Implement rate limiting
✅ Log security events
✅ Monitor for attacks
✅ Keep dependencies updated
✅ Regular security audits
✅ Incident response plan
```

---

## 📞 Quick Support

### If something breaks:
1. Check error logs
2. Verify environment variables
3. Test with `curl` commands
4. Review SECURITY_GUIDE.md
5. Contact platform support

### Security Issues:
1. Do NOT post publicly
2. Email security details
3. Allow time for fix
4. Follow disclosure policy

---

## 🎯 Success Criteria

✅ **All tests pass**
- Curl health endpoint → 200 OK
- Security headers present → ✓
- CORS properly configured → ✓
- Rate limiting working → ✓
- HTTPS enforced → ✓
- API docs hidden → ✓
- Logs are clean → ✓

✅ **No security issues**
- No exploitable vulnerabilities
- No exposed credentials
- No hardcoded secrets
- No debug mode in production
- No sensitive data in logs

✅ **Ready for production**
- All checklist items complete
- All tests passing
- Monitoring configured
- Incident response ready
- Documentation updated

---

## 🎓 Learn More

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- FastAPI Security: https://fastapi.tiangolo.com/tutorial/security/
- React Security: https://reactjs.org/docs/dom-elements.html
- PostgreSQL Security: https://www.postgresql.org/docs/current/sql-syntax.html

---

**Last Updated:** July 13, 2026  
**Status:** ✅ PRODUCTION-READY  
**Version:** 1.0
