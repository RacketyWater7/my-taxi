# WhatsApp Business API - Permanent Access Token Setup Guide

## Overview
This guide will help you generate a **permanent access token** for WhatsApp Business API that won't expire, so you don't need to keep updating it.

## Method 1: System User Token (Recommended - Permanent)

System User tokens are permanent and don't expire. This is the best solution for production.

### Step 1: Access Meta Business Suite
1. Go to [Meta Business Suite](https://business.facebook.com)
2. Log in with the owner's Facebook account
3. Select the Business Account that owns the WhatsApp Business App

### Step 2: Create a System User
1. Go to **Business Settings** (gear icon in top right)
2. Navigate to **Users** → **System Users** (in left sidebar)
3. Click **Add** button
4. Enter a name (e.g., "Taxi70 API User")
5. Select **System User** role
6. Click **Create System User**

### Step 3: Generate Access Token
1. Click on the System User you just created
2. Click **Generate New Token** button
3. Select your **WhatsApp Business App** (the one with App ID: 1195523216114626)
4. Select permissions:
   - ✅ `whatsapp_business_messaging`
   - ✅ `whatsapp_business_management`
5. Click **Generate Token**
6. **IMPORTANT**: Copy the token immediately - it's only shown once!
7. This token is **PERMANENT** and won't expire

### Step 4: Assign Assets to System User
1. Still in System User settings, go to **Assign Assets** tab
2. Click **Assign Assets** → **WhatsApp Accounts**
3. Select your WhatsApp Business Account
4. Click **Assign**
5. This gives the System User access to send messages

## Method 2: Long-Lived Token (60 Days - Easier but Temporary)

If System User setup is too complex, you can generate a long-lived token that lasts 60 days:

### Step 1: Get Short-Lived Token
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your WhatsApp Business App
3. Click **Generate Access Token**
4. Copy the token (this is short-lived, expires in 1-2 hours)

### Step 2: Exchange for Long-Lived Token
Use this API call to exchange the short-lived token for a long-lived one (60 days):

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

Replace:
- `YOUR_APP_ID` = 1195523216114626
- `YOUR_APP_SECRET` = Get this from App Settings → Basic
- `SHORT_LIVED_TOKEN` = The token from Step 1

The response will contain a `access_token` that lasts 60 days.

## Method 3: Automated Token Refresh (Advanced)

For production, you can implement automatic token refresh. This requires:
- App ID and App Secret stored securely
- A scheduled job to refresh tokens before they expire
- Database to store the refreshed token

## Recommended: Use System User Token

**For your use case, I strongly recommend Method 1 (System User)** because:
- ✅ Token never expires
- ✅ No need to update it manually
- ✅ More secure (separate user account)
- ✅ Production-ready

## After Getting the Token

Once you have the permanent token:

1. Update your `.env` file:
```env
WHATSAPP_ACCESS_TOKEN=your_permanent_token_here
WHATSAPP_APP_ID=1195523216114626
OWNER_WHATSAPP=491725802357
```

2. The token will work indefinitely (unless revoked manually)

## Troubleshooting

### If token still expires:
- Make sure you're using a **System User token**, not a regular user token
- Check that the System User has proper permissions
- Verify the System User is assigned to the WhatsApp Business Account

### If you get permission errors:
- Ensure System User has `whatsapp_business_messaging` permission
- Check that WhatsApp Business Account is assigned to the System User

## Security Notes

⚠️ **Important Security Practices:**
- Never commit tokens to Git
- Store tokens only in `.env` file (already in `.gitignore`)
- Use System User tokens for production (more secure)
- Rotate tokens if compromised

## Need Help?

If the owner needs help with Meta Business Suite access or permissions, they may need to:
1. Verify their Business Account
2. Complete Business Verification (for some features)
3. Contact Meta Business Support if they don't have access to System Users

