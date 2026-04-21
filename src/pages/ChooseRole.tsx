import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { roles } from '../data/roles'
import type { RoleId } from '../types'

interface Props {
  onSelect: (role: RoleId, school: string) => void
}

export function ChooseRole({ onSelect }: Props) {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null)
  const [schoolName, setSchoolName] = useState('')
  const [step, setStep] = useState<'role' | 'school'>('role')

  const handleContinue = () => {
    if (step === 'role' && selectedRole) {
      setStep('school')
    } else if (step === 'school' && selectedRole) {
      onSelect(selectedRole, schoolName)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Progress dots */}
      <div className="px-6 pt-6 flex items-center gap-2">
        <button
          onClick={() => step === 'school' ? setStep('role') : navigate('/welcome')}
          className="text-gray-400 hover:text-gray-600 p-1 mr-2"
        >
          <ArrowLeft size={18} />
        </button>
        {['role', 'school'].map((s, i) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              s === step ? 'w-8 bg-navy' : i < ['role', 'school'].indexOf(step) ? 'w-4 bg-navy/40' : 'w-4 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="max-w-2xl w-full">
          {step === 'role' ? (
            <>
              <div className="mb-8">
                <p className="text-xs font-head font-700 uppercase tracking-widest text-crimson mb-2">Step 1 of 2</p>
                <h2 className="text-3xl font-head font-900 text-gray-900 mb-2">What's your role?</h2>
                <p className="text-gray-500 text-sm">
                  Your role determines which missions you see and what actions you own.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as RoleId)}
                    className={`relative text-left p-5 rounded-card border-2 transition-all ${
                      selectedRole === role.id
                        ? 'border-navy bg-navy/5 shadow-card'
                        : 'border-gray-200 bg-white hover:border-navy/30 hover:shadow-card'
                    }`}
                  >
                    {selectedRole === role.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3"
                      style={{ backgroundColor: role.bgColor }}
                    >
                      {role.icon}
                    </div>
                    <h3 className="text-sm font-head font-700 text-gray-900 mb-1">{role.shortTitle}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{role.description}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-xs font-head font-700 uppercase tracking-widest text-crimson mb-2">Step 2 of 2</p>
                <h2 className="text-3xl font-head font-900 text-gray-900 mb-2">Your school</h2>
                <p className="text-gray-500 text-sm">
                  This appears in your dashboard and helps your team identify your progress.
                </p>
              </div>

              <div className="bg-white rounded-card border border-gray-200 p-6 mb-8">
                <label className="block text-xs font-head font-700 uppercase tracking-wide text-gray-500 mb-2">
                  School name
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Gateway High School"
                  className="w-full text-base font-body text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition"
                  autoFocus
                />
                <p className="text-xs text-gray-400 mt-2">You can update this later in School Profile.</p>
              </div>

              {/* Selected role reminder */}
              {selectedRole && (
                <div className="bg-navy/5 rounded-card p-4 border border-navy/10 mb-6">
                  <p className="text-xs text-gray-500 mb-1">Your role</p>
                  <p className="text-sm font-head font-700 text-navy">
                    {roles.find((r) => r.id === selectedRole)?.title}
                  </p>
                </div>
              )}
            </>
          )}

          <button
            onClick={handleContinue}
            disabled={step === 'role' ? !selectedRole : false}
            className="inline-flex items-center gap-3 bg-navy hover:bg-navy-light disabled:bg-gray-200 disabled:text-gray-400 text-white font-head font-700 px-8 py-4 rounded-pill text-sm transition-all hover:shadow-lg disabled:cursor-not-allowed"
          >
            {step === 'role' ? 'Continue' : 'Go to my dashboard'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
