import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Trophy } from 'lucide-react'
import { getMissionById } from '../data/missions'
import { getPhaseInfo } from '../data/phases'
import { ProgressBar } from '../components/ui/ProgressBar'
import type { UserProgress, StepType } from '../types'

const stepConfig: Record<StepType, { label: string; color: string; bg: string; icon: string }> = {
  'do-now': { label: 'Do Now', color: '#B5162B', bg: '#FEF2F4', icon: '⚡' },
  objective: { label: 'Objective', color: '#0F3460', bg: '#EEF4FB', icon: '🎯' },
  model: { label: 'See the Model', color: '#1B4D7E', bg: '#F0F6FF', icon: '👁' },
  'guided-practice': { label: 'Guided Practice', color: '#D97706', bg: '#FFFBEB', icon: '🤝' },
  'independent-practice': { label: 'Independent Practice', color: '#059669', bg: '#ECFDF5', icon: '💪' },
  share: { label: 'Share', color: '#7C3AED', bg: '#F5F3FF', icon: '📢' },
  'exit-ticket': { label: 'Exit Ticket', color: '#374151', bg: '#F9FAFB', icon: '✅' },
}

interface Props {
  progress: UserProgress
  onStepAdvance: (missionId: string, stepIndex: number) => void
  onComplete: (missionId: string, badgeId?: string) => void
}

export function MissionDetail({ progress, onStepAdvance, onComplete }: Props) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const mission = getMissionById(id ?? '')
  const [showCelebration, setShowCelebration] = useState(false)

  const currentStepIndex = progress.missionStepProgress[id ?? ''] ?? 0
  const isComplete = progress.completedMissions.includes(id ?? '')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStepIndex])

  if (!mission) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Mission not found.</p>
        <button onClick={() => navigate('/missions')} className="mt-4 text-navy font-head font-700 underline">
          Back to missions
        </button>
      </div>
    )
  }

  const phase = getPhaseInfo(mission.phase)
  const totalSteps = mission.steps.length
  const pct = isComplete ? 100 : Math.round((currentStepIndex / totalSteps) * 100)

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      onStepAdvance(mission.id, currentStepIndex)
    } else {
      onComplete(mission.id, mission.badge ? mission.badge.toLowerCase().replace(/\s+/g, '-') : undefined)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  if (showCelebration) {
    return (
      <div className="min-h-full bg-navy-dark flex items-center justify-center p-8 animate-fade-in">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6 animate-pop">🏆</div>
          <h2 className="text-3xl font-head font-900 text-white mb-3">Mission Complete!</h2>
          <p className="text-white/60 mb-2">{mission.title}</p>
          {mission.badge && (
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-pill px-4 py-2 mt-4 mb-8">
              <Trophy size={14} className="text-gold" />
              <span className="text-gold font-head font-700 text-sm">{mission.badge} badge earned</span>
            </div>
          )}
          <br />
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-crimson hover:bg-crimson-light text-white font-head font-700 px-8 py-3 rounded-pill transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const currentStep = mission.steps[Math.min(currentStepIndex, totalSteps - 1)]
  const stepMeta = stepConfig[currentStep.type]

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate('/missions')}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-6 transition"
      >
        <ArrowLeft size={15} />
        All missions
      </button>

      {/* Mission header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-head font-700 uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ backgroundColor: phase.bg, color: phase.color }}
          >
            {phase.letter} · {phase.label}
          </span>
          {isComplete && (
            <span className="text-[10px] font-head font-700 uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Complete
            </span>
          )}
        </div>
        <h1 className="text-2xl font-head font-900 text-gray-900 mb-2 leading-tight">{mission.title}</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{mission.why}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
          <span>⏱ {mission.estimatedTime}</span>
          <span>📅 Due: {mission.dueLabel}</span>
          <span>📋 {mission.requiredOutput}</span>
        </div>

        {/* Done when */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <p className="text-[10px] font-head font-700 uppercase tracking-wide text-emerald-600 mb-1">Done when…</p>
          <p className="text-sm text-emerald-800">{mission.doneWhen}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-head text-gray-400">
            Step {Math.min(currentStepIndex + 1, totalSteps)} of {totalSteps}
          </p>
          <p className="text-xs font-head font-700" style={{ color: phase.color }}>{pct}% complete</p>
        </div>
        <ProgressBar value={pct} color={isComplete ? '#059669' : phase.color} height={6} />
      </div>

      {/* Step breadcrumbs */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
        {mission.steps.map((s, i) => {
          const meta = stepConfig[s.type]
          const done = isComplete || i < currentStepIndex
          const active = !isComplete && i === currentStepIndex
          return (
            <div
              key={s.id}
              className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-head font-700 transition ${
                done
                  ? 'bg-emerald-500 text-white'
                  : active
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
              style={active ? { backgroundColor: meta.color } : {}}
              title={meta.label}
            >
              {done ? '✓' : i + 1}
            </div>
          )
        })}
      </div>

      {/* Current step card */}
      {!isComplete && (
        <div
          className="rounded-card border-2 p-6 mb-4 animate-slide-up"
          style={{ borderColor: stepMeta.color + '30', backgroundColor: stepMeta.bg }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{stepMeta.icon}</span>
            <span
              className="text-xs font-head font-700 uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: stepMeta.color }}
            >
              {stepMeta.label}
            </span>
          </div>

          <h2 className="text-xl font-head font-800 text-gray-900 mb-3 leading-snug">
            {currentStep.title}
          </h2>

          <p className="text-sm text-gray-700 leading-relaxed mb-5">{currentStep.content}</p>

          {/* Action box */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <p className="text-[10px] font-head font-700 uppercase tracking-wide text-gray-400 mb-1.5">Your action</p>
            <p className="text-sm text-gray-800 font-head font-600">{currentStep.action}</p>
          </div>

          {/* Output box */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-[10px] font-head font-700 uppercase tracking-wide text-gray-400 mb-1.5">Output</p>
            <p className="text-sm text-gray-800">{currentStep.output}</p>
          </div>
        </div>
      )}

      {/* Completed view — show all steps collapsed */}
      {isComplete && (
        <div className="space-y-2 mb-4">
          {mission.steps.map((s) => {
            const meta = stepConfig[s.type]
            return (
              <StepSummary key={s.id} step={s} meta={meta} />
            )
          })}
        </div>
      )}

      {/* Navigation */}
      {!isComplete && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => currentStepIndex > 0 && onStepAdvance(mission.id, currentStepIndex - 2)}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition px-4 py-2"
          >
            <ArrowLeft size={15} />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-3 text-white font-head font-700 px-6 py-3 rounded-pill text-sm transition-all hover:shadow-md hover:scale-105 active:scale-95"
            style={{ backgroundColor: currentStepIndex === totalSteps - 1 ? '#059669' : stepMeta.color }}
          >
            {currentStepIndex === totalSteps - 1 ? (
              <>
                <Check size={15} />
                Mark Complete
              </>
            ) : (
              <>
                Next Step
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      )}

      {isComplete && (
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/missions')}
            className="text-navy font-head font-700 text-sm hover:underline"
          >
            ← Find your next mission
          </button>
        </div>
      )}
    </div>
  )
}

function StepSummary({
  step,
  meta,
}: {
  step: { title: string; content: string; action: string; output: string; type: StepType }
  meta: { label: string; color: string; bg: string; icon: string }
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check size={10} className="text-white" />
          </div>
          <div>
            <span className="text-[10px] font-head font-700 uppercase tracking-wide" style={{ color: meta.color }}>
              {meta.label}
            </span>
            <p className="text-sm font-head font-600 text-gray-800">{step.title}</p>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 space-y-2">
          <p>{step.content}</p>
          <p className="text-xs text-gray-400"><strong>Action:</strong> {step.action}</p>
          <p className="text-xs text-gray-400"><strong>Output:</strong> {step.output}</p>
        </div>
      )}
    </div>
  )
}
