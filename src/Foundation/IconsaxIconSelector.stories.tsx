import React, { useState, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as Iconsax from 'iconsax-react'

const meta: Meta = {
  title: 'Foundation/Icons/Iconsax Selector',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// Available icon variants
const VARIANTS: Array<'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone'> = [
  'Linear',
  'Outline',
  'Broken',
  'Bold',
  'Bulk',
  'TwoTone',
]

// Category mappings based on icon name patterns
const CATEGORY_PATTERNS: Record<string, RegExp[]> = {
  'Arrows': [/^Arrow/],
  'Buildings': [/^Building/, /^House/, /^Bank/, /^Courthouse/, /^Hospital/, /^Hotel/],
  'Communication': [/^Call/, /^Message/, /^Mail/, /^Sms/, /^Notification/, /^Chat/],
  'Files': [/^File/, /^Document/, /^Archive/, /^Folder/, /^Save/],
  'Media': [/^Video/, /^Audio/, /^Music/, /^Image/, /^Gallery/, /^Camera/, /^Play/, /^Pause/, /^Stop/],
  'Users': [/^User/, /^Profile/, /^People/, /^Man/, /^Woman/, /^Child/],
  'Finance': [/^Money/, /^Wallet/, /^Card/, /^Dollar/, /^Coin/, /^Ticket/, /^Receipt/],
  'Time': [/^Clock/, /^Timer/, /^Calendar/, /^Hourglass/],
  'Location': [/^Location/, /^Map/, /^Global/, /^Gps/, /^Route/],
  'Weather': [/^Cloud/, /^Sun/, /^Moon/, /^Rain/, /^Snow/, /^Wind/, /^Thunder/],
  'Shopping': [/^Bag/, /^Cart/, /^Shop/, /^Store/, /^Buy/],
  'Transport': [/^Car/, /^Bus/, /^Truck/, /^Bike/, /^Ship/, /^Airplane/],
  'Security': [/^Lock/, /^Key/, /^Security/, /^Shield/, /^Password/],
  'Settings': [/^Setting/, /^Menu/, /^Toggle/, /^Switch/],
  'Editor': [/^Edit/, /^Pen/, /^Cut/, /^Copy/, /^Paste/, /^Eraser/],
  'Charts': [/^Chart/, /^Graph/, /^Diagram/, /^Trend/],
  'Social': [/^Facebook/, /^Instagram/, /^Twitter/, /^Youtube/, /^Linkedin/, /^Whatsapp/],
  'Devices': [/^Phone/, /^Mobile/, /^Computer/, /^Monitor/, /^Watch/, /^Printer/],
  'Health': [/^Heart/, /^Health/, /^Medical/, /^Hospital/, /^Dna/],
  'Sports': [/^Sport/, /^Football/, /^Basketball/, /^Tennis/],
  'Food': [/^Food/, /^Restaurant/, /^Cup/, /^Knife/, /^Fork/],
  'Animals': [/^Cat/, /^Dog/, /^Bird/, /^Fish/, /^Animal/],
  'Nature': [/^Tree/, /^Flower/, /^Leaf/, /^Mountain/],
}

function getCategory(iconName: string): string {
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (patterns.some(pattern => pattern.test(iconName))) {
      return category
    }
  }
  return 'Other'
}

// Get all icon names from Iconsax
const ALL_ICON_NAMES = Object.keys(Iconsax).filter(key => {
  // Filter out non-icon exports (default, __esModule, etc.)
  if (key === 'default' || key === '__esModule' || key.startsWith('_')) return false
  // Check if it's a valid React component (has $$typeof symbol or is a function)
  const value = (Iconsax as any)[key]
  return value && (typeof value === 'function' || value.$$typeof)
}).sort()

// Group icons by category
const ICONS_BY_CATEGORY: Record<string, string[]> = {}
ALL_ICON_NAMES.forEach(name => {
  const category = getCategory(name)
  if (!ICONS_BY_CATEGORY[category]) {
    ICONS_BY_CATEGORY[category] = []
  }
  ICONS_BY_CATEGORY[category].push(name)
})

// Sort categories alphabetically but put 'Other' last
const CATEGORIES = Object.keys(ICONS_BY_CATEGORY).sort((a, b) => {
  if (a === 'Other') return 1
  if (b === 'Other') return -1
  return a.localeCompare(b)
})

export const IconSelector: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [variant, setVariant] = useState<'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone'>('Linear')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const filteredCategories = useMemo(() => {
      if (searchTerm) {
        // When searching, show all matching icons in a flat list
        const matchingIcons = ALL_ICON_NAMES.filter(name => 
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return { 'Search Results': matchingIcons }
      }
      
      if (selectedCategory === 'All') {
        return ICONS_BY_CATEGORY
      }
      
      return { [selectedCategory]: ICONS_BY_CATEGORY[selectedCategory] || [] }
    }, [searchTerm, selectedCategory])

    const totalIcons = Object.values(filteredCategories).reduce((sum, icons) => sum + icons.length, 0)

    const handleCopy = (iconName: string) => {
      navigator.clipboard.writeText(iconName).then(() => {
        setCopied(true)
        setSelectedIcon(iconName)
        setTimeout(() => setCopied(false), 2000)
      })
    }

    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-h3 font-bold mb-4" style={{ color: 'var(--text)' }}>
              Iconsax Icon Selector
            </h1>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search icons"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border pl-10 min-w-64"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                    fontSize: 'var(--font-size-text-small)',
                  }}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
                  style={{ color: 'var(--text)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--text)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Variant Selector */}
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                className="px-4 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                  fontSize: 'var(--font-size-text-small)',
                }}
              >
                {VARIANTS.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>

              {/* Category Selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                  fontSize: 'var(--font-size-text-small)',
                }}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Results count */}
              <span className="text-text-small opacity-60" style={{ color: 'var(--text)' }}>
                {totalIcons} {totalIcons === 1 ? 'icon' : 'icons'}
              </span>
            </div>
          </div>

          {/* Icon Grid by Category */}
          {Object.entries(filteredCategories).map(([category, icons]) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>
                {category} <span className="font-normal opacity-60">({icons.length})</span>
              </h2>
              <div 
                style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                }}
              >
                {icons.map((iconName) => {
                  const IconComponent = (Iconsax as any)[iconName]
                  if (!IconComponent) return null

                  return (
                    <button
                      key={iconName}
                      onClick={() => handleCopy(iconName)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: 'var(--radius-small)',
                        border: 'none',
                        backgroundColor: selectedIcon === iconName 
                          ? 'var(--accent-highlight)' 
                          : 'var(--bg-2)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, background-color 0.15s ease',
                        width: '40px',
                        height: '40px',
                        flexShrink: '0',
                      }}
                      title={iconName}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                        e.currentTarget.style.backgroundColor = 'var(--bg-3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.backgroundColor = selectedIcon === iconName 
                          ? 'var(--accent-highlight)' 
                          : 'var(--bg-2)'
                      }}
                    >
                      <IconComponent
                        size={22}
                        variant={variant}
                        color="currentColor"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {totalIcons === 0 && (
            <div className="text-center py-16">
              <p className="text-text-main opacity-60" style={{ color: 'var(--text)' }}>
                No icons found for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Toast notification */}
          {copied && (
            <div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg"
              style={{
                backgroundColor: 'var(--accent-btn-bg)',
                color: 'var(--accent-btn-text)',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Code copied to clipboard!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
}
