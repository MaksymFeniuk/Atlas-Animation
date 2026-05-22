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

  const actualSpeed = details.defaultSpeed * speed
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
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Preview Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                  <div className="w-full bg-dark-800 rounded-lg border border-dark-700 overflow-hidden p-8 flex items-center justify-center h-64">
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

                {/* Settings Sliders */}
                <div className="space-y-6 bg-dark-800/50 p-4 rounded-lg border border-dark-700">
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
                  <h3 className="text-lg font-semibold text-white">Code</h3>
                  <div className="relative">
                    <pre className="bg-dark-800 border border-dark-700 rounded-lg p-4 text-sm text-green-400 overflow-x-auto font-mono max-h-48">
                      {details.code}
                    </pre>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyCode}
                      className="absolute top-3 right-3 px-3 py-1.5 bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-smooth"
                    >
                      {copied ? (
                        <>
                          <Check size={16} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Documentation */}
                <div className="space-y-3 pb-6">
                  <h3 className="text-lg font-semibold text-white">Documentation</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{details.documentation}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-accent-500/20 text-accent-400 rounded border border-accent-500/30">
                      {animation.motionBehavior}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
                      {animation.interactionPattern}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
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
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onToggle(option)}
              className="w-4 h-4 rounded border-dark-600 bg-dark-700 cursor-pointer accent-accent-500"
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
  onlyFavorites,
  onMotionToggle,
  onInteractionToggle,
  onVisualToggle,
  onFavoritesToggle,
  onDeselectAll,
}: {
  selectedMotion: string[]
  selectedInteraction: string[]
  selectedVisual: string[]
  onlyFavorites: boolean
  onMotionToggle: (option: string) => void
  onInteractionToggle: (option: string) => void
  onVisualToggle: (option: string) => void
  onFavoritesToggle: () => void
  onDeselectAll: () => void
}) {
  const motionBehaviors: MotionBehavior[] = ['Fade', 'Slide', 'Scale', 'Morph', 'Rotate']
  const interactionPatterns: InteractionPattern[] = ['Hover', 'Scroll', 'Entrance', 'Exit', 'Loop']
  const visualCharacters: VisualCharacter[] = ['Minimal', 'Organic', 'Geometric', 'Abstract', 'Sharp']

  return (
    <div className="space-y-6">
      {/* Favorites */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onFavoritesToggle}
        className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-smooth ${
          onlyFavorites
            ? 'bg-accent-500 text-white'
            : 'bg-dark-800 border border-dark-700 text-dark-300 hover:border-accent-500/50'
        }`}
      >
        ♥ Favorites
      </motion.button>

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
      <header className="sticky top-0 z-40 border-b border-dark-800 bg-dark-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent"
            >
              OWOW Atlas
            </motion.div>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center gap-6 flex-1">
              {/* Tabs */}
              <div className="flex gap-1">
                {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${
                      activeCategory === tab
                        ? 'bg-accent-500 text-white'
                        : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="ml-auto flex-1 max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search animations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 transition-smooth"
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
                className="md:hidden space-y-3"
              >
                {/* Tabs */}
                <div className="flex gap-2">
                  {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveCategory(tab)
                        setMobileMenuOpen(false)
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-smooth ${
                        activeCategory === tab
                          ? 'bg-accent-500 text-white'
                          : 'text-dark-400 hover:text-white'
                      }`}
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
                    placeholder="Search animations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 transition-smooth"
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
            <div className="sticky top-24 p-6 bg-dark-800/50 backdrop-blur-xs border border-dark-700 rounded-lg">
              <Sidebar
                selectedMotion={selectedMotion}
                selectedInteraction={selectedInteraction}
                selectedVisual={selectedVisual}
                onlyFavorites={onlyFavorites}
                onMotionToggle={handleMotionToggle}
                onInteractionToggle={handleInteractionToggle}
                onVisualToggle={handleVisualToggle}
                onFavoritesToggle={() => setOnlyFavorites(!onlyFavorites)}
                onDeselectAll={handleDeselectAll}
              />
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
                  className="absolute left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-800 p-6 overflow-y-auto"
                >
                  <Sidebar
                    selectedMotion={selectedMotion}
                    selectedInteraction={selectedInteraction}
                    selectedVisual={selectedVisual}
                    onlyFavorites={onlyFavorites}
                    onMotionToggle={handleMotionToggle}
                    onInteractionToggle={handleInteractionToggle}
                    onVisualToggle={handleVisualToggle}
                    onFavoritesToggle={() => setOnlyFavorites(!onlyFavorites)}
                    onDeselectAll={handleDeselectAll}
                  />
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
