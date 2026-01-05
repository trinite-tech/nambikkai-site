# Domain Not Working - Troubleshooting Steps

## Quick Checks:

1. **Upload test.html to your public_html folder**
2. **Visit: yourdomain.com/test.html**
3. **If test.html works but index.html doesn't, there's a file issue**

## Common Issues:

### 1. DNS Not Propagated
- Wait 24-48 hours after domain setup
- Check: https://whatsmydns.net

### 2. Wrong File Location
- Files must be in: `/public_html/` (root)
- NOT in: `/public_html/public_html/`

### 3. File Permissions
- In Hostinger File Manager:
- Right-click index.html → Permissions → 644
- Right-click public_html folder → Permissions → 755

### 4. Domain Configuration
- Hostinger Control Panel → Domains
- Ensure domain points to your hosting account
- Check nameservers are correct

### 5. SSL Certificate
- Enable SSL in Hostinger panel
- Force HTTPS redirect

## Quick Fix Steps:

1. **Delete everything in public_html**
2. **Upload only index.html first**
3. **Test: yourdomain.com**
4. **If working, upload remaining files**

## Test Commands:
- `ping yourdomain.com` (check if domain resolves)
- Visit: `http://yourdomain.com` (without https)
- Visit: `https://yourdomain.com` (with https)

## Contact Hostinger Support if:
- Domain doesn't resolve after 48 hours
- Getting 500/404 errors
- Files uploaded correctly but still not visible