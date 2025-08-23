# 🔧 CORS Issue Solution for Google Gemini API

## 🚨 **Current Problem:**
```
Access to fetch at 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## 🔍 **Why This Happens:**
- **Google Gemini API** doesn't support CORS from browsers
- **Direct API calls** from frontend are blocked
- **Security measure** to prevent unauthorized access

## 🛠️ **Solutions (Choose One):**

### **Solution 1: Backend Proxy (Recommended)**

#### **Step 1: Create Simple Express Server**
Create `server.js` in your project root:
```javascript
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/gemini', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: message }]
          }]
        })
      }
    )
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
```

#### **Step 2: Install Dependencies**
```bash
npm install express cors node-fetch
```

#### **Step 3: Update AI Service**
Change `src/services/aiService.js`:
```javascript
// Use local proxy instead of direct API
const API_URL = "http://localhost:3001/api/gemini"
```

### **Solution 2: Vite Proxy (Development Only)**

#### **Update `vite.config.js`:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, '/v1beta/models/gemini-pro:generateContent'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.body) {
              const bodyData = JSON.stringify(req.body)
              proxyReq.setHeader('Content-Type', 'application/json')
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
              proxyReq.write(bodyData)
            }
          })
        }
      }
    }
  }
})
```

#### **Update AI Service:**
```javascript
const API_URL = "/api/gemini"
```

### **Solution 3: Use Different AI Service (Immediate Fix)**

#### **Switch to Hugging Face (Free, CORS-friendly):**
```javascript
// In src/services/aiService.js
const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
const API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY

// Update fetch call
const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ inputs: prompt })
})
```

## 🚀 **Quick Fix - Use Hugging Face:**

### **Step 1: Get Free API Key**
1. Go to [Hugging Face](https://huggingface.co/)
2. Create account
3. Get API key from settings

### **Step 2: Update Environment**
```bash
# In .env file
VITE_HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **Step 3: Update AI Service**
Replace the entire `aiService.js` with Hugging Face version

## 🎯 **Recommended Approach:**

### **For Development:**
1. **Use Vite Proxy** (easiest, no additional server)
2. **Test with Hugging Face** (immediate working solution)

### **For Production:**
1. **Use Backend Proxy** (most reliable)
2. **Consider Vercel/Netlify functions** (serverless)

## 🔧 **Immediate Fix - Switch to Hugging Face:**

If you want to get the AI working immediately:
1. Get Hugging Face API key
2. Update `.env` file
3. I'll update the AI service for you

## 📞 **Need Help?**

Choose your preferred solution:
- **Quick Fix**: Switch to Hugging Face
- **Proper Fix**: Implement Vite proxy
- **Production Ready**: Backend proxy server

Let me know which approach you'd like to take! 🎭✨
