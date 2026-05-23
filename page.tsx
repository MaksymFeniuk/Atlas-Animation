'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Heart } from 'lucide-react'

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
}: {
  card: AnimationCard
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="card-hover group"
    >
      <div className="p-4 space-y-4">
        {/* Preview Area */}
        <div className="w-full bg-dark-900 rounded-lg border border-dark-700 overflow-hidden">
          <AnimationPreview type={card.motionBehavior} />
        </div>

        {/* Header with Title and Favorite */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-sm leading-snug flex-1">{card.title}</h3>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleFavorite(card.id)}
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

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-dark-800 bg-dark-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-12 flex items-center"
            >
              <img
                src="/atlas-logo.png"
                alt="OWOW Atlas"
                className="h-full w-auto"
              />
            </motion.div>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center gap-6 flex-1 ml-32">
              {/* Tabs */}
              <div className="flex gap-1">
                {(['All', 'Website', 'Mobile'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
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
                className="md:hidden space-y-3 pb-4"
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

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-500 text-sm">
          <p>© 2024 OWOW Atlas. Professional animation library for creative professionals.</p>
        </div>
      </footer>
    </div>
  )
}
