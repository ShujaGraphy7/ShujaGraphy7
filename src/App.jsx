import { useState, useEffect, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaTelegram, 
  FaWhatsapp,
  FaRocket,
  FaCode,
  FaShieldAlt,
  FaGraduationCap,
  FaBriefcase,
  FaUserTie,
} from 'react-icons/fa'
import { SiSolidity, SiRust, SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiTailwindcss, SiBootstrap, SiHtml5, SiCss3, SiDocker, SiLinux, SiGit, SiFigma } from 'react-icons/si'

function App() {
  const [currentText, setCurrentText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [contactText, setContactText] = useState('')
  const [contactIndex, setContactIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [scrollGlitch, setScrollGlitch] = useState(false)
  
  const typingTexts = useMemo(() => [
    "Blockchain Consultant",
    "Blockchain | Solana, Ethereum, Private Blockchains", 
    "Full Stack Developer",
    "Solidity | Rust | Anchor",
    "DeFi | NFT | Web3 Specialist"
  ], [])
  
  const contactInfo = useMemo(() => [
    "shujaabrar7@gmail.com",
    "+92 303 8062273"
  ], [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (textIndex < typingTexts.length) {
      const currentTextToType = typingTexts[textIndex]
      let charIndex = 0
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentTextToType.length) {
          setCurrentText(currentTextToType.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setTextIndex(prev => prev + 1)
            setCurrentText('')
          }, 2000)
        }
      }, 100)
      
      return () => clearInterval(typeInterval)
    } else {
      setTimeout(() => {
        setTextIndex(0)
        setCurrentText('')
      }, 3000)
    }
  }, [textIndex, typingTexts])

  // Contact typing effect
  useEffect(() => {
    if (contactIndex < contactInfo.length) {
      const currentContact = contactInfo[contactIndex]
      let charIndex = 0
      setIsTyping(true)
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentContact.length) {
          setContactText(currentContact.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          // Wait, then start deleting
          setTimeout(() => {
            setIsTyping(false)
            let deleteIndex = currentContact.length
            
            const deleteInterval = setInterval(() => {
              if (deleteIndex >= 0) {
                setContactText(currentContact.slice(0, deleteIndex))
                deleteIndex--
              } else {
                clearInterval(deleteInterval)
                // Move to next contact or restart
                setTimeout(() => {
                  setContactIndex(prev => (prev + 1) % contactInfo.length)
                }, 1000)
              }
            }, 100)
          }, 3000)
        }
      }, 200)
      
      return () => clearInterval(typeInterval)
    }
  }, [contactIndex, contactInfo])

  // Scroll glitch effect
  useEffect(() => {
    const handleScroll = () => {
      // Trigger glitch effect randomly during scroll
      if (Math.random() < 0.1) { // 10% chance on each scroll event
        setScrollGlitch(true)
        setTimeout(() => setScrollGlitch(false), 150)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDarkTheme ? 'bg-black text-white' : 'bg-gray-50 text-gray-800'
    } ${scrollGlitch ? 'animate-pulse' : ''}`}
    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
      {/* Terminal Header */}
      <motion.div 
        className={`relative py-8 border-b transition-colors duration-300 ${
          isDarkTheme 
            ? 'border-white/30 bg-gradient-to-b from-white/5 to-transparent' 
            : 'border-gray-800/30 bg-gradient-to-b from-gray-800/5 to-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Theme Toggle Button - Outside Terminal */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={`px-3 py-1 text-xs border rounded transition-all duration-300 ${
              isDarkTheme 
                ? 'border-white/50 text-white hover:bg-white hover:text-black' 
                : 'border-gray-800/50 text-gray-800 hover:bg-gray-800 hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            {isDarkTheme ? '[ LIGHT ]' : '[ DARK ]'}
          </button>
        </div>
        
        {/* Terminal Window Frame */}
        <div className={`max-w-4xl mx-auto ${isDarkTheme ? 'bg-black border-white/50' : 'bg-white border-gray-800/50'} border rounded-lg p-6 shadow-2xl ${isDarkTheme ? 'shadow-white/20' : 'shadow-gray-800/20'} relative`}>
          {/* Contact Info - Top Center */}
          <div className={`absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 text-xs md:text-sm ${
            isDarkTheme ? 'text-green-400' : 'text-green-600'
          } ${scrollGlitch ? 'animate-ping' : ''}`}
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            <span className={isDarkTheme ? 'text-white' : 'text-gray-800'}>shuja@blockchain:~$ </span>
            <span className="inline-block min-w-[150px] md:min-w-[200px] lg:min-w-[250px] text-left">
              {contactText}
              <span className={`ml-1 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                ▋
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
            </div>
            
          </div>
          
          <motion.div 
            className={`flex justify-center ${scrollGlitch ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 1.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.3, 0.6, 0.8, 1],
              y: { duration: 0.8, repeat: 0, ease: "easeInOut" },
              opacity: { duration: 1.2, repeat: 0, ease: "easeInOut" }
            }}
            animate={{
              y: [0, -2, 2, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1]
            }}
          >
            <motion.h1 
              className="mb-4 text-left"
              initial={{ scale: 0.95, rotate: -0.5 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 2.2, 
                ease: [0.68, -0.55, 0.265, 1.55],
                times: [0, 0.2, 0.5, 0.8, 1],
                scale: { duration: 1.5, repeat: 0, ease: "easeInOut" },
                rotate: { duration: 2.0, repeat: 0, ease: "easeInOut" }
              }}
              animate={{
                scale: [1, 1.01, 0.99, 1.02, 1],
                rotate: [0, 0.3, -0.2, 0.1, 0]
              }}
            >
              <motion.div 
                className="flex flex-col items-left"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.6, -0.28, 0.735, 0.045],
                  times: [0, 0.3, 0.6, 0.8, 1],
                  x: { duration: 1.8, repeat: 0, ease: "easeInOut" },
                  opacity: { duration: 2.2, repeat: 0, ease: "easeInOut" }
                }}
                animate={{
                  x: [0, -1, 1, -0.5, 0.5, 0],
                  opacity: [1, 0.95, 1, 0.98, 1]
                }}
              >
                <motion.span 
                  className={`text-lg md:text-xl font-normal ${
                    isDarkTheme ? 'text-white/70' : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    duration: 1.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    times: [0, 0.2, 0.4, 0.7, 1],
                    x: { duration: 1.2, repeat: 0, ease: "easeInOut" },
                    opacity: { duration: 1.6, repeat: 0, ease: "easeInOut" }
                  }}
                  animate={{
                    x: [0, -1, 1, -0.5, 0.5, 0],
                    opacity: [1, 0.9, 1, 0.95, 1]
                  }}
                  whileHover={{
                    x: [0, -3, 3, -1, 1, 0],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  Hey i am
                </motion.span>
                <motion.span 
                  className={`text-4xl md:text-6xl font-bold ${
                    isDarkTheme ? 'glitch-text text-white' : 'glitch-text-light text-gray-800'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    duration: 2.0, 
                    ease: [0.68, -0.55, 0.265, 1.55],
                    times: [0, 0.2, 0.5, 0.8, 1],
                    x: { duration: 1.8, repeat: 0, ease: "easeInOut" },
                    y: { duration: 2.2, repeat: 0, ease: "easeInOut" },
                    scale: { duration: 1.5, repeat: 0, ease: "easeInOut" }
                  }}
                  animate={{
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, -0.5, 0.5, -0.2, 0.2, 0],
                    scale: [1, 1.005, 0.995, 1.01, 0.99, 1]
                  }}
                  whileHover={{
                    x: [0, -4, 4, -2, 2, 0],
                    y: [0, -1, 1, 0],
                    scale: [1, 1.02, 0.98, 1.01, 1],
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  Shuja Abrar
                </motion.span>
              </motion.div>
            </motion.h1>
          </motion.div>
          
          <div className="h-24 flex items-center justify-center">
            <span className={`text-xl md:text-2xl font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>
              <span className={isDarkTheme ? 'text-white' : 'text-gray-800'}>$ </span>
              {currentText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                ▋
              </span>
            </span>
          </div>
        </div>
      </motion.div>

                {/* About Me */}
          <motion.section 
            className="py-16 px-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.2, 0.4, 0.7, 0.9, 1],
              y: { duration: 1.2, repeat: 0, ease: "easeInOut" },
              opacity: { duration: 1.8, repeat: 0, ease: "easeInOut" }
            }}
            animate={{
              y: [0, -3, 3, -1, 1, 0],
              opacity: [1, 0.7, 1, 0.8, 1]
            }}
          >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaUserTie className="inline mr-3" />
          [ ABOUT_ME ]
        </motion.h2>
        
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <motion.p 
            className={`text-xl mb-4 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            whileHover={{
              scale: [1, 1.02, 1],
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
          >
            🌟 <strong>Blockchain Consultant | Full-Stack Developer | Web3 Innovator</strong>
          </motion.p>
          <motion.div 
            className="space-y-3 text-lg"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
          >
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >💼 <strong>3+ years of experience</strong> delivering blockchain solutions across <strong>Ethereum, Solana, and Private Blockchains</strong>.</motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >🔗 Specialized in <strong>Smart Contracts, DeFi, NFTs, and Full-Stack Blockchain Applications</strong>.</motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >📖 <strong>Published Research Author</strong> (<em>Springer 2023 – Securing Supply Chains with Blockchain</em>).</motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >🚀 <strong>Co-Founder of Hashnetics</strong> → Building next-gen solutions in <strong>Blockchain, Web, E-Commerce, and Design</strong>.</motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >🎯 Passionate about <strong>scalable, secure, and futuristic blockchain ecosystems</strong>.</motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              whileHover={{
                x: [0, -1, 1, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
            >⚡ Strong believer in <strong>continuous learning, innovation, and decentralization</strong>.</motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 2.8, 
          ease: [0.6, -0.28, 0.735, 0.045],
          times: [0, 0.2, 0.5, 0.7, 0.9, 1],
          y: { duration: 1.8, repeat: 0, ease: "easeInOut" },
          opacity: { duration: 2.2, repeat: 0, ease: "easeInOut" }
        }}
        animate={{
          y: [0, -4, 4, -2, 2, 0],
          opacity: [1, 0.6, 1, 0.7, 1]
        }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaCode className="inline mr-3" />
          [ TECH_ARSENAL ]
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center space-y-2 group">
            <SiSolidity className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Solidity</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiRust className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Rust</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiReact className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>React</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiJavascript className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>JavaScript</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiTypescript className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>TypeScript</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiNodedotjs className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Node.js</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiTailwindcss className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Tailwind</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiBootstrap className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Bootstrap</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiHtml5 className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>HTML5</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiCss3 className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>CSS3</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiDocker className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Docker</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiLinux className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Linux</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiGit className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Git</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <FaCode className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>VS Code</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group">
            <SiFigma className={`text-4xl group-hover:scale-110 transition-transform duration-200 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>Figma</span>
          </div>
        </motion.div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 3.0, 
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.15, 0.4, 0.6, 0.8, 1],
          y: { duration: 2.0, repeat: 0, ease: "easeInOut" },
          opacity: { duration: 2.5, repeat: 0, ease: "easeInOut" }
        }}
        animate={{
          y: [0, -5, 5, -3, 3, 0],
          opacity: [1, 0.5, 1, 0.6, 1]
        }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaBriefcase className="inline mr-3" />
          [ EXPERIENCE_TIMELINE ]
        </motion.h2>
        
        <div className="space-y-8">
          {[
            {
              period: "Mar 2025 – Present",
              title: "🚀 Co-Founder – Hashnetics",
              description: "Building Blockchain & Full-Stack solutions for startups and enterprises.",
              details: "💡 Delivered projects with Ethereum, Solana, MERN, Shopify, WooCommerce. 🎨 Led UI/UX + branding alongside technical development."
            },
            {
              period: "Dec 2022 – Present",
              title: "🌍 Freelance Blockchain Developer",
              description: "DeFi, NFT platforms, end-to-end smart contracts + Web3 integrations.",
              details: "🛠️ Tech stack: Solidity, Rust, Anchor, React, Next.js, Tailwind. 🔍 Provided audits, consulting, and bug fixing for global clients."
            },
            {
              period: "Sep 2023 – Feb 2025",
              title: "🏢 Junior Consultant Blockchain – Systems Limited",
              description: "Developed & deployed Ethereum & Solana smart contracts.",
              details: "📈 Enhanced transaction efficiency, scalability, and security. 🤝 Collaborated with teams on enterprise blockchain solutions."
            },
            {
              period: "Feb 2024 – May 2024",
              title: "🌐 Full Stack Blockchain Dev – FusionwaveAI",
              description: "Specialized in Shardium, Skale, and Hala blockchains.",
              details: "⚡ Increased transaction speeds by 20%. 🛠️ Optimized development workflows, cutting build times by 15%."
            },
            {
              period: "Dec 2022 – Aug 2023",
              title: "🔒 Blockchain Developer – Kaizen Global",
              description: "Spearheaded smart contract deployment & auditing.",
              details: "🛡️ Reduced vulnerabilities by 15% through better auditing. 🔗 Improved operational efficiency with secure blockchain solutions."
            }
          ].map((job, index) => (
            <motion.div 
              key={index}
              className={`border-l-2 pl-6 relative p-4 rounded-r-lg transition-colors duration-300 ${
                isDarkTheme 
                  ? 'border-white bg-gradient-to-r from-white/5 to-transparent' 
                  : 'border-gray-800 bg-gradient-to-r from-gray-800/5 to-transparent'
              }`}
              variants={fadeInUp}
            >
              <div className={`absolute -left-2 w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
                isDarkTheme 
                  ? 'bg-white shadow-white/50' 
                  : 'bg-gray-800 shadow-gray-800/50'
              }`}></div>
              <div className={`font-semibold mb-2 font-mono text-sm transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>[{job.period}]</div>
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>{job.title}</h3>
              <p className={`mb-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>{job.description}</p>
              <p className={`text-sm font-mono transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>{job.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education & Certifications */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          variants={fadeInUp}
        >
          <FaGraduationCap className="inline mr-3" />
          [ EDUCATION_CERTS ]
        </motion.h2>
        
        <motion.div 
          className="space-y-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: "🎓",
              title: "Bsc Computer Science",
              period: "2018–2022",
              description: "Bachelor's degree in Computer Science"
            },
            {
              icon: "📜",
              title: "Blockchain Specialization",
              period: "Coursera",
              description: "Comprehensive blockchain development certification"
            },
            {
              icon: "📜",
              title: "DeFi – Future of Finance",
              period: "Coursera",
              description: "Decentralized Finance specialization course"
            },
            {
              icon: "📜",
              title: "Cyber Security Foundations",
              period: "ISCS",
              description: "Fundamental cybersecurity principles and practices"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`border-l-2 pl-6 relative p-4 rounded-r-lg transition-colors duration-300 ${
                isDarkTheme 
                  ? 'border-white bg-gradient-to-r from-white/5 to-transparent' 
                  : 'border-gray-800 bg-gradient-to-r from-gray-800/5 to-transparent'
              }`}
              variants={fadeInUp}
            >
              <div className={`absolute -left-2 w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
                isDarkTheme 
                  ? 'bg-white shadow-white/50' 
                  : 'bg-gray-800 shadow-gray-800/50'
              }`}></div>
              <div className={`font-semibold mb-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                {item.icon} <strong>{item.title}</strong> – {item.period}
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Freelance Platforms */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 2.2, 
          ease: [0.68, -0.55, 0.265, 1.55],
          times: [0, 0.25, 0.5, 0.75, 1],
          y: { duration: 1.5, repeat: 0, ease: "easeInOut" },
          opacity: { duration: 1.8, repeat: 0, ease: "easeInOut" }
        }}
        animate={{
          y: [0, -3, 3, -1, 1, 0],
          opacity: [1, 0.7, 1, 0.8, 1]
        }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaRocket className="inline mr-3" />
          [ HIRE_ME ]
        </motion.h2>
        
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <p className={`text-xl transition-colors duration-300 ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}>
            Available for blockchain projects and consulting work
          </p>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                🎨 Fiverr Services
              </h3>
              <div className={`text-sm space-y-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>• WordPress Development</p>
                <p>• Shopify Solutions</p>
                <p>• Graphics Design</p>
                <p>• MERN Stack Apps</p>
              </div>
              <a 
                href="https://www.fiverr.com/shujagraphy7" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-6 py-3 border font-mono text-lg rounded-none transition-all duration-300 hover:shadow-lg inline-block ${
                  isDarkTheme 
                    ? 'border-white text-white hover:bg-white hover:text-black hover:shadow-white/50' 
                    : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-gray-800/50'
                }`}
              >
                [ FIVERR ]
              </a>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                🚀 Upwork Projects
              </h3>
              <div className={`text-sm space-y-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>• Enterprise MERN Stack</p>
                <p>• Blockchain Solutions</p>
                <p>• Smart Contracts</p>
                <p>• Large Scale Projects</p>
              </div>
              <a 
                href="https://www.upwork.com/freelancers/~01c8c8c8c8c8c8c8c8" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-6 py-3 border font-mono text-lg rounded-none transition-all duration-300 hover:shadow-lg inline-block ${
                  isDarkTheme 
                    ? 'border-white text-white hover:bg-white hover:text-black hover:shadow-white/50' 
                    : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-gray-800/50'
                }`}
              >
                [ UPWORK ]
              </a>
            </div>
          </div>
        </motion.div>
      </motion.section>

            {/* Payment Methods */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.2, 0.4, 0.7, 0.9, 1],
          y: { duration: 1.5, repeat: 0, ease: "easeInOut" },
          opacity: { duration: 2.0, repeat: 0, ease: "easeInOut" }
        }}
        animate={{
          y: [0, -3, 3, -1, 1, 0],
          opacity: [1, 0.7, 1, 0.8, 1]
        }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaShieldAlt className="inline mr-3" />
          [ PAYMENT_METHODS ]
        </motion.h2>
        
        <div className="space-y-8">
          {/* Local Clients */}
          <motion.div 
            className={`text-center p-6 border-l-2 pl-6 relative transition-colors duration-300 ${
              isDarkTheme 
                ? 'border-white bg-gradient-to-r from-white/5 to-transparent' 
                : 'border-gray-800 bg-gradient-to-r from-gray-800/5 to-transparent'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            <div className={`absolute -left-2 w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
              isDarkTheme 
                ? 'bg-white shadow-white/50' 
                : 'bg-gray-800 shadow-gray-800/50'
            }`}></div>
            
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">🇵🇰</span>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                Local Clients
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  🏦
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Bank Transfer
                </span>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  💰
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Cash Payment
                </span>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  ₿
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Cryptocurrency
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* International Clients */}
          <motion.div 
            className={`text-center p-6 border-l-2 pl-6 relative transition-colors duration-300 ${
              isDarkTheme 
                ? 'border-white bg-gradient-to-r from-white/5 to-transparent' 
                : 'border-gray-800 bg-gradient-to-r from-gray-800/5 to-transparent'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            <div className={`absolute -left-2 w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
              isDarkTheme 
                ? 'bg-white shadow-white/50' 
                : 'bg-gray-800 shadow-gray-800/50'
            }`}></div>
            
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">🌍</span>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                International Clients
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  🏦
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Bank Transfer
                </span>
                <span className={`text-xs transition-colors duration-300 ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  (if available)
                </span>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  🔗
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Fiverr & Upwork
                </span>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 p-3 transition-all duration-300 hover:scale-105 ${
                isDarkTheme ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/5 hover:bg-gray-800/10'
              }`}>
                <div className={`w-12 h-12 flex items-center justify-center text-xl transition-colors duration-300 ${
                  isDarkTheme ? 'bg-white/10 text-white' : 'bg-gray-800/10 text-gray-800'
                }`}>
                  ₿
                </div>
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  Cryptocurrency
                </span>
                <span className={`text-xs font-bold transition-colors duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  5% DISCOUNT
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>


      {/* Contact & Social Media */}
      <motion.section 
        className="py-16 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 2.8, 
          ease: [0.6, -0.28, 0.735, 0.045],
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          y: { duration: 1.8, repeat: 0, ease: "easeInOut" },
          opacity: { duration: 2.2, repeat: 0, ease: "easeInOut" }
        }}
        animate={{
          y: [0, -4, 4, -2, 2, 0],
          opacity: [1, 0.6, 1, 0.7, 1]
        }}
      >
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-left border-b pb-4 transition-colors duration-300 ${
            isDarkTheme 
              ? 'border-white/50 text-white' 
              : 'border-gray-800/50 text-gray-800'
          }`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{
            x: [0, -2, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <FaShieldAlt className="inline mr-3" />
          [ CONNECT ]
        </motion.h2>
        
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <p className={`text-xl mb-8 transition-colors duration-300 ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}>
            Connect with me on social media for collaborations and inquiries
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            <a 
              href="https://www.linkedin.com/in/shujagraphy7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaLinkedin className="text-4xl" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/ShujaGraphy7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaGithub className="text-4xl" />
              <span className="text-xs">GitHub</span>
            </a>
            <a 
              href="https://www.instagram.com/shuja_graphy7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaInstagram className="text-4xl" />
              <span className="text-xs">Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/shujagraphy07/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaFacebook className="text-4xl" />
              <span className="text-xs">Facebook</span>
            </a>
            <a 
              href="https://t.me/shujagraphy7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaTelegram className="text-4xl" />
              <span className="text-xs">Telegram</span>
            </a>
            <a 
              href="https://wa.me/923038062273" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 hover:text-gray-400 transition-colors"
            >
              <FaWhatsapp className="text-4xl" />
              <span className="text-xs">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className={`py-8 text-center border-t transition-colors duration-300 ${
          isDarkTheme ? 'border-white/50' : 'border-gray-800/50'
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-400">
          © 2025 Shuja Abrar | Blockchain Developer & Consultant
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Design and Developed by Shuja with{' '}
          <span className="inline-block animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110 hover:text-red-500">
            ❤️
          </span>
        </p>
      </motion.footer>
    </div>
  )
}

export default App
