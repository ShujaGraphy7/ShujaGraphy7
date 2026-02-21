#!/bin/bash

echo "🤖 Setting up AI Chat Environment Variables"
echo "=========================================="

# Check if .env file exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo "Please check if VITE_GEMINI_API_KEY is set correctly."
    echo ""
    echo "Current .env contents:"
    cat .env
else
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "🔑 Next steps:"
    echo "1. Get your free API key from: https://makersuite.google.com/app/apikey"
    echo "2. Open .env file and replace 'your_api_key_here' with your actual key"
    echo "3. Save the file"
    echo "4. Restart your development server"
    echo ""
    echo "🚀 Your AI chat will be ready to go!"
fi

echo ""
echo "📚 For detailed instructions, see AI_SETUP.md"
