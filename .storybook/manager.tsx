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
  color: 'var(--sb-bar-text-color, #6b7280)',
  display: 'flex',
  fontFamily: 'inherit',
  fontSize: 12,
  gap: 8,
  lineHeight: 1,
  marginLeft: 8,
  maxWidth: 420,
  overflow: 'hidden',
  padding: '0 8px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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
      {meta.label}
    </div>
  )
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Last updated',
    type: types.TOOL,
    match: ({ tabId }) => !tabId,
    render: () => <StorybookUpdateTool />,
  })
})
