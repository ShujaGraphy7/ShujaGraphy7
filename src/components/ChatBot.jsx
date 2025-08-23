import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const ChatBot = ({ isDarkTheme }) => {
  // Chat bot states
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
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

  // Window control functions
  const handleMinimize = () => {
    setIsMinimized(true)
    setIsMaximized(false)
  }

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false)
    } else {
      setIsMaximized(true)
      setIsMinimized(false)
    }
  }

  const handleClose = () => {
    setIsChatOpen(false)
    setIsMinimized(false)
    setIsMaximized(false)
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
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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

      {/* Minimized State Indicator */}
      {isChatOpen && isMinimized && (
        <motion.div
          className={`w-32 h-8 shadow-lg flex items-center justify-center font-mono cursor-pointer ${
            isDarkTheme 
              ? 'bg-gray-900 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setIsMinimized(false)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          title="Click to restore chat"
        >
          <span className="text-xs">💬 Chat</span>
        </motion.div>
      )}

      {/* Chat Window */}
      {isChatOpen && !isMinimized && (
        <motion.div
          className={`${isMaximized ? 'w-96 h-[32rem]' : 'w-80 h-96'} shadow-2xl flex flex-col font-mono ${
            isDarkTheme 
              ? 'bg-gray-900' 
              : 'bg-gray-50'
          }`}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Terminal Header */}
          <div className={`flex items-center justify-between p-3 ${
            isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleClose}
                  className={`w-3 h-3 rounded-full hover:bg-gray-600 transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  title="Close"
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                <button
                  onClick={handleMinimize}
                  className={`w-3 h-3 rounded-full hover:bg-gray-600 transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                  }`}
                  title="Minimize"
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M20 14H4v-2h16v2z"/>
                  </svg>
                </button>
                <button
                  onClick={handleMaximize}
                  className={`w-3 h-3 rounded-full hover:bg-gray-600 transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    {isMaximized ? (
                      <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
                    ) : (
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    )}
                  </svg>
                </button>
              </div>
              <span className={`text-xs ml-3 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
              }`}>
                ai@terminal:~$ chat
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-sm">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 ${
                  msg.type === 'user'
                    ? isDarkTheme 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-300 text-gray-800'
                    : isDarkTheme 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs ${
                      msg.type === 'user' 
                        ? isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                        : isDarkTheme ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {msg.type === 'user' ? 'user@terminal:~$' : 'ai@terminal:~$'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user'
                      ? isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                      : isDarkTheme ? 'text-gray-500' : 'text-gray-600'
                  }`}>[{msg.timestamp}]</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isChatTyping && (
              <div className="flex justify-start">
                <div className={`max-w-xs px-3 py-2 ${
                  isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs ${
                      isDarkTheme ? 'text-green-400' : 'text-green-600'
                    }`}>ai@terminal:~$</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-gray-400' : 'bg-gray-600'
                    }`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-gray-400' : 'bg-gray-600'
                    }`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkTheme ? 'bg-gray-400' : 'bg-gray-600'
                    }`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4">
            <div className="flex items-center space-x-2 min-w-0">
              <span className={`text-sm font-mono ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                user@terminal:~$ 
              </span>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter message..."
                  className={`w-full px-2 py-1 bg-transparent border-none outline-none font-mono text-sm ${
                    isDarkTheme 
                      ? 'text-gray-200 placeholder-gray-500' 
                      : 'text-gray-800 placeholder-gray-400'
                  }`}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`w-8 h-8 rounded-full transition-all flex-shrink-0 flex items-center justify-center ${
                  newMessage.trim()
                    ? isDarkTheme 
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                    : isDarkTheme 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
