# HelloJack - AI-Powered Property Maintenance Coordination

Welcome to the HelloJack website and contact form system! This repository contains everything you need to deploy a professional property management landing page with integrated lead capture and email notifications.

## 🚀 Quick Start

This is a complete website solution featuring:
- **Professional Landing Page** with responsive design
- **Contact Form System** with Cloudflare Workers backend
- **Email Notifications** via Resend API
- **Lead Quality Scoring** for prospect prioritization
- **GitHub Pages + Cloudflare** hosting setup

## 📋 Project Structure

```
hellojack/
├── index.html                 # Main website file
├── hellojack-header.png         # Hero section image
├── roi-calculator-placeholder.png  # ROI calculator placeholder
├── worker.js                  # Cloudflare Worker for form handling
├── wrangler.toml             # Worker deployment configuration
├── package.json              # NPM dependencies and scripts
└── README files...           # Documentation (see below)
```

## 📖 Documentation

This project includes comprehensive documentation for different aspects of the setup:

### 🛠️ **Setup & Deployment Guides**

| Guide | Description | Use When |
|-------|-------------|----------|
| **[📋 Form Setup Guide](README-FORM-SETUP.md)** | Complete guide to set up contact form with Cloudflare Workers and Resend API | Setting up the contact form and email notifications |
| **[🌐 GitHub Pages + Cloudflare Guide](README-GH-PAGES.md)** | How to host your site using GitHub Pages with Cloudflare CDN | Deploying your website to production |

### 🎯 **What Each Guide Covers**

#### [📋 Form Setup Guide](README-FORM-SETUP.md)
- Cloudflare Workers setup and deployment
- Resend API configuration for email notifications
- Lead quality scoring system
- Form validation and error handling
- Testing and troubleshooting

#### [🌐 GitHub Pages + Cloudflare Guide](README-GH-PAGES.md)
- Private GitHub repository setup
- GitHub Pages configuration
- Cloudflare CDN integration
- Custom domain setup with SSL
- Performance optimization
- Analytics and monitoring

## ⚡ Quick Setup Overview

### 1. **Deploy the Website**
Follow the [GitHub Pages + Cloudflare Guide](README-GH-PAGES.md) to:
- Set up GitHub Pages hosting
- Configure Cloudflare CDN
- Set up custom domain with SSL

### 2. **Set Up Contact Form**
Follow the [Form Setup Guide](README-FORM-SETUP.md) to:
- Create Resend account for email notifications
- Deploy Cloudflare Worker for form processing
- Configure environment variables

### 3. **Launch**
- Push your code to GitHub
- Update form submission URLs
- Test the complete system

## 🎨 Website Features

### 🏠 **Landing Page**
- Modern, responsive design
- Full-width hero image with content overlay
- Interactive ROI calculator
- Feature comparison table
- Mobile-optimized layouts

### 📝 **Contact Form**
- Lead qualification fields
- Professional email notifications
- Automatic lead scoring (🔥 High, ⭐ Medium, 📝 Basic)
- Real-time validation and error handling
- Loading states and success messages

### 📊 **Analytics Ready**
- Cloudflare Analytics integration
- Google Analytics compatible
- Performance monitoring
- Security insights

## 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Responsive website |
| **Backend** | Cloudflare Workers | Form processing |
| **Email** | Resend API | Notifications |
| **Hosting** | GitHub Pages | Static site hosting |
| **CDN** | Cloudflare | Performance & security |
| **Deployment** | Git + Wrangler | Automated deployments |

## 💰 Cost Breakdown

| Service | Free Tier | Typical Usage | Cost |
|---------|-----------|---------------|------|
| **GitHub Pages** | Public repos | Private repo hosting | $4/month |
| **Cloudflare** | Full CDN + SSL | Website hosting | Free |
| **Cloudflare Workers** | 100k requests/day | Form processing | Free |
| **Resend** | 100 emails/day | Email notifications | Free |
| **Total** | | Professional setup | **~$4/month** |

## 🚦 Getting Started

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd hellojack
   ```

2. **Choose your deployment path**:
   - 🌐 **Website Hosting**: Follow [GitHub Pages + Cloudflare Guide](README-GH-PAGES.md)
   - 📋 **Contact Form**: Follow [Form Setup Guide](README-FORM-SETUP.md)

3. **Customize content**:
   - Update company information in `index.html`
   - Replace placeholder images with your own
   - Modify color scheme in CSS variables

## 🛠️ Development

### Local Development
```bash
# Serve the website locally
python -m http.server 8000
# Visit http://localhost:8000

# Test Cloudflare Worker locally
npm install
npm run dev
```

### Making Changes
```bash
# Edit files
vim index.html

# Commit and deploy
git add .
git commit -m "Update hero section"
git push origin main

# Deploy worker updates
npm run deploy
```

## 🎯 Lead Generation Features

### Automatic Lead Scoring
The system automatically scores leads based on:
- **Portfolio size** (🔥 500+ units = high quality)
- **Professional email domain** (company emails vs. Gmail)
- **Company information** (provided vs. missing)
- **Message detail** (detailed inquiry vs. brief)

### Email Notifications Include:
- 🎯 Lead quality score
- 📊 Complete contact information
- 🏗️ Portfolio size and details
- 💬 Customer challenges and needs
- 🕐 Timestamp and technical details
- 🔍 IP address and user agent

## 🔒 Security Features

- ✅ **Input validation** and sanitization
- ✅ **CORS protection** for API endpoints
- ✅ **Rate limiting** via Cloudflare
- ✅ **SSL/HTTPS** everywhere
- ✅ **DDoS protection** via Cloudflare
- ✅ **Spam protection** with IP tracking

## 📈 Performance Features

- ✅ **Global CDN** via Cloudflare
- ✅ **Auto minification** of HTML, CSS, JS
- ✅ **Image optimization** and compression
- ✅ **Brotli compression** for faster loading
- ✅ **Browser caching** optimization
- ✅ **Mobile-first** responsive design

## 🚨 Support & Troubleshooting

### Common Issues
- **Form not submitting**: Check worker URL and CORS settings
- **No email notifications**: Verify Resend API key and secrets
- **Site not loading**: Check DNS propagation and GitHub Pages status
- **SSL errors**: Verify Cloudflare SSL settings

### Get Help
1. Check the relevant documentation guide
2. Review browser console for errors
3. Check Cloudflare Worker logs: `npm run tail`
4. Verify all environment variables are set

## 🎉 What's Included

✅ **Complete Website** - Ready-to-deploy landing page  
✅ **Contact Form System** - Professional lead capture  
✅ **Email Notifications** - Instant lead alerts  
✅ **Hosting Setup** - Production-ready infrastructure  
✅ **Documentation** - Step-by-step guides  
✅ **Security** - Best practices implemented  
✅ **Performance** - Optimized for speed  
✅ **Mobile Ready** - Responsive design  
✅ **Analytics Ready** - Tracking integration  
✅ **Cost Effective** - Professional setup for <$5/month  

## 🔗 Quick Links

- 📋 **[Form Setup Guide](README-FORM-SETUP.md)** - Set up contact form and email notifications
- 🌐 **[GitHub Pages Guide](README-GH-PAGES.md)** - Deploy website with Cloudflare CDN
- 🛠️ **[Cloudflare Dashboard](https://dash.cloudflare.com)** - Manage CDN and Workers
- 📧 **[Resend Dashboard](https://resend.com/dashboard)** - Monitor email delivery
- 📊 **[GitHub Pages Status](https://github.com/yourusername/hellojack/deployments)** - Check deployment status

---

**Ready to launch your professional property management website? Start with the [GitHub Pages + Cloudflare Guide](README-GH-PAGES.md)!** 🚀