# TwentyFiveMade Admin Panel - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Local Development
- [ ] All environment variables set in `.env.local`
- [ ] `pnpm install` completed successfully
- [ ] `cd admin && pnpm install` completed successfully
- [ ] Backend runs without errors: `pnpm dev`
- [ ] Admin panel runs without errors: `cd admin && pnpm dev`
- [ ] Can login with admin credentials
- [ ] Can add/edit/delete products
- [ ] Can add/edit/delete categories
- [ ] Can view and update orders
- [ ] Cashbook displays correctly

### ✅ Security Checks
- [ ] Default admin password changed
- [ ] JWT_SECRET is a strong random string
- [ ] No sensitive data in code or comments
- [ ] API routes verify JWT tokens
- [ ] Password hashing implemented
- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys hardcoded

### ✅ Database Verification
- [ ] All 6 tables created in Supabase
- [ ] admin_users table has admin account
- [ ] Categories table has sample data
- [ ] Foreign keys configured correctly
- [ ] Indexes created for performance
- [ ] Backup is configured in Supabase

### ✅ Code Quality
- [ ] No console.log debug statements
- [ ] No TODO comments left
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Form validation working
- [ ] API error messages clear

---

## Deployment Steps

### Step 1: Deploy Backend to Vercel

#### 1.1 Prepare Repository
```bash
# Make sure .env.local is in .gitignore
echo ".env.local" >> .gitignore

# Commit all code
git add -A
git commit -m "Add admin panel"
git push
```

#### 1.2 Create Vercel Project
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Import the project

#### 1.3 Configure Environment Variables
In Vercel project settings → Environment Variables, add:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
```

#### 1.4 Deploy
- Vercel will auto-deploy when you push to main branch
- Your backend is now live at: `https://your-project.vercel.app`

✅ **Backend Deployed!**

### Step 2: Deploy Admin Panel

#### Option A: Deploy to Vercel (Recommended)

1. **Build the admin panel locally first:**
```bash
cd admin
pnpm build
```

2. **Create `admin/.env.production.local`:**
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. **Create Vercel project for admin:**
   - Go to https://vercel.com
   - New Project → Connect Git
   - Select the same repository
   - In Root Directory: `admin`
   - Deploy

4. **Your admin panel is live at:** `https://your-admin-project.vercel.app`

#### Option B: Deploy to Netlify

1. **Build locally:**
```bash
cd admin
pnpm build
```

2. **Connect Git to Netlify:**
   - Go to https://netlify.com
   - New site from Git
   - Select repository
   - Build command: `cd admin && pnpm build`
   - Publish directory: `admin/dist`
   - Add environment variables
   - Deploy

#### Option C: Deploy to Static Hosting

1. **Build:**
```bash
cd admin
pnpm build
```

2. **Upload `admin/dist` folder to:**
   - GitHub Pages
   - AWS S3
   - Google Cloud Storage
   - Cloudflare Pages
   - Any static host

✅ **Admin Panel Deployed!**

---

## Post-Deployment Verification

### ✅ Backend Verification
- [ ] API is responding: `https://your-backend.vercel.app/api/admin/login` (should return 405 or 400)
- [ ] Database connection works
- [ ] Supabase service key is valid
- [ ] JWT tokens are generated correctly

### ✅ Admin Panel Verification
- [ ] Admin panel loads: `https://your-admin.vercel.app`
- [ ] Login page appears
- [ ] Can login with credentials
- [ ] Dashboard loads
- [ ] Can see products/categories/orders
- [ ] CRUD operations work
- [ ] Logout works

### ✅ Connectivity Check
- [ ] Admin panel can call backend API
- [ ] JWT tokens are sent with requests
- [ ] No CORS errors
- [ ] No console errors

---

## Production Checklist

### ✅ Security
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] Admin credentials changed from default
- [ ] JWT_SECRET is unique and strong
- [ ] No debug/test data in production
- [ ] Rate limiting considered
- [ ] Logging/monitoring set up

### ✅ Monitoring
- [ ] Vercel error tracking enabled
- [ ] Database backups configured
- [ ] Error notifications set up
- [ ] Analytics/logs accessible

### ✅ Performance
- [ ] Admin panel loads in < 3 seconds
- [ ] API responses fast
- [ ] Database queries optimized
- [ ] CDN caching enabled

### ✅ Maintenance
- [ ] Backup procedure documented
- [ ] Admin user management process
- [ ] Update procedure planned
- [ ] Support contact info available

---

## Environment Variables Reference

### Backend (.env.local / Vercel)
```env
# Supabase - Get from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Service role key - Keep secret!
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Generate: openssl rand -base64 32
JWT_SECRET=your_random_jwt_secret_here
```

### Admin Panel (.env.local / Vercel)
```env
# Same as backend Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Troubleshooting Deployment

### Issue: "API connection failed"
**Solution:**
1. Check backend URL in admin panel config
2. Verify NEXT_PUBLIC_SUPABASE_URL is set
3. Check Supabase service is running
4. Clear browser cache and try again

### Issue: "Unauthorized" errors on login
**Solution:**
1. Verify JWT_SECRET is same on backend
2. Check admin user exists in database
3. Verify password hash is correct
4. Check token expiration time

### Issue: "Module not found" errors
**Solution:**
1. Verify all files were deployed
2. Check file paths in imports
3. Run `pnpm install` and rebuild
4. Check vite.config.ts configuration

### Issue: CORS errors
**Solution:**
1. Check backend and frontend URLs
2. Verify proxy config in vite.config.ts
3. Check Supabase CORS settings
4. Ensure requests include correct headers

### Issue: "Database connection failed"
**Solution:**
1. Verify Supabase project is running
2. Check SUPABASE_SERVICE_ROLE_KEY
3. Verify network connectivity
4. Check Supabase logs for errors

---

## Rollback Procedure

### If Something Goes Wrong

#### Revert Backend
```bash
git revert <commit-hash>
git push
# Vercel will auto-redeploy
```

#### Revert Admin Panel
```bash
cd admin
git revert <commit-hash>
git push
# Vercel will auto-redeploy
```

#### Database Rollback
1. Go to Supabase Dashboard
2. Backups section
3. Restore from backup point

---

## Monitoring & Maintenance

### Daily
- [ ] Check for login errors in logs
- [ ] Verify API response times
- [ ] Monitor database queries

### Weekly
- [ ] Review admin activity logs
- [ ] Check database size
- [ ] Update dependencies if available

### Monthly
- [ ] Full system backup
- [ ] Security audit
- [ ] Performance review
- [ ] User management review

---

## Scaling Considerations

As your business grows:

### Database
- Consider read replicas for heavy queries
- Index frequently queried columns
- Archive old transaction records
- Monitor database performance

### Backend
- Add caching layer (Redis)
- Implement rate limiting
- Add API authentication tiers
- Monitor request volumes

### Admin Panel
- Implement pagination for large datasets
- Add export/import features
- Consider data table virtualization
- Add search/filter optimization

---

## Support & Escalation

### Common Issues
See `ADMIN_SETUP.md` troubleshooting section

### Documentation
- Quick Start: `ADMIN_QUICK_START.md`
- Full Setup: `ADMIN_SETUP.md`
- Build Summary: `ADMIN_BUILD_SUMMARY.md`

### Getting Help
1. Check documentation files
2. Review Supabase docs
3. Check Vercel deployment logs
4. Review browser console for errors

---

**Deployment Complete! 🚀**

Your TwentyFiveMade Admin Panel is now live and ready for use.
