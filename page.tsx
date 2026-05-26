'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Heart, Copy, Check } from 'lucide-react'

// Types
type MotionBehavior = 'Fade' | 'Slide' | 'Scale' | 'Morph' | 'Rotate'
type InteractionPattern = 'Hover' | 'Scroll' | 'Entrance' | 'Exit' | 'Loop'
type VisualCharacter = 'Minimal' | 'Organic' | 'Geometric' | 'Abstract' | 'Sharp'
type Category = 'All' | 'Website' | 'Mobile'

interface AnimationCard {
  id: string
  title: string
  category: 'Website' | 'Mobile'
  motionBehavior: MotionBehavior
  interactionPattern: InteractionPattern
  visualCharacter: VisualCharacter
  isFavorite: boolean
}

// Sample data
const SAMPLE_ANIMATIONS: AnimationCard[] = [
  {
    id: '1',
    title: 'Fade Button Hover',
    category: 'Website',
    motionBehavior: 'Fade',
    interactionPattern: 'Hover',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Slide Menu Open',
    category: 'Website',
    motionBehavior: 'Slide',
    interactionPattern: 'Entrance',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Scale Icon Click',
    category: 'Mobile',
    motionBehavior: 'Scale',
    interactionPattern: 'Hover',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Morph Shape Transition',
    category: 'Website',
    motionBehavior: 'Morph',
    interactionPattern: 'Scroll',
    visualCharacter: 'Organic',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Rotate Loading Spinner',
    category: 'Website',
    motionBehavior: 'Rotate',
    interactionPattern: 'Loop',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Fade Card Entrance',
    category: 'Mobile',
    motionBehavior: 'Fade',
    interactionPattern: 'Entrance',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Scale Popup Modal',
    category: 'Website',
    motionBehavior: 'Scale',
    interactionPattern: 'Entrance',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Slide Sidebar Navigation',
    category: 'Mobile',
    motionBehavior: 'Slide',
    interactionPattern: 'Hover',
    visualCharacter: 'Sharp',
    isFavorite: false,
  },
  {
    id: '9',
    title: 'Morph Abstract Shape',
    category: 'Website',
    motionBehavior: 'Morph',
    interactionPattern: 'Hover',
    visualCharacter: 'Abstract',
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Rotate Badge Indicator',
    category: 'Mobile',
    motionBehavior: 'Rotate',
    interactionPattern: 'Scroll',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '11',
    title: 'Fade Background Blur',
    category: 'Website',
    motionBehavior: 'Fade',
    interactionPattern: 'Exit',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Slide List Item Remove',
    category: 'Mobile',
    motionBehavior: 'Slide',
    interactionPattern: 'Exit',
    visualCharacter: 'Minimal',
    isFavorite: false,
  },
  {
    id: '13',
    title: 'Scale Text Emphasis',
    category: 'Website',
    motionBehavior: 'Scale',
    interactionPattern: 'Scroll',
    visualCharacter: 'Sharp',
    isFavorite: false,
  },
  {
    id: '14',
    title: 'Organic Blob Movement',
    category: 'Website',
    motionBehavior: 'Morph',
    interactionPattern: 'Loop',
    visualCharacter: 'Organic',
    isFavorite: false,
  },
  {
    id: '15',
    title: 'Geometric Pattern Rotate',
    category: 'Mobile',
    motionBehavior: 'Rotate',
    interactionPattern: 'Entrance',
    visualCharacter: 'Geometric',
    isFavorite: false,
  },
]

// Animation documentation and code
const ANIMATION_DETAILS: Record<string, { code: string; documentation: string; defaultSpeed: number; defaultSize: number }> = {
  '1': {
    code: `<motion.button
  initial={{ opacity: 1 }}
  whileHover={{ opacity: 0.3 }}
  transition={{ duration: 0.3 }}
>
  Hover Me
</motion.button>`,
    documentation: 'A smooth fade effect on hover. Perfect for button interactions and UI feedback.',
    defaultSpeed: 0.3,
    defaultSize: 48,
  },
  '2': {
    code: `<motion.div
  initial={{ x: -300 }}
  animate={{ x: 0 }}
  transition={{ duration: 0.5 }}
>
  Sliding Menu
</motion.div>`,
    documentation: 'Slides in from the left. Ideal for menu and sidebar animations.',
    defaultSpeed: 0.5,
    defaultSize: 64,
  },
  '3': {
    code: `<motion.button
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Icon
</motion.button>`,
    documentation: 'Scales up on hover, great for interactive icons and call-to-action buttons.',
    defaultSpeed: 0.2,
    defaultSize: 40,
  },
  '4': {
    code: `<motion.div
  initial={{ borderRadius: '50%' }}
  whileHover={{ borderRadius: '0%' }}
  transition={{ duration: 0.5 }}
  className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600"
/>`,
    documentation: 'Morphs between circle and square. Creates organic shape transitions.',
    defaultSpeed: 0.5,
    defaultSize: 80,
  },
  '5': {
    code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
  className="w-8 h-8 border-2 border-accent-500 rounded-full border-t-transparent"
/>`,
    documentation: 'Continuous rotation. Perfect for loading spinners and circular progress.',
    defaultSpeed: 2,
    defaultSize: 32,
  },
  '6': {
    code: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Card Content
</motion.div>`,
    documentation: 'Fades in while sliding up. Elegant entrance for cards and content blocks.',
    defaultSpeed: 0.4,
    defaultSize: 100,
  },
  '7': {
    code: `<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.3, type: 'spring' }}
>
  Modal Content
</motion.div>`,
    documentation: 'Pops in with a spring effect. Great for modals and popup animations.',
    defaultSpeed: 0.3,
    defaultSize: 120,
  },
  '8': {
    code: `<motion.div
  initial={{ x: 0 }}
  whileHover={{ x: 10 }}
  transition={{ duration: 0.3 }}
>
  Navigation Item
</motion.div>`,
    documentation: 'Slides horizontally on interaction. Perfect for navigation menus.',
    defaultSpeed: 0.3,
    defaultSize: 60,
  },
  '9': {
    code: `<motion.svg
  initial={{ d: 'path1' }}
  animate={{ d: 'path2' }}
  transition={{ duration: 1 }}
/>`,
    documentation: 'Abstract SVG morphing animation. Ideal for creative, artistic transitions.',
    defaultSpeed: 1,
    defaultSize: 100,
  },
  '10': {
    code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="w-6 h-6 rounded-full bg-accent-500"
/>`,
    documentation: 'Rotates badges and indicators. Works well for notification badges.',
    defaultSpeed: 1.5,
    defaultSize: 24,
  },
  '11': {
    code: `<motion.div
  initial={{ opacity: 1 }}
  animate={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  className="fixed inset-0 bg-black"
/>`,
    documentation: 'Fades out a backdrop or overlay. Perfect for closing animations.',
    defaultSpeed: 0.5,
    defaultSize: 100,
  },
  '12': {
    code: `<motion.div
  initial={{ x: 0 }}
  exit={{ x: 300, opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  List Item
</motion.div>`,
    documentation: 'Slides out to the right when removed. Great for swipe delete animations.',
    defaultSpeed: 0.3,
    defaultSize: 80,
  },
  '13': {
    code: `<motion.span
  initial={{ scale: 1 }}
  whileInView={{ scale: 1.1 }}
  transition={{ duration: 0.4 }}
>
  Emphasized Text
</motion.span>`,
    documentation: 'Scales text for emphasis. Perfect for highlighting important information.',
    defaultSpeed: 0.4,
    defaultSize: 48,
  },
  '14': {
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
  '15': {
    code: `<motion.svg
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
>
  <circle cx="50" cy="50" r="45" />
</motion.svg>`,
    documentation: 'Rotates geometric patterns. Great for decorative and interactive elements.',
    defaultSpeed: 2,
    defaultSize: 100,
  },
}

// Animation Detail Modal Component
function AnimationDetailModal({
  animation,
  isOpen,
  onClose,
}: {
  animation: AnimationCard | null
  isOpen: boolean
  onClose: () => void
}) {
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)
  const [copied, setCopied] = useState(false)

  const details = animation ? ANIMATION_DETAILS[animation.id] : null

  if (!animation || !details) return null

  const copyCode = () => {
    navigator.clipboard.writeText(details.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const actualSpeed = details.defaultSpeed / speed
  const actualSize = details.defaultSize * scale

  const previewVariants = {
    Fade: {
      initial: { opacity: 1 },
      animate: { opacity: 0.3 },
      transition: { duration: actualSpeed * 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Slide: {
      initial: { x: -20 * scale },
      animate: { x: 20 * scale },
      transition: { duration: actualSpeed * 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Scale: {
      initial: { scale: 1 },
      animate: { scale: 1.2 },
      transition: { duration: actualSpeed * 1.5, repeat: Infinity, repeatType: 'reverse' as const },
    },
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
  }

  const config = previewVariants[animation.motionBehavior]

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
                  <motion.div
                    key={`${speed}-${scale}`}
                    initial={config.initial}
                    animate={config.animate}
                    transition={config.transition}
                    className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg"
                    style={{ width: actualSize, height: actualSize }}
                  />
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
function AnimationPreview({ type }: { type: MotionBehavior }) {
  const previewVariants = {
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
  }

  const config = previewVariants[type]

  return (
    <div className="flex items-center justify-center w-full h-32">
      <motion.div
        initial={config.initial}
        animate={config.animate}
        transition={config.transition}
        className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg"
      />
    </div>
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={() => onCardClick(card)}
      className="card-hover group cursor-pointer"
    >
      <div className="p-4 space-y-4">
        {/* Preview Area */}
        <div className="w-full bg-dark-900 rounded-lg border border-dark-700 overflow-hidden hover:border-accent-500/50 transition-smooth">
          <AnimationPreview type={card.motionBehavior} />
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
            className="mt-0.5 flex-shrink-0 text-dark-400 hover:text-accent-500 transition-colors"
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
  const motionBehaviors: MotionBehavior[] = ['Fade', 'Slide', 'Scale', 'Morph', 'Rotate']
  const interactionPatterns: InteractionPattern[] = ['Hover', 'Scroll', 'Entrance', 'Exit', 'Loop']
  const visualCharacters: VisualCharacter[] = ['Minimal', 'Organic', 'Geometric', 'Abstract', 'Sharp']

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
    setAnimations((prevAnimations) =>
      prevAnimations.map((anim) =>
        anim.id === id ? { ...anim, isFavorite: !anim.isFavorite } : anim
      )
    )
  }

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
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setTimeout(() => setSelectedAnimation(null), 300)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-dark-800 backdrop-blur-md" style={{ backgroundColor: '#101012', height: '100px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between gap-4 h-full">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <svg width="162" height="34" viewBox="0 0 162 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '20px' }}>
                <path d="M29.6756 29.1184C26.3302 32.3786 22.2118 33.9903 17.3576 33.9903C12.4663 33.9903 8.34798 32.3786 5.03768 29.1184C1.65515 25.8582 0 21.832 0 16.9951C0 12.1583 1.65515 8.13014 5.00059 4.87186C8.34798 1.61164 12.4663 0 17.3557 0C22.2489 0 26.3673 1.61164 29.6756 4.87186C33.023 8.13208 34.6782 12.1622 34.6782 16.9951C34.6782 21.8301 33.023 25.8601 29.6756 29.1184ZM27.1773 16.9951C27.1773 14.0654 26.2209 11.575 24.3432 9.48711C22.4695 7.39917 20.1156 6.37269 17.3557 6.37269C14.5997 6.37269 12.2809 7.39917 10.3701 9.48711C8.49632 11.575 7.53992 14.0654 7.53992 16.9951C7.53992 19.9249 8.49632 22.4152 10.3701 24.4662C12.2438 26.5172 14.5997 27.5437 17.3576 27.5437C20.1156 27.5437 22.4324 26.5192 24.3452 24.4682C26.2189 22.4522 27.1773 19.9618 27.1773 16.9951ZM45.9656 19.6682L51.8113 0.732918H59.4977L65.3083 19.6682L71.8898 0.732918H79.8709L68.3609 33.6248H62.8802L55.6389 10.7683L48.4679 33.6248H42.9891L31.4791 0.769855H39.4582L45.9656 19.6682ZM106.347 29.1184C103 32.3786 98.8817 33.9903 94.0275 33.9903C89.1382 33.9903 85.0178 32.3786 81.7095 29.1184C78.3621 25.8582 76.7069 21.8301 76.7069 16.9951C76.7069 12.1602 78.3621 8.13014 81.7095 4.87186C85.0198 1.61164 89.1401 0 94.0294 0C98.9188 0 103.039 1.61164 106.349 4.87186C109.695 8.13208 111.35 12.1622 111.35 16.9951C111.35 21.8301 109.693 25.8601 106.347 29.1184ZM103.849 16.9951C103.849 14.0654 102.893 11.575 101.017 9.48711C99.1432 7.39917 96.7874 6.37269 94.0294 6.37269C91.2715 6.37269 88.9547 7.39917 87.0419 9.48711C85.1681 11.575 84.2117 14.0654 84.2117 16.9951C84.2117 19.9249 85.1681 22.4152 87.0419 24.4662C88.9176 26.5172 91.2715 27.5437 94.0294 27.5437C96.7874 27.5437 99.1042 26.5192 101.017 24.4682C102.891 22.4522 103.849 19.9618 103.849 16.9951ZM122.637 19.6682L128.489 0.732918H136.175L141.984 19.6682L148.567 0.732918H156.547L145 33.6248H139.521L132.274 10.7683L125.103 33.6248H119.624L108.151 0.769855H116.13L122.637 19.6682ZM151.585 28.8151C151.585 31.7935 153.878 34 156.781 34C159.709 34 162 31.7935 162 28.8151C162 25.8349 159.707 23.6283 156.781 23.6283C153.878 23.6283 151.585 25.8349 151.585 28.8151ZM160.973 28.8151C160.973 31.323 159.183 33.1213 156.781 33.1213C154.402 33.1213 152.612 31.3211 152.612 28.8151C152.612 26.3073 154.402 24.5071 156.781 24.5071C159.182 24.5071 160.973 26.3073 160.973 28.8151ZM154.599 25.9418V31.6438H156.039V29.6278H156.586C157.542 29.6278 157.601 30.4773 157.644 31.0819C157.663 31.3463 157.677 31.5641 157.765 31.6438H159.228V31.5796C159.123 31.5446 159.098 31.3016 159.064 30.977C158.996 30.2868 158.891 29.2312 157.893 29.0718V29.0504C158.616 28.8793 159.117 28.4088 159.117 27.6137C159.117 26.5425 158.397 25.9418 157.021 25.9418H154.599ZM156.65 28.4924H156.039V27.0149H156.65C157.218 27.0149 157.743 27.1218 157.743 27.742C157.743 28.3641 157.218 28.4924 156.65 28.4924Z" fill="white"/>
              </svg>
              <div className="text-xs font-bold font-13 text-white tracking-wider mt-0" style={{ fontFamily: 'PP Neue Montreal', marginLeft: '90px' }}>ATLAS</div>
            </motion.div>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center justify-center gap-4 flex-1" style={{ marginLeft: '40px' }}>
              {/* Tabs */}
              <div className="flex gap-1 px-3 rounded-lg items-center" style={{ backgroundColor: '#131313', height: '40px' }}>
                {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className="px-4 rounded-lg font-medium text-sm transition-smooth uppercase flex items-center justify-center"
                    style={{
                      fontFamily: 'PP Neue Montreal',
                      padding: '6px 25px',
                      ...(activeCategory === tab ? { backgroundColor: '#1847BD', color: 'white' } : { color: '#white' })
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
