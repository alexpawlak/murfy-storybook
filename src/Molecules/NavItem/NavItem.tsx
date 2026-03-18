import React from 'react'

export interface NavDropdownItem {
  label: string
  href?: string
}

export interface NavItemProps {
  label: string
  href?: string
  active?: boolean
  dropdown?: NavDropdownItem[]
  onClick?: () => void
}

export function NavItem({ label, href = '#', active, dropdown, onClick }: NavItemProps) {
  const [open, setOpen] = React.useState(false)
  const hasDropdown = dropdown && dropdown.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <a
        href={hasDropdown ? undefined : href}
        onClick={e => {
          if (onClick) { e.preventDefault(); onClick() }
          if (hasDropdown) e.preventDefault()
        }}
        className={[
          'inline-flex items-center gap-1 px-3 py-2 rounded-sm font-semibold transition-colors no-underline cursor-pointer',
          active
            ? 'opacity-100'
            : 'opacity-70 hover:opacity-100',
        ].join(' ')}
        style={{
          color: 'var(--text)',
          fontSize: 'var(--font-size-text-small)',
          fontWeight: active ? 700 : 600,
        }}
        aria-current={active ? 'page' : undefined}
      >
        {label}
        {hasDropdown && (
          <svg
            className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </a>

      {hasDropdown && open && (
        <div
          className="absolute top-full left-0 mt-1 min-w-[220px] py-2 z-50"
          style={{
            backgroundColor: 'var(--bg)',
            borderRadius: 'var(--radius-dropdown)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {dropdown!.map(item => (
            <a
              key={item.label}
              href={item.href || '#'}
              className="block px-4 py-2 no-underline transition-opacity hover:opacity-80"
              style={{
                color: 'var(--text)',
                fontSize: 'var(--font-size-text-small)',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export interface NavBarProps {
  logo?: React.ReactNode
  items: NavItemProps[]
  cta?: React.ReactNode
}

export function NavBar({ logo, items, cta }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <nav
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="shrink-0">
          {logo}
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {items.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          {cta && <div className="hidden md:block">{cta}</div>}
          <button
            className="md:hidden p-2"
            style={{ color: 'var(--text)' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1">
          {items.map(item => (
            <a
              key={item.label}
              href={item.href || '#'}
              className="block py-2 no-underline font-semibold"
              style={{ color: 'var(--text)', fontSize: 'var(--font-size-text-small)' }}
            >
              {item.label}
            </a>
          ))}
          {cta && <div className="pt-2">{cta}</div>}
        </div>
      )}
    </nav>
  )
}
