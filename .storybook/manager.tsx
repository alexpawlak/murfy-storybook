import React, { useEffect, useState } from 'react'
import { addons, types } from '@storybook/manager-api'

type StorybookUpdateMeta = {
  date: string | null
  subject: string | null
  hash: string | null
  label: string
  tooltip: string
}

const ADDON_ID = 'murfy/storybook-update'
const TOOL_ID = `${ADDON_ID}/tool`
const META_URL = '/storybook-update.json'

const baseStyle: React.CSSProperties = {
  alignItems: 'center',
  background: 'rgba(17, 24, 39, 0.06)',
  border: '1px solid rgba(17, 24, 39, 0.14)',
  borderRadius: 999,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
  color: '#111827',
  display: 'flex',
  fontFamily: 'inherit',
  fontSize: 12,
  fontWeight: 700,
  gap: 6,
  height: 28,
  lineHeight: 1,
  marginLeft: 12,
  maxWidth: 420,
  overflow: 'hidden',
  padding: '0 12px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const prefixStyle: React.CSSProperties = {
  color: 'rgba(17, 24, 39, 0.7)',
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const textStyle: React.CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

function getCompactLabel(meta: StorybookUpdateMeta) {
  if (meta.date) {
    return `Updated ${meta.date}`
  }

  return 'Update info'
}

function StorybookUpdateTool() {
  const [meta, setMeta] = useState<StorybookUpdateMeta>({
    date: null,
    subject: null,
    hash: null,
    label: 'Loading update info…',
    tooltip: 'Loading Storybook update metadata.',
  })

  useEffect(() => {
    let cancelled = false

    fetch(META_URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${META_URL}`)
        }
        return response.json() as Promise<StorybookUpdateMeta>
      })
      .then((data) => {
        if (!cancelled) {
          setMeta(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMeta({
            date: null,
            subject: null,
            hash: null,
            label: 'Updated date unavailable',
            tooltip: 'Git metadata unavailable for this Storybook session.',
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div style={baseStyle} title={meta.tooltip} aria-label={meta.tooltip}>
      <span style={prefixStyle}>Storybook</span>
      <span style={textStyle}>{getCompactLabel(meta)}</span>
    </div>
  )
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Last updated',
    type: types.TOOL,
    match: () => true,
    render: () => <StorybookUpdateTool />,
  })
})
