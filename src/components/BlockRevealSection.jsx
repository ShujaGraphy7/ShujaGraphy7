import { motion } from 'framer-motion'

const blockRevealVariants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function BlockRevealHeading({ children, isDarkTheme }) {
  return (
    <motion.div
      variants={blockRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="relative"
    >
      <span
        className={`absolute -left-2 top-0 bottom-0 w-1 rounded ${
          isDarkTheme ? 'bg-white/30' : 'bg-gray-800/30'
        }`}
      />
      {children}
    </motion.div>
  )
}

export function BlockRevealContent({ children }) {
  return <div className="overflow-hidden">{children}</div>
}

export function BlockRevealSection({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={`block-reveal-section relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative pl-4 border-l-2 border-transparent" />
      {children}
    </motion.section>
  )
}

export function BlockContentWrapper({ children, isDarkTheme }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pl-4 ${
        isDarkTheme ? 'border-l-2 border-white/20' : 'border-l-2 border-gray-800/20'
      }`}
    >
      {children}
    </motion.div>
  )
}
