# Netlify Deployment Guide - Frontend

Complete step-by-step guide to deploy the Svelte frontend on Netlify.

## 📋 Prerequisites

- [Netlify Account](https://netlify.com)
- GitHub repository with frontend code pushed
- Backend API deployed: `https://spur-backend-1223.vercel.app`
- Node.js 18+ installed locally

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Navigate to frontend directory:
```bash
cd spur-1
```

2. Verify all files are in place:
   - ✅ `src/` folder with Svelte components
   - ✅ `package.json`
   - ✅ `vite.config.ts`
   - ✅ `svelte.config.js`
   - ✅ `tsconfig.json`
   - ✅ `.env.example`
   - ✅ `.gitignore`
   - ✅ `README.md`

3. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: AI Chat Frontend - Svelte + Vite"
git remote add origin https://github.com/gudaykiran/spur-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Verify Backend API Configuration

1. Check `.env` file:
```env
VITE_API_BASE_URL=https://spur-backend-1223.vercel.app
```

2. Verify `src/lib/services/chatApi.ts`:
   - ✅ Uses `import.meta.env.VITE_API_BASE_URL`
   - ✅ Fallback to localhost for development
   - ✅ Correct API endpoints (`/api/chat`, `/api/chat/history`)

### Step 3: Test Locally

Before deploying, test locally with backend URL:

```bash
# Create .env.local for production testing
echo "VITE_API_BASE_URL=https://spur-backend-1223.vercel.app" > .env.local

# Build for production
npm run build

# Preview production build
npm run preview
```

If chat works, you're ready to deploy! ✅

### Step 4: Deploy to Netlify

#### Option A: Using Netlify GitHub Integration (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub
5. Select your repository: `gudaykiran/spur-frontend`
6. Configure build settings:
   - **Base directory**: Leave empty (or `./spur-1` if monorepo)
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
7. Click **Deploy site**

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (from spur-1 directory)
cd spur-1
netlify deploy --prod --dir=build
```

#### Option C: Manual Build & Deploy

```bash
# Build
npm run build

# Create netlify.toml in root
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "build"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "max-age=0, no-cache, no-store, must-revalidate"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "max-age=31536000, immutable"

[redirects]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# Then upload build/ folder to Netlify manually
```

### Step 5: Configure Environment Variables

In Netlify Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://spur-backend-1223.vercel.app`
3. Select **Contexts**: Production, Preview, Development
4. **Save**

### Step 6: Configure Build Settings

In Netlify Dashboard:

1. Go to **Settings** → **Build & deploy**
2. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: 18.x (or latest LTS)
3. **Save**

### Step 7: Enable Automatic Deploys

In Netlify Dashboard:

1. Go to **Deploys** → **Deploy settings**
2. Enable **Auto publishing**:
   - ✅ Deploy on push to main branch
   - ✅ Deploy on pull requests (preview)

### Step 8: Test the Deployment

1. Wait for initial build to complete
2. Click **Site settings** → **General** → **Site details**
3. Open **Site URL**: `https://your-site-name.netlify.app`
4. Test chat functionality:
   - ✅ Send a message
   - ✅ Receive AI response
   - ✅ Check console for API calls
   - ✅ Verify session persistence

## 🔧 netlify.toml Configuration

Create `netlify.toml` in root for optimal settings:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "no-referrer"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "max-age=0, no-cache, no-store, must-revalidate"

# Redirect all routes to index.html for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Monitoring & Logs

### View Deployment Logs

1. **Netlify Dashboard** → **Deploys**
2. Click on deployment
3. View **Deploy log**

### Common Issues

**Build fails: "Cannot find module"**
- Ensure all dependencies in package.json
- Run `npm install` locally first
- Check Node version (18+)

**White screen after deploy**
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is set
- Check Network tab for API calls

**API errors (404, 500)**
- Verify backend URL is correct
- Check backend is running
- Review CORS configuration

### View Live Logs

```bash
# Using Netlify CLI
netlify logs
```

## 🔐 Security

### Recommended Headers (already in netlify.toml)

- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: no-referrer

### Additional Security

1. Enable **HTTPS** (default on Netlify)
2. Add **custom domain** (optional)
3. Configure **CORS** on backend for frontend domain
4. Remove any API keys from frontend code

## 🚀 Optimization

### Build Optimization

```bash
# Check bundle size
npm run build
ls -lh build/

# Analyze bundle
npm install --save-dev vite-plugin-visualizer
```

### Performance Tips

1. **Code splitting**: Automatic with Vite
2. **CSS minification**: Automatic build
3. **Image optimization**: Use proper formats
4. **Lazy loading**: Use Svelte's dynamic imports

## 🔄 Continuous Deployment

### Auto-Deploy on Push

1. Netlify automatically deploys on push to main
2. Get **preview deploys** for pull requests
3. **Deploy previews** help review before merge

### Status Checks

GitHub shows deployment status on commits/PRs

```
✓ Deploy preview ready
✓ Deploy to production ready
```

## 📝 Environment Variables by Deployment

### Development (Local)
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Production (Netlify)
```env
VITE_API_BASE_URL=https://spur-backend-1223.vercel.app
```

### Staging (Optional)
```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com
```

## 💰 Netlify Pricing

- **Hobby (Free)**: 300 build minutes/month, sufficient for this project
- **Pro ($19/month)**: Unlimited builds, priority support
- **Business**: Custom pricing

## 🐛 Troubleshooting

### Build Fails

```bash
# Check locally first
npm run check       # Type check
npm run build       # Build

# Check for errors
npm run check -- --tsconfig ./tsconfig.json
```

### Chat Not Working

1. Check API URL in browser console
2. Open Network tab and check API calls
3. Look for CORS errors
4. Verify backend is running

### Environment Variables Not Loaded

1. Restart build after adding variables
2. Check variable names (case-sensitive)
3. Verify format: `VITE_*` prefix required

## 📞 Support

For issues:

1. Check [Netlify Docs](https://docs.netlify.com/)
2. Review deployment logs
3. Test API directly: `curl https://spur-backend-1223.vercel.app/api/chat`
4. Check browser console for errors

## 🔗 Useful Links

- [Netlify Docs](https://docs.netlify.com/)
- [Svelte Deployment](https://kit.svelte.dev/docs/adapter-netlify)
- [Vite Build Options](https://vitejs.dev/guide/build.html)
- [SvelteKit Adapters](https://kit.svelte.dev/docs/adapters)

## ✅ Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] `.env` file configured with backend URL
- [ ] Build succeeds locally: `npm run build`
- [ ] Netlify project created
- [ ] Environment variables set
- [ ] Build settings configured
- [ ] First deployment completed
- [ ] Chat functionality tested
- [ ] API calls working
- [ ] Custom domain configured (optional)

## 🎉 Success!

Once deployed:

1. ✅ Frontend running on Netlify
2. ✅ Backend running on Vercel
3. ✅ Chat functionality working end-to-end
4. ✅ Both apps communicating over HTTPS

Your AI Chat application is now **live in production**! 🚀

---

**Status**: Netlify deployment configured ✅  
**Date**: December 31, 2025
