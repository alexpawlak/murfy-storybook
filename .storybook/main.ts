import type { StorybookConfig } from '@storybook/react-vite'
import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import os from 'node:os'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type StorybookUpdateMeta = {
  date: string | null
  subject: string | null
  hash: string | null
  label: string
  tooltip: string
}

function getStorybookUpdateMeta(): StorybookUpdateMeta {
  try {
    const output = execSync(
      'git log -1 --date=short --pretty=format:%H%n%ad%n%s -- .storybook src tokens.json',
      { cwd: path.resolve(__dirname, '..'), encoding: 'utf-8' }
    ).trim()

    const [hash, date, ...subjectParts] = output.split('\n')
    const subject = subjectParts.join('\n').trim()

    if (!hash || !date || !subject) {
      throw new Error('Incomplete git metadata')
    }

    return {
      date,
      subject,
      hash,
      label: `Updated ${date} · ${subject}`,
      tooltip: `Last Storybook update: ${date}\n${subject}\n${hash.slice(0, 7)}`,
    }
  } catch {
    return {
      date: null,
      subject: null,
      hash: null,
      label: 'Updated date unavailable',
      tooltip: 'Git metadata unavailable for this Storybook session.',
    }
  }
}

const generatedStaticDir = path.join(os.tmpdir(), 'murfy-storybook-static')
mkdirSync(generatedStaticDir, { recursive: true })
writeFileSync(
  path.join(generatedStaticDir, 'storybook-update.json'),
  JSON.stringify(getStorybookUpdateMeta(), null, 2)
)

const config: StorybookConfig = {
  stories: [
    '../src/Introduction.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx',
  ],
  managerEntries: [fileURLToPath(new URL('./manager.tsx', import.meta.url))],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public', generatedStaticDir],
}

export default config
