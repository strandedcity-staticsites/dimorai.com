# GitHub Pages + Cloudflare CDN Setup Guide

This guide shows how to host your Dimorai website using GitHub Pages with a private repository and Cloudflare CDN for performance, security, and custom domain management.

## 🎯 Overview

**Setup**: Private GitHub Repo → GitHub Pages → Cloudflare CDN → Your Domain

**Benefits**:
- ✅ **Private Repository** - Keep your code secure
- ✅ **Free Hosting** - GitHub Pages is free even for private repos
- ✅ **Cloudflare CDN** - Global performance and security
- ✅ **Custom Domain** - Professional branding
- ✅ **SSL/HTTPS** - Automatic security certificates
- ✅ **Analytics** - Built-in traffic insights

## 📋 Prerequisites

1. **GitHub Account** (free or paid for private repos)
2. **Cloudflare Account** (free)
3. **Custom Domain** (purchased from any registrar)

## 🚀 Step 1: Set Up Private GitHub Repository

### Create Repository
```bash
# Initialize your project (if not already done)
git init
git add .
git commit -m "Initial Dimorai website"

# Create private repo on GitHub, then:
git remote add origin https://github.com/yourusername/dimorai.git
git branch -M main
git push -u origin main
```

### Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

**Note**: GitHub Pages is free for public repos, but requires GitHub Pro/Team/Enterprise for private repos ($4/month per user).

## 🌐 Step 2: Set Up Cloudflare

### Add Your Domain to Cloudflare
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Click **Add Site** and enter your domain
3. Choose the **Free** plan
4. Cloudflare will scan your DNS records
5. **Update nameservers** at your domain registrar:
   - Replace your registrar's nameservers with Cloudflare's
   - Example: `cole.ns.cloudflare.com` and `lynn.ns.cloudflare.com`
   - Wait 24-48 hours for propagation

### Configure DNS for GitHub Pages
1. In Cloudflare dashboard, go to **DNS** → **Records**
2. Delete any existing A or CNAME records for your domain
3. Add these DNS records:

**For apex domain (example.com):**
```
Type: A    Name: @    Content: 185.199.108.153    Proxy: ✅ Proxied
Type: A    Name: @    Content: 185.199.109.153    Proxy: ✅ Proxied  
Type: A    Name: @    Content: 185.199.110.153    Proxy: ✅ Proxied
Type: A    Name: @    Content: 185.199.111.153    Proxy: ✅ Proxied
```

**For www subdomain:**
```
Type: CNAME    Name: www    Content: yourusername.github.io    Proxy: ✅ Proxied
```

## ⚙️ Step 3: Configure GitHub Pages with Custom Domain

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain: `yourdomain.com`
3. Check **Enforce HTTPS** (will be available after DNS propagates)
4. GitHub will create a `CNAME` file in your repository

## 🔧 Step 4: Optimize Cloudflare Settings

### Security Settings
1. **SSL/TLS** → **Overview** → Set to **Full (strict)**
2. **SSL/TLS** → **Edge Certificates** → Enable **Always Use HTTPS**
3. **Security** → **Settings** → Set Security Level to **Medium**

### Performance Settings
1. **Speed** → **Optimization**:
   - ✅ Auto Minify: HTML, CSS, JavaScript
   - ✅ Brotli compression
   - ✅ Mirage (image optimization)
2. **Caching** → **Configuration**:
   - Caching Level: **Standard**
   - Browser Cache TTL: **4 hours**

### Page Rules (Optional but Recommended)
1. **Rules** → **Page Rules** → **Create Page Rule**

**Rule 1: Cache Everything**
```
URL: *yourdomain.com/*
Settings: Cache Level = Cache Everything
```

**Rule 2: Force HTTPS**
```
URL: http://*yourdomain.com/*  
Settings: Always Use HTTPS = On
```

## 🎨 Step 5: Configure Your Website

### Update Form Handler URL
In your `index.html`, update the form submission URL to use your domain:

```javascript
// Replace the worker URL (around line 1849)
const response = await fetch('https://form-handler.yourdomain.com', {
    method: 'POST',
    body: formData
});
```

### Update Image Paths
Ensure all image references use relative paths:
```html
<!-- Good -->
<img src="dimorai-header.png" alt="Dimorai Platform" />

<!-- Avoid absolute paths -->
<img src="/images/dimorai-header.png" alt="Dimorai Platform" />
```

## 🚦 Step 6: Deploy and Test

### Deploy Your Changes
```bash
git add .
git commit -m "Configure for GitHub Pages with Cloudflare"
git push origin main
```

### Test Your Setup
1. **DNS Propagation**: Check at [whatsmydns.net](https://whatsmydns.net)
2. **SSL Certificate**: Visit `https://yourdomain.com` (should show green lock)
3. **Performance**: Test at [PageSpeed Insights](https://pagespeed.web.dev)
4. **Security**: Test at [SSL Labs](https://ssllabs.com/ssltest/)

## 📊 Step 7: Analytics and Monitoring

### Cloudflare Analytics
- **Analytics** → **Web Analytics** → Enable for your domain
- View traffic, performance, and security metrics

### GitHub Pages Status
- Monitor deployments at: `https://github.com/yourusername/dimorai/deployments`

### Google Analytics (Optional)
Add to your `index.html` before closing `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Typical Workflow

### Making Updates
```bash
# Make your changes
vim index.html

# Commit and push
git add .
git commit -m "Update hero section"
git push origin main

# GitHub Pages automatically rebuilds (2-10 minutes)
# Cloudflare cache may take 5-30 minutes to update
```

### Force Cache Purge
If changes don't appear immediately:
1. **Cloudflare Dashboard** → **Caching** → **Configuration**
2. Click **Purge Everything**
3. Wait 2-3 minutes for global propagation

## 🚨 Troubleshooting

### Common Issues

**Site not loading:**
- Check DNS propagation at whatsmydns.net
- Verify nameservers are updated at your registrar
- Wait 24-48 hours for full propagation

**SSL/HTTPS errors:**
- Ensure Cloudflare SSL is set to "Full (strict)"
- Check that GitHub Pages "Enforce HTTPS" is enabled
- Clear browser cache and try incognito mode

**Form submissions failing:**
- Update worker URL in your JavaScript
- Verify Cloudflare Worker is deployed correctly
- Check browser console for CORS errors

**Changes not appearing:**
- Check GitHub Actions for build status
- Purge Cloudflare cache
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)

### Performance Optimization

**Slow loading:**
- Enable Cloudflare's Auto Minify
- Optimize images (compress before uploading)
- Use WebP format for images when possible
- Enable Brotli compression

**High bandwidth usage:**
- Set up proper caching headers
- Use Cloudflare's image optimization
- Minimize large assets

## 💰 Cost Breakdown

- **GitHub Pages**: Free (public) or $4/month (private repos)
- **Cloudflare**: Free plan sufficient for most sites
- **Domain**: $10-15/year (varies by registrar)
- **Total**: ~$48-60/year for professional setup

## 🎉 Benefits of This Setup

✅ **Performance**: Global CDN with edge caching  
✅ **Security**: DDoS protection, SSL, firewall  
✅ **Reliability**: 99.9%+ uptime with redundancy  
✅ **Scalability**: Handles traffic spikes automatically  
✅ **Cost-effective**: Professional setup for <$5/month  
✅ **Easy maintenance**: Git-based deployments  
✅ **Analytics**: Built-in traffic and performance insights  

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Cloudflare Page Rules Guide](https://support.cloudflare.com/hc/en-us/articles/218411427)

Your Dimorai website is now powered by a professional, scalable, and secure hosting setup! 🚀