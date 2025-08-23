import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ChatBot = ({ isDarkTheme }) => {
  // Chat bot states
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isChatTyping, setIsChatTyping] = useState(false)

  // Chat functions
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return
    
    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Simulate AI response
    setIsChatTyping(true)
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: 'Thanks for your message! This is a demo response. I\'m here to help with any questions about blockchain development, web design, or my services.',
        timestamp: new Date().toLocaleTimeString()
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsChatTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {!isChatOpen && (
        <motion.button
          onClick={() => setIsChatOpen(true)}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDarkTheme 
              ? 'bg-white text-black hover:bg-gray-100' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <motion.div
          className={`w-80 h-96 rounded-lg shadow-2xl flex flex-col ${
            isDarkTheme 
              ? 'bg-black border border-white/20' 
              : 'bg-white border border-gray-200'
          }`}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            isDarkTheme ? 'border-white/20' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkTheme ? 'bg-white/20' : 'bg-black/20'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>AI Assistant</h3>
                <p className={`text-xs ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                isDarkTheme ? 'hover:bg-white' : 'hover:bg-black'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? isDarkTheme 
                      ? 'bg-white text-black' 
                      : 'bg-black text-white'
                    : isDarkTheme 
                      ? 'bg-white/10 text-white' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.type === 'user'
                      ? isDarkTheme ? 'text-gray-600' : 'text-gray-300'
                      : isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  }`}>{msg.timestamp}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isChatTyping && (
              <div className="flex justify-start">
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  isDarkTheme ? 'bg-white/10' : 'bg-gray-100'
                }`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-white' : 'bg-gray-600'
                    }`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-white' : 'bg-gray-600'
                    }`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-white' : 'bg-gray-600'
                    }`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className={`p-4 border-t ${
            isDarkTheme ? 'border-white/20' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                  isDarkTheme 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-white/50' 
                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-black/50'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`px-4 py-2 rounded-lg transition-all ${
                  newMessage.trim()
                    ? isDarkTheme 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                    : isDarkTheme 
                      ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ChatBot
