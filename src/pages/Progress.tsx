import { missions } from '../data/missions'
import { badges } from '../data/badges'
import { phases } from '../data/phases'
import { BadgeCard } from '../components/ui/BadgeCard'
import { CompletionRing } from '../components/ui/CompletionRing'
import { ProgressBar } from '../components/ui/ProgressBar'
import type { UserProgress } from '../types'

interface Props {
  progress: UserProgress
}

export function Progress({ progress }: Props) {
  const totalMissions = missions.length
  const completedMissions = progress.completedMissions.length
  const earnedBadges = progress.earnedBadges.length
  const totalBadges = badges.length

  const phaseProgress = phases.map((p) => {
    const phaseMissions = missions.filter((m) => m.phase === p.id)
    const done = phaseMissions.filter((m) => progress.completedMissions.includes(m.id)).length
    return { phase: p, total: phaseMissions.length, done }
  })

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Overall stats */}
      <div className="bg-navy rounded-card p-6">
        <h2 className="text-white font-head font-800 text-lg mb-6">Your Progress</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <CompletionRing
              value={completedMissions}
              max={Math.max(totalMissions, 1)}
              size={72}
              color="#F5C518"
              trackColor="rgba(255,255,255,0.15)"
              label="missions"
            />
            <p className="text-white/60 text-xs mt-2 font-head">{completedMissions}/{totalMissions} Missions</p>
          </div>
          <div className="text-center">
            <CompletionRing
              value={earnedBadges}
              max={Math.max(totalBadges, 1)}
              size={72}
              color="#B5162B"
              trackColor="rgba(255,255,255,0.15)"
              label="badges"
            />
            <p className="text-white/60 text-xs mt-2 font-head">{earnedBadges}/{totalBadges} Badges</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-head font-900 text-gold">{progress.streak}</p>
            <p className="text-white/60 text-xs font-head mt-1">Day Streak 🔥</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-head font-900 text-gold capitalize">{progress.phase}</p>
            <p className="text-white/60 text-xs font-head mt-1">Current Phase</p>
          </div>
        </div>
      </div>

      {/* Phase breakdown */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-4">Progress by Phase</h3>
        <div className="space-y-3">
          {phaseProgress.map(({ phase, total, done }) => (
            <div key={phase.id} className="bg-white rounded-card border border-gray-200 p-4 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-head font-800 text-white"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.letter}
                  </div>
                  <div>
                    <p className="text-sm font-head font-700 text-gray-800">{phase.label}</p>
                    <p className="text-xs text-gray-400">{done}/{total} missions</p>
                  </div>
                </div>
                <span className="text-sm font-head font-700" style={{ color: phase.color }}>
                  {total > 0 ? Math.round((done / total) * 100) : 0}%
                </span>
              </div>
              <ProgressBar
                value={done}
                max={Math.max(total, 1)}
                color={phase.color}
                height={5}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-4">Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {badges.map((b) => (
            <BadgeCard
              key={b.id}
              badge={b}
              earned={progress.earnedBadges.includes(b.id)}
            />
          ))}
        </div>
      </section>

      {/* Completed missions */}
      {completedMissions > 0 && (
        <section>
          <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-4">Completed Missions</h3>
          <div className="space-y-2">
            {progress.completedMissions.map((id) => {
              const m = missions.find((x) => x.id === id)
              if (!m) return null
              return (
                <div key={id} className="bg-white rounded-card border border-emerald-200 p-4 flex items-center gap-3 shadow-card">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-head font-700 text-gray-900">{m.title}</p>
                    {m.badge && (
                      <p className="text-xs text-emerald-600 mt-0.5">🏅 {m.badge}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {completedMissions === 0 && (
        <div className="text-center py-12 bg-white rounded-card border border-gray-200">
          <p className="text-4xl mb-3">🚀</p>
          <p className="text-gray-500 text-sm">No missions completed yet.</p>
          <p className="text-gray-400 text-xs mt-1">Complete your first mission to start earning badges.</p>
        </div>
      )}
    </div>
  )
}
