export interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'template' | 'guide' | 'example' | 'video'
  timeToRead: string
  tags: string[]
  url?: string
}

export const resources: Resource[] = [
  {
    id: 'res-roadmap-template',
    title: '4-Year Roadmap Template',
    description: 'Fillable Google Doc template for mapping a student\'s full FRNYC pathway: courses, internships, credentials, and SYEP years.',
    category: 'Templates',
    type: 'template',
    timeToRead: '5 min to customize',
    tags: ['roadmap', 'students', 'template'],
  },
  {
    id: 'res-family-onepager',
    title: 'Family One-Pager Template',
    description: 'One-page school-customizable overview of your FRNYC pathway for families. Available in English and Spanish base.',
    category: 'Templates',
    type: 'template',
    timeToRead: '20 min to customize',
    tags: ['families', 'materials', 'template'],
  },
  {
    id: 'res-family-faq',
    title: 'Family FAQ Template',
    description: 'The top 10 questions families ask about FRNYC, with suggested answers you can customize for your school context.',
    category: 'Templates',
    type: 'template',
    timeToRead: '15 min to customize',
    tags: ['families', 'FAQ', 'template'],
  },
  {
    id: 'res-ambassador-training',
    title: 'Ambassador Training Agenda',
    description: 'A 45-minute facilitation guide for your first ambassador training session. Includes talking points, role-play script, and role assignments.',
    category: 'Ambassador',
    type: 'guide',
    timeToRead: '10 min to review',
    tags: ['ambassadors', 'training', 'guide'],
  },
  {
    id: 'res-ambassador-script',
    title: 'Ambassador Story Script',
    description: 'A simple 4-question framework for ambassadors: What do you do? What\'s the best part? What was hard? Would you recommend it?',
    category: 'Ambassador',
    type: 'template',
    timeToRead: '5 min',
    tags: ['ambassadors', 'story', 'script'],
  },
  {
    id: 'res-early-warning',
    title: 'Early Warning Trigger Template',
    description: 'Defines the 3 signals that indicate a student is at risk of leaving the pathway: attendance drops, grade threshold, and engagement score.',
    category: 'Retention',
    type: 'template',
    timeToRead: '10 min',
    tags: ['retention', 'early warning', 'data'],
  },
  {
    id: 'res-retention-plan',
    title: 'One-Page Retention Plan Template',
    description: 'A structured template for documenting your school\'s retention system: check-ins, early warning, support pathway, and escalation.',
    category: 'Retention',
    type: 'template',
    timeToRead: '30 min to complete',
    tags: ['retention', 'plan', 'template'],
  },
  {
    id: 'res-interest-survey',
    title: 'Student Interest Survey Template',
    description: 'A 9-question survey to measure interest level, identify barriers, and segment students for follow-up. Google Form-ready.',
    category: 'Surveys',
    type: 'template',
    timeToRead: '10 min to customize',
    tags: ['survey', 'funnel', 'template'],
  },
  {
    id: 'res-session-agenda',
    title: 'Family Information Session Agenda',
    description: 'A 60-minute session agenda with timing, talking points, and a checklist. Includes ambassador co-presenter slot.',
    category: 'Family',
    type: 'template',
    timeToRead: '15 min to review',
    tags: ['families', 'session', 'agenda'],
  },
  {
    id: 'res-frnyc-overview',
    title: 'FRNYC Framework Overview',
    description: 'The AECEC framework explained: Awareness, Exposure, Commitment, Experience, Completion. Use this to explain the full student journey to your team.',
    category: 'Guides',
    type: 'guide',
    timeToRead: '10 min',
    tags: ['framework', 'overview', 'AECEC'],
  },
  {
    id: 'res-recruitment-scope',
    title: 'Recruitment Scope & Responsibilities',
    description: 'Defines what each role is responsible for in the recruitment process. Use for team alignment and accountability.',
    category: 'Guides',
    type: 'guide',
    timeToRead: '8 min',
    tags: ['roles', 'scope', 'accountability'],
  },
  {
    id: 'res-syep-guide',
    title: 'SYEP Eligibility & Enrollment Guide',
    description: 'How to connect FRNYC students to SYEP: eligibility requirements, application timeline, and employer matching process.',
    category: 'Guides',
    type: 'guide',
    timeToRead: '12 min',
    tags: ['SYEP', 'internship', 'guide'],
  },
]

export const getResourcesByCategory = (): Record<string, Resource[]> => {
  const grouped: Record<string, Resource[]> = {}
  resources.forEach((r) => {
    if (!grouped[r.category]) grouped[r.category] = []
    grouped[r.category].push(r)
  })
  return grouped
}
