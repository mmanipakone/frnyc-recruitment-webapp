import { useState } from 'react'
import {
  Users,
  Star,
  Calendar,
  DollarSign,
  BarChart2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Award,
  Target,
  Shirt,
  Clock,
} from 'lucide-react'

type TabId = 'overview' | 'steps' | 'tools' | 'measurement'

const tabs: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: 'overview', label: 'Overview', icon: Star },
  { id: 'steps', label: '4-Step Guide', icon: CheckSquare },
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
  icon: typeof Users
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

function StepCard({
  number,
  title,
  bullets,
  tip,
}: {
  number: number
  title: string
  bullets: string[]
  tip?: string
}) {
  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-sm font-head font-700 flex-shrink-0">
          {number}
        </div>
        <h4 className="text-sm font-head font-700 text-gray-900">{title}</h4>
      </div>
      <ul className="space-y-2 pl-11">
        {bullets.map((b, i) => (
          <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
            <span className="text-navy mt-0.5 flex-shrink-0">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {tip && (
        <div className="mt-3 ml-11 bg-gold/10 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-700">
            <span className="font-head font-700 text-yellow-700">Pro tip: </span>
            {tip}
          </p>
        </div>
      )}
    </div>
  )
}

export function AmbassadorToolkit() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-navy rounded-card p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-head font-700 uppercase tracking-widest text-gold">FRNYC Toolkit</p>
            <h1 className="text-xl font-head font-900 text-white leading-tight">Student Ambassador Toolkit</h1>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
          A step-by-step, evidence-backed guide for recruiting and training student ambassadors who extend
          your FRNYC reach into social networks no staff member can access. Peer influence is the #1
          driver of pathway enrollment decisions.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            5 Principles: Timing · Integration · Social Proof · Relevance · Equity
          </span>
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            Grades 11–12 focus
          </span>
          <span className="text-[10px] bg-white/10 text-white/80 px-2.5 py-1 rounded-pill font-head font-600">
            4–8 ambassadors per pathway
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
                ? 'bg-navy text-white shadow-sm'
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
          <Section title="Why Ambassadors Work">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard
                icon={Users}
                color="#0F3460"
                title="Near-Peer Mentoring"
                body="Older mentors gain leadership skills while younger students receive relatable support. Students with mentors report 40% higher hope and engagement vs. 25% without a mentor."
              />
              <InfoCard
                icon={Star}
                color="#B5162B"
                title="Social Proof"
                body="Students in pathway attire (lab coats, IT hoodies) make career paths tangible for younger peers. Visible peer commitment signals that FRNYC is a high-status choice."
              />
              <InfoCard
                icon={Award}
                color="#D97706"
                title="FRNYC Alignment"
                body="FRNYC explicitly recommends ambassadors as part of the outreach team. Ambassadors are central to the Awareness and Exposure phases of the AECEC framework."
              />
              <InfoCard
                icon={Target}
                color="#2D6A4F"
                title="Long-Term Outcomes"
                body="Career academy studies show cohort models produce long-term gains in employment and earnings. Ambassadors humanize and amplify FRNYC's message in ways no adult can replicate."
              />
            </div>
          </Section>

          <Section title="Program at a Glance">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
                {[
                  { label: 'Team Size', value: '5–10', sub: 'per pathway' },
                  { label: 'Grade Level', value: '11–12', sub: 'grade focus' },
                  { label: 'Training', value: '90 min', sub: 'half-day session' },
                  { label: 'Budget Range', value: '$0–$5K+', sub: 'tiered options' },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="p-4 text-center">
                    <p className="text-2xl font-head font-900 text-navy">{value}</p>
                    <p className="text-[10px] font-head font-700 text-gray-900 uppercase tracking-wide">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="School Year Calendar">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <div className="p-4">
                <div className="space-y-2">
                  {[
                    { month: 'April', event: 'Recruit & select ambassador team (5–10 per pathway)' },
                    { month: 'May', event: 'Ambassador training day (half-day agenda)' },
                    { month: 'September', event: '9th-grade advisory visits + family info night participation' },
                    { month: 'October', event: 'Middle school outreach event' },
                    { month: 'November', event: 'Open house presentations' },
                    { month: 'January', event: 'MLL communication blitz + winter outreach push' },
                    { month: 'March', event: 'Spring advisory follow-up check-ins' },
                    { month: 'April (next)', event: 'New cohort accepted-student event planning' },
                  ].map(({ month, event }, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-[10px] font-head font-700 text-white bg-navy px-2 py-0.5 rounded-pill flex-shrink-0 mt-0.5 min-w-[64px] text-center">
                        {month}
                      </span>
                      <span className="text-xs text-gray-700 leading-relaxed">{event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Equity Commitments">
            <div className="bg-crimson/5 border border-crimson/20 rounded-card p-4 space-y-2">
              {[
                'Recruit ambassadors who speak the languages of your school community — provide all materials translated',
                'Include SPED and ENL coordinators on the outreach team so messaging is accessible to all students',
                'Ensure "non-completer" voices include students of varied abilities and backgrounds',
                'Schedule info sessions at multiple times (evening + virtual) and offer transportation or childcare for families',
                'Mirror school demographics: include a mix of genders, ethnic backgrounds, and academic interests in ambassador selection',
              ].map((item, i) => (
                <div key={i} className="flex gap-2 text-xs text-gray-700">
                  <span className="text-crimson mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
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
            Follow these four steps to recruit, train, and deploy a high-impact ambassador program.
          </p>

          <StepCard
            number={1}
            title="Recruit a Diverse Ambassador Team"
            bullets={[
              'Identify 5–10 ambassadors per pathway — preferably 11th–12th graders. Choose students known for leadership and extracurricular involvement.',
              'Include a mix of genders, ethnic backgrounds, and academic interests to signal authenticity and equity.',
              "Add 'Non-Completers': invite a few seniors who chose NOT to enroll in FRNYC to speak about what they missed — generates peer-driven urgency. (\"I wish I'd joined FRNYC – you're so lucky.\")",
              'Provide official recognition: volunteer/community service credit, honor society hours, or special privileges (field trips, FRNYC swag). Ensure incentives comply with school policy.',
            ]}
            tip="Non-completers are your secret weapon. Their honest regret is more convincing than any staff pitch."
          />

          <StepCard
            number={2}
            title='Equip Them with a "Uniform"'
            bullets={[
              'Visually reinforce each pathway\'s identity: lab coats for health, hard hats for engineering, branded IT hoodies.',
              'When ambassadors present wearing career-themed gear, younger students see their own future careers made tangible — this is powerful social proof.',
              'Create branded materials: lanyards, polos, or pathway-specific accessories so ambassadors are instantly identifiable at events.',
              'The goal: students dressed like professionals, not just students talking about a program.',
            ]}
            tip="A student in a lab coat at a 9th-grade advisory does more recruitment work than a 20-slide deck."
          />

          <StepCard
            number={3}
            title={"Train Ambassadors on the WIIFM Message (\"What's In It For Me?\")"}
            bullets={[
              'Lead with concrete ROI first — not abstract terms. Example: "You\'ll earn a $15/hr internship, free college credits (2 ECCs/year), and industry certifications (OSHA, EPA) by graduation."',
              'Be transparent about effort: pair the big rewards with honesty about the workload (journals, labs, rigorous coursework). Honesty builds trust.',
              'Role-play scenarios: practice answering tough questions ("But I want a normal schedule…") — rotate roles between ambassador and skeptical student.',
              "Provide a simple bullet-point script listing paid internships, college credits, certifications, and job prospects — something they can reference without memorizing.",
            ]}
            tip="Authenticity beats polish. A student saying 'it's hard but worth it' converts more peers than a student who only says 'it's amazing.'"
          />

          <StepCard
            number={4}
            title="Deploy at High-Leverage Events"
            bullets={[
              '9th-Grade Advisories: In spring before course selections, send ambassadors into 9th-grade classes with a 5-minute pitch and Q&A. Track attendance — FRNYC guidance suggests attending an info session should be a prerequisite for application.',
              "Middle School Outreach (Timing): Where feasible, involve ambassadors in late-year 8th-grade events or summer bridge programs. A college trip or workshop with ambassadors sparks interest before enrollment.",
              "Open Houses & Family Nights: Reserve 60–90 seconds for an ambassador story at parent events. When a current student testifies (in any language) about career pathway benefits, parents listen more than to adults.",
              'School Tours: Invite prospective students and families to shadow a pathway class with an ambassador host — show a virtual anatomy lab, a tech demo, or a design studio.',
            ]}
            tip="Family nights with an ambassador story in the family's language are 2x more effective at converting hesitant families than staff-only presentations."
          />
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-5 animate-fade-in">
          <Section title="WIIFM Ambassador Script">
            <div className="bg-navy/5 border border-navy/15 rounded-card p-5">
              <p className="text-[10px] font-head font-700 uppercase tracking-widest text-navy mb-3">
                Sample Script — customize for your pathway
              </p>
              <blockquote className="text-sm text-gray-800 leading-relaxed border-l-4 border-navy pl-4 italic">
                "Hey, I'm [Name], a junior in FRNYC Healthcare. You'll earn all these benefits: a{' '}
                <strong>PAID internship</strong> (minimum $15/hr, sometimes up to $25/hr with overtime),{' '}
                <strong>free college credits</strong> (8+ by senior year), and an{' '}
                <strong>industry credential</strong> like Medical Assistant. Plus you can finish high
                school with a state license to work in labs or hospitals. But be honest: you'll still do
                physics and chemistry — FRNYC isn't a vacation, but it's how we turn tough classes into a
                real job. If that sounds good, FRNYC could be for you."
              </blockquote>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Paid internship', 'Free college credits', 'Industry credential', 'Real job skills', 'Honest about challenge'].map((tag) => (
                  <span key={tag} className="text-[10px] bg-navy/10 text-navy px-2 py-0.5 rounded-pill font-head font-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Half-Day Training Agenda">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <div className="divide-y divide-gray-100">
                {[
                  { time: '10 min', phase: 'Welcome & Icebreaker', detail: 'Ambassadors meet each other, share why they joined FRNYC.' },
                  { time: '15 min', phase: 'Program Overview', detail: 'Review the five FRNYC components and timeline.' },
                  { time: '10 min', phase: 'Mission & Goals', detail: 'Emphasize ambassadors\' role as "FRNYC brand managers" and expectations.' },
                  { time: '30 min', phase: 'WIIFM Workshop', detail: 'Group brainstorm: list pathway benefits, practice elevator pitches.' },
                  { time: '30 min', phase: 'Role-Play Scenarios', detail: 'Simulate Q&A with 8th/9th graders and parents; rotate roles.' },
                  { time: '15 min', phase: 'Logistics & Norms', detail: 'Review uniform, scheduling for events, communication protocols.' },
                  { time: '10 min', phase: 'Closing', detail: 'Reflect on training, distribute volunteer hour forms or signed pledge.' },
                ].map(({ time, phase, detail }, i) => (
                  <div key={i} className="flex gap-3 px-4 py-3 items-start">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-[10px] font-head font-700 text-gray-500 w-10">{time}</span>
                    </div>
                    <div>
                      <p className="text-xs font-head font-700 text-gray-900">{phase}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Ambassador Selection Rubric">
            <div className="bg-white rounded-card border border-gray-200 shadow-card overflow-hidden">
              <table className="text-xs w-full">
                <thead>
                  <tr className="bg-navy/5">
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">Criterion</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-gray-700">4 — Exceeds</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-gray-700">2–3 — Meets</th>
                    <th className="text-center px-3 py-2.5 font-head font-700 text-gray-700">1 — Developing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['FRNYC Knowledge', 'Excels at explaining pathways clearly', 'Can describe basic benefits', 'Uninformed about program'],
                    ['Communication', 'Engaging, clear, age-appropriate', 'Gets the message across', 'Struggles to explain clearly'],
                    ['Leadership/Clubs', 'Active in 2+ school activities', 'Involved in at least one', 'No extracurricular involvement'],
                    ['Demographic Diversity', 'Reflects school community well', 'Partial representation', 'Does not reflect community'],
                    ['Consistent Attendance', '90%+ attendance rate', '80–89% attendance', 'Below 80% attendance'],
                  ].map(([criterion, high, mid, low], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2.5 font-head font-700 text-gray-800">{criterion}</td>
                      <td className="px-3 py-2.5 text-center text-green-700">{high}</td>
                      <td className="px-3 py-2.5 text-center text-blue-700">{mid}</td>
                      <td className="px-3 py-2.5 text-center text-red-600">{low}</td>
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
                  activities: 'Use existing staff time; digital/social media outreach only. Ambassadors serve for volunteer credit.',
                  deliverables: 'Printing costs only',
                },
                {
                  level: 'Medium',
                  range: '$1,000 – $3,000',
                  color: '#0F3460',
                  activities: 'Branded T-shirts/hoodies, cover travel to MS fairs, small stipend (meal coupons).',
                  deliverables: 'Uniforms + travel + stipend',
                },
                {
                  level: 'High',
                  range: '$5,000+',
                  color: '#B5162B',
                  activities: 'Professional video/photo for social proof, honorarium for ambassadors, large-scale launch event.',
                  deliverables: 'Video content + event + honorarium',
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

          <Section title="Event Deployment Checklist">
            <div className="bg-white rounded-card border border-gray-200 shadow-card p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Ambassadors have uniforms and printed talking points',
                  'Materials (flyers, sign-up sheets, QR codes) are ready',
                  'Parent/staff contacts are informed of the event',
                  'Transportation for off-site visits is confirmed',
                  'Translator available if needed (in-person or virtual)',
                  'Ambassador has practiced their 5-minute pitch',
                  'Sign-in sheet or digital form is set up',
                  'Follow-up plan is in place for interested students',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-navy/40 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Frequently Asked Questions">
            <div className="space-y-2">
              <Accordion title="What do we do if we can't find enough diverse ambassadors?">
                <p>Start with who you have and make diversity a goal for next year. Meanwhile, ensure the ambassadors you do have speak directly to concerns from underrepresented groups. You can also recruit one ambassador specifically from each demographic your school serves — even if they only present at targeted events.</p>
              </Accordion>
              <Accordion title="How do we handle ambassadors who drop out mid-year?">
                <p>Build in a cohort of 8–10 to account for natural attrition. Conduct brief monthly check-ins (5 minutes each) to catch burnout early. Have a "backup bench" of 2–3 students who are briefed but not yet active — activate them if needed.</p>
              </Accordion>
              <Accordion title="Can 10th graders be ambassadors?">
                <p>Yes — especially for recruiting upcoming 10th graders (i.e., current 9th graders). 10th graders who recently went through the selection process can speak authentically about the experience. However, 11th and 12th graders are preferred for middle school outreach since they can speak to the full pathway arc.</p>
              </Accordion>
              <Accordion title='How do we incentivize ambassadors without a budget for stipends?'>
                <p>Tie ambassador work to existing incentive structures: honor society hours, IB CAS hours, community service requirements, or official recognition on transcripts. A signed certificate from the principal, a special cord at graduation, or a LinkedIn recommendation letter from the counselor are meaningful incentives with zero budget impact.</p>
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
                  <tr className="bg-navy/5">
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">KPI / Metric</th>
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">FRNYC KIM Alignment</th>
                    <th className="text-left px-4 py-2.5 font-head font-700 text-gray-700">Data Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    [
                      'FRNYC cohort identified (# of students)',
                      'KIM: % of target cohort enrolled by end-of-year',
                      'STARS Pathway sequence enrollment data',
                    ],
                    [
                      '100% FRNYC students complete 1:1 advising',
                      'KIM: All FRNYC 10th–12th graders have first 1:1',
                      'STARS Advising logs',
                    ],
                    [
                      'Attendance at Ambassador events',
                      'KIM: % of FRNYC students attending info sessions',
                      'Event sign-in sheets, attendance data',
                    ],
                    [
                      'Distribution of FRNYC swag/welcome kits',
                      'KIM: FRNYC branding presence (materials distribution)',
                      'Inventory tracking records',
                    ],
                  ].map(([kpi, kim, source], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-600 text-gray-800">{kpi}</td>
                      <td className="px-4 py-3 text-navy">{kim}</td>
                      <td className="px-4 py-3 text-gray-500 italic">{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 italic">
                  Actual KIM wording and targets should be confirmed with the FRNYC KIMs document for SY25–26.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Monthly Program Health Check">
            <div className="bg-white rounded-card border border-gray-200 shadow-card p-5 space-y-4">
              <p className="text-xs text-gray-600">Review these four indicators monthly to catch issues early:</p>
              {[
                {
                  label: 'Events Completed',
                  question: 'How many outreach events did ambassadors participate in this month?',
                  target: 'At least 1 per ambassador per month during active recruitment periods',
                  color: '#0F3460',
                },
                {
                  label: 'New Sign-Ups',
                  question: 'How many new students expressed interest or submitted applications from ambassador events?',
                  target: 'Track source of each application to attribute ambassador impact',
                  color: '#2D6A4F',
                },
                {
                  label: 'Ambassador Retention',
                  question: 'How many ambassadors are still active? Any dropped out?',
                  target: '80%+ retention across the year; investigate drops immediately',
                  color: '#D97706',
                },
                {
                  label: 'Ambassador Confidence',
                  question: 'Brief survey: Do ambassadors feel prepared and supported?',
                  target: 'Monthly 5-question pulse survey; any score below 3/5 triggers a check-in',
                  color: '#B5162B',
                },
              ].map(({ label, question, target, color }, i) => (
                <div key={i} className="border-l-4 pl-4" style={{ borderColor: color }}>
                  <p className="text-sm font-head font-700 text-gray-900">{label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{question}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    <span className="font-head font-700">Target: </span>
                    {target}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Annual Program Review Checklist">
            <div className="bg-white rounded-card border border-gray-200 shadow-card p-4">
              <div className="space-y-2">
                {[
                  'Total students reached through ambassador events vs. previous year',
                  'Application conversion rate from ambassador-touched students',
                  'Demographics of ambassadors vs. school demographics (equity check)',
                  'Ambassador satisfaction: would they do it again? What would they change?',
                  'Budget utilization: what had the highest impact per dollar?',
                  'Events that generated the most interest: document for next year',
                  'Gaps in coverage: which grades, languages, or communities were underserved?',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-navy/40 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <div className="bg-gold/10 border border-gold/30 rounded-card p-4">
            <div className="flex gap-3">
              <Shirt size={16} className="text-yellow-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-head font-700 text-gray-900 mb-1">Remember: Visibility is a metric too</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Track how often FRNYC ambassadors appear in school hallways, morning announcements, social
                  media posts, and parent communications. Brand presence is a leading indicator of
                  enrollment growth — measure it even when it can't be quantified perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
