# HelloJack Contact Form Setup Guide

This guide will help you set up the complete contact form system using Cloudflare Workers and Resend API.

## 🚀 Quick Overview

The system includes:
- Professional contact form on your website
- Cloudflare Worker for form processing
- Email notifications via Resend API
- Lead quality scoring
- Professional HTML email templates

## 📋 Prerequisites

1. **Cloudflare Account** (free)
2. **Resend Account** (free tier: 100 emails/day)
3. **Domain** (for custom worker URL)

## 🔧 Step-by-Step Setup

### 1. Set Up Resend Account

1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click **Create API Key**
5. Name it "HelloJack Contact Form" and copy the key (starts with `re_`)

### 2. Set Up Cloudflare Worker

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment secrets:
   ```bash
   # Set your Resend API key
   wrangler secret put RESEND_API_KEY
   # Paste your Resend API key when prompted
   
   # Set notification email (where you want to receive form submissions)
   wrangler secret put NOTIFICATION_EMAIL
   # Enter your email address when prompted
   ```

### 3. Configure Your Domain

1. **Option A: Use Workers.dev subdomain (easiest)**
   - Your form will submit to: `https://hellojack-form-handler.your-account.workers.dev`
   - Update the fetch URL in `index.html` line 1849

2. **Option B: Use custom domain (recommended)**
   - Edit `wrangler.toml` and replace `your-domain.com` with your actual domain
   - Add a CNAME record: `form-handler` → `hellojack-form-handler.your-account.workers.dev`
   - Your form will submit to: `https://form-handler.your-domain.com`

### 4. Deploy the Worker

```bash
# Deploy to production
npm run deploy

# Or deploy with environment
npm run deploy:production
```

### 5. Update Your Website

Update the fetch URL in your `index.html` file (around line 1849):

```javascript
// Replace this URL with your actual worker URL
const response = await fetch('https://form-handler.your-domain.workers.dev', {
    method: 'POST',
    body: formData
});
```

## 🎯 Configuration Options

### Email Settings (in worker.js)

- **From Address**: Update line 76 with your domain email
- **Subject Line**: Customize the email subject on line 78
- **Lead Scoring**: Modify the `getLeadQuality()` function to adjust scoring

### Form Fields

The form captures:
- ✅ First Name (required)
- ✅ Last Name (required) 
- ✅ Email (required)
- Company Name
- Units Managed (dropdown)
- Message/Challenges

## 🧪 Testing

1. **Local Testing**:
   ```bash
   npm run dev
   ```

2. **Test Form Submission**:
   - Fill out the form on your website
   - Check your email for notifications
   - Monitor worker logs: `npm run tail`

## 🎨 Email Template Features

Your notification emails include:
- 🎯 **Lead Quality Scoring** (High/Medium/Basic)
- 📊 **Structured Contact Info**
- 🏗️ **Portfolio Size**
- 💬 **Customer Challenges**
- 🕐 **Timestamp**
- 🔍 **Technical Details** (IP, User Agent)

## 📊 Lead Quality Scoring

The system automatically scores leads:

- **🔥 HIGH QUALITY** (4+ points):
  - Large portfolio (500+ units) = 3 pts
  - Professional email domain = 1 pt
  - Company name provided = 1 pt
  - Detailed message (50+ chars) = 1 pt

- **⭐ MEDIUM QUALITY** (2-3 points)
- **📝 BASIC INQUIRY** (0-1 points)

## 🚨 Troubleshooting

### Form Not Submitting
- Check browser console for errors
- Verify worker URL is correct
- Ensure CORS headers are set

### No Email Notifications
- Verify Resend API key is set: `wrangler secret list`
- Check worker logs: `npm run tail`
- Confirm notification email is set correctly

### Rate Limits
- **Cloudflare Workers**: 100k requests/day (free)
- **Resend**: 100 emails/day (free)

## 💰 Costs

- **Cloudflare Workers**: Free (100k requests/day)
- **Resend**: Free (100 emails/day, 3k/month)
- **Total**: $0 for typical contact form usage

## 🔒 Security Features

- ✅ Input validation and sanitization
- ✅ Email format validation
- ✅ CORS protection
- ✅ Rate limiting (via Cloudflare)
- ✅ Spam protection (IP tracking)

## 📈 Monitoring

Monitor your form performance:
- **Cloudflare Dashboard**: Worker analytics
- **Resend Dashboard**: Email delivery stats
- **Browser Console**: Client-side errors

## 🎉 You're Done!

Your contact form is now live and will:
1. ✅ Capture leads professionally
2. ✅ Send instant email notifications
3. ✅ Score lead quality automatically
4. ✅ Handle errors gracefully
5. ✅ Scale automatically

Questions? Check the worker logs or contact support!