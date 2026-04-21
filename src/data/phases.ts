import type { Phase } from '../types'

export interface PhaseInfo {
  id: Phase
  letter: string
  label: string
  description: string
  color: string
  bg: string
}

export const phases: PhaseInfo[] = [
  {
    id: 'awareness',
    letter: 'A',
    label: 'Awareness',
    description: 'Students and families discover FRNYC and understand the opportunity.',
    color: '#0F3460',
    bg: '#EEF4FB',
  },
  {
    id: 'exposure',
    letter: 'E',
    label: 'Exposure',
    description: 'Students experience the pathway through tours, ambassadors, and events.',
    color: '#1B4D7E',
    bg: '#F0F6FF',
  },
  {
    id: 'commitment',
    letter: 'C',
    label: 'Commitment',
    description: 'Students and families make an informed decision to enroll.',
    color: '#B5162B',
    bg: '#FEF2F4',
  },
  {
    id: 'experience',
    letter: 'E',
    label: 'Experience',
    description: 'Students engage in the full pathway — courses, internships, credentials.',
    color: '#2D6A4F',
    bg: '#F0FFF4',
  },
  {
    id: 'completion',
    letter: 'C',
    label: 'Completion',
    description: 'Students finish with credentials, SYEP experience, and a clear next step.',
    color: '#5A3E8A',
    bg: '#F5F0FF',
  },
]

export const getPhaseInfo = (id: Phase): PhaseInfo =>
  phases.find((p) => p.id === id) ?? phases[0]

export const phaseOrder: Phase[] = [
  'awareness',
  'exposure',
  'commitment',
  'experience',
  'completion',
]
