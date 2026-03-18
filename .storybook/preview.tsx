import React from 'react'
import type { Preview, Decorator } from '@storybook/react'
import '../src/styles/tokens.css'
import '../src/styles/global.css'

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light'
  const accent = context.globals.accent || 'default'
  return (
    <div data-theme={theme} data-accent={accent} className="min-h-screen bg-bg text-text-default p-4">
      <Story />
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'light-pink', title: 'Light Pink' },
          { value: 'pink-mist', title: 'Pink Mist' },
          { value: 'pink-vivid', title: 'Pink Vivid' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      name: 'Accent',
      defaultValue: 'default',
      toolbar: {
        icon: 'star',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'violet', title: 'Violet' },
          { value: 'yellow', title: 'Yellow' },
          { value: 'fuschia', title: 'Fuschia' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundation', 'Atoms', 'Molecules', '*'],
      },
    },
  },
}

export default preview
