import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-navy-dark flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-0 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-crimson flex items-center justify-center">
          <span className="text-white text-sm font-head font-900">F</span>
        </div>
        <span className="text-gold text-xs font-head font-700 uppercase tracking-widest">
          Future Ready NYC
        </span>
      </div>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full">
          {/* Phase pills */}
          <div className="flex items-center gap-1.5 mb-8 flex-wrap">
            {['A', 'E', 'C', 'E', 'C'].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-head font-800 text-white/60"
              >
                {l}
              </div>
            ))}
            <span className="text-white/30 text-xs font-head ml-1">
              Awareness → Completion
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-head font-900 text-white leading-tight mb-4">
            Stop managing<br />
            <span className="text-gold">chaos.</span><br />
            Start running<br />a system.
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
            The FRNYC Recruitment Hub gives you exactly what to do next, how long it takes, and how you know it's done.
          </p>

          {/* Value props */}
          <div className="space-y-3 mb-10">
            {[
              'Role-based missions — no fluff, no generic slides',
              'See your next action in under 5 seconds',
              'Track your school\'s progress toward enrollment goals',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/choose-role')}
            className="inline-flex items-center gap-3 bg-crimson hover:bg-crimson-light text-white font-head font-700 px-8 py-4 rounded-pill text-base transition-all hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-6 pb-6 flex items-center gap-4">
        <div className="text-white/20 text-xs font-head">
          Office of Student Pathways × FRNYC
        </div>
      </div>
    </div>
  )
}
