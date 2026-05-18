import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Welcome } from './pages/Welcome'
import { ChooseRole } from './pages/ChooseRole'
import { Dashboard } from './pages/Dashboard'
import { Missions } from './pages/Missions'
import { MissionDetail } from './pages/MissionDetail'
import { Resources } from './pages/Resources'
import { Progress } from './pages/Progress'
import { SchoolProfile } from './pages/SchoolProfile'
import { TeamView } from './pages/TeamView'
import { AmbassadorToolkit } from './pages/AmbassadorToolkit'
import { CohortToolkit } from './pages/CohortToolkit'
import { useProgress } from './hooks/useProgress'
import type { RoleId, Phase } from './types'

function AppRoutes() {
  const {
    progress,
    setRole,
    setSchoolName,
    setOnboarded,
    setPhase,
    advanceMissionStep,
    completeMission,
    toggleFocusMode,
    resetProgress,
  } = useProgress()

  const handleRoleSelect = (role: RoleId, school: string) => {
    setRole(role)
    setSchoolName(school)
    setOnboarded()
  }

  const handleProfileUpdate = (field: 'schoolName' | 'role' | 'phase', value: string) => {
    if (field === 'schoolName') setSchoolName(value)
    else if (field === 'role') setRole(value as RoleId)
    else if (field === 'phase') setPhase(value as Phase)
  }

  if (!progress.onboarded) {
    return (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/choose-role" element={<ChooseRole onSelect={handleRoleSelect} />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout progress={progress} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={<Dashboard progress={progress} onToggleFocusMode={toggleFocusMode} />}
        />
        <Route path="missions" element={<Missions progress={progress} />} />
        <Route
          path="missions/:id"
          element={
            <MissionDetail
              progress={progress}
              onStepAdvance={advanceMissionStep}
              onComplete={completeMission}
            />
          }
        />
        <Route path="resources" element={<Resources />} />
        <Route path="progress" element={<Progress progress={progress} />} />
        <Route
          path="school-profile"
          element={
            <SchoolProfile
              progress={progress}
              onUpdate={handleProfileUpdate}
              onReset={resetProgress}
            />
          }
        />
        <Route path="team-view" element={<TeamView progress={progress} />} />
        <Route path="toolkits/ambassador" element={<AmbassadorToolkit />} />
        <Route path="toolkits/cohort" element={<CohortToolkit />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="/welcome" element={<Navigate to="/dashboard" replace />} />
      <Route path="/choose-role" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
