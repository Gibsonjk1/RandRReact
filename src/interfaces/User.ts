export interface User {
  id: string
  profile: Profile
  strength: StrengthProfile
  mobility: MobilityProfile
  preferences: Preferences
  exercisePreferences: ExercisePreferences
  restrictions: Restrictions
  rehab: RehabState
  activity: Activity
  system: SystemMeta
}

export interface Profile {
  firstName: string
  lastName: string
  age?: number
  heightCm?: number
  weightKg?: number
}

export interface StrengthProfile {
  upperBody: Record<string, number>
  core: Record<string, number>
  lowerBody: Record<string, number>
}

export interface MobilityProfile {
  upperBody: Record<string, number>
  lowerBody: Record<string, number>
  balance: number
}

export interface Preferences {
  primaryGoal: string
  secondaryGoals: string[]
  availableEquipment: string[]
  workoutDurationMinutes: number
}

export interface ExercisePreferences {
  likes: string[]
  dislikes: string[]
  avoidIfPossible: string[]
}

export interface Restrictions {
  contraindications: string[]
}

export interface RehabInjury {
  joint: string
  side?: string
  severity: number
  allowedLoad?: number
  notes?: string
}

export interface RehabState {
  activeInjuries: RehabInjury[]
}

export interface Activity {
  experienceLevel: number
  sessionsPerWeek: number
  nextSessionFocus?: string
}

export interface SystemMeta {
  active: boolean
  createdAt: string
  updatedAt: string
}
