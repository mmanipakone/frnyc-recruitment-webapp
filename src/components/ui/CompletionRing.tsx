interface Props {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
}

export function CompletionRing({
  value,
  max = 100,
  size = 72,
  strokeWidth = 6,
  color = '#0F3460',
  trackColor = '#E5E7EB',
  label,
}: Props) {
  const pct = Math.min(100, (value / max) * 100)
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold font-head" style={{ color }}>{Math.round(pct)}%</span>
        {label && <span className="text-[9px] text-gray-400 font-head uppercase tracking-wide leading-tight text-center">{label}</span>}
      </div>
    </div>
  )
}
