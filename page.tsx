'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Heart, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react'

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

function saveFavourites(animations: AnimationCard[]) {
  const favourites = animations.filter((anim) => anim.isFavorite === true);
  const favouritesString = JSON.stringify(favourites);
  localStorage.setItem("favouriteAnimationSaved", favouritesString);
}

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
                    <span className="px-2 py-1 text-xs font-medium bg-dark-700 text-dark-300 rounded border border-dark-600">
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
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wide">{title}</h3>
      <div className="space-y-1">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className={`flex-shrink-0 w-3 h-3  border-2 transition-all duration-200 flex items-center justify-center ${selectedOptions.includes(option)
                ? 'bg-dark-200 border-dark-200'
                : 'border-dark-500 bg-transparent'
                }`}
            >
              {selectedOptions.includes(option) && (
                <div className="w-1.5 h-1.5 "></div>
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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
        <div className={`flex transition-all duration-300 ${isSidebarCollapsed ? 'gap-4' : 'gap-8'}`}>
          {/* Desktop Sidebar */}
          <motion.aside
            animate={{ width: isSidebarCollapsed ? 0 : 280 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="hidden md:block shrink-0 relative"
          >
            <div className="sticky top-24">
              {/* Collapse Button */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                aria-label={isSidebarCollapsed ? 'Open sidebar' : 'Collapse sidebar'}
                className="absolute -right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-dark-700 bg-dark-900 text-dark-300 hover:text-white hover:border-dark-500 transition-smooth"
              >
                {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>

              <AnimatePresence initial={false}>
                {!isSidebarCollapsed && (
                  <motion.div
                    key="sidebar-content"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="bg-dark-800/50 backdrop-blur-xs border border-dark-700 rounded-lg overflow-hidden flex flex-col max-h-[calc(100vh-120px)]"
                  >
                    {/* Favorites - Always Visible */}
                    <div className="p-5 flex-shrink-0 border-b border-dark-700">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setOnlyFavorites(!onlyFavorites)}
                        className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-smooth ${onlyFavorites
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
                )}
              </AnimatePresence>
            </div>
          </motion.aside>

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
                  {/* Favorites - Always Visible */ }
                    < div className="flex-shrink-0 border-b border-dark-700">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOnlyFavorites(!onlyFavorites)}
                    className={`w-full px-4 py-6 rounded-lg font-semibold text-sm transition-smooth ${onlyFavorites
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
        <section className="flex-1 min-w-1">
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
      </main >

    {/* Animation Detail Modal */ }
    < AnimationDetailModal
  animation = { selectedAnimation }
  isOpen = { isDetailModalOpen }
  onClose = { handleCloseDetailModal }
    />

    {/* Footer */ }
    < footer className = "border-t border-dark-800 mt-16 py-8" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-500 text-sm">
        <p>© 2024 OWOW Atlas. Professional animation library for creative professionals.</p>
      </div>
      </footer >
    </div >
  )
}
