# 🚀 GoDaddy Auto-Deployment Guide

## Quick Start

1. **Copy configuration:**
   ```bash
   cp godaddy-config.example .env
   ```

2. **Edit `.env` with your GoDaddy credentials:**
   ```bash
   GODADDY_FTP_HOST=yourdomain.com
   GODADDY_FTP_USER=your-username
   GODADDY_FTP_PASSWORD=your-password
   GODADDY_FTP_PORT=21
   GODADDY_REMOTE_DIR=/public_html
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Available Commands

- **`npm run deploy`** - Build and deploy once
- **`npm run deploy:watch`** - Auto-deploy on changes
- **`npm run build:prod`** - Build for production only

## GoDaddy Setup

### 1. Get FTP Credentials
- Log into GoDaddy hosting control panel
- Go to "Files" → "FTP Users"
- Create new FTP user or use existing
- Note: username, password, and server

### 2. Find Your Domain
- Your FTP host is usually: `yourdomain.com`
- Default port: `21`
- Remote directory: `/public_html` (or `/htdocs` for some plans)

### 3. Test Connection
```bash
# Test with verbose output
npm run deploy -- --verbose
```

## Troubleshooting

### Common Issues:
- **Connection refused**: Check FTP port and host
- **Authentication failed**: Verify username/password
- **Permission denied**: Check remote directory path
- **Build fails**: Run `npm install` first

### Debug Mode:
```bash
npm run deploy -- --verbose
```

## Security Notes

- ✅ `.env` is in `.gitignore` (credentials safe)
- ✅ Use strong FTP passwords
- ✅ Consider FTPS if available
- ❌ Never commit credentials to git

## Auto-Deployment

For continuous deployment, use:
```bash
npm run deploy:watch
```

This will automatically deploy whenever you make changes to your code!

## Support

If you encounter issues:
1. Check GoDaddy hosting status
2. Verify FTP credentials
3. Check firewall settings
4. Contact GoDaddy support
