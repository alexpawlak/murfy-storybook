import React from 'react'
import { HambergerMenu, ProfileCircle } from 'iconsax-react'
import { MurfyLogo } from '../../Atoms/Icons/MurfyLogo'
import { VerticalSelector, DEFAULT_VERTICALS, type Vertical } from '../../Molecules/VerticalSelector/VerticalSelector'

export interface MurfyNavbarProps {
  verticals?: Vertical[]
  activeVerticalId?: string
  onVerticalChange?: (id: string) => void
  onMenuClick?: () => void
  onAccountClick?: () => void
}

export function MurfyNavbar({
  verticals = DEFAULT_VERTICALS,
  activeVerticalId,
  onVerticalChange,
  onMenuClick,
  onAccountClick,
}: MurfyNavbarProps) {
  return (
    <div className="flex flex-col gap-3 p-3" style={{ backgroundColor: 'var(--bg-2)' }}>

      {/* Top bar — floating pill */}
      <div
        className="flex items-center justify-between px-4 py-2 rounded-pill"
        style={{
          backgroundColor: 'var(--bg)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        {/* Logo */}
        <MurfyLogo
          width={40}
          height={40}
          style={{ color: 'var(--text)', flexShrink: 0 }}
        />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onAccountClick}
            className="p-2 rounded-full transition-opacity hover:opacity-70"
            aria-label="Mon compte"
          >
            <ProfileCircle size={24} color="var(--text)" variant="Linear" />
          </button>
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            <HambergerMenu size={24} color="var(--text)" variant="Linear" />
          </button>
        </div>
      </div>

      {/* Vertical selector — centered */}
      <VerticalSelector
        verticals={verticals}
        activeId={activeVerticalId}
        onChange={onVerticalChange}
      />
    </div>
  )
}
