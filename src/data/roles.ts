import type { Role } from '../types'

export const roles: Role[] = [
  {
    id: 'principal',
    title: 'Principal / Assistant Principal',
    shortTitle: 'Principal / AP',
    description: 'Lead school-wide recruitment strategy, set goals, and remove barriers.',
    icon: '🏫',
    color: '#0F3460',
    bgColor: '#EEF4FB',
    responsibilities: [
      'Set school recruitment targets',
      'Allocate staff time and resources',
      'Review progress data monthly',
      'Remove systemic barriers',
    ],
  },
  {
    id: 'counselor',
    title: 'Counselor / Recruitment Lead',
    shortTitle: 'Counselor / Rec Lead',
    description: 'Own the student pipeline, manage outreach, and track enrollment funnel.',
    icon: '🎯',
    color: '#B5162B',
    bgColor: '#FEF2F4',
    responsibilities: [
      'Manage student interest list',
      'Run info sessions and presentations',
      'Track enrollment applications',
      'Follow up with undecided students',
    ],
  },
  {
    id: 'pathway-teacher',
    title: 'Pathway Teacher / Coordinator',
    shortTitle: 'Pathway Teacher',
    description: 'Deliver pathway content, mentor students, and support retention through instruction.',
    icon: '📚',
    color: '#1B4D7E',
    bgColor: '#F0F6FF',
    responsibilities: [
      'Build 4-year roadmap with students',
      'Customize pathway materials',
      'Launch student ambassador program',
      'Coordinate internship/SYEP placements',
    ],
  },
  {
    id: 'family-engagement',
    title: 'Family Engagement / Outreach',
    shortTitle: 'Family Engagement',
    description: 'Connect families to the FRNYC pathway and address barriers to participation.',
    icon: '🤝',
    color: '#2D6A4F',
    bgColor: '#F0FFF4',
    responsibilities: [
      'Plan family information sessions',
      'Translate and distribute materials',
      'Follow up with families of undecided students',
      'Connect families to support resources',
    ],
  },
  {
    id: 'team-view',
    title: 'School Team View',
    shortTitle: 'Team View',
    description: 'See the full picture of your school\'s FRNYC recruitment and retention progress.',
    icon: '👥',
    color: '#5A3E8A',
    bgColor: '#F5F0FF',
    responsibilities: [
      'Monitor all team mission progress',
      'Identify gaps and blockers',
      'Coordinate cross-role handoffs',
      'Celebrate team milestones',
    ],
  },
]

export const getRoleById = (id: string): Role | undefined =>
  roles.find((r) => r.id === id)
