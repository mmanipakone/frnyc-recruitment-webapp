import { useState } from 'react'
import {
  Heart,
  Star,
  Calendar,
  DollarSign,
  BarChart2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
} from 'lucide-react'

type TabId = 'overview' | 'steps' | 'tools' | 'measurement'

const tabs: { id: TabId; label: string; icon: typeof Heart }[] = [
  { id: 'overview', label: 'Overview', icon: Star },
  { id: 'steps', label: 'Grade-by-Grade', icon: Calendar },
  { id: 'tools', label: 'Tools & Templates', icon: MessageSquare },
  { id: 'measurement', label: 'Measurement', icon: BarChart2 },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-base font-head font-700 text-navy border-b border-gray-200 pb-2">{title}</h3>
      {children}
    </section>
  )
}

function InfoCard({
  icon: Icon,
  color,
  title,
  body,
}: {
  icon: typeof Heart
  color: string
  title: string
  body: string
}) {
  return (
    <div className="bg-white rounded-card border border-gray-200 p-4 shadow-card flex gap-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '18' }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-head font-700 text-gray-900 mb-1">{title}</p>
        <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-head font-700 text-gray-900">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 text-sm text-gray-700 leading-relaxed space-y-2 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  )
}

function GradeCard({
  grade,
  title,
  subtitle,
  color,
  bullets,
  tip,
}: {
  grade: string
  title: string
  subtitle: string
  color: string
  bullets: string[]
  tip?: string
}) {
  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: color + '10' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-head font-900 text-white text-sm flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {grade}
        </div>
        <div>
          <p className="text-sm font-head font-700 text-gray-900">{title}</p>
          <p className="text-[10px] text-gray-500 font-head font-600 uppercase tracking-wide">{subtitle}</p>
        </div>
      </div>
      <div className="px-5 py-4 space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
            <span className="flex-shrink-0 mt-0.5" style={{ color }}>▸</span>
            <span>{b}</span>
          </div>
        ))}
        {tip && (
          <div className="mt-2 bg-gold/10 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-700">
              <span className="font-head font-700 text-yellow-700">Key action: </span>
              {tip}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function CohortToolkit() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-crimson rounded-card p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-head font-700 uppercase tracking-widest text-gold">FRNYC Toolkit</p>
            <h1 className="text-xl font-head font-900 text-white leading-tight">Cohort Experience Toolkit</h1>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
          A grade-by-grade guide for building a cohort culture where FRNYC students feel they belong
          to something exclusive, valuable, and worth finishing. Recruiting students is only half the
          work — without intentional retention structures, you rebuild your cohort every year.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            Community · Visibility · Celebration
          </span>
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            Grades 10–12 focus
          </span>
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            Reduces drop-off by 40%+
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-card border border-gray-200 p-1 shadow-card">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-head font-600 transition-all ${
              activeTab === id
                ? 'bg-crimson text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <Section title="Why Cohort Design Works">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard
                icon={Users}
                color="#B5162B"
                title="Small Learning Communities"
                body="Career academies significantly improve long-term employment outcomes and keep students out of remediation. Cohort design (shared schedules, classes, and experiences) is a proven high-impact practice."
              />
              <InfoCard
                icon={Heart}
                color="#0F3460"
                title="Belonging Drives Persistence"
                body="Students persist when they feel connected and see real-world purpose in learning. Near-peer mentors provide both academic and emotional support, making school feel more welcoming."
              />
              <InfoCard
                icon={Star}
                color="#D97706"
                title="Front-Load High-Status Events"
                body="FRNYC guidance emphasizes front-loading exciting experiences early — especially in 10th grade — to build identity and create FOMO among peers who aren't in the program."
              />
              <InfoCard
                icon={Award}
                color="#2D6A4F"
                title="Recognition Fuels Recruitment"
                body="Celebrating graduates publicly (cords, medals, spotlights) is the ultimate marketing tool for the next cohort. Every honor at graduation recruits the next class."
              />
            </div>
          </Section>

          <Section title="Program at a Glance">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
                {[
                  { label: 'Start Point', value: '10th', sub: 'grade welcome event' },
                  { label: 'Check-Ins', value: 'Monthly', sub: '1:1 with food' },
                  { label: 'Key Milestone', value: '11th', sub: 'grade reset' },
                  { label: 'Capstone', value: '12th', sub: 'grade showcase' },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="p-4 text-center">
                    <p className="text-2xl font-head font-900 text-crimson">{value}</p>
                    <p className="text-[10px] font-head font-700 text-gray-900 uppercase tracking-wide">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Grade-by-Grade Timeline">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <div className="p-4">
                <div className="space-y-0">
                  {[
                    { grade: 'End of 9th', label: 'Application & Acceptance', color: '#6B7280' },
                    { grade: 'Start of 10th', label: 'Welcome Event + Welcome Kit', color: '#0F3460' },
                    { grade: 'Fall 10th', label: '1–2 Career Trips + Classroom Integration', color: '#0F3460' },
                    { grade: 'Winter 10th', label: 'FOMO push (social media, announcements)', color: '#1B4D7E' },
                    { grade: 'Start of 11th', label: 'Mid-Year Check-Ins + Mentor Panel', color: '#B5162B' },
                    { grade: 'Spring 11th', label: 'Internship Prep Meetings', color: '#D97706' },
                    { grade: '12th Grade', label: 'Capstone Projects + Graduation Awards', color: '#2D6A4F' },
                  ].map(({ grade, label, color }, i, arr) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: color }}
                        />
                        {i < arr.length - 1 && (
                          <div className="w-0.5 bg-gray-200 flex-grow mt-1" style={{ minHeight: '24px' }} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-[10px] font-head font-700 uppercase tracking-wide text-gray-400">{grade}</p>
                        <p className="text-sm font-head font-600 text-gray-800">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Integration Strategies">
            <div className="bg-white rounded-card border border-gray-200 shadow-card p-5 space-y-3">
              <p className="text-xs text-gray-600">Ensure FRNYC is woven into every aspect of students' school life:</p>
              {[
                {
                  title: 'Advisory Modules',
                  detail: 'Weekly advisory lessons incorporate FRNYC discussions. Sample: students map their 4-year plan including FRNYC courses, ECC classes, and WBL experiences.',
                },
                {
                  title: 'Course Alignment',
                  detail: "Work with course teachers and CUNY partners so ECC (Dual Enrollment) courses complement the pathway. If a student's pathway is HVAC, they enroll in college-level physics or industrial electronics — not unrelated courses.",
                },
                {
                  title: 'Schoolwide Messaging',
                  detail: 'Display FRNYC posters or "Pathway of the Month" boards. In morning announcements, rotate spotlights on pathway features ("Reminder: sign up for next week\'s biotech lab visit!").',
                },
                {
                  title: 'Pathway-Connected Clubs',
                  detail: 'Encourage students to join clubs related to their pathway (Science Olympiad for health, DECA for business) and promote these as FRNYC activities.',
                },
              ].map(({ title, detail }, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-crimson font-head font-700 flex-shrink-0 text-xs mt-0.5">▸</span>
                  <div>
                    <p className="text-xs font-head font-700 text-gray-900">{title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Steps Tab */}
      {activeTab === 'steps' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-sm text-gray-600">
            A grade-by-grade progression from acceptance to graduation — building belonging and
            identity at every stage.
          </p>

          <GradeCard
            grade="10"
            title="Formal Welcome — Start of 10th Grade"
            subtitle="Building Identity & Belonging"
            color="#0F3460"
            bullets={[
              '"Accepted Students" Event: Early fall, host an exclusive event (pizza party or ice cream social) for newly admitted 10th graders. Celebrate with certificates and alumni speakers. Treat FRNYC enrollment like college admissions.',
              "Welcome Kit: Give each student a personalized acceptance letter, pathway stickers/decals, a notebook and pen, and a branded T-shirt or hoodie. Studies show exclusive swag boosts belonging and commitment.",
              "Invite parents (virtual or in person) to the welcome event — underscore family support from day one.",
            ]}
            tip="Host the welcome event in the first two weeks of school before routine sets in. The earlier the excitement, the stronger the identity."
          />

          <GradeCard
            grade="10"
            title="Front-Load High-Status Exposure — Fall 10th Grade"
            subtitle="Creating FOMO & Status"
            color="#1B4D7E"
            bullets={[
              'Off-Site Trips: Plan at least one major trip in early 10th grade while novelty is high. Options: overnight college visit, tour of a local tech company, IMAX or live surgery show. Publicize these trips in school hallways — seeing classmates leave on a chartered bus sparks FOMO among peers.',
              'Classroom Integration: Tie trips to curriculum. After a hospital tour, have students reflect on one procedure observed. In advisory, show trip photos and discuss career insights.',
              'Create Status Symbols: Introduce visible markers for 10th graders — special nametags, lapel pins, or lanyards to wear in class — to mark them as a select group.',
              "Social Media: Have alumni ambassadors share post-trip videos on school social media. Use these clips in future recruitment materials.",
            ]}
            tip="The first big trip is your best retention tool for the rest of 10th grade. Make it memorable and publicize it loudly."
          />

          <GradeCard
            grade="11"
            title="Mid-Year Reset — 11th Grade"
            subtitle="Preventing Burnout & Re-Igniting Motivation"
            color="#B5162B"
            bullets={[
              "Acknowledge the Challenge: 11th grade often has the heaviest workload (advanced classes + college/career tasks). Proactively support students before motivation dips — don't wait for crisis.",
              '1:1 Check-Ins with Food: In January, schedule mandatory one-on-one or small-group meetings between each student and a counselor or teacher. Serve culturally-relevant snacks (tamales, pizza, halal options) to create a relaxed atmosphere.',
              'Re-Sell the Vision: Highlight the imminent paid internships (usually 12th grade) and show students their accrued college credits as a "bank" saving tuition money.',
              'Peer Mentoring Session: Bring ambassadors or alumni (now college freshmen or working interns) to share "I made it" stories in a short panel format.',
            ]}
            tip={"Frame the 11th grade check-in as \"celebrating how far you've come\" not \"checking if you're okay.\" Tone changes everything."}
          />

          <GradeCard
            grade="12"
            title="Public Completion & Recognition — 12th Grade"
            subtitle="Celebrating Success & Recruiting the Next Cohort"
            color="#2D6A4F"
            bullets={[
              'Graduation Accolades: Ensure FRNYC completers receive specific honors at graduation — custom cords (in pathway color), medals, and certificates. Public recognition motivates current students and markets to next year.',
              'Media Spotlight: Weekly or monthly, feature a senior in school/FRNYC social media (with photo and quote: "I start my career as a lab assistant at X hospital thanks to FRNYC").',
              'Capstone Showcase: Host a small expo or lunch where 12th-grade FRNYC students display final projects (posters, labs) to underclassmen and families. Invite middle schoolers to film short "day in the life" videos.',
              'Alumni Network: Begin building a pipeline of recent graduates who can return as guest speakers, mentors, or advisory board members for future cohorts.',
            ]}
            tip="The graduation cord is your most powerful recruitment tool for 9th graders watching the ceremony. Never skip it."
          />
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-5 animate-fade-in">
          <Section title="Family Engagement Scripts">
            <div className="space-y-3">
              <div className="bg-navy/5 border border-navy/15 rounded-card p-5">
                <p className="text-[10px] font-head font-700 uppercase tracking-widest text-navy mb-3">
                  Welcome Home Letter — send after acceptance
                </p>
                <blockquote className="text-sm text-gray-800 leading-relaxed border-l-4 border-navy pl-4 italic">
                  "Congratulations! [Student] has been admitted to the <strong>FutureReadyNYC [Pathway]</strong>{' '}
                  program. This means through high school they will gain college credits and paid work
                  experience in [industry]. We will host an info night on [date] to explain what this
                  means for your family. A Welcome Kit will be distributed to your student on [date]."
                </blockquote>
              </div>
              <div className="bg-crimson/5 border border-crimson/15 rounded-card p-5">
                <p className="text-[10px] font-head font-700 uppercase tracking-widest text-crimson mb-3">
                  Phone Outreach Script — for counselors/recruiters
                </p>
                <blockquote className="text-sm text-gray-800 leading-relaxed border-l-4 border-crimson pl-4 italic">
                  "Hello, this is [Name] from [School]. We're excited that [Student] is interested in
                  our Pathway program. We offer paid internships and college courses — would you like
                  more details before course selection? We can schedule a 10-minute call or send
                  information in [language] if preferred."
                </blockquote>
              </div>
            </div>
            <div className="bg-gold/10 border border-gold/30 rounded-card p-3 flex gap-2">
              <MessageSquare size={14} className="text-yellow-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">
                <span className="font-head font-700">Always offer translations.</span> All scripts and
                letters should be available in the languages spoken by your school community.
              </p>
            </div>
          </Section>

          <Section title="Cohort Health Rubric">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <table className="text-xs w-full">
                <thead>
                  <tr className="bg-crimson/5">
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">Dimension</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-green-700">High</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-yellow-600">Medium</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-red-600">Low</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    [
                      'Belonging',
                      'Students say "we" and know each other by name across grades',
                      'Students know cohort-mates in their own grade',
                      'Students feel isolated; no cross-grade relationships',
                    ],
                    [
                      'Participation',
                      '90%+ attendance at FRNYC events monthly',
                      '70–89% attendance at events',
                      'Below 70%; many students opting out',
                    ],
                    [
                      'Promotion',
                      'Ambassadors share stories; social media posts weekly',
                      'Occasional sharing; some visibility',
                      'No social proof visible; students reluctant to share',
                    ],
                    [
                      'Academic Persistence',
                      '90%+ on track with ECC credits and pathway requirements',
                      '70–89% on track; some at-risk students supported',
                      'Below 70%; multiple students behind on requirements',
                    ],
                  ].map(([dim, high, mid, low], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-head font-700 text-gray-800">{dim}</td>
                      <td className="px-3 py-3 text-center text-green-700">{high}</td>
                      <td className="px-3 py-3 text-center text-yellow-600">{mid}</td>
                      <td className="px-3 py-3 text-center text-red-600">{low}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Budget Tiers">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  level: 'Low',
                  range: '$0 – $500',
                  color: '#2D6A4F',
                  activities: 'Use school facilities; staff volunteers; simple welcome kit (printed letter, stickers).',
                  deliverables: 'Pizza party welcome + volunteer speakers',
                },
                {
                  level: 'Medium',
                  range: '$1,000 – $5,000',
                  color: '#0F3460',
                  activities: 'Professional T-shirts or jackets for cohort; fund one overnight trip; paid guest speakers.',
                  deliverables: 'Dual college visits + modest travel',
                },
                {
                  level: 'High',
                  range: '$10,000+',
                  color: '#B5162B',
                  activities: 'Large-scale mentorship program; fully-funded multi-day career camps; high-end swag; paid mentor stipends.',
                  deliverables: 'Custom curriculum + extensive field trips',
                },
              ].map(({ level, range, color, activities, deliverables }) => (
                <div key={level} className="bg-white rounded-card border border-gray-200 shadow-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={14} style={{ color }} />
                    <span className="text-sm font-head font-700" style={{ color }}>{level}</span>
                  </div>
                  <p className="text-base font-head font-900 text-gray-900 mb-2">{range}</p>
                  <p className="text-xs text-gray-600 mb-2">{activities}</p>
                  <p className="text-[10px] font-head font-700 text-gray-500 uppercase tracking-wide">{deliverables}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Frequently Asked Questions">
            <div className="space-y-2">
              <Accordion title="What if we don't have budget for a welcome event or swag?">
                <p>Start with what you have. A printed personal acceptance letter (free) combined with a brief 15-minute recognition moment during advisory is enough to signal status. The message ("you were selected") matters more than the medium. Add physical swag as budget allows in future years.</p>
              </Accordion>
              <Accordion title="How do we handle students who stop attending FRNYC events?">
                <p>First, make attendance normal by making events valuable (food, field trips, real information). For persistent non-attendance, schedule a 1:1 conversation — often there's a scheduling conflict or a family concern that can be addressed. Have a "re-entry" protocol: students who miss 3+ consecutive events get an outreach call and a personal invitation to the next one.</p>
              </Accordion>
              <Accordion title="Our school has high chronic absenteeism. How do we build cohort culture?">
                <p>Focus on in-class cohort experiences rather than add-on events, since present students are more reliably in class. Use advisory periods, morning announcements, and hallway visibility (posters, boards) rather than after-school events. For students who are chronically absent, the 1:1 check-in with food (Step 3) often surfaces the real barriers to attendance.</p>
              </Accordion>
              <Accordion title="How early should we start planning the next year's cohort?">
                <p>Begin recruitment for the next year's cohort in January of the current year — while current 9th graders are preparing for 10th grade course selection. Use the capstone showcase and graduation recognition as recruitment tools: those events land in May–June and directly influence rising 9th graders who witness them.</p>
              </Accordion>
            </div>
          </Section>
        </div>
      )}

      {/* Measurement Tab */}
      {activeTab === 'measurement' && (
        <div className="space-y-5 animate-fade-in">
          <Section title="KPI to FRNYC KIM Alignment">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <table className="text-xs w-full">
                <thead>
                  <tr className="bg-crimson/5">
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">KPI</th>
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">KIM Alignment</th>
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">Collection Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    [
                      '% of cohort completing 1st advisory 1:1',
                      'KIM: All FRNYC 10th–12th complete 1:1',
                      'STARS advising logs',
                    ],
                    [
                      '# of cohort events held per semester',
                      'KIM: Documentation of pathway outreach',
                      'Event logs, STARS records',
                    ],
                    [
                      'Internship placement rate (seniors)',
                      'KIM: % of seniors in paid WBL',
                      'WBL provider attendance logs',
                    ],
                    [
                      'ECC credits earned per cohort member',
                      'KIM: % on track with ECC goal',
                      'CUNY transcripts',
                    ],
                  ].map(([kpi, kim, source], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-600 text-gray-800">{kpi}</td>
                      <td className="px-4 py-3 text-crimson">{kim}</td>
                      <td className="px-4 py-3 text-gray-500 italic">{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 italic">
                  Confirm actual KIM wording and targets with the FRNYC KIMs document for SY25–26.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Risk Mitigation Guide">
            <div className="space-y-3">
              {[
                {
                  risk: 'Low Recruitment',
                  icon: TrendingUp,
                  color: '#D97706',
                  response:
                    'Intensify outreach: more advisor calls, personalized invitations to high-potential students. Involve counselors directly to "manually" recruit underrepresented students. Use the ambassador program to do peer-to-peer outreach in advisory periods.',
                },
                {
                  risk: 'Scheduling Conflicts',
                  icon: Calendar,
                  color: '#0F3460',
                  response:
                    'Coordinate early with counselors so FRNYC courses/ECC do not clash with core classes. Provide flexible ECC options (online or summer sections) if conflicts arise. Address scheduling in spring course planning — not in September.',
                },
                {
                  risk: 'Equity Gaps',
                  icon: Users,
                  color: '#B5162B',
                  response:
                    'Monitor demographics of recruits each semester. If any group is underrepresented, do targeted outreach: explain FRNYC at ENL or special education team meetings. Ensure materials are in all community languages.',
                },
                {
                  risk: 'Funding Shortfalls',
                  icon: DollarSign,
                  color: '#2D6A4F',
                  response:
                    'Leverage community sponsors or grants for trips and swag. Use digital marketing (social media, email) to reduce printing costs. Scale activities to your actual budget tier — a meaningful $0 welcome letter beats a skipped $500 event.',
                },
              ].map(({ risk, icon: Icon, color, response }, i) => (
                <div key={i} className="bg-white rounded-card border border-gray-200 shadow-card p-4 flex gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color + '15' }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={12} style={{ color }} />
                      <p className="text-sm font-head font-700 text-gray-900">Risk: {risk}</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{response}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Annual Retention Audit">
            <div className="bg-white rounded-card border border-gray-200 shadow-card p-4 space-y-2">
              <p className="text-xs text-gray-600 mb-3">Review these indicators at the end of each school year:</p>
              {[
                'Cohort retention rate: % of 10th-grade enrollees who complete pathway through 12th grade',
                'ECC credit accumulation: % of students on track to meet college credit goals',
                'Internship placement: % of seniors placed in paid WBL experiences',
                'Graduation honors: % of completers receiving FRNYC-specific recognition',
                'Alumni engagement: # of recent graduates who returned as guest speakers or mentors',
                'Drop-out reasons documented: qualitative data on why students left the pathway',
                'Equity in completion: does demographic breakdown of completers reflect school demographics?',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <div className="w-4 h-4 rounded border-2 border-crimson/40 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <div className="bg-crimson/5 border border-crimson/20 rounded-card p-4">
            <div className="flex gap-3">
              <GraduationCap size={16} className="text-crimson flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-head font-700 text-gray-900 mb-1">Graduation cords are your best metric</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  If students are wearing FRNYC cords at graduation, the cohort culture worked. Every
                  cord represents a student who stayed, succeeded, and is now marketing the program to
                  everyone watching the ceremony. Track cord count as your top-line retention metric.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
