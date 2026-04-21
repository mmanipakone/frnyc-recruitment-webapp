import { useState } from 'react'
import { Search, FileText, BookOpen, Play, Lightbulb } from 'lucide-react'
import { resources, getResourcesByCategory } from '../data/resources'
import type { Resource } from '../data/resources'

const typeIcons: Record<Resource['type'], typeof FileText> = {
  template: FileText,
  guide: BookOpen,
  example: Lightbulb,
  video: Play,
}

const typeLabels: Record<Resource['type'], string> = {
  template: 'Template',
  guide: 'Guide',
  example: 'Example',
  video: 'Video',
}

const typeColors: Record<Resource['type'], string> = {
  template: '#0F3460',
  guide: '#2D6A4F',
  example: '#D97706',
  video: '#B5162B',
}

export function Resources() {
  const [query, setQuery] = useState('')
  const grouped = getResourcesByCategory()

  const filtered = query.trim()
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : null

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-head font-900 text-gray-900 mb-1">Resources</h2>
        <p className="text-sm text-gray-500">Templates, guides, and examples — organized by mission phase.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-11 pr-4 py-3 rounded-card border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition"
        />
      </div>

      {/* Results or categories */}
      {filtered ? (
        <div>
          <p className="text-xs text-gray-400 mb-3">{filtered.length} results for "{query}"</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-gray-400 text-sm py-8 text-center">No resources match your search.</p>
          )}
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h3 className="text-sm font-head font-700 uppercase tracking-wide text-gray-500 mb-3">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type]
  const color = typeColors[resource.type]
  return (
    <div className="bg-white rounded-card border border-gray-200 p-4 shadow-card hover:shadow-card-hover transition-all group cursor-pointer">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color + '15' }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-head font-700 uppercase tracking-widest px-1.5 py-0.5 rounded"
              style={{ backgroundColor: color + '15', color }}
            >
              {typeLabels[resource.type]}
            </span>
            <span className="text-[9px] text-gray-400">{resource.timeToRead}</span>
          </div>
          <h4 className="text-sm font-head font-700 text-gray-900 mb-1 leading-snug group-hover:text-navy transition">
            {resource.title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{resource.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-head">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
