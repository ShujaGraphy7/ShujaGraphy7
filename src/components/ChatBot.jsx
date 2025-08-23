import { useState, useEffect, useRef, useCallback } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import aiService from '../services/aiService'
import { useShujaAI } from '../hooks/useShujaAI.js'

const ChatBot = ({ isDarkTheme }) => {
  // AI Hook
  const { generateResponse } = useShujaAI()
  
  // Chat bot states
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isChatTyping, setIsChatTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const messagesEndRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [chatSize, setChatSize] = useState({ width: 480, height: 600 })
  const chatBoxRef = useRef(null)
  

  
  // Random resize hint display
  const [showResizeHint, setShowResizeHint] = useState(false)
  
  // Auto-open chat functionality
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const [showHighlight, setShowHighlight] = useState(false)
  
  useEffect(() => {
    const showHintRandomly = () => {
      // Show hint for 3 seconds every 15-30 seconds
      const delay = Math.random() * 15000 + 15000 // 15-30 seconds
      setTimeout(() => {
        setShowResizeHint(true)
        setTimeout(() => setShowResizeHint(false), 3000) // Hide after 3 seconds
        showHintRandomly() // Schedule next hint
      }, delay)
    }
    
    showHintRandomly()
  }, [])
  
  // Show highlight after 5 seconds
  useEffect(() => {
    const highlightTimer = setTimeout(() => {
      console.log('Showing highlight now!')
      setShowHighlight(true)
    }, 5000) // 5 seconds
    
    return () => clearTimeout(highlightTimer)
  }, [])
  
  // Hide highlight permanently if chat is opened (either manually or automatically)
  useEffect(() => {
    if (isChatOpen || hasAutoOpened) {
      console.log('Chat opened or auto-opened - hiding highlight permanently')
      setShowHighlight(false)
    }
  }, [isChatOpen, hasAutoOpened])
  
    // Auto-open chat after 30-45 seconds of scrolling
  useEffect(() => {
    if (hasAutoOpened) return
    
    let autoOpenTimer
    
    // Start the auto-open timer immediately when component mounts
    const startAutoOpenTimer = () => {
      if (!hasAutoOpened && !isChatOpen) {
        // Random delay between 20-30 seconds
        const randomDelay = Math.random() * 10000 + 20000 // 20-30 seconds
        console.log(`Auto-open timer set for ${Math.round(randomDelay/1000)} seconds`)
        
        autoOpenTimer = setTimeout(() => {
          // Check if chat is still closed before auto-opening
          if (!isChatOpen && !hasAutoOpened) {
            console.log('Auto-opening chat now!')
            setIsChatOpen(true)
            setHasAutoOpened(true)
            setShowHighlight(false) // Hide highlight when chat opens
            
            // Add welcome message after a short delay
            setTimeout(() => {
              const welcomeMessage = {
                id: Date.now() + Math.random(), // Ensure unique ID
                type: 'ai',
                message: "Hey there! 👋 I noticed you've been exploring my website. I'm Shuja Abrar, a blockchain developer and web designer. Feel free to ask me anything about my work, services, or just say hello! What would you like to know?",
                timestamp: new Date().toLocaleTimeString()
              }
              setChatMessages([welcomeMessage]) // Set as first message, not append
            }, 1000)
          }
        }, randomDelay)
      }
    }
    
    // Start timer immediately
    startAutoOpenTimer()
    
    return () => {
      clearTimeout(autoOpenTimer)
    }
  }, [hasAutoOpened]) // Only depend on hasAutoOpened - don't restart timer when chat closes

  // Chat functions
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return
    
    const userMessage = {
      id: Date.now() + Math.random(), // Ensure unique ID
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Show typing indicator
    setIsChatTyping(true)
    setTypingText('')
    
    try {
      // Get AI response using our custom hook
      const aiResponse = await generateResponse(newMessage, aiService)
      
      // Ensure AI response has unique ID
      const uniqueAiResponse = {
        ...aiResponse,
        id: Date.now() + Math.random() + 1 // Ensure unique ID
      }
      
      // Simulate typing effect with delays
      let currentText = ''
      const fullText = uniqueAiResponse.message
      const typingSpeed = 25 // milliseconds per character (faster)
      const pauseDelay = 500 // 0.5 second pause before starting to type (faster)
      
      const typeWriter = () => {
        if (currentText.length < fullText.length) {
          currentText += fullText[currentText.length]
          setTypingText(currentText)
          
          // Add random delays for realistic typing (reduced range)
          const randomDelay = typingSpeed + Math.random() * 25
          setTimeout(typeWriter, randomDelay)
        } else {
          // Typing complete, add the full message
          setTimeout(() => {
            setChatMessages(prev => [...prev, uniqueAiResponse])
            setIsChatTyping(false)
            setTypingText('')
          }, 200) // 0.2 second delay before showing complete message (faster)
        }
      }
      
      // Start typing after initial delay
      setTimeout(typeWriter, pauseDelay)
      
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Fallback response on error
      const fallbackResponse = {
        id: Date.now() + Math.random() + 2, // Ensure unique ID
        type: 'ai',
        message: "I'm experiencing some technical difficulties right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString()
      }
      
      setChatMessages(prev => [...prev, fallbackResponse])
      setIsChatTyping(false)
      setTypingText('')
    }
  }

  // Window control functions
  const handleMinimize = () => {
    setIsMinimized(true)
    setIsMaximized(false)
    // Keep session active - don't reset messages or state
    // Just hide the chat window (but keep isChatOpen true for minimized state)
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // If already maximized, expand to larger size
      if (chatSize.width === 384 && chatSize.height === 512) {
        // Currently maximized, expand to larger size
        setChatSize({ width: 480, height: 600 })
      } else {
        // Currently expanded, go back to maximized
        setChatSize({ width: 384, height: 512 })
      }
    } else {
      // Default to maximized
      setIsMaximized(true)
      setIsMinimized(false)
      setChatSize({ width: 384, height: 512 })
    }
  }

  const handleClose = () => {
    setIsChatOpen(false)
    setIsMinimized(false)
    setIsMaximized(false)
    setChatSize({ width: 480, height: 600 }) // Reset to expanded size
    
    // End session - reset everything
    setChatMessages([])
    setNewMessage('')
    setIsChatTyping(false)
    setTypingText('')
    // Keep hasAutoOpened true - auto-open should never happen again once it has occurred
    // Don't re-enable highlight - it should stay hidden permanently once chat has been opened
    
    // Note: autoOpenTimer is handled in useEffect cleanup
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isChatTyping) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Scroll to bottom when new messages arrive or typing
  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, typingText])

  // Handle resize functionality
  const [resizeMode, setResizeMode] = useState(null)

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || !resizeMode) return
    
    const rect = chatBoxRef.current?.getBoundingClientRect()
    if (!rect) return
    
    let newWidth = chatSize.width
    let newHeight = chatSize.height
    
    if (resizeMode === 'left') {
      // Resize from left edge - calculate new width based on mouse position
      const newLeft = e.clientX
      newWidth = rect.right - newLeft
      // Minimum size is maximized size (384), maximum is 50% of screen
      newWidth = Math.max(384, Math.min(window.innerWidth * 0.5, newWidth))

    }
    
    if (resizeMode === 'top') {
      // Resize from top edge - calculate new height based on mouse position
      const newTop = e.clientY
      newHeight = rect.bottom - newTop
      // Minimum size is maximized size (512), maximum is 75% of screen
      newHeight = Math.max(512, Math.min(window.innerHeight * 0.75, newHeight))

    }
    
    setChatSize({ width: newWidth, height: newHeight })
  }, [isResizing, resizeMode, chatSize.width, chatSize.height])

  const handleMouseUp = () => {
    setIsResizing(false)
    setResizeMode(null)
  }

  // Add global mouse event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {!isChatOpen && (
        <motion.button
          onClick={() => {
            setIsChatOpen(true)
            setHasAutoOpened(true) // Mark as opened so auto-open never happens again
            
            // Add welcome message for manual open
            setTimeout(() => {
              const welcomeMessage = {
                id: Date.now() + Math.random(),
                type: 'ai',
                message: "Hey there! 👋 I'm Shuja Abrar. How can I help you today?",
                timestamp: new Date().toLocaleTimeString()
              }
              setChatMessages([welcomeMessage])
            }, 500)
          }}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center relative ${
            isDarkTheme 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Highlight ring when auto-open is about to happen */}
          {showHighlight && !isChatOpen && (
            <motion.div
              className={`absolute inset-0 rounded-full ${
                isDarkTheme ? 'ring-2 ring-white' : 'ring-2 ring-black'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Pulsing dot indicator */}
          {showHighlight && !isChatOpen && (
            <motion.div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                isDarkTheme ? 'bg-white' : 'bg-black'
              }`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      )}

      {/* Minimized State Indicator */}
      {isMinimized && (
        <motion.div
          className={`w-32 h-8 shadow-lg flex items-center justify-center font-mono cursor-pointer ${
            isDarkTheme 
              ? 'bg-gray-900 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => {
            setIsMinimized(false)
            setIsChatOpen(true)
          }}
          initial={{ scale: 0, opacity: 0, y: 20, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20, rotateY: -90 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          title="Click to restore chat"
        >
          <span className="text-xs">💬 Chat</span>
        </motion.div>
      )}

      {/* Chat Window */}
      {isChatOpen && !isMinimized && (
        <motion.div
          ref={chatBoxRef}
          className={`shadow-2xl flex flex-col font-mono relative ${
            isDarkTheme 
              ? 'bg-gray-900' 
              : 'bg-gray-50'
          }`}
          style={{
            width: `${chatSize.width}px`,
            height: `${chatSize.height}px`
          }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          layout
          transition={{ 
            width: { duration: 0.5, ease: "easeOut" },
            height: { duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" }
          }}
        >

          {/* Terminal Header */}
          <div className={`flex items-center justify-between p-3 ${
            isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5">
                <motion.button
                  onClick={handleClose}
                  className={`w-3 h-3 rounded-full cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: isDarkTheme ? '#4B5563' : '#9CA3AF'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  title="Close"
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={handleMinimize}
                  className={`w-3 h-3 rounded-full cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                  }`}
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: isDarkTheme ? '#4B5563' : '#9CA3AF'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  title="Minimize"
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M20 14H4v-2h16v2z"/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={handleMaximize}
                  className={`w-3 h-3 rounded-full cursor-pointer relative flex items-center justify-center ${
                    isDarkTheme ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: isDarkTheme ? '#4B5563' : '#9CA3AF'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  title={
                    chatSize.width === 480 && chatSize.height === 600 ? "Minimize to small" : "Expand to large"
                  }
                >
                  <svg className={`w-2.5 h-2.5 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`} fill="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    {chatSize.width === 480 && chatSize.height === 600 ? (
                      // Currently expanded - show shrink icon (like Mac minimize)
                      <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
                    ) : (
                      // Currently maximized - show expand icon (like Mac maximize)
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    )}
                  </svg>
                </motion.button>
              </div>
              <span className={`text-xs ml-3 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
              }`}>
                ai@terminal:~$ chat
              </span>
            </div>
          </div>

          {/* Old School Loading Bar */}
          {isChatTyping && (
            <div className={`border-t ${
              isDarkTheme ? 'border-gray-700' : 'border-gray-300'
            }`}>
              <div className={`p-2 ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-mono ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    [PROCESSING]
                  </span>
                  <div className="flex space-x-1">
                    <div className={`w-1 h-3 ${
                      isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                    } animate-pulse`}></div>
                    <div className={`w-1 h-3 ${
                      isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                    } animate-pulse`} style={{ animationDelay: '200ms' }}></div>
                    <div className={`w-1 h-3 ${
                      isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                    } animate-pulse`} style={{ animationDelay: '400ms' }}></div>
                    <div className={`w-1 h-3 ${
                      isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                    } animate-pulse`} style={{ animationDelay: '600ms' }}></div>
                    <div className={`w-1 h-3 ${
                      isDarkTheme ? 'bg-gray-600' : 'bg-gray-400'
                    } animate-pulse`} style={{ animationDelay: '800ms' }}></div>
                  </div>
                  <span className={`text-xs font-mono ${
                    isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    AI_THINKING...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-sm">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-3 py-2 ${
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
                <div className={`max-w-[80%] px-3 py-2 ${
                  isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}>ai@terminal:~$</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {typingText}
                      <span className={`ml-1 font-bold ${
                        cursorVisible ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-100`}>
                        █
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4">
            <div className="flex items-center space-x-2 min-w-0">
              <span className={`text-sm font-mono flex-shrink-0 ${
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
                  placeholder={isChatTyping ? "AI is typing..." : "Enter message..."}
                  disabled={isChatTyping}
                  className={`w-full px-2 py-1 bg-transparent border-none outline-none font-mono text-sm ${
                    isDarkTheme 
                      ? isChatTyping 
                        ? 'text-gray-500 placeholder-gray-600' 
                        : 'text-gray-200 placeholder-gray-500'
                      : isChatTyping 
                        ? 'text-gray-400 placeholder-gray-500' 
                        : 'text-gray-800 placeholder-gray-400'
                  }`}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isChatTyping}
                className={`px-3 py-1 flex-shrink-0 font-mono text-xs ${
                  isChatTyping
                    ? 'text-gray-400 cursor-not-allowed'
                    : newMessage.trim()
                      ? 'text-green-600 cursor-pointer' 
                      : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {isChatTyping ? '[ typing... ]' : '[ send ]'}
              </button>
            </div>
          </div>

          {/* Resize Handles - Always show since default is expanded size */}
          {(
            <>
              {/* Top resize handle */}
              <motion.div
                className={`absolute top-0 left-0 right-0 h-2 cursor-ns-resize ${
                  isDarkTheme ? 'hover:bg-gray-700/50' : 'hover:bg-gray-300/50'
                }`}
                whileHover={{ 
                  backgroundColor: isDarkTheme ? 'rgba(55, 65, 81, 0.8)' : 'rgba(209, 213, 219, 0.8)',
                  height: '8px'
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseDown={(e) => {
                  e.preventDefault()

                  setIsResizing(true)
                  setResizeMode('top')
                }}
              />
              
              {/* Left resize handle */}
              <motion.div
                className={`absolute top-0 left-0 bottom-0 w-2 cursor-ew-resize ${
                  isDarkTheme ? 'hover:bg-gray-700/50' : 'hover:bg-gray-300/50'
                }`}
                whileHover={{ 
                  backgroundColor: isDarkTheme ? 'rgba(55, 65, 81, 0.8)' : 'rgba(209, 213, 219, 0.8)',
                  width: '8px'
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseDown={(e) => {
                  e.preventDefault()

                  setIsResizing(true)
                  setResizeMode('left')
                }}
              />
            </>
          )}



          {/* Resize hint - Show randomly with highlight effect */}
          {showResizeHint && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`absolute top-2 right-2 text-xs font-mono ${
                isDarkTheme ? 'text-gray-300 bg-gray-800/80' : 'text-gray-600 bg-gray-200/80'
              } px-2 py-1 rounded shadow-sm`}
            >
              Drag edges to resize
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default ChatBot
