const { execSync } = require('node:child_process')
const { mkdirSync, writeFileSync } = require('node:fs')
const os = require('node:os')
const path = require('node:path')

function getStorybookUpdateMeta() {
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

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    '../src/Introduction.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx',
  ],
  managerEntries: [path.resolve(__dirname, 'manager.tsx')],
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

module.exports = config
