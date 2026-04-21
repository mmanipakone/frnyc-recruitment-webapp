import { useState, useCallback } from 'react'
import type { UserProgress, RoleId, Phase } from '../types'

const STORAGE_KEY = 'frnyc_progress'

const defaultProgress: UserProgress = {
  role: 'counselor',
  schoolName: '',
  completedMissions: [],
  missionStepProgress: {},
  earnedBadges: [],
  streak: 0,
  lastActive: '',
  phase: 'awareness',
  focusModeEnabled: false,
  onboarded: false,
}

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    return { ...defaultProgress, ...JSON.parse(raw) }
  } catch {
    return defaultProgress
  }
}

function saveProgress(p: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function useProgress() {
  const [progress, setProgressState] = useState<UserProgress>(loadProgress)

  const setProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgressState((prev) => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const setRole = useCallback(
    (role: RoleId) => setProgress((p) => ({ ...p, role })),
    [setProgress]
  )

  const setSchoolName = useCallback(
    (schoolName: string) => setProgress((p) => ({ ...p, schoolName })),
    [setProgress]
  )

  const setOnboarded = useCallback(
    () => setProgress((p) => ({ ...p, onboarded: true, lastActive: new Date().toISOString() })),
    [setProgress]
  )

  const setPhase = useCallback(
    (phase: Phase) => setProgress((p) => ({ ...p, phase })),
    [setProgress]
  )

  const advanceMissionStep = useCallback(
    (missionId: string, stepIndex: number) => {
      setProgress((p) => ({
        ...p,
        missionStepProgress: {
          ...p.missionStepProgress,
          [missionId]: Math.max(p.missionStepProgress[missionId] ?? 0, stepIndex + 1),
        },
      }))
    },
    [setProgress]
  )

  const completeMission = useCallback(
    (missionId: string, badgeId?: string) => {
      setProgress((p) => {
        const today = new Date().toISOString().slice(0, 10)
        const wasActiveYesterday =
          p.lastActive && p.lastActive.slice(0, 10) === new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        return {
          ...p,
          completedMissions: p.completedMissions.includes(missionId)
            ? p.completedMissions
            : [...p.completedMissions, missionId],
          earnedBadges:
            badgeId && !p.earnedBadges.includes(badgeId)
              ? [...p.earnedBadges, badgeId]
              : p.earnedBadges,
          streak: wasActiveYesterday ? p.streak + 1 : 1,
          lastActive: today,
        }
      })
    },
    [setProgress]
  )

  const toggleFocusMode = useCallback(
    () => setProgress((p) => ({ ...p, focusModeEnabled: !p.focusModeEnabled })),
    [setProgress]
  )

  const resetProgress = useCallback(
    () => {
      localStorage.removeItem(STORAGE_KEY)
      setProgressState(defaultProgress)
    },
    [setProgressState]
  )

  const getMissionStepIndex = useCallback(
    (missionId: string) => progress.missionStepProgress[missionId] ?? 0,
    [progress.missionStepProgress]
  )

  const isMissionComplete = useCallback(
    (missionId: string) => progress.completedMissions.includes(missionId),
    [progress.completedMissions]
  )

  return {
    progress,
    setRole,
    setSchoolName,
    setOnboarded,
    setPhase,
    advanceMissionStep,
    completeMission,
    toggleFocusMode,
    resetProgress,
    getMissionStepIndex,
    isMissionComplete,
  }
}
