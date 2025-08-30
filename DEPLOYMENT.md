# 🚀 Deployment Guide - Wine Tasting Diary

This guide will help you deploy your wine tasting diary application for real-world testing.

## 📋 Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Git repository
- Deployment platform account (Heroku, Vercel, Railway, etc.)

## 🔧 Environment Setup

### 1. Server Environment Variables

Create a `.env` file in the `server` directory:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wine-diary
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

**For production, use a cloud MongoDB instance:**
- MongoDB Atlas (free tier available)
- Update `MONGODB_URI` with your connection string
- Use a strong, unique `JWT_SECRET`

### 2. Client Environment Variables

Create a `.env` file in the `client` directory:

```bash
REACT_APP_API_URL=http://localhost:5000
```

**For production, update with your server URL:**
```bash
REACT_APP_API_URL=https://your-server-domain.com
```

## 🏗️ Build Process

### 1. Build the Client
```bash
cd client
npm install
npm run build
```

### 2. Build the Server
```bash
cd server
npm install
npm run build
```

## 🌐 Deployment Options

### Option 1: Heroku (Recommended for beginners)

#### Server Deployment:
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Add MongoDB add-on (MongoDB Atlas)
5. Deploy:

```bash
cd server
heroku create your-wine-diary-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGODB_URI=your-mongodb-connection-string
git add .
git commit -m "Deploy server"
git push heroku main
```

#### Client Deployment:
1. Create a new Heroku app for the client
2. Deploy the build folder:

```bash
cd client
heroku create your-wine-diary-client
heroku config:set REACT_APP_API_URL=https://your-wine-diary-api.herokuapp.com
git add build/
git commit -m "Deploy client"
git push heroku main
```

### Option 2: Vercel (Great for React apps)

#### Client Deployment:
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/build`
4. Add environment variable: `REACT_APP_API_URL=https://your-server-url.com`

#### Server Deployment:
1. Use Railway, Render, or Heroku for the server
2. Update client environment variable with server URL

### Option 3: Railway (Full-stack deployment)

1. Connect your GitHub repository
2. Railway will detect both client and server
3. Set environment variables in Railway dashboard
4. Deploy automatically

## 🔒 Security Considerations

### Production Checklist:
- [ ] Use HTTPS everywhere
- [ ] Set strong JWT secret
- [ ] Use environment variables for all secrets
- [ ] Enable CORS properly for your domain
- [ ] Use cloud MongoDB with authentication
- [ ] Set up proper error logging
- [ ] Enable rate limiting (optional)

### CORS Configuration:
Update `server/src/server.ts`:

```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-client-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

## 📊 Monitoring & Testing

### Health Check:
Your server includes a health check endpoint:
```
GET /api/health
```

### Testing Checklist:
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens are valid
- [ ] Wine diary functionality works
- [ ] Search functionality works
- [ ] Responsive design on mobile
- [ ] Cross-browser compatibility

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check CORS configuration
   - Verify client URL in server CORS settings

2. **MongoDB Connection:**
   - Verify connection string
   - Check network access
   - Ensure database exists

3. **JWT Issues:**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper token format

4. **Build Failures:**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check environment variables

## 📈 Performance Optimization

### Client:
- Build is already optimized with React Scripts
- Consider adding service worker for offline support
- Implement lazy loading for large components

### Server:
- Add compression middleware
- Implement caching for static assets
- Consider database indexing for search

## 🔄 Continuous Deployment

Set up GitHub Actions for automatic deployment:

1. Create `.github/workflows/deploy.yml`
2. Configure triggers (push to main)
3. Add deployment steps for your platform
4. Set up environment secrets

## 📞 Support

For deployment issues:
1. Check platform-specific logs
2. Verify environment variables
3. Test locally first
4. Check network connectivity

---

**Happy Deploying! 🍷**
