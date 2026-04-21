import { useState } from 'react'
import { missions } from '../data/missions'
import { phases } from '../data/phases'
import { MissionCard } from '../components/ui/MissionCard'
import type { UserProgress, MissionStatus, Phase } from '../types'

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

export function Missions({ progress }: Props) {
  const [filter, setFilter] = useState<Phase | 'all'>('all')

  const filtered = filter === 'all' ? missions : missions.filter((m) => m.phase === filter)
  const myMissionIds = new Set(
    missions.filter((m) => m.owner.includes(progress.role as never)).map((m) => m.id)
  )

  const counts = {
    completed: missions.filter((m) => progress.completedMissions.includes(m.id)).length,
    inProgress: missions.filter((m) => getMissionStatus(m.id, progress) === 'in-progress').length,
    available: missions.filter((m) => getMissionStatus(m.id, progress) === 'not-started').length,
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Completed', value: counts.completed, color: '#059669', bg: '#ECFDF5' },
          { label: 'In Progress', value: counts.inProgress, color: '#1D4ED8', bg: '#EFF6FF' },
          { label: 'Available', value: counts.available, color: '#B45309', bg: '#FFFBEB' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-card border border-gray-200 p-4 text-center shadow-card">
            <p className="text-2xl font-head font-900" style={{ color }}>{value}</p>
            <p className="text-xs font-head text-gray-400 uppercase tracking-wide mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Phase filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-pill text-xs font-head font-700 transition flex-shrink-0 ${
            filter === 'all' ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy/30'
          }`}
        >
          All phases
        </button>
        {phases.map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter(p.id)}
            className={`px-4 py-1.5 rounded-pill text-xs font-head font-700 transition flex-shrink-0 ${
              filter === p.id ? 'text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy/30'
            }`}
            style={filter === p.id ? { backgroundColor: p.color } : {}}
          >
            {p.letter} · {p.label}
          </button>
        ))}
      </div>

      {/* Missions list */}
      <div className="space-y-3">
        {filtered.map((m) => {
          const isMyMission = myMissionIds.has(m.id)
          const status = getMissionStatus(m.id, progress)
          return (
            <div key={m.id} className={!isMyMission ? 'opacity-60' : undefined}>
              {!isMyMission && (
                <p className="text-[10px] font-head font-700 uppercase tracking-wide text-gray-400 mb-1 ml-1">
                  Not in your role
                </p>
              )}
              <MissionCard
                mission={m}
                status={status}
                stepProgress={progress.missionStepProgress[m.id] ?? 0}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
