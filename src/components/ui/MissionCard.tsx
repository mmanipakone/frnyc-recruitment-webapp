import { Clock, Calendar, ChevronRight, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Mission, MissionStatus } from '../../types'
import { StatusPill } from './StatusPill'
import { ProgressBar } from './ProgressBar'
import { getPhaseInfo } from '../../data/phases'

interface Props {
  mission: Mission
  status: MissionStatus
  stepProgress: number
  compact?: boolean
}

export function MissionCard({ mission, status, stepProgress, compact }: Props) {
  const navigate = useNavigate()
  const phase = getPhaseInfo(mission.phase)
  const totalSteps = mission.steps.length
  const pct = totalSteps > 0 ? Math.round((stepProgress / totalSteps) * 100) : 0
  const isLocked = status === 'locked'

  return (
    <button
      onClick={() => !isLocked && navigate(`/missions/${mission.id}`)}
      disabled={isLocked}
      className={`w-full text-left rounded-card border transition-all duration-200 group ${
        isLocked
          ? 'bg-gray-50 border-gray-100 cursor-not-allowed'
          : 'bg-white border-gray-200 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer'
      } ${compact ? 'p-4' : 'p-5'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-head font-700 uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: phase.bg, color: phase.color }}
            >
              {phase.letter} · {phase.label}
            </span>
            <StatusPill status={status} />
          </div>
          <h3 className={`font-head font-700 text-gray-900 leading-snug ${compact ? 'text-sm' : 'text-base'}`}>
            {isLocked && <Lock size={12} className="inline mr-1 text-gray-400" />}
            {mission.title}
          </h3>
        </div>
        {!isLocked && (
          <ChevronRight
            size={18}
            className="text-gray-300 group-hover:text-navy flex-shrink-0 mt-1 transition-colors"
          />
        )}
      </div>

      {/* Why */}
      {!compact && (
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{mission.why}</p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {mission.estimatedTime}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {mission.dueLabel}
        </span>
      </div>

      {/* Progress */}
      {status !== 'not-started' && status !== 'locked' && (
        <div>
          <ProgressBar
            value={status === 'completed' ? 100 : pct}
            color={status === 'completed' ? '#059669' : phase.color}
            height={5}
          />
          {status === 'in-progress' && (
            <p className="text-[10px] text-gray-400 mt-1">
              Step {Math.min(stepProgress + 1, totalSteps)} of {totalSteps}
            </p>
          )}
        </div>
      )}

      {/* Required output */}
      {!compact && status !== 'locked' && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 uppercase font-head tracking-wide font-600">Required output</p>
          <p className="text-xs text-gray-600 mt-0.5">{mission.requiredOutput}</p>
        </div>
      )}
    </button>
  )
}
