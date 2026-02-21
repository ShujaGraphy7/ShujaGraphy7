import { useState } from 'react'
import { findRelevantInfoWithContext } from '../data/shujaKnowledgeBase.js'

// Helper function to generate answer from keyInfo
const generateAnswerFromKeyInfo = (relevantInfo) => {
  const keyInfo = relevantInfo.keyInfo
  
  switch (relevantInfo.category) {
    case 'personal':
      return `I'm ${keyInfo.name}, a ${keyInfo.role}. Ask for details if needed.`
    
    case 'blockchain':
      return `I offer ${keyInfo.services[0] || 'smart contracts'}. Need specifics?`
    
    case 'webdesign':
      return `I specialize in ${keyInfo.frontend[0] || 'React'} and ${keyInfo.backend[0] || 'Node.js'}.`
    
    case 'skills':
      return `My main skills: ${keyInfo.primary.slice(0, 2).join(', ')}.`
    
    case 'experience':
      return `I work at ${Object.keys(keyInfo)[0] || 'Hashnetics'}. Ask for details.`
    
    case 'services':
      return `I offer ${keyInfo.services[0] || 'blockchain development'}.`
    
    case 'contact':
      return `Contact: ${keyInfo.email}. Need more info?`
    
    case 'github-specific':
      return `I use ${keyInfo.tools[0] || 'Git'} for version control.`
    
    case 'solidity-specific':
      return `I develop smart contracts with ${keyInfo.languages[0] || 'Solidity'}.`
    
    case 'react-specific':
      return `I build apps with ${keyInfo.framework[0] || 'React'}.`
    
    case 'node-specific':
      return `I use ${keyInfo.runtime[0] || 'Node.js'} for backend.`
    
    case 'blockchain-platforms':
      return `I work with ${Object.keys(keyInfo)[0] || 'Ethereum'}.`
    
    case 'web3-defi':
      return `I develop DeFi protocols. Ask for details.`
    
    case 'general':
      return `${keyInfo.greeting}`
    
    case 'projects':
      return `I've built ${keyInfo.types[0] || 'blockchain apps'}.`
    
    case 'timeline':
      return `Typical timeline: ${keyInfo.typical[0] || '2-4 weeks'}.`
    
    default:
      return `I can help with this. Need more details?`
  }
}

export const useShujaAI = () => {
  const [conversationHistory, setConversationHistory] = useState([])

  // Check if message is out of context or inappropriate
  const isMessageOutOfContext = (message) => {
    const outOfContextPatterns = [
      // Personal/Private topics
      /\b(personal|private|family|relationship|dating|marriage|divorce|children|kids|parents|spouse|partner)\b/i,
      /\b(love|romance|crush|flirting|single|married|boyfriend|girlfriend|wife|husband)\b/i,
      /\b(girlfriend|boyfriend|girl friend|boy friend)\b/i,
      
      // Inappropriate topics
      /\b(politics|political|religion|religious|sexual|sex|gender|orientation)\b/i,
      /\b(gossip|rumor|joke|funny|humor|comedy|entertainment)\b/i,
      /\b(offensive|rude|vulgar|inappropriate|curse|swear|insult)\b/i,
      
      // Financial/Personal assets
      /\b(salary|income|money|wealth|rich|poor|bank account|house|home|car|vehicle)\b/i,
      
      // Health/Appearance
      /\b(health|medical|illness|disease|mental health|therapy|weight|height|appearance|looks|beautiful|handsome|body|physical)\b/i,
      
      // Social opinions
      /\b(opinion on|what do you think about|do you like|do you hate|personal views|personal beliefs|personal thoughts|personal feelings)\b/i,
      
      // Off-topic questions
      /\b(weather|sports|music|movies|books|food|cooking|travel|vacation|hobby|hobbies)\b/i,
      
      // Random/meaningless messages
      /\b(asdf|qwerty|test|hello world|hi there|hey there|what's up|how are you doing|how's it going)\b/i,
      
      // Non-technical questions
      /\b(what time is it|what day is it|what's the weather|how old are you|where do you live|what's your favorite)\b/i,
      
      // Personal life questions
      /\b(do you have|are you|what do you do|how do you feel|what's your|tell me about your|your personal|your life)\b/i
    ]
    
    return outOfContextPatterns.some(pattern => pattern.test(message))
  }

  // Generate professional redirect response for out-of-context messages
  const generateProfessionalRedirect = () => {
    const redirectResponses = [
      "I focus on blockchain development and web services. How can I help with your project?",
      "I'm here to discuss business and technical solutions. What development needs do you have?",
      "Let's focus on your project requirements. What are you looking to build?",
      "I specialize in blockchain and web development. What can I help you create?",
      "I'm available for professional consultations. What's your project about?",
      "I provide technical solutions for blockchain and web projects. What do you need?",
      "Let's discuss your development requirements. What are you building?",
      "I'm here to help with your technical projects. What can I assist you with?"
    ]
    
    const randomIndex = Math.floor(Math.random() * redirectResponses.length)
    return redirectResponses[randomIndex]
  }

  // Generate response using knowledge base first, then AI
  const generateResponse = async (userMessage, aiService) => {
    // FIRST: Check if message is out of context
    if (isMessageOutOfContext(userMessage)) {
      const redirectMessage = generateProfessionalRedirect()
      
      console.log('🚫 OUT-OF-CONTEXT DETECTED:', userMessage)
      console.log('🔄 REDIRECTING TO:', redirectMessage)
      
      const response = {
        id: Date.now() + Math.random(),
        type: 'ai',
        message: redirectMessage,
        timestamp: new Date().toLocaleTimeString(),
        source: 'out-of-context-redirect'
      }
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: redirectMessage }
      ])
      
      return response
    }
    
    console.log('✅ MESSAGE IS PROFESSIONAL:', userMessage)
    
    // Then, check if we have a direct answer in our knowledge base
    const relevantInfo = findRelevantInfoWithContext(userMessage)
    
    if (relevantInfo) {
      console.log('📚 KNOWLEDGE BASE MATCH:', relevantInfo.category)
      // Generate answer from keyInfo structure
      const answer = generateAnswerFromKeyInfo(relevantInfo)
      
      // Use knowledge base answer
      const response = {
        id: Date.now() + Math.random(),
        type: 'ai',
        message: answer,
        timestamp: new Date().toLocaleTimeString(),
        source: 'knowledge-base'
      }
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: answer }
      ])
      
      return response
    }
    
    console.log('🤖 USING AI SERVICE FOR COMPLEX QUESTION')
    
    // If no knowledge base match, use AI service
    try {
      const aiResponse = await aiService.generateResponse(userMessage)
      
      // Extract the message from AI response (it's already an object with message property)
      const messageContent = typeof aiResponse === 'string' ? aiResponse : aiResponse.message
      
      const response = {
        id: Date.now() + Math.random(),
        type: 'ai',
        message: messageContent,
        timestamp: new Date().toLocaleTimeString(),
        source: 'ai-service'
      }
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: messageContent }
      ])
      
      return response
    } catch (error) {
      console.error('Error generating AI response:', error)
      
      // Fallback response
      const fallbackResponse = {
        id: Date.now() + Math.random(),
        type: 'ai',
        message: "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to ask me about my blockchain development, web design, or creative services.",
        timestamp: new Date().toLocaleTimeString(),
        source: 'fallback'
      }
      
      return fallbackResponse
    }
  }

  // Get conversation context
  const getConversationContext = () => {
    return conversationHistory
  }

  // Reset conversation
  const resetConversation = () => {
    setConversationHistory([])
  }

  return {
    generateResponse,
    getConversationContext,
    resetConversation,
    conversationHistory
  }
}
