# Running on iPad

## Local Network Access

1. **Start the dev server on your computer**:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

2. **Find your computer's local IP address**:
   - **Mac**: System Preferences → Network (e.g., `192.168.1.x`)
   - **Linux**: Run `ip addr show` or `hostname -I`
   - **Windows**: Run `ipconfig` in cmd

3. **Access from iPad**:
   - Open Safari on your iPad
   - Navigate to `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

## Production Deployment (Best for iPad)

For better iPad experience, deploy to a free hosting service:

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

After deployment, you'll get a public URL that works on any device.

## iPad-Specific Features
- The app is fully responsive and touch-optimized
- Works great in Safari on iPad
- Add to Home Screen for app-like experience:
  1. Tap the Share button
  2. Select "Add to Home Screen"
