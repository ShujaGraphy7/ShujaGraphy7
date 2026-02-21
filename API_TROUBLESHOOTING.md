# 🔧 API Troubleshooting Guide

## 🚨 **Current Issue: 404 Error**

### **Error Details:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=... 404 (Not Found)
```

## 🔍 **Possible Causes & Solutions:**

### **1. API Key Issues:**
- **Invalid API Key**: Your key might be incorrect or expired
- **Wrong API Service**: Make sure you're using Google AI Studio, not OpenAI

### **2. Model Name Issues:**
- **Model Changed**: Google might have updated model names
- **Region Restrictions**: Some models might not be available in your region

### **3. API Endpoint Issues:**
- **URL Changed**: Google might have updated the API endpoint
- **Version Mismatch**: Using wrong API version

## 🛠️ **Step-by-Step Fix:**

### **Step 1: Verify Your API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check if your API key is still active
3. Copy the key again
4. Update your `.env` file

### **Step 2: Check API Key Format**
Your API key should look like:
```
AIzaSyC... (about 39 characters)
```

### **Step 3: Test API Key**
1. Open your browser console
2. Look for detailed error messages
3. Check if the API key is being read correctly

### **Step 4: Alternative Models**
If `gemini-1.5-flash` doesn't work, try:
- `gemini-1.5-pro`
- `gemini-pro`
- `gemini-1.0-pro`

## 🔧 **Quick Fixes to Try:**

### **Fix 1: Update Model Name**
In `src/services/aiService.js`, try changing:
```javascript
// Try these models one by one:
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
// or
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent"
// or
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
```

### **Fix 2: Check API Key in Console**
Look for this message in browser console:
```
Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file
```

### **Fix 3: Verify Environment Variable**
Make sure your `.env` file contains:
```bash
VITE_GEMINI_API_KEY=AIzaSyC...your_actual_key_here
```

## 🧪 **Testing Steps:**

### **1. Check Environment Variable:**
```bash
# In your terminal, check if .env exists
ls -la .env

# Check .env contents (don't share the key!)
cat .env
```

### **2. Restart Development Server:**
```bash
# Stop your current server (Ctrl+C)
# Then restart
npm run dev
```

### **3. Check Browser Console:**
Look for these messages:
- ✅ "Gemini AI Service initialized successfully"
- ❌ "Gemini API key not found..."
- ❌ "Failed to initialize Gemini AI service..."

## 🌐 **Alternative Solutions:**

### **Option 1: Use Different Model**
Try the older `gemini-pro` model:
```javascript
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
```

### **Option 2: Check API Status**
1. Visit [Google AI Studio Status](https://status.ai.google.com/)
2. Check if there are any service disruptions

### **Option 3: Create New API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Delete old key
3. Create new key
4. Update `.env` file

## 📞 **Still Having Issues?**

### **Check These:**
1. **API Key**: Valid and active
2. **Environment Variable**: Correctly set in `.env`
3. **Server Restart**: After updating `.env`
4. **Browser Console**: For detailed error messages
5. **Model Name**: Try different Gemini models

### **Common Mistakes:**
- ❌ Forgetting to restart dev server after `.env` changes
- ❌ Using wrong API key format
- ❌ Not saving `.env` file
- ❌ Using expired or invalid API key

## 🎯 **Expected Result:**

After fixing, you should see:
```
Google Gemini AI Service initialized successfully
```

And the chat should work with real AI responses! 🎭✨

## 🆘 **Need More Help?**

If you're still getting errors:
1. Share the exact error message from console
2. Check if your API key is valid
3. Try creating a new API key
4. Verify you're using Google AI Studio, not OpenAI
