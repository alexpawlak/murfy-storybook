import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tokensPath = path.resolve(__dirname, '../tokens.json')
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'))

// Resolve token references like {primitives.pink-500} -> var(--pink-500)
function resolveRef(value: string): string {
  return value.replace(/\{primitives\.([^}]+)\}/g, (_, name) => `var(--${name})`)
}

let css = `/* Auto-generated from tokens.json — do not edit manually */\n\n`

// :root — primitives + typography + dimensions
css += `:root {\n`
css += `  /* Primitives */\n`
for (const [key, value] of Object.entries(tokens.primitives as Record<string, string>)) {
  css += `  --${key}: ${value};\n`
}
css += `\n  /* Typography */\n`
for (const [scale, props] of Object.entries(tokens.typography as Record<string, any>)) {
  css += `  --font-size-${scale}: ${props.fontSize}px;\n`
  css += `  --font-weight-${scale}: ${props.fontWeight};\n`
  css += `  --line-height-${scale}: ${props.lineHeight};\n`
  if (props.letterSpacing !== 0) {
    css += `  --letter-spacing-${scale}: ${props.letterSpacing}em;\n`
  }
}
css += `\n  /* Dimensions */\n`
const dims = tokens.dimensions as Record<string, number>
css += `  --radius-section: ${dims['radius-section']}px;\n`
css += `  --radius-card: ${dims['radius-card']}px;\n`
css += `  --radius-small: ${dims['radius-small']}px;\n`
css += `  --radius-pill: ${dims['radius-pill']}px;\n`
css += `  --radius-dropdown: ${dims['radius-dropdown']}px;\n`
css += `  --spacing-section-y: ${dims['spacing-section-y-mobile']}px; /* mobile default */\n`
css += `}\n\n`

// Theme tokens
const themeMap: Record<string, string> = {
  light: '[data-theme="light"], :root',
  dark: '[data-theme="dark"]',
  'light-pink': '[data-theme="light-pink"]',
  'pink-mist': '[data-theme="pink-mist"]',
  'pink-vivid': '[data-theme="pink-vivid"]',
}

for (const [themeName, selector] of Object.entries(themeMap)) {
  const theme = (tokens.themes as Record<string, Record<string, string>>)[themeName]
  if (!theme) continue
  css += `${selector} {\n`
  for (const [key, value] of Object.entries(theme)) {
    css += `  --${key}: ${resolveRef(value)};\n`
  }
  css += `}\n\n`
}

// Accent tokens
const accents = tokens.accents as Record<string, Record<string, string>>
for (const [accentName, accentTokens] of Object.entries(accents)) {
  css += `[data-accent="${accentName}"] {\n`
  for (const [key, value] of Object.entries(accentTokens)) {
    css += `  --accent-${key}: ${resolveRef(value)};\n`
  }
  css += `}\n\n`
}

// Also set default accent on :root
css += `:root {\n`
const defaultAccent = accents['default']
if (defaultAccent) {
  for (const [key, value] of Object.entries(defaultAccent)) {
    css += `  --accent-${key}: ${resolveRef(value)};\n`
  }
}
css += `}\n\n`

// Desktop spacing override
css += `@media (min-width: 1024px) {\n`
css += `  :root { --spacing-section-y: ${dims['spacing-section-y-desktop']}px; }\n`
css += `}\n`

const cssOutPath = path.resolve(__dirname, '../src/styles/tokens.css')
fs.mkdirSync(path.dirname(cssOutPath), { recursive: true })
fs.writeFileSync(cssOutPath, css)
console.log('✓ Generated src/styles/tokens.css')

// Generate tailwind.config.js
const primitiveColors: Record<string, string> = {}
for (const key of Object.keys(tokens.primitives as Record<string, string>)) {
  primitiveColors[key] = `var(--${key})`
}

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        'text-default': 'var(--text)',
        'text-2': 'var(--text-2)',
        border: 'var(--border)',
        'heading-accent': 'var(--heading-accent)',
        'btn-bg': 'var(--btn-bg)',
        'btn-text': 'var(--btn-text)',
        'btn-bg-hover': 'var(--btn-bg-hover)',
        'btn2-bg': 'var(--btn2-bg)',
        'btn2-text': 'var(--btn2-text)',
        'btn2-border': 'var(--btn2-border)',
        'btn2-bg-hover': 'var(--btn2-bg-hover)',
        'btn2-text-hover': 'var(--btn2-text-hover)',
        'accent-btn': 'var(--accent-btn-bg)',
        'accent-btn-text': 'var(--accent-btn-text)',
        'accent-highlight': 'var(--accent-accent-highlight)',
        ${Object.entries(primitiveColors).map(([k, v]) => `'${k}': '${v}'`).join(',\n        ')},
      },
      borderRadius: {
        section: 'var(--radius-section)',
        card: 'var(--radius-card)',
        sm: 'var(--radius-small)',
        pill: 'var(--radius-pill)',
        dropdown: 'var(--radius-dropdown)',
      },
      fontSize: {
        display: ['var(--font-size-display)', { lineHeight: '1', letterSpacing: '-0.05em' }],
        h1: ['var(--font-size-h1)', { lineHeight: '1', letterSpacing: '-0.05em' }],
        h2: ['var(--font-size-h2)', { lineHeight: '1', letterSpacing: '-0.05em' }],
        h3: ['var(--font-size-h3)', { lineHeight: '1.3', letterSpacing: '-0.05em' }],
        h4: ['var(--font-size-h4)', { lineHeight: '1.3', letterSpacing: '-0.05em' }],
        h5: ['var(--font-size-h5)', { lineHeight: '1.3' }],
        h6: ['var(--font-size-h6)', { lineHeight: '1.3' }],
        'text-large': ['var(--font-size-text-large)', { lineHeight: '1.5' }],
        'text-main': ['var(--font-size-text-main)', { lineHeight: '1.5' }],
        'text-small': ['var(--font-size-text-small)', { lineHeight: '1.5' }],
        'text-xsmall': ['var(--font-size-text-xsmall)', { lineHeight: '1.5' }],
      },
      spacing: {
        'section-y': 'var(--spacing-section-y)',
      },
    },
  },
  plugins: [],
}
`

fs.writeFileSync(path.resolve(__dirname, '../tailwind.config.js'), tailwindConfig)
console.log('✓ Generated tailwind.config.js')
