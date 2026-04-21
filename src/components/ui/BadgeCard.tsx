import type { Badge } from '../../types'

interface Props {
  badge: Badge
  earned?: boolean
}

export function BadgeCard({ badge, earned = false }: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-card border text-center transition-all ${
        earned
          ? 'bg-white border-gray-200 shadow-card'
          : 'bg-gray-50 border-gray-100 opacity-50 grayscale'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
          earned ? 'shadow-sm' : ''
        }`}
        style={{ backgroundColor: earned ? badge.color + '18' : '#F3F4F6' }}
      >
        <span>{badge.emoji}</span>
      </div>
      <div>
        <p className="text-xs font-head font-700 text-gray-800 leading-tight">{badge.name}</p>
        {earned && <p className="text-[10px] text-gray-400 mt-0.5">{badge.description}</p>}
        {!earned && <p className="text-[10px] text-gray-400 mt-0.5">Locked</p>}
      </div>
    </div>
  )
}
