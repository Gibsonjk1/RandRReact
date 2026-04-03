import type { User } from '../interfaces/User.ts'
export function convertStrengthArray(arr: any[]) {
  return Object.fromEntries(
    arr.map(m => [m.muscleId, m.strength ?? 0])
  )
}
export interface ApiUser {
  _id: string
  profile: any
  strengthProfile: any
  mobilityProfile: any
  preferences: any
  exercisePreferences: any
  restrictions: any
  rehabState: any
  activity: any
  active: boolean
  createdAt: string
  updatedAt: string
}


export function convertApiUserToDomain(apiUser: ApiUser): User {
  return {
    id: apiUser._id,

    profile: {
      firstName: apiUser.profile.firstName,
      lastName: apiUser.profile.lastName,
      age: apiUser.profile.age,
      heightCm: apiUser.profile.heightCm,
      weightKg: apiUser.profile.weightKg
    },

    strength: {
      upperBody: convertStrengthArray(apiUser.strengthProfile.upperBody),
      core: convertStrengthArray(apiUser.strengthProfile.core),
      lowerBody: convertStrengthArray(apiUser.strengthProfile.lowerBody)
    },

    mobility: apiUser.mobilityProfile,

    preferences: apiUser.preferences,

    exercisePreferences: apiUser.exercisePreferences,

    restrictions: apiUser.restrictions,

    rehab: apiUser.rehabState,

    activity: apiUser.activity,

    system: {
      active: apiUser.active,
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt
    }
  }
}