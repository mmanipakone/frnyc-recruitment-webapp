export type RoleId =
  | 'principal'
  | 'counselor'
  | 'pathway-teacher'
  | 'family-engagement'
  | 'team-view'

export type Phase = 'awareness' | 'exposure' | 'commitment' | 'experience' | 'completion'

export type MissionStatus = 'locked' | 'not-started' | 'in-progress' | 'completed'

export type StepType =
  | 'do-now'
  | 'objective'
  | 'model'
  | 'guided-practice'
  | 'independent-practice'
  | 'share'
  | 'exit-ticket'

export interface Role {
  id: RoleId
  title: string
  shortTitle: string
  description: string
  icon: string
  color: string
  bgColor: string
  responsibilities: string[]
}

export interface MissionStep {
  id: string
  type: StepType
  label: string
  title: string
  content: string
  action: string
  output: string
  timeMinutes: number
}

export interface Mission {
  id: string
  title: string
  why: string
  phase: Phase
  owner: RoleId[]
  estimatedTime: string
  dueLabel: string
  requiredOutput: string
  doneWhen: string
  badge?: string
  steps: MissionStep[]
  dependsOn?: string[]
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  color: string
  earnedBy: string[]
}

export interface UserProgress {
  role: RoleId
  schoolName: string
  completedMissions: string[]
  missionStepProgress: Record<string, number>
  earnedBadges: string[]
  streak: number
  lastActive: string
  phase: Phase
  focusModeEnabled: boolean
  onboarded: boolean
}
