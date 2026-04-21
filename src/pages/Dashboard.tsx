import { useNavigate } from 'react-router-dom'
import { ArrowRight, AlertTriangle, TrendingUp, Zap, Eye } from 'lucide-react'
import type { UserProgress } from '../types'
import { missions, getMissionsForRole } from '../data/missions'
import { getPhaseInfo, phases } from '../data/phases'
import { getRoleById } from '../data/roles'
import { CompletionRing } from '../components/ui/CompletionRing'
import { MissionCard } from '../components/ui/MissionCard'
import type { MissionStatus } from '../types'

interface Props {
  progress: UserProgress
  onToggleFocusMode: () => void
}

function getMissionStatus(
  missionId: string,
  progress: UserProgress
): MissionStatus {
  if (progress.completedMissions.includes(missionId)) return 'completed'
  const mission = missions.find((m) => m.id === missionId)
  if (!mission) return 'locked'
  const depsComplete = (mission.dependsOn ?? []).every((d) =>
    progress.completedMissions.includes(d)
  )
  if (!depsComplete) return 'locked'
  if ((progress.missionStepProgress[missionId] ?? 0) > 0) return 'in-progress'
  return 'not-started'
}

export function Dashboard({ progress, onToggleFocusMode }: Props) {
  const navigate = useNavigate()
  const role = getRoleById(progress.role)
  const phase = getPhaseInfo(progress.phase)
  const myMissions = getMissionsForRole(progress.role)
  const completedCount = progress.completedMissions.length
  const totalCount = myMissions.length

  // Focus mission = first in-progress or next not-started
  const focusMission =
    myMissions.find((m) => getMissionStatus(m.id, progress) === 'in-progress') ??
    myMissions.find((m) => getMissionStatus(m.id, progress) === 'not-started')

  const phaseIndex = phases.findIndex((p) => p.id === progress.phase)

  const riskAlerts: string[] = []
  if (completedCount === 0) riskAlerts.push('No missions started yet — your school is behind the launch timeline.')
  if (!progress.schoolName) riskAlerts.push('School name not set — your team can\'t identify your progress.')

  if (progress.focusModeEnabled && focusMission) {
    const fStatus = getMissionStatus(focusMission.id, progress)
    const fStep = progress.missionStepProgress[focusMission.id] ?? 0
    return (
      <div className="min-h-full bg-navy-dark flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full text-center mb-8">
          <p className="text-gold text-xs font-head font-700 uppercase tracking-widest mb-4">Focus Mode</p>
          <h2 className="text-3xl font-head font-900 text-white mb-3 leading-tight">
            {focusMission.title}
          </h2>
          <p className="text-white/50 text-sm mb-2">{focusMission.estimatedTime} · {focusMission.dueLabel}</p>
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mb-6 overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all"
              style={{ width: `${(fStep / focusMission.steps.length) * 100}%` }}
            />
          </div>
          <button
            onClick={() => navigate(`/missions/${focusMission.id}`)}
            className="bg-crimson hover:bg-crimson-light text-white font-head font-700 px-8 py-4 rounded-pill text-base transition-all hover:shadow-lg mb-4 w-full"
          >
            {fStatus === 'in-progress' ? 'Continue Mission' : 'Start Mission'} →
          </button>
          <button
            onClick={onToggleFocusMode}
            className="text-white/40 hover:text-white text-xs font-head transition"
          >
            Exit Focus Mode
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-navy rounded-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-gold text-xs font-head font-700 uppercase tracking-widest mb-1">
            {role?.icon} {role?.shortTitle}
            {progress.schoolName ? ` · ${progress.schoolName}` : ''}
          </p>
          <h2 className="text-xl font-head font-800 text-white">Good to see you.</h2>
          <p className="text-white/60 text-sm mt-1">
            You're in the <span className="text-gold font-head font-700">{phase.label}</span> phase of the FRNYC framework.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CompletionRing
            value={completedCount}
            max={Math.max(totalCount, 1)}
            size={72}
            color="#F5C518"
            trackColor="rgba(255,255,255,0.15)"
            label="done"
          />
          <button
            onClick={onToggleFocusMode}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-head font-700 px-4 py-2 rounded-pill transition"
          >
            <Eye size={13} />
            Focus Mode
          </button>
        </div>
      </div>

      {/* Risk alerts */}
      {riskAlerts.length > 0 && (
        <div className="space-y-2">
          {riskAlerts.map((alert) => (
            <div key={alert} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-card p-4">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{alert}</p>
            </div>
          ))}
        </div>
      )}

      {/* Primary focus */}
      {focusMission && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-crimson" />
            <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500">Your Next Action</h3>
          </div>
          <div className="bg-white rounded-card border-2 border-crimson/20 shadow-card p-5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-head font-700 text-crimson uppercase tracking-wide mb-1">
                  {getMissionStatus(focusMission.id, progress) === 'in-progress' ? 'Continue' : 'Start next'}
                </p>
                <h3 className="text-lg font-head font-800 text-gray-900 mb-2 leading-snug">
                  {focusMission.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{focusMission.why}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>⏱ {focusMission.estimatedTime}</span>
                  <span>📅 {focusMission.dueLabel}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/missions/${focusMission.id}`)}
                className="flex items-center gap-2 bg-crimson hover:bg-crimson-light text-white font-head font-700 px-5 py-3 rounded-pill text-sm transition-all hover:shadow-md flex-shrink-0"
              >
                {getMissionStatus(focusMission.id, progress) === 'in-progress' ? 'Continue' : 'Start'}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Phase progress */}
      <section>
        <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">FRNYC Framework Progress</h3>
        <div className="bg-white rounded-card border border-gray-200 p-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {phases.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border transition-all ${
                    p.id === progress.phase
                      ? 'border-2 shadow-sm'
                      : i < phaseIndex
                      ? 'opacity-60'
                      : 'opacity-30'
                  }`}
                  style={
                    p.id === progress.phase
                      ? { borderColor: p.color, backgroundColor: p.bg }
                      : { borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }
                  }
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-head font-800"
                    style={
                      p.id === progress.phase
                        ? { backgroundColor: p.color, color: '#fff' }
                        : i < phaseIndex
                        ? { backgroundColor: '#059669', color: '#fff' }
                        : { backgroundColor: '#E5E7EB', color: '#9CA3AF' }
                    }
                  >
                    {i < phaseIndex ? '✓' : p.letter}
                  </span>
                  <span
                    className="text-[10px] font-head font-700 uppercase tracking-wide"
                    style={{ color: p.id === progress.phase ? p.color : '#9CA3AF' }}
                  >
                    {p.label}
                  </span>
                </div>
                {i < phases.length - 1 && (
                  <div className={`w-4 h-0.5 flex-shrink-0 ${i < phaseIndex ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">{phase.description}</p>
        </div>
      </section>

      {/* My missions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-navy" />
            <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500">My Missions</h3>
          </div>
          <button
            onClick={() => navigate('/missions')}
            className="text-xs text-navy font-head font-700 hover:underline"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {myMissions.slice(0, 4).map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              status={getMissionStatus(m.id, progress)}
              stepProgress={progress.missionStepProgress[m.id] ?? 0}
              compact
            />
          ))}
        </div>
      </section>

      {/* Recent wins */}
      {completedCount > 0 && (
        <section>
          <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">Recent Wins</h3>
          <div className="bg-white rounded-card border border-gray-200 p-5">
            <div className="space-y-3">
              {progress.completedMissions.map((id) => {
                const m = missions.find((x) => x.id === id)
                return m ? (
                  <div key={id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-head font-600 text-gray-800">{m.title}</p>
                      {m.badge && (
                        <p className="text-xs text-emerald-600 font-head">
                          🏅 Earned: {m.badge}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
