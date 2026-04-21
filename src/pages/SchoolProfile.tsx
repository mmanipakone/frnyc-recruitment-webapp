import { useState } from 'react'
import { Check, Edit2 } from 'lucide-react'
import { phases, getPhaseInfo } from '../data/phases'
import { getRoleById, roles } from '../data/roles'
import type { UserProgress, RoleId, Phase } from '../types'

interface Props {
  progress: UserProgress
  onUpdate: (field: 'schoolName' | 'role' | 'phase', value: string) => void
  onReset: () => void
}

export function SchoolProfile({ progress, onUpdate, onReset }: Props) {
  const [editingSchool, setEditingSchool] = useState(false)
  const [schoolInput, setSchoolInput] = useState(progress.schoolName)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const role = getRoleById(progress.role)

  const handleSaveSchool = () => {
    onUpdate('schoolName', schoolInput)
    setEditingSchool(false)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-head font-900 text-gray-900 mb-1">School Profile</h2>
        <p className="text-sm text-gray-500">Your settings and school information.</p>
      </div>

      {/* School name */}
      <div className="bg-white rounded-card border border-gray-200 p-5 shadow-card">
        <p className="text-xs font-head font-700 uppercase tracking-wide text-gray-400 mb-3">School Name</p>
        {editingSchool ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={schoolInput}
              onChange={(e) => setSchoolInput(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveSchool()}
            />
            <button
              onClick={handleSaveSchool}
              className="flex items-center gap-1 bg-navy text-white text-xs font-head font-700 px-3 py-2 rounded-lg"
            >
              <Check size={12} />
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-base font-head font-700 text-gray-800">
              {progress.schoolName || <span className="text-gray-400 font-400">Not set</span>}
            </p>
            <button
              onClick={() => { setSchoolInput(progress.schoolName); setEditingSchool(true) }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-navy transition"
            >
              <Edit2 size={12} />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Role */}
      <div className="bg-white rounded-card border border-gray-200 p-5 shadow-card">
        <p className="text-xs font-head font-700 uppercase tracking-wide text-gray-400 mb-3">Your Role</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => onUpdate('role', r.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition text-left ${
                progress.role === r.id
                  ? 'border-navy bg-navy/5'
                  : 'border-gray-200 hover:border-navy/30'
              }`}
            >
              <span className="text-xl">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-head font-700 text-gray-900 truncate">{r.shortTitle}</p>
              </div>
              {progress.role === r.id && <Check size={14} className="text-navy flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Phase */}
      <div className="bg-white rounded-card border border-gray-200 p-5 shadow-card">
        <p className="text-xs font-head font-700 uppercase tracking-wide text-gray-400 mb-3">Current Framework Phase</p>
        <p className="text-xs text-gray-500 mb-3">
          Update this to reflect where your school is in the FRNYC recruitment cycle. This changes which missions are prioritized.
        </p>
        <div className="space-y-2">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => onUpdate('phase', p.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition text-left ${
                progress.phase === p.id
                  ? 'border-2'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={progress.phase === p.id ? { borderColor: p.color, backgroundColor: p.bg } : {}}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-head font-800 text-white flex-shrink-0"
                style={{ backgroundColor: p.color }}
              >
                {p.letter}
              </div>
              <div>
                <p className="text-xs font-head font-700 text-gray-900">{p.label}</p>
                <p className="text-[11px] text-gray-500 leading-tight">{p.description}</p>
              </div>
              {progress.phase === p.id && <Check size={14} className="ml-auto flex-shrink-0" style={{ color: p.color }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="bg-white rounded-card border border-gray-200 p-5 shadow-card">
        <p className="text-xs font-head font-700 uppercase tracking-wide text-gray-400 mb-2">Reset Progress</p>
        <p className="text-xs text-gray-500 mb-4">This will clear all mission progress, badges, and settings. Use for testing or handing off to a new user.</p>
        {showResetConfirm ? (
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-700 font-head font-600">Are you sure?</p>
            <button
              onClick={() => { onReset(); setShowResetConfirm(false) }}
              className="bg-crimson text-white text-xs font-head font-700 px-3 py-1.5 rounded-lg"
            >
              Yes, reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="text-gray-400 text-xs font-head hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs text-crimson font-head font-700 border border-crimson/30 px-4 py-2 rounded-lg hover:bg-crimson/5 transition"
          >
            Reset all progress
          </button>
        )}
      </div>
    </div>
  )
}
