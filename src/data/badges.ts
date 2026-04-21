import type { Badge } from '../types'

export const badges: Badge[] = [
  {
    id: 'roadmap-ready',
    name: 'Roadmap Ready',
    description: 'Every enrolled student has a completed 4-year FRNYC roadmap.',
    emoji: '🗺️',
    color: '#0F3460',
    earnedBy: ['mission-roadmap'],
  },
  {
    id: 'messaging-ready',
    name: 'Messaging Ready',
    description: 'School-branded one-pager and family FAQ are approved and distributed.',
    emoji: '📣',
    color: '#B5162B',
    earnedBy: ['mission-materials'],
  },
  {
    id: 'ambassador-ready',
    name: 'Ambassador Ready',
    description: '4+ trained student ambassadors are active and deployed.',
    emoji: '⭐',
    color: '#1B4D7E',
    earnedBy: ['mission-ambassadors'],
  },
  {
    id: 'funnel-built',
    name: 'Funnel Built',
    description: 'Student interest survey completed and follow-up list is active.',
    emoji: '🏗️',
    color: '#2D6A4F',
    earnedBy: ['mission-survey'],
  },
  {
    id: 'cohort-launch-ready',
    name: 'Cohort Launch Ready',
    description: 'Retention plan documented, check-in calendar set, early warning active.',
    emoji: '🚀',
    color: '#5A3E8A',
    earnedBy: ['mission-retention'],
  },
  {
    id: 'family-funnel-active',
    name: 'Family Funnel Active',
    description: 'Family information session completed with 15+ attendees.',
    emoji: '🤝',
    color: '#D4A510',
    earnedBy: ['mission-family-session'],
  },
  {
    id: 'recruitment-ready',
    name: 'Recruitment Ready',
    description: 'Completed all Awareness phase missions. Your school is ready to recruit.',
    emoji: '🏆',
    color: '#F5C518',
    earnedBy: ['mission-roadmap', 'mission-materials'],
  },
]

export const getBadgeById = (id: string): Badge | undefined =>
  badges.find((b) => b.id === id)
