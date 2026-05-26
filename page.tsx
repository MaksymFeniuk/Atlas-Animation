'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, ArrowLeft, Check, Copy, Heart, Menu, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'

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

interface AnimationParameters {
  duration: string
  opacity: string
  distance: string
  scale: string
  rotation: string
  borderRadius: string
}

interface ValidatedParameters {
  values: {
    duration: number
    opacity: number
    distance: number
    scale: number
    rotation: number
    borderRadius: number
  }
  errors: Partial<Record<keyof AnimationParameters, string>>
}

const DEFAULT_PARAMETERS: AnimationParameters = {
  duration: '1.5',
  opacity: '0.3',
  distance: '40',
  scale: '1.2',
  rotation: '360',
  borderRadius: '8',
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

function validateParameters(params: AnimationParameters): ValidatedParameters {
  const specs: Record<keyof AnimationParameters, { min: number; max: number; label: string }> = {
    duration: { min: 0.1, max: 10, label: 'Duration' },
    opacity: { min: 0, max: 1, label: 'Opacity' },
    distance: { min: 0, max: 200, label: 'Distance' },
    scale: { min: 0.2, max: 3, label: 'Scale' },
    rotation: { min: -1080, max: 1080, label: 'Rotation' },
    borderRadius: { min: 0, max: 50, label: 'Radius' },
  }

  const fallbackValues = {
    duration: Number(DEFAULT_PARAMETERS.duration),
    opacity: Number(DEFAULT_PARAMETERS.opacity),
    distance: Number(DEFAULT_PARAMETERS.distance),
    scale: Number(DEFAULT_PARAMETERS.scale),
    rotation: Number(DEFAULT_PARAMETERS.rotation),
    borderRadius: Number(DEFAULT_PARAMETERS.borderRadius),
  }
  const values = { ...fallbackValues }
  const errors: ValidatedParameters['errors'] = {}

  ;(Object.keys(specs) as Array<keyof AnimationParameters>).forEach((key) => {
    const rawValue = params[key].trim()
    const numericValue = Number(rawValue)
    const spec = specs[key]

    if (rawValue === '' || Number.isNaN(numericValue)) {
      errors[key] = `${spec.label} must be a number.`
      return
    }

    if (numericValue < spec.min || numericValue > spec.max) {
      errors[key] = `${spec.label} must be between ${spec.min} and ${spec.max}.`
      return
    }

    values[key] = numericValue
  })

  return { values, errors }
}

// Animation Preview Component
function AnimationPreview({
  type,
  parameters = DEFAULT_PARAMETERS,
  large = false,
}: {
  type: MotionBehavior
  parameters?: AnimationParameters
  large?: boolean
}) {
  const { values } = validateParameters(parameters)
  const previewVariants = {
    Fade: {
      initial: { opacity: 1 },
      animate: { opacity: values.opacity },
      transition: { duration: values.duration, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Slide: {
      initial: { x: -values.distance },
      animate: { x: values.distance },
      transition: { duration: values.duration, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Scale: {
      initial: { scale: 1 },
      animate: { scale: values.scale },
      transition: { duration: values.duration, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Morph: {
      initial: { borderRadius: '50%' },
      animate: { borderRadius: `${values.borderRadius}%` },
      transition: { duration: values.duration, repeat: Infinity, repeatType: 'reverse' as const },
    },
    Rotate: {
      initial: { rotate: 0 },
      animate: { rotate: values.rotation },
      transition: { duration: values.duration, repeat: Infinity, ease: 'linear' as const },
    },
  }

  const config = previewVariants[type]

  return (
    <div className={`flex items-center justify-center w-full ${large ? 'h-80' : 'h-32'}`}>
      <motion.div
        initial={config.initial}
        animate={config.animate}
        transition={config.transition}
        className={`${large ? 'w-28 h-28' : 'w-12 h-12'} bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg`}
      />
    </div>
  )
}



// AnimationCard Component
function AnimationCardComponent({
  card,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  card: AnimationCard
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onSelect: (id: string) => void
}) {
  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      onClick={() => onSelect(card.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(card.id)
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="card-hover group cursor-pointer"
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
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(card.id)

            }}
            className="mt-0.5 flex-shrink-0 text-dark-400 hover:text-accent-500 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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

function getAnimationCode(card: AnimationCard, params: AnimationParameters) {
  const { values, errors } = validateParameters(params)

  if (Object.keys(errors).length > 0) {
    return 'Fix invalid inputs to generate copyable code.'
  }

  const transition =
    card.motionBehavior === 'Rotate'
      ? `transition={{ duration: ${values.duration}, repeat: Infinity, ease: 'linear' }}`
      : `transition={{ duration: ${values.duration}, repeat: Infinity, repeatType: 'reverse' }}`

  const motionProps = {
    Fade: `initial={{ opacity: 1 }}
      animate={{ opacity: ${values.opacity} }}`,
    Slide: `initial={{ x: -${values.distance} }}
      animate={{ x: ${values.distance} }}`,
    Scale: `initial={{ scale: 1 }}
      animate={{ scale: ${values.scale} }}`,
    Morph: `initial={{ borderRadius: '50%' }}
      animate={{ borderRadius: '${values.borderRadius}%' }}`,
    Rotate: `initial={{ rotate: 0 }}
      animate={{ rotate: ${values.rotation} }}`,
  }

  return `import { motion } from 'framer-motion'

export default function ${card.motionBehavior}Animation() {
  return (
    <motion.div
      ${motionProps[card.motionBehavior]}
      ${transition}
      className="h-16 w-16 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600"
    />
  )
}`
}

function ParameterInput({
  id,
  label,
  unit,
  value,
  error,
  min,
  max,
  step,
  onChange,
}: {
  id: keyof AnimationParameters
  label: string
  unit: string
  value: string
  error?: string
  min: number
  max: number
  step: number
  onChange: (id: keyof AnimationParameters, value: string) => void
}) {
  const numericValue = Number(value)
  const sliderValue = Number.isFinite(numericValue) ? Math.min(Math.max(numericValue, min), max) : min

  return (
    <div className="rounded-lg border border-dark-700 bg-dark-900/70 p-4">
      <label className="block space-y-3">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-white">{label}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-dark-400">{unit}</span>
        </span>

        <div className="grid grid-cols-[minmax(0,1fr)_88px] items-center gap-3">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={(event) => onChange(id, event.target.value)}
            className="h-2 w-full cursor-pointer accent-accent-500"
          />
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(id, event.target.value)}
            className={`h-10 w-full rounded-lg border bg-dark-800 px-3 text-sm font-semibold text-white outline-none transition-smooth ${
              error ? 'border-red-500 focus:border-red-400' : 'border-dark-600 focus:border-accent-500/60'
            }`}
          />
        </div>
      </label>

      <div className="mt-2 flex items-center justify-between text-xs text-dark-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  )
}

function AnimationDetail({
  card,
  onBack,
  onToggleFavorite,
}: {
  card: AnimationCard
  onBack: () => void
  onToggleFavorite: (id: string) => void
}) {
  const [parameters, setParameters] = useState<AnimationParameters>(DEFAULT_PARAMETERS)
  const [copied, setCopied] = useState(false)
  const validation = useMemo(() => validateParameters(parameters), [parameters])
  const code = useMemo(() => getAnimationCode(card, parameters), [card, parameters])
  const errorCount = Object.keys(validation.errors).length
  const hasErrors = errorCount > 0
  const parameterFields: Record<
    keyof AnimationParameters,
    { label: string; unit: string; min: number; max: number; step: number }
  > = {
    duration: { label: 'Duration', unit: 'seconds', min: 0.1, max: 10, step: 0.1 },
    opacity: { label: 'Fade opacity', unit: '0 to 1', min: 0, max: 1, step: 0.1 },
    distance: { label: 'Slide distance', unit: 'pixels', min: 0, max: 200, step: 1 },
    scale: { label: 'Scale target', unit: 'ratio', min: 0.2, max: 3, step: 0.1 },
    rotation: { label: 'Rotation', unit: 'degrees', min: -1080, max: 1080, step: 15 },
    borderRadius: { label: 'Morph radius', unit: 'percent', min: 0, max: 50, step: 1 },
  }
  const visibleParameterIds: Array<keyof AnimationParameters> = useMemo(() => {
    const parameterByMotion: Record<MotionBehavior, Array<keyof AnimationParameters>> = {
      Fade: ['duration', 'opacity'],
      Slide: ['duration', 'distance'],
      Scale: ['duration', 'scale'],
      Morph: ['duration', 'borderRadius'],
      Rotate: ['duration', 'rotation'],
    }

    return parameterByMotion[card.motionBehavior]
  }, [card.motionBehavior])

  const updateParameter = (id: keyof AnimationParameters, value: string) => {
    setParameters((current) => ({ ...current, [id]: value }))
    setCopied(false)
  }

  const resetParameters = () => {
    setParameters(DEFAULT_PARAMETERS)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (hasErrors) {
      return
    }

    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          onClick={onBack}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-dark-700 bg-dark-800 px-3 py-2 text-sm font-semibold text-dark-300 transition-smooth hover:border-dark-600 hover:text-white"
        >
          <ArrowLeft size={16} />
          Library
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
              hasErrors
                ? 'border-red-500/40 bg-red-500/10 text-red-300'
                : 'border-dark-700 bg-dark-800 text-dark-300'
            }`}
          >
            {hasErrors ? <AlertCircle size={14} /> : <Check size={14} />}
            {hasErrors ? `${errorCount} error${errorCount === 1 ? '' : 's'}` : 'Ready'}
          </span>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleFavorite(card.id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dark-700 bg-dark-800 text-dark-400 transition-colors hover:border-accent-500/60 hover:text-accent-500"
            aria-label={card.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={card.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <section className="overflow-hidden rounded-lg border border-dark-700 bg-dark-800/50">
          <div className="border-b border-dark-700 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-white">{card.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded border border-dark-600 bg-dark-700 px-3 py-1 text-xs font-semibold text-dark-300">
                    {card.motionBehavior}
                  </span>
                  <span className="rounded border border-dark-600 bg-dark-700 px-3 py-1 text-xs font-semibold text-dark-300">
                    {card.interactionPattern}
                  </span>
                  <span className="rounded border border-dark-600 bg-dark-700 px-3 py-1 text-xs font-semibold text-dark-300">
                    {card.visualCharacter}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left sm:grid-cols-4 lg:grid-cols-2">
                <div className="rounded-lg border border-dark-700 bg-dark-900 px-3 py-2">
                  <div className="text-xs font-medium uppercase tracking-wide text-dark-400">Duration</div>
                  <div className="mt-1 text-sm font-semibold text-white">{parameters.duration}s</div>
                </div>
                <div className="rounded-lg border border-dark-700 bg-dark-900 px-3 py-2">
                  <div className="text-xs font-medium uppercase tracking-wide text-dark-400">Type</div>
                  <div className="mt-1 text-sm font-semibold text-white">{card.category}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 p-4 sm:p-6">
            <div className="overflow-hidden rounded-lg border border-dark-700 bg-black/40">
              <AnimationPreview type={card.motionBehavior} parameters={parameters} large />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-dark-700 bg-dark-800/50 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <SlidersHorizontal size={18} />
              Parameters
            </h3>
            <button
              onClick={resetParameters}
              className="inline-flex items-center gap-2 rounded-lg border border-dark-700 px-3 py-2 text-sm font-semibold text-dark-300 transition-smooth hover:border-dark-600 hover:text-white"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {visibleParameterIds.map((id) => {
              const field = parameterFields[id]

              return (
                <ParameterInput
                  key={id}
                  id={id}
                  label={field.label}
                  unit={field.unit}
                  value={parameters[id]}
                  error={validation.errors[id]}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  onChange={updateParameter}
                />
              )
            })}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-dark-700 bg-dark-800/50">
        <div className="flex flex-col gap-4 border-b border-dark-700 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Copy Code</h3>
            <p className="mt-1 text-sm text-dark-400">{card.motionBehavior}Animation.tsx</p>
          </div>
          <button
            onClick={handleCopy}
            disabled={hasErrors}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-dark-700 bg-dark-900 px-3 py-2 text-sm font-semibold text-dark-300 transition-smooth hover:border-accent-500/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {hasErrors && (
          <div className="mx-5 mt-5 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 sm:mx-6">
            <AlertCircle size={16} />
            Fix the highlighted fields before copying this animation.
          </div>
        )}

        <pre className="max-h-[460px] overflow-x-auto bg-dark-900 p-5 text-sm leading-relaxed text-dark-300 sm:p-6">
          <code>{code}</code>
        </pre>
      </section>
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
        className={`flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-smooth ${
          onlyFavorites
            ? 'bg-accent-500 text-white'
            : 'bg-dark-800 border border-dark-700 text-dark-300 hover:border-accent-500/50'
        }`}
      >
        <Heart size={16} fill={onlyFavorites ? 'currentColor' : 'none'} />
        Favorites
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
  const [selectedAnimationId, setSelectedAnimationId] = useState<string | null>(null)
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
  const selectedAnimation = useMemo(() => {
    return animations.find((anim) => anim.id === selectedAnimationId) ?? null
  }, [animations, selectedAnimationId])
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
                      ...(activeCategory === tab ? { backgroundColor: '#1847BD', color: 'white' } : { color: '#666' })
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

          {/* Animation Cards Grid / Detail View */}
          <section className="md:col-span-3">
            <AnimatePresence mode="wait">
              {selectedAnimation ? (
                <AnimationDetail
                  key={selectedAnimation.id}
                  card={selectedAnimation}
                  onBack={() => setSelectedAnimationId(null)}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <motion.div
                  key="library-grid"
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredAnimations.length > 0 ? (
                      filteredAnimations.map((anim) => (
                        <AnimationCardComponent
                          key={anim.id}
                          card={anim}
                          isFavorite={anim.isFavorite}
                          onToggleFavorite={toggleFavorite}
                          onSelect={setSelectedAnimationId}
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
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-500 text-sm">
          <p>&copy; 2024 OWOW Atlas. Professional animation library for creative professionals.</p>
        </div>
      </footer>
    </div>
  )
}
