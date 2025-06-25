# CineFindr - Deployment Guide

## 📦 Build for Production

```bash
# Install dependencies
bun install

# Build for production
bun run build

# Preview production build locally
bun run preview
```

## 🌐 Deploy to Vercel

1. **Connect to Vercel:**
   ```bash
   npx vercel
   ```

2. **Environment Variables:**
   Set these in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY` (optional)

## 🚀 Deploy to Netlify

1. **Build Settings:**
   - Build command: `bun run build`
   - Publish directory: `dist`

2. **Environment Variables:**
   Add the same variables as Vercel

## 📱 Deploy to GitHub Pages

1. **Add to package.json:**
   ```json
   "homepage": "https://yourusername.github.io/cinefindr-movie-explorer-app"
   ```

2. **Install gh-pages:**
   ```bash
   bun add -D gh-pages
   ```

3. **Add deploy script:**
   ```json
   "scripts": {
     "deploy": "bun run build && npx gh-pages -d dist"
   }
   ```

## 🔧 Performance Optimizations

### Bundle Analysis
```bash
bun add -D vite-bundle-analyzer
```

### Additional Optimizations
- Images are optimized via Unsplash URLs
- Code splitting implemented in vite.config.ts
- Minification enabled for production
- Source maps disabled for smaller bundles

## 🛡️ Security Checklist

- ✅ Environment variables configured
- ✅ API keys secured
- ✅ No sensitive data in client bundle
- ✅ HTTPS enforced in production
- ✅ Content Security Policy ready

## 📊 Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- Lighthouse CI for performance monitoring
