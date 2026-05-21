export type MotionBehavior = 'Fade' | 'Slide' | 'Scale' | 'Morph' | 'Rotate'
export type InteractionPattern = 'Hover' | 'Scroll' | 'Entrance' | 'Exit' | 'Loop'
export type VisualCharacter = 'Minimal' | 'Organic' | 'Geometric' | 'Abstract' | 'Sharp'
export type Category = 'All' | 'Website' | 'Mobile'

export interface AnimationCard {
  id: string
  title: string
  category: 'Website' | 'Mobile'
  motionBehavior: MotionBehavior
  interactionPattern: InteractionPattern
  visualCharacter: VisualCharacter
  isFavorite: boolean
}

export interface FilterState {
  motionBehaviors: MotionBehavior[]
  interactionPatterns: InteractionPattern[]
  visualCharacters: VisualCharacter[]
  onlyFavorites: boolean
  searchTerm: string
  activeCategory: Category
}
