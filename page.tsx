'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Heart, Copy, Check } from 'lucide-react'

// Types
type MotionBehavior = 'Fade' | 'Slide' | 'Scale' | 'Morph' | 'Rotate' | 'Typing' | 'Gradient' | 'Wave' | 'Glow' | 'Bounce' | 'Shimmer' | 'SlideShape' | 'GlowPulse' | 'Rainbow'
type InteractionPattern = 'Hover' | 'Scroll' | 'Entrance' | 'Exit' | 'Loop'
type VisualCharacter = 'Minimal' | 'Organic' | 'Geometric' | 'Abstract' | 'Sharp' | 'Text'
type Category = 'All' | 'Website' | 'Mobile'

interface AnimationCard {
  id: string
  title: string
  category: 'Website' | 'Mobile'
  motionBehavior: MotionBehavior
  interactionPattern: InteractionPattern
  visualCharacter: VisualCharacter
  isFavorite: boolean
  isText?: boolean
}

// Sample data
const SAMPLE_ANIMATIONS: AnimationCard[] = [
  {
    id: '1',
    title: 'Typing Reveal',
    category: 'Website',
    motionBehavior: 'Typing',
    interactionPattern: 'Entrance',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '2',
    title: 'Split Text Entrance',
    category: 'Website',
    motionBehavior: 'Slide',
    interactionPattern: 'Entrance',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '3',
    title: 'Rotating Letters',
    category: 'Website',
    motionBehavior: 'Rotate',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '4',
    title: 'Glitch Effect',
    category: 'Website',
    motionBehavior: 'Scale',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '5',
    title: 'Neon Glow Text',
    category: 'Website',
    motionBehavior: 'Glow',
    interactionPattern: 'Hover',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '6',
    title: 'Liquid Wave Text',
    category: 'Website',
    motionBehavior: 'Wave',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '7',
    title: 'Color Cycle',
    category: 'Website',
    motionBehavior: 'Gradient',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '8',
    title: 'Bounce Text',
    category: 'Website',
    motionBehavior: 'Bounce',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '9',
    title: 'Shimmer Text',
    category: 'Website',
    motionBehavior: 'Shimmer',
    interactionPattern: 'Loop',
    visualCharacter: 'Text',
    isFavorite: false,
    isText: true,
  },
  {
    id: '10',
    title: 'Organic Blob',
    category: 'Website',
    motionBehavior: 'Morph',
    interactionPattern: 'Loop',
    visualCharacter: 'Organic',
    isFavorite: false,
  },
  {
    id: '11',
    title: 'Spin Loader',
    category: 'Website',
    motionBehavior: 'Rotate',
    interactionPattern: 'Loop',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Slide In Box',
    category: 'Website',
    motionBehavior: 'SlideShape',
    interactionPattern: 'Loop',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
  {
    id: '13',
    title: 'Glow Circle',
    category: 'Website',
    motionBehavior: 'GlowPulse',
    interactionPattern: 'Loop',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '14',
    title: 'Rainbow Border',
    category: 'Website',
    motionBehavior: 'Rainbow',
    interactionPattern: 'Loop',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
]

function saveFavourites(animations: AnimationCard[]) {
  const favourites = animations.filter((anim) => anim.isFavorite === true);
  const favouritesString = JSON.stringify(favourites);
  localStorage.setItem("favouriteAnimationSaved", favouritesString);
}

// Animation documentation and code
const ANIMATION_DETAILS: Record<string, { code: string; documentation: string; defaultSpeed: number; defaultSize: number }> = {
  '1': {
    code: `const chars = text.split('');
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

<motion.div variants={containerVariants}>
  {chars.map((char, i) => (
    <motion.span key={i} variants={charVariants}>
      {char}
    </motion.span>
  ))}
</motion.div>`,
    documentation: 'Character-by-character typing effect. Each letter reveals smoothly for authentic text reveal.',
    defaultSpeed: 2,
    defaultSize: 20,
  },
  '2': {
    code: `const wordVariants = {
  hidden: (dir) => ({
    x: dir > 0 ? 100 : -100,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

<motion.div>
  <motion.span custom={-1} variants={wordVariants}>
    Split
  </motion.span>
  <motion.span custom={1} variants={wordVariants}>
    Text
  </motion.span>
</motion.div>`,
    documentation: 'Text splits and slides in from opposite sides. Perfect for dramatic entrances.',
    defaultSpeed: 1.2,
    defaultSize: 20,
  },
  '3': {
    code: `const letterVariants = {
  animate: (i) => ({
    rotateY: [0, 360],
    transition: { delay: i * 0.1, duration: 1.5, repeat: Infinity },
  }),
};

<motion.div className="flex">
  {text.split('').map((char, i) => (
    <motion.span
      key={i}
      custom={i}
      animate="animate"
      variants={letterVariants}
      style={{ perspective: '1000px' }}
    >
      {char}
    </motion.span>
  ))}
</motion.div>`,
    documentation: '3D rotation effect on each letter. Creates mesmerizing spinning text.',
    defaultSpeed: 1.5,
    defaultSize: 20,
  },
  '4': {
    code: `<motion.h2
  animate={{
    x: [-2, 2, -2, 2, 0],
    textShadow: [
      '0 0 0px rgba(255,0,0,0)',
      '3px 3px 0px rgba(255,0,0,0.8)',
      '-3px -3px 0px rgba(0,0,255,0.8)',
      '0 0 0px rgba(255,0,0,0)',
    ]
  }}
  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
  className="text-white font-bold"
>
  Glitch!
</motion.h2>`,
    documentation: 'Glitch effect with RGB color shift. Edgy, tech-inspired animation.',
    defaultSpeed: 1,
    defaultSize: 20,
  },
  '5': {
    code: `<motion.h2
  animate={{
    textShadow: [
      '0 0 5px #1847BD, 0 0 10px #1847BD',
      '0 0 20px #1847BD, 0 0 30px #1847BD, 0 0 40px #FF006E',
      '0 0 5px #1847BD, 0 0 10px #1847BD',
    ]
  }}
  transition={{ duration: 2, repeat: Infinity }}
  className="text-white font-bold"
>
  Neon Glow
</motion.h2>`,
    documentation: 'Neon glow with color pulse. Perfect for cyber and modern designs.',
    defaultSpeed: 2,
    defaultSize: 20,
  },
  '6': {
    code: `const letterVariants = {
  animate: (i) => ({
    y: [0, -15, 0],
    x: [0, Math.sin(i) * 10, 0],
    transition: {
      delay: i * 0.1,
      duration: 2,
      repeat: Infinity,
    }
  }),
};

<motion.div className="flex gap-1">
  {text.split('').map((char, i) => (
    <motion.span
      key={i}
      custom={i}
      animate="animate"
      variants={letterVariants}
    >
      {char}
    </motion.span>
  ))}
</motion.div>`,
    documentation: 'Liquid wave motion on text. Organic, flowing effect.',
    defaultSpeed: 2,
    defaultSize: 20,
  },
  '7': {
    code: `<motion.h2
  animate={{
    color: [
      '#1847BD',
      '#FF006E',
      '#00F5FF',
      '#FFD700',
      '#1847BD'
    ]
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
  }}
  className="font-bold"
>
  Color Cycle
</motion.h2>`,
    documentation: 'Text cycles through vibrant colors. Eye-catching and dynamic.',
    defaultSpeed: 5,
    defaultSize: 20,
  },
  '8': {
    code: `<motion.h2
  animate={{
    y: [0, -15, 0],
    opacity: [1, 0.6, 1]
  }}
  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
  className="text-white font-bold"
>
  Bounce
</motion.h2>`,
    documentation: 'Text bounces with opacity pulse. Playful, energetic effect.',
    defaultSpeed: 1,
    defaultSize: 20,
  },
  '9': {
    code: `<motion.h2
  animate={{
    opacity: [0.3, 1, 0.3]
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="text-white font-bold"
>
  Shimmer
</motion.h2>`,
    documentation: 'Sparkling shimmer effect. Creates a twinkling text appearance.',
    defaultSpeed: 1.5,
    defaultSize: 20,
  },
  '10': {
    code: `<motion.div
  animate={{
    borderRadius: ['50%', '30%', '70%', '50%']
  }}
  transition={{ duration: 3, repeat: Infinity }}
  className="w-32 h-32 bg-gradient-to-br from-accent-500 to-accent-600"
/>`,
    documentation: 'Organic blob animation. Creates fluid, natural-looking shape transitions.',
    defaultSpeed: 3,
    defaultSize: 128,
  },
  '11': {
    code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
  className="w-8 h-8 border-2 border-accent-500 rounded-full border-t-transparent"
/>`,
    documentation: 'Continuous rotation. Perfect for loading spinners and circular progress.',
    defaultSpeed: 2,
    defaultSize: 32,
  },
  '12': {
    code: `<motion.div
  animate={{
    x: [-20, 20, -20],
    boxShadow: ['0 0 0px rgba(255, 5, 110, 0)', '0 0 20px rgba(255, 5, 110, 0.6)', '0 0 0px rgba(255, 5, 110, 0)']
  }}
  transition={{ duration: 2, repeat: Infinity }}
  className="w-12 h-12 bg-accent-500 rounded-lg"
/>`,
    documentation: 'Box slides horizontally with glowing shadow. Smooth, directional motion.',
    defaultSpeed: 2,
    defaultSize: 48,
  },
  '13': {
    code: `<motion.div
  animate={{
    scale: [1, 1.5, 1],
    boxShadow: ['0 0 5px rgba(0, 245, 255, 0.3)', '0 0 30px rgba(0, 245, 255, 1)', '0 0 5px rgba(0, 245, 255, 0.3)']
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="w-10 h-10 bg-cyan-400 rounded-full"
/>`,
    documentation: 'Circle with cyan glow pulse. Eye-catching and luminous.',
    defaultSpeed: 1.5,
    defaultSize: 40,
  },
  '14': {
    code: `<motion.div
  animate={{
    borderColor: ['#FF006E', '#00F5FF', '#FFD700', '#FF006E'],
    scale: [1, 1.05, 1]
  }}
  transition={{ duration: 3, repeat: Infinity }}
  className="w-16 h-16 border-4 rounded-lg"
/>`,
    documentation: 'Square with rainbow border animation. Vibrant and colorful.',
    defaultSpeed: 3,
    defaultSize: 64,
  },
}

// Animation Detail Modal Component
function AnimationDetailModal({
  animation,
  isOpen,
  onClose,
  playbackKey,
}: {
  animation: AnimationCard | null
  isOpen: boolean
  onClose: () => void
  playbackKey: number
}) {
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)
  const [copied, setCopied] = useState(false)

  const details = animation ? ANIMATION_DETAILS[animation.id] : null

  const [typingCycle, setTypingCycle] = useState(0)

  useEffect(() => {
    if (!animation || !details) return
    if (!animation.isText || animation.motionBehavior !== 'Typing') return
    const text = 'Text'
    const perLetter = 0.3 / speed
    const stagger = 0.08 / speed
    const delayChildren = 0.1
    const pause = 0.5
    const total = delayChildren + perLetter + stagger * (text.length - 1) + pause
    const id = setInterval(() => setTypingCycle((c) => c + 1), total * 1000)
    return () => clearInterval(id)
  }, [animation, details, speed])

  if (!animation || !details) return null

  const copyCode = () => {
    navigator.clipboard.writeText(details.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const actualSpeed = details.defaultSpeed / speed
  const actualSize = details.defaultSize * scale

  const previewVariants: Record<string, any> = animation?.isText
    ? {
        Typing: {
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08 / speed,
                delayChildren: 0.1,
              },
            },
          },
          char: {
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3 / speed },
            },
          },
        },
        Slide: {
          animate: { x: [-10 * scale, 10 * scale, -10 * scale] },
          transition: { duration: actualSpeed * 1.5, repeat: Infinity },
        },
        Rotate: {
          animate: { rotateY: [0, 360] },
          transition: { duration: actualSpeed * 1.5, repeat: Infinity },
        },
        Scale: {
          animate: { x: [-2 * scale, 2 * scale, -2 * scale, 2 * scale, 0] },
          transition: { duration: actualSpeed * 0.4, repeat: Infinity, repeatDelay: actualSpeed },
        },
        Glow: {
          animate: { textShadow: ['0 0 5px #FF006E', '0 0 20px #FF006E', '0 0 5px #FF006E'] },
          transition: { duration: actualSpeed, repeat: Infinity },
        },
        Wave: {
          animate: { y: [0, -8 * scale, 0] },
          transition: { duration: actualSpeed, repeat: Infinity },
        },
        Gradient: {
          animate: { color: ['#00F5FF', '#FFD700', '#FF006E', '#00F5FF'] },
          transition: { duration: actualSpeed * 2.5, repeat: Infinity },
        },
        Bounce: {
          animate: { y: [0, -15 * scale, 0], opacity: [1, 0.6, 1] },
          transition: { duration: actualSpeed * 0.6, repeat: Infinity, repeatDelay: actualSpeed * 0.5 },
        },
        Shimmer: {
          animate: { opacity: [0.3, 1, 0.3] },
          transition: { duration: actualSpeed * 1.5, repeat: Infinity },
        },
      }
    : {
        Morph: {
          initial: { borderRadius: '50%' },
          animate: { borderRadius: '0%' },
          transition: { duration: actualSpeed * 1.5, repeat: Infinity, repeatType: 'reverse' as const },
        },
        Rotate: {
          initial: { rotate: 0 },
          animate: { rotate: 360 },
          transition: { duration: actualSpeed * 2, repeat: Infinity, ease: 'linear' as const },
        },
        SlideShape: {
          initial: { x: 0, boxShadow: '0 0 0px rgba(255, 5, 110, 0)' },
          animate: { 
            x: [-20 * scale, 20 * scale, -20 * scale],
            boxShadow: ['0 0 0px rgba(255, 5, 110, 0)', '0 0 20px rgba(255, 5, 110, 0.6)', '0 0 0px rgba(255, 5, 110, 0)']
          },
          transition: { duration: actualSpeed * 2, repeat: Infinity },
        },
        GlowPulse: {
          initial: { scale: 1, boxShadow: '0 0 5px rgba(0, 245, 255, 0.3)' },
          animate: {
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 5px rgba(0, 245, 255, 0.3)', '0 0 30px rgba(0, 245, 255, 1)', '0 0 5px rgba(0, 245, 255, 0.3)']
          },
          transition: { duration: actualSpeed * 1.5, repeat: Infinity },
        },
        Rainbow: {
          initial: { borderColor: '#FF006E', scale: 1 },
          animate: {
            borderColor: ['#FF006E', '#00F5FF', '#FFD700', '#FF006E'],
            scale: [1, 1.05, 1]
          },
          transition: { duration: actualSpeed * 3, repeat: Infinity },
        },
      }

  const config = previewVariants[animation.motionBehavior]
  const previewKey = `${animation.id}-${playbackKey}-${speed}-${scale}`
  const previewShapeClassName =
    animation.motionBehavior === 'GlowPulse'
      ? 'bg-cyan-400 rounded-full'
      : animation.motionBehavior === 'Rainbow'
        ? 'border-4 bg-transparent rounded-lg'
        : animation.motionBehavior === 'Rotate'
          ? 'border-2 border-accent-500 border-t-transparent rounded-full bg-transparent'
          : animation.motionBehavior === 'SlideShape'
            ? 'bg-accent-500 rounded-lg'
            : 'bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Side Panel Modal */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-screen w-full md:w-[600px] lg:w-[700px] xl:w-[800px] bg-dark-900 border-l border-dark-700 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-dark-700 px-6 py-4 flex items-center justify-between bg-dark-900/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white truncate">{animation.title}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-shrink-0 p-2 hover:bg-dark-800 rounded-lg transition-smooth ml-4"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Left Column - Preview */}
              <div className="flex-shrink-0 w-1/2 border-r border-dark-700 p-6 flex flex-col items-center justify-center bg-dark-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 w-full">Preview</h3>
                <div className="w-full h-full bg-dark-800 rounded-lg border border-dark-700 overflow-hidden p-8 flex items-center justify-center">
                  {animation?.isText ? (
                    animation.motionBehavior === 'Typing' ? (
                      <motion.div
                        key={`${previewKey}-${typingCycle}`}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.08 / speed,
                              delayChildren: 0.1,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                            },
                          },
                        }}
                        className="flex items-center justify-center"
                      >
                        {'Text'.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: {
                                opacity: 1,
                                y: -8,
                                transition: { duration: 0.3 / speed },
                              },
                            }}
                            className="font-bold text-white"
                            style={{ fontSize: `${28 * scale}px` }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={previewKey}
                        initial={config.initial}
                        animate={config.animate}
                        transition={config.transition}
                        className="font-bold text-white"
                        style={{ 
                          fontSize: `${28 * scale}px`, 
                          lineHeight: '1.2'
                        }}
                      >
                        Animate
                      </motion.div>
                    )
                  ) : (
                    <motion.div
                      key={previewKey}
                      initial={config.initial}
                      animate={config.animate}
                      transition={config.transition}
                      className={previewShapeClassName}
                      style={{ width: actualSize, height: actualSize }}
                    />
                  )}
                </div>
              </div>

              {/* Right Column - Settings, Code, Documentation */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Settings Sliders */}
                <div className="space-y-6 bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Settings</h3>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-white">Speed</label>
                      <span className="text-xs text-dark-400">{speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-accent-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-dark-500 mt-1">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-white">Size</label>
                      <span className="text-xs text-dark-400">{Math.round(actualSize)}px</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full accent-accent-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-dark-500 mt-1">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>

                {/* Code Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Code</h3>
                  <div className="relative">
                    <pre className="bg-dark-800 border border-dark-700 rounded-lg p-3 text-xs text-green-400 overflow-x-auto font-mono max-h-40">
                      {details.code}
                    </pre>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyCode}
                      className="absolute top-2 right-2 px-2 py-1 bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold rounded flex items-center gap-1 transition-smooth"
                    >
                      {copied ? (
                        <>
                          <Check size={14} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Documentation */}
                <div className="space-y-3 pb-6">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Documentation</h3>
                  <p className="text-dark-300 text-xs leading-relaxed">{details.documentation}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-accent-500/20 text-accent-400 rounded border border-accent-500/30">
                      {animation.motionBehavior}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
                      {animation.interactionPattern}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
                      {animation.visualCharacter}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Animation Preview Component
function AnimationPreview({ type, isText }: { type: MotionBehavior; isText?: boolean }) {
  const previewStateKey = `${type}-active`

  // Text animation variants
  if (isText) {
    if (type === 'Typing') {
      return (
        <div className="flex items-center justify-center w-full h-32">
          <TypingPreview />
        </div>
      )
    }

    const textPreviewVariants: Record<string, any> = {
      Slide: {
        animate: { x: [-10, 10, -10] },
        transition: { duration: 1.5, repeat: Infinity },
      },
      Rotate: {
        animate: { rotateY: [0, 360] },
        transition: { duration: 1.5, repeat: Infinity },
      },
      Scale: {
        animate: { x: [-2, 2, -2, 2, 0] },
        transition: { duration: 0.4, repeat: Infinity, repeatDelay: 1 },
      },
      Glow: {
        animate: { textShadow: ['0 0 5px #FF006E', '0 0 20px #FF006E', '0 0 5px #FF006E'] },
        transition: { duration: 2, repeat: Infinity },
      },
      Wave: {
        animate: { y: [0, -8, 0] },
        transition: { duration: 1, repeat: Infinity },
      },
      Gradient: {
        animate: { color: ['#00F5FF', '#FFD700', '#FF006E', '#00F5FF'] },
        transition: { duration: 5, repeat: Infinity },
      },
      Bounce: {
        animate: { y: [0, -10, 0], opacity: [1, 0.6, 1] },
        transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.5 },
      },
      Shimmer: {
        animate: { opacity: [0.3, 1, 0.3] },
        transition: { duration: 1.5, repeat: Infinity },
      },
    }

    const config = textPreviewVariants[type] || textPreviewVariants.Slide

    return (
      <div className="flex items-center justify-center w-full h-32">
        <motion.div
          key={previewStateKey}
          initial={config.initial}
          animate={config.animate}
          transition={config.transition}
          className="font-bold text-white"
          style={{ fontSize: '20px', perspective: '1000px' }}
        >
          Text
        </motion.div>
      </div>
    )
  }

  // Box animation variants
  const boxPreviewVariants = {
    Fade: {
      initial: { opacity: 1 },
      animate: { opacity: 0.3 },
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Slide: {
      initial: { x: -20 },
      animate: { x: 20 },
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Scale: {
      initial: { scale: 1 },
      animate: { scale: 1.2 },
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Morph: {
      initial: { borderRadius: '50%' },
      animate: { borderRadius: '0%' },
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Rotate: {
      initial: { rotate: 0 },
      animate: { rotate: 360 },
      transition: { duration: 2, repeat: Infinity, ease: 'linear' as const },
    },
    SlideShape: {
      initial: { x: 0, boxShadow: '0 0 0px rgba(255, 5, 110, 0)' },
      animate: {
        x: [-20, 20, -20],
        boxShadow: [
          '0 0 0px rgba(255, 5, 110, 0)',
          '0 0 20px rgba(255, 5, 110, 0.6)',
          '0 0 0px rgba(255, 5, 110, 0)',
        ],
      },
      transition: { duration: 2, repeat: Infinity },
    },
    GlowPulse: {
      initial: { scale: 1, boxShadow: '0 0 5px rgba(0, 245, 255, 0.3)' },
      animate: {
        scale: [1, 1.35, 1],
        boxShadow: [
          '0 0 5px rgba(0, 245, 255, 0.3)',
          '0 0 26px rgba(0, 245, 255, 0.95)',
          '0 0 5px rgba(0, 245, 255, 0.3)',
        ],
      },
      transition: { duration: 1.5, repeat: Infinity },
    },
    Rainbow: {
      initial: { borderColor: '#FF006E', scale: 1 },
      animate: {
        borderColor: ['#FF006E', '#00F5FF', '#FFD700', '#FF006E'],
        scale: [1, 1.05, 1],
      },
      transition: { duration: 3, repeat: Infinity },
    },
  }

  const config = boxPreviewVariants[type as keyof typeof boxPreviewVariants] || boxPreviewVariants.Fade
  const shapeClassName =
    type === 'GlowPulse'
      ? 'w-10 h-10 bg-cyan-400 rounded-full'
      : type === 'Rainbow'
        ? 'w-14 h-14 border-4 rounded-lg bg-transparent'
        : 'w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg'

  return (
    <div className="flex items-center justify-center w-full h-32">
      <motion.div
        key={previewStateKey}
        initial={config.initial}
        animate={config.animate}
        transition={config.transition}
        className={shapeClassName}
      />
    </div>
  )
}

function TypingPreview() {
  const text = 'Text'
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const perLetter = 0.3
    const stagger = 0.08
    const delayChildren = 0.1
    const pause = 0.5
    const total = delayChildren + perLetter + stagger * (text.length - 1) + pause
    const id = setInterval(() => setCycle((c) => c + 1), total * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      key={`typing-${cycle}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className="flex items-center justify-center"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: -8,
              transition: { duration: 0.3 },
            },
          }}
          className="font-bold text-white"
          style={{ fontSize: '20px' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// AnimationCard Component
function AnimationCardComponent({
  card,
  isFavorite,
  onToggleFavorite,
  onCardClick,
}: {
  card: AnimationCard
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onCardClick: (animation: AnimationCard) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const isPreviewActive = isHovered || isPressed

  const openCard = () => {
    onCardClick(card)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        setIsPressed(true)
      }}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onKeyDown={(event) => {
        if (event.repeat) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setIsPressed(true)
          openCard()
        }
      }}
      onKeyUp={() => setIsPressed(false)}
      onClick={openCard}
      role="button"
      tabIndex={0}
      className="card-hover group cursor-pointer outline-none focus-visible:border-accent-500/70 focus-visible:ring-2 focus-visible:ring-accent-500/40"
    >
      <div className="p-4 space-y-4">
        {/* Preview Area */}
        <div
          className={`w-full bg-dark-900 rounded-lg border overflow-hidden transition-smooth ${
            isPreviewActive
              ? 'border-accent-500/60 shadow-lg shadow-accent-500/10'
              : 'border-dark-700'
          }`}
        >
          <AnimationPreview type={card.motionBehavior} isText={card.isText} />
        </div>

        {/* Header with Title and Favorite */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-sm leading-snug flex-1">{card.title}</h3>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(card.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="mt-0.5 flex-shrink-0 text-dark-400 hover:text-accent-500 transition-colors"
            type="button"
            aria-label={isFavorite ? `Remove ${card.title} from favorites` : `Add ${card.title} to favorites`}
          >
            <Heart
              size={18}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke={isFavorite ? 'currentColor' : 'currentColor'}
            />
          </motion.button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
            {card.motionBehavior}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
            {card.interactionPattern}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
            {card.visualCharacter}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// FilterSection Component
function FilterSection({
  title,
  options,
  selectedOptions,
  onToggle,
}: {
  title: string
  options: string[]
  selectedOptions: string[]
  onToggle: (option: string) => void
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                selectedOptions.includes(option)
                  ? 'bg-accent-500 border-accent-500'
                  : 'border-dark-500 bg-transparent'
              }`}
            >
              {selectedOptions.includes(option) && (
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </div>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onToggle(option)}
              className="hidden"
            />
            <span className="text-sm text-dark-300 group-hover:text-white transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Sidebar Component
function Sidebar({
  selectedMotion,
  selectedInteraction,
  selectedVisual,
  onMotionToggle,
  onInteractionToggle,
  onVisualToggle,
  onDeselectAll,
}: {
  selectedMotion: string[]
  selectedInteraction: string[]
  selectedVisual: string[]
  onMotionToggle: (option: string) => void
  onInteractionToggle: (option: string) => void
  onVisualToggle: (option: string) => void
  onDeselectAll: () => void
}) {
  const motionBehaviors: MotionBehavior[] = ['Typing', 'Slide', 'Rotate', 'Scale', 'Glow', 'Wave', 'Gradient', 'Bounce', 'Shimmer', 'Morph', 'SlideShape', 'GlowPulse', 'Rainbow']
  const interactionPatterns: InteractionPattern[] = ['Hover', 'Scroll', 'Entrance', 'Exit', 'Loop']
  const visualCharacters: VisualCharacter[] = ['Minimal', 'Organic', 'Geometric', 'Abstract', 'Sharp', 'Text']

  return (
    <div className="space-y-6">
      {/* Filter Sections */}
      <FilterSection
        title="Motion Behaviour"
        options={motionBehaviors}
        selectedOptions={selectedMotion}
        onToggle={onMotionToggle}
      />

      <FilterSection
        title="Interaction Pattern"
        options={interactionPatterns}
        selectedOptions={selectedInteraction}
        onToggle={onInteractionToggle}
      />

      <FilterSection
        title="Visual Character"
        options={visualCharacters}
        selectedOptions={selectedVisual}
        onToggle={onVisualToggle}
      />

      {/* Deselect All */}
      <button
        onClick={onDeselectAll}
        className="w-full px-4 py-2 text-xs font-semibold text-dark-400 hover:text-dark-300 border border-dark-700 rounded-lg transition-smooth hover:border-dark-600"
      >
        Deselect All
      </button>
    </div>
  )
}

// Main Page Component
export default function Home() {
  const [animations, setAnimations] = useState<AnimationCard[]>(SAMPLE_ANIMATIONS)
  const [selectedMotion, setSelectedMotion] = useState<string[]>([])
  const [selectedInteraction, setSelectedInteraction] = useState<string[]>([])
  const [selectedVisual, setSelectedVisual] = useState<string[]>([])
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationCard | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [detailPlaybackKey, setDetailPlaybackKey] = useState(0)

    // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavouritesString = localStorage.getItem("favouriteAnimationSaved");
    if (savedFavouritesString) {
      const savedFavourites: AnimationCard[] = JSON.parse(savedFavouritesString);
      setAnimations((prevAnimations) =>
        prevAnimations.map((anim) => ({
          ...anim,
          isFavorite: savedFavourites.some((savedAnim) => savedAnim.id === anim.id),
        }))
      );
    }
  }, []);


  // Filtered animations
  const filteredAnimations = useMemo(() => {
    return animations.filter((anim) => {
      // Search filter
      if (searchTerm && !anim.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (activeCategory !== 'All' && anim.category !== activeCategory) {
        return false
      }

      // Motion behavior filter
      if (selectedMotion.length > 0 && !selectedMotion.includes(anim.motionBehavior)) {
        return false
      }

      // Interaction pattern filter
      if (selectedInteraction.length > 0 && !selectedInteraction.includes(anim.interactionPattern)) {
        return false
      }

      // Visual character filter
      if (selectedVisual.length > 0 && !selectedVisual.includes(anim.visualCharacter)) {
        return false
      }

      // Favorites filter
      if (onlyFavorites && !anim.isFavorite) {
        return false
      }

      return true
    })
  }, [
    animations,
    selectedMotion,
    selectedInteraction,
    selectedVisual,
    onlyFavorites,
    searchTerm,
    activeCategory,
  ])

const toggleFavorite = (id: string) => {
  setAnimations((prevAnimations) => {
    const updated = prevAnimations.map((anim) =>
      anim.id === id ? { ...anim, isFavorite: !anim.isFavorite } : anim
    );
    saveFavourites(updated);
    return updated;
  });
};
  const handleMotionToggle = (option: string) => {
    setSelectedMotion((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleInteractionToggle = (option: string) => {
    setSelectedInteraction((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleVisualToggle = (option: string) => {
    setSelectedVisual((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleDeselectAll = () => {
    setSelectedMotion([])
    setSelectedInteraction([])
    setSelectedVisual([])
    setOnlyFavorites(false)
    setSearchTerm('')
  }

  const handleOpenDetailModal = (animation: AnimationCard) => {
    setSelectedAnimation(animation)
    setDetailPlaybackKey((key) => key + 1)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setTimeout(() => setSelectedAnimation(null), 300)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ height: '60px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-end justify-between gap-4 h-full">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <img src="/atlas-logo.png" alt="Atlas Logo" style={{ height: '30px', width: 'auto', marginTop: '5px' }} />
            </motion.div>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center justify-center gap-4 flex-1" style={{ marginLeft: '40px' }}>
              {/* Tabs */}
              <div className="flex gap-1 px-3 rounded-lg items-center bg-dark-800 border border-dark-700" style={{ height: '40px' }}>
                {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className="px-4 rounded-lg font-medium text-sm text-white transition-smooth uppercase flex items-center justify-center"
                    style={{
                      fontFamily: 'PP Neue Montreal',
                      padding: '6px 25px',
                      ...(activeCategory === tab ? { backgroundColor: '#ffffff', color: 'black' } : { color: 'white' })
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="ml-auto flex-1 max-w-md">
                <div className="relative h-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 bg-dark-800 border border-dark-700 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 transition-smooth"
                    style={{ fontFamily: 'PP Neue Montreal', borderRadius: '12px', height: '40px' }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-dark-800 rounded-lg transition-smooth"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Tabs & Search */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden space-y-3 pb-4 pt-4"
              >
                {/* Tabs */}
                <div className="flex gap-2 px-3 rounded-lg" style={{ backgroundColor: '#131313', height: '40px' }}>
                  {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveCategory(tab)
                        setMobileMenuOpen(false)
                      }}
                      className="px-3 rounded-lg font-medium text-sm transition-smooth uppercase flex items-center justify-center"
                      style={{
                        fontFamily: 'PP Neue Montreal',
                        padding: '6px 25px',
                        ...(activeCategory === tab ? { backgroundColor: '#1847BD', color: 'white' } : { color: '#666' })
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 bg-dark-800 border border-dark-700 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 transition-smooth"
                    style={{ fontFamily: 'PP Neue Montreal', borderRadius: '12px', height: '40px' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24 bg-dark-800/50 backdrop-blur-xs border border-dark-700 rounded-lg overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
              {/* Favorites - Always Visible */}
              <div className="p-6 flex-shrink-0 border-b border-dark-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-smooth ${
                    onlyFavorites
                      ? 'bg-accent-500 text-white'
                      : 'bg-dark-800 border border-dark-700 text-dark-300 hover:border-accent-500/50'
                  }`}
                >
                  ♥ Favorites
                </motion.button>
              </div>

              {/* Scrollable Filters */}
              <div className="overflow-y-auto flex-1 p-6">
                <Sidebar
                  selectedMotion={selectedMotion}
                  selectedInteraction={selectedInteraction}
                  selectedVisual={selectedVisual}
                  onMotionToggle={handleMotionToggle}
                  onInteractionToggle={handleInteractionToggle}
                  onVisualToggle={handleVisualToggle}
                  onDeselectAll={handleDeselectAll}
                />
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-800 overflow-hidden flex flex-col"
                >
                  {/* Favorites - Always Visible */}
                  <div className="p-6 flex-shrink-0 border-b border-dark-800">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOnlyFavorites(!onlyFavorites)}
                      className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-smooth ${
                        onlyFavorites
                          ? 'bg-accent-500 text-white'
                          : 'bg-dark-800 border border-dark-700 text-dark-300 hover:border-accent-500/50'
                      }`}
                    >
                      ♥ Favorites
                    </motion.button>
                  </div>

                  {/* Scrollable Filters */}
                  <div className="overflow-y-auto flex-1 p-6">
                    <Sidebar
                      selectedMotion={selectedMotion}
                      selectedInteraction={selectedInteraction}
                      selectedVisual={selectedVisual}
                      onMotionToggle={handleMotionToggle}
                      onInteractionToggle={handleInteractionToggle}
                      onVisualToggle={handleVisualToggle}
                      onDeselectAll={handleDeselectAll}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Cards Grid */}
          <section className="md:col-span-3">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredAnimations.length > 0 ? (
                  filteredAnimations.map((anim) => (
                    <AnimationCardComponent
                      key={anim.id}
                      card={anim}
                      isFavorite={anim.isFavorite}
                      onToggleFavorite={toggleFavorite}
                      onCardClick={handleOpenDetailModal}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <p className="text-dark-400">No animations found. Try adjusting your filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Animation Detail Modal */}
      <AnimationDetailModal
        animation={selectedAnimation}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        playbackKey={detailPlaybackKey}
      />

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-500 text-sm">
          <p>© 2024 OWOW Atlas. Professional animation library for creative professionals.</p>
        </div>
      </footer>
    </div>
  )
}
