import type { MissionStatus } from '../../types'

const config: Record<MissionStatus, { label: string; className: string }> = {
  locked: { label: 'Locked', className: 'bg-gray-100 text-gray-400' },
  'not-started': { label: 'Not Started', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
  completed: { label: 'Complete', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
}

interface Props {
  status: MissionStatus
  size?: 'sm' | 'md'
}

export function StatusPill({ status, size = 'sm' }: Props) {
  const { label, className } = config[status]
  return (
    <span
      className={`inline-flex items-center rounded-full font-head font-700 uppercase tracking-wide ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'} ${className}`}
    >
      {label}
    </span>
  )
}
