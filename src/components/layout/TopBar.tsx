import { Menu, Zap } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/missions': 'Missions',
  '/resources': 'Resources',
  '/progress': 'My Progress',
  '/school-profile': 'School Profile',
  '/team-view': 'Team View',
}

interface Props {
  onMenuClick: () => void
  focusMode?: boolean
  schoolName?: string
}

export function TopBar({ onMenuClick, focusMode, schoolName }: Props) {
  const { pathname } = useLocation()
  const title = Object.entries(pageTitles).find(([k]) => pathname.startsWith(k))?.[1] ?? 'FRNYC Hub'

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        {/* Mobile logo (hidden on desktop) */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-crimson flex items-center justify-center">
            <Zap size={11} className="text-white" />
          </div>
          <span className="text-xs font-head font-700 uppercase tracking-widest text-navy">FRNYC</span>
        </div>

        <h1 className="hidden lg:block text-base font-head font-700 text-gray-800">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {focusMode && (
          <span className="text-[10px] font-head font-700 uppercase tracking-widest px-2 py-0.5 rounded-full bg-navy text-white">
            Focus Mode
          </span>
        )}
        {schoolName && (
          <span className="hidden sm:block text-xs text-gray-400 font-head">
            {schoolName}
          </span>
        )}
      </div>
    </header>
  )
}
