import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  BarChart2,
  School,
  Users,
  Zap,
  X,
} from 'lucide-react'
import type { UserProgress } from '../../types'
import { getRoleById } from '../../data/roles'

interface Props {
  progress: UserProgress
  mobile?: boolean
  onClose?: () => void
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/missions', label: 'Missions', icon: CheckSquare },
  { to: '/resources', label: 'Resources', icon: BookOpen },
  { to: '/progress', label: 'My Progress', icon: BarChart2 },
  { to: '/school-profile', label: 'School Profile', icon: School },
  { to: '/team-view', label: 'Team View', icon: Users },
]

export function Sidebar({ progress, mobile, onClose }: Props) {
  const role = getRoleById(progress.role)
  const completedCount = progress.completedMissions.length

  return (
    <aside
      className={`flex flex-col bg-navy-dark text-white ${
        mobile ? 'w-full h-full' : 'w-64 h-screen sticky top-0'
      }`}
    >
      {/* Logo area */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-crimson flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="text-xs font-head font-700 uppercase tracking-widest text-gold">
                FRNYC
              </span>
            </div>
            <h2 className="text-sm font-head font-700 text-white leading-tight">
              Recruitment Hub
            </h2>
          </div>
          {mobile && onClose && (
            <button onClick={onClose} className="text-white/60 hover:text-white p-1">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
            style={{ backgroundColor: role?.color + '30' }}
          >
            {role?.icon ?? '👤'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-white/50 font-head uppercase tracking-wide">Your role</p>
            <p className="text-sm font-head font-700 text-white truncate">{role?.shortTitle ?? progress.role}</p>
            {progress.schoolName && (
              <p className="text-xs text-white/50 truncate">{progress.schoolName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-head font-600 transition-all ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom stats */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>{completedCount} missions done</span>
          {progress.streak > 0 && (
            <span className="flex items-center gap-1">
              🔥 {progress.streak}-day streak
            </span>
          )}
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gold transition-all duration-700"
            style={{ width: `${Math.min(100, (completedCount / 6) * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  )
}
