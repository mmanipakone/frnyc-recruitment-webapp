import { missions } from '../data/missions'
import { roles } from '../data/roles'
import { phases } from '../data/phases'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusPill } from '../components/ui/StatusPill'
import type { UserProgress, MissionStatus } from '../types'

function getMissionStatus(missionId: string, progress: UserProgress): MissionStatus {
  if (progress.completedMissions.includes(missionId)) return 'completed'
  const mission = missions.find((m) => m.id === missionId)
  if (!mission) return 'locked'
  const depsComplete = (mission.dependsOn ?? []).every((d) => progress.completedMissions.includes(d))
  if (!depsComplete) return 'locked'
  if ((progress.missionStepProgress[missionId] ?? 0) > 0) return 'in-progress'
  return 'not-started'
}

interface Props {
  progress: UserProgress
}

const mockTeam: Array<{
  name: string
  role: string
  completedMissions: string[]
  initials: string
}> = [
  {
    name: 'Valeria Reyes',
    role: 'counselor',
    completedMissions: ['mission-roadmap', 'mission-materials'],
    initials: 'VR',
  },
  {
    name: 'James Obi',
    role: 'pathway-teacher',
    completedMissions: ['mission-roadmap'],
    initials: 'JO',
  },
  {
    name: 'Carmen Diaz',
    role: 'family-engagement',
    completedMissions: [],
    initials: 'CD',
  },
  {
    name: 'Principal T. Washington',
    role: 'principal',
    completedMissions: ['mission-retention'],
    initials: 'TW',
  },
]

export function TeamView({ progress }: Props) {
  const schoolCompletedCount = progress.completedMissions.length
  const overallPct = Math.round((schoolCompletedCount / missions.length) * 100)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-head font-900 text-gray-900 mb-1">Team View</h2>
        <p className="text-sm text-gray-500">
          {progress.schoolName ? `${progress.schoolName} — ` : ''}School-wide mission progress.
        </p>
      </div>

      {/* School health card */}
      <div className="bg-navy rounded-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gold text-xs font-head font-700 uppercase tracking-widest mb-1">School Progress</p>
            <p className="text-white text-xl font-head font-800">
              {schoolCompletedCount} of {missions.length} missions complete
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-head font-900 text-gold">{overallPct}%</p>
            <p className="text-white/40 text-xs font-head">overall</p>
          </div>
        </div>
        <ProgressBar value={overallPct} color="#F5C518" trackColor="rgba(255,255,255,0.15)" height={8} />
      </div>

      {/* Phase overview */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">Progress by Phase</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {phases.map((p) => {
            const phaseMissions = missions.filter((m) => m.phase === p.id)
            const done = phaseMissions.filter((m) => progress.completedMissions.includes(m.id)).length
            const pct = phaseMissions.length > 0 ? Math.round((done / phaseMissions.length) * 100) : 0
            return (
              <div
                key={p.id}
                className="rounded-card border p-3 text-center"
                style={{ borderColor: p.color + '30', backgroundColor: p.bg }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-head font-800 text-white mx-auto mb-2"
                  style={{ backgroundColor: p.color }}
                >
                  {p.letter}
                </div>
                <p className="text-xs font-head font-700" style={{ color: p.color }}>{p.label}</p>
                <p className="text-lg font-head font-900 mt-1" style={{ color: p.color }}>{pct}%</p>
                <p className="text-[10px] text-gray-400">{done}/{phaseMissions.length}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Mission status table */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">All Missions</h3>
        <div className="bg-white rounded-card border border-gray-200 overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-head font-700 uppercase tracking-wide text-gray-400">Mission</th>
                <th className="text-left px-4 py-3 text-xs font-head font-700 uppercase tracking-wide text-gray-400 hidden sm:table-cell">Phase</th>
                <th className="text-left px-4 py-3 text-xs font-head font-700 uppercase tracking-wide text-gray-400">Status</th>
                <th className="text-left px-4 py-3 text-xs font-head font-700 uppercase tracking-wide text-gray-400 hidden md:table-cell">Owners</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m, i) => {
                const status = getMissionStatus(m.id, progress)
                const phaseInfo = phases.find((p) => p.id === m.phase)
                return (
                  <tr key={m.id} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="px-4 py-3">
                      <p className="font-head font-600 text-gray-900 text-sm leading-snug">{m.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{m.dueLabel}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className="text-[10px] font-head font-700 uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: phaseInfo?.bg, color: phaseInfo?.color }}
                      >
                        {phaseInfo?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={status} />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex gap-1">
                        {m.owner.slice(0, 3).map((ownerId) => {
                          const r = roles.find((x) => x.id === ownerId)
                          return r ? (
                            <span
                              key={ownerId}
                              title={r.shortTitle}
                              className="text-base"
                            >
                              {r.icon}
                            </span>
                          ) : null
                        })}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mock team roster */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">
          Team Roster
          <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-head normal-case">
            Demo data
          </span>
        </h3>
        <div className="space-y-2">
          {mockTeam.map((member) => {
            const r = roles.find((x) => x.id === member.role)
            const myMissions = missions.filter((m) => m.owner.includes(member.role as never))
            const pct = myMissions.length > 0
              ? Math.round((member.completedMissions.length / myMissions.length) * 100)
              : 0
            return (
              <div key={member.name} className="bg-white rounded-card border border-gray-200 p-4 flex items-center gap-4 shadow-card">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-head font-700 text-white flex-shrink-0"
                  style={{ backgroundColor: r?.color ?? '#0F3460' }}
                >
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-head font-700 text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-400">{r?.shortTitle}</p>
                </div>
                <div className="w-32 hidden sm:block">
                  <ProgressBar value={pct} color={r?.color ?? '#0F3460'} height={5} />
                  <p className="text-[10px] text-gray-400 mt-0.5">{member.completedMissions.length}/{myMissions.length} missions</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
