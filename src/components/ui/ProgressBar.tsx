interface Props {
  value: number
  max?: number
  color?: string
  height?: number
  showLabel?: boolean
  animated?: boolean
}

export function ProgressBar({ value, max = 100, color = '#0F3460', height = 8, showLabel, animated = true }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full">
      <div
        className="w-full rounded-full overflow-hidden bg-gray-100"
        style={{ height }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={animated ? 'transition-all duration-700 ease-out h-full rounded-full' : 'h-full rounded-full'}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1">{pct}% complete</p>
      )}
    </div>
  )
}
