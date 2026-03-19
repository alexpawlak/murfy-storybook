import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold mb-1" style={{ color: '#032524' }}>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: '#9ca3af' }}
    >
      {children}
    </h3>
  )
}

function Divider() {
  return <hr style={{ borderColor: '#e5e7eb' }} />
}

interface Row {
  concern: string
  convention: string
  example: string
}

function ConventionTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th
              className="text-left py-2 pr-6 font-semibold w-1/4"
              style={{ color: '#073331' }}
            >
              Concern
            </th>
            <th
              className="text-left py-2 pr-6 font-semibold w-1/3"
              style={{ color: '#073331' }}
            >
              Convention
            </th>
            <th
              className="text-left py-2 font-semibold"
              style={{ color: '#073331' }}
            >
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: '1px solid #f3f4f6',
                backgroundColor: i % 2 === 0 ? 'transparent' : '#fafafa',
              }}
            >
              <td className="py-2.5 pr-6 font-medium" style={{ color: '#073331' }}>
                {row.concern}
              </td>
              <td className="py-2.5 pr-6" style={{ color: '#374151' }}>
                <code
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: '#f3f4f6', color: '#6b21a8' }}
                >
                  {row.convention}
                </code>
              </td>
              <td className="py-2.5" style={{ color: '#6b7280' }}>
                <code
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: '#f3f4f6', color: '#065f46' }}
                >
                  {row.example}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-3 px-4 py-3 rounded-lg text-sm"
      style={{ backgroundColor: '#fff3f9', borderLeft: '3px solid #f59bbb', color: '#073331' }}
    >
      {children}
    </div>
  )
}

// ─── Main doc component ───────────────────────────────────────────────────────

function NamingConventionsDoc() {
  return (
    <div className="p-8 space-y-14 max-w-4xl" style={{ color: '#073331' }}>

      {/* Intro */}
      <section>
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#032524' }}>
          Naming Conventions
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#6b7280' }}>
          This design system is built for multi-agent workflows — Claude sessions, human
          contributors, and automated scripts all read and write the same files. Consistent
          naming removes ambiguity, makes search reliable, and lets any agent (or human)
          orient immediately without reading every file. The conventions below are enforced
          across code, tokens, stories, and documentation.
        </p>
      </section>

      <Divider />

      {/* File & Directory Naming */}
      <section>
        <SectionHeading>File &amp; Directory Naming</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Every component lives in its own directory. The directory name, component file, and
          story file all share the same <code style={{ color: '#6b21a8' }}>PascalCase</code> root
          so they can be located by glob or search without ambiguity.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'Component directory',
              convention: 'PascalCase/',
              example: 'AccordionItem/',
            },
            {
              concern: 'Component file',
              convention: 'ComponentName.tsx',
              example: 'AccordionItem.tsx',
            },
            {
              concern: 'Story file',
              convention: 'ComponentName.stories.tsx',
              example: 'AccordionItem.stories.tsx',
            },
            {
              concern: 'Static assets',
              convention: 'kebab-case.ext',
              example: 'murfy-logo.svg, hero-bg.png',
            },
            {
              concern: 'Token stylesheet',
              convention: 'tokens.css (auto-generated)',
              example: 'src/styles/tokens.css',
            },
          ]}
        />
        <NoteBlock>
          Never edit <code>tokens.css</code> directly — it is auto-generated by{' '}
          <code>npm run build-tokens</code> from <code>tokens.json</code>.
        </NoteBlock>
      </section>

      <Divider />

      {/* Component Naming */}
      <section>
        <SectionHeading>Component Naming</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          React components use <code style={{ color: '#6b21a8' }}>PascalCase</code> and are
          always exported as named exports. Default exports are banned — they make refactoring
          and search harder across a multi-file codebase.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'React component',
              convention: 'PascalCase',
              example: 'AccordionItem, MurfyNavbar',
            },
            {
              concern: 'Export style',
              convention: 'named export only',
              example: 'export { Button }',
            },
            {
              concern: 'Compound components',
              convention: 'Parent + Child in same dir',
              example: 'AccordionItem + Accordion in AccordionItem/',
            },
          ]}
        />
        <NoteBlock>
          Compound components (e.g. <code>Accordion</code> wrapper + <code>AccordionItem</code>{' '}
          child) both live in the same directory and are exported from the same{' '}
          <code>ComponentName.tsx</code> file.
        </NoteBlock>
      </section>

      <Divider />

      {/* Props & TypeScript */}
      <section>
        <SectionHeading>Props &amp; TypeScript</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          TypeScript interfaces follow predictable patterns so any agent can infer the shape
          of a component without reading its implementation.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'Props interface name',
              convention: 'ComponentNameProps',
              example: 'AccordionItemProps',
            },
            {
              concern: 'Boolean props',
              convention: 'no prefix when unambiguous',
              example: 'disabled, open (not isDisabled, isOpen)',
            },
            {
              concern: 'Boolean props (ambiguous)',
              convention: 'is / has prefix',
              example: 'isActive, hasError',
            },
            {
              concern: 'Event handlers',
              convention: 'on prefix',
              example: 'onClick, onChange, onSubmit',
            },
            {
              concern: 'Variant props',
              convention: 'string union (not enum)',
              example: "variant?: 'primary' | 'secondary' | 'accent'",
            },
            {
              concern: 'Size props',
              convention: 'string union',
              example: "size?: 'sm' | 'md' | 'lg'",
            },
          ]}
        />
        <NoteBlock>
          Prefer string unions over TypeScript <code>enum</code> — unions are narrower, tree-shake
          cleanly, and produce friendlier Storybook control dropdowns automatically.
        </NoteBlock>
      </section>

      <Divider />

      {/* CSS Variables & Tokens */}
      <section>
        <SectionHeading>CSS Variables &amp; Tokens</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Three token tiers map to three naming patterns. Always use a variable — never a
          raw hex color. Tokens are defined in <code>tokens.json</code> and emitted to{' '}
          <code>tokens.css</code> by the build pipeline.
        </p>

        <SubHeading>Token tiers</SubHeading>
        <ConventionTable
          rows={[
            {
              concern: 'Primitive token',
              convention: '--color-scale (on :root)',
              example: '--pink-500, --yellow-300',
            },
            {
              concern: 'Theme semantic token',
              convention: '--role',
              example: '--bg, --text, --btn-bg, --border',
            },
            {
              concern: 'Accent semantic token',
              convention: '--accent-role',
              example: '--accent-btn-bg, --accent-btn-text',
            },
          ]}
        />

        <div className="mt-6">
          <SubHeading>tokens.json references</SubHeading>
          <ConventionTable
            rows={[
              {
                concern: 'Reference a primitive',
                convention: '{primitives.token-name}',
                example: '{primitives.pink-500} → var(--pink-500)',
              },
              {
                concern: 'Raw value',
                convention: 'bare string',
                example: "'#032524'",
              },
            ]}
          />
        </div>

        <NoteBlock>
          If a Figma color has no matching token, add it to <code>tokens.json</code> and run{' '}
          <code>npm run build-tokens</code> — do not hardcode hex values anywhere in component
          files.
        </NoteBlock>
      </section>

      <Divider />

      {/* Tailwind Classes */}
      <section>
        <SectionHeading>Tailwind Classes</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Tailwind is used for layout, spacing, and typography. Brand/theme colors use mapped
          Tailwind classes (defined in <code>tailwind.config.js</code>) that resolve to CSS
          variables — never Tailwind's built-in palette for brand colors.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'Layout & spacing',
              convention: 'Tailwind utilities',
              example: 'flex, gap-4, px-6, mt-8',
            },
            {
              concern: 'Brand / theme colors',
              convention: 'mapped Tailwind class',
              example: 'bg-btn-bg, text-text, border-border',
            },
            {
              concern: 'Accent colors',
              convention: 'CSS var inline if no mapping',
              example: "style={{ backgroundColor: 'var(--accent-btn-bg)' }}",
            },
            {
              concern: 'Built-in Tailwind palette',
              convention: 'NEVER for brand colors',
              example: 'bg-pink-500 — use bg-btn-bg instead',
            },
            {
              concern: 'Desktop breakpoint',
              convention: 'md: prefix',
              example: 'md:flex-row, md:text-lg',
            },
          ]}
        />
      </section>

      <Divider />

      {/* Storybook Stories */}
      <section>
        <SectionHeading>Storybook Stories</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Every component file has a matching <code>.stories.tsx</code>. Stories follow a
          strict title convention so Storybook's sidebar hierarchy stays predictable.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'meta.title pattern',
              convention: 'Layer/ComponentName',
              example: 'Atoms/Button, Molecules/NavBar, Foundation/Colors',
            },
            {
              concern: 'Story function names',
              convention: 'PascalCase',
              example: 'Default, WithIcon, AllVariants',
            },
            {
              concern: 'argTypes',
              convention: 'required for all variant/size/state props',
              example: "variant: { control: 'select', options: [...] }",
            },
            {
              concern: 'Accent testing',
              convention: 'at least one story uses accent vars',
              example: "style={{ backgroundColor: 'var(--accent-btn-bg)' }}",
            },
            {
              concern: 'Theme / accent hardcoding',
              convention: 'NEVER hardcode',
              example: 'global decorator handles data-theme + data-accent',
            },
          ]}
        />
        <NoteBlock>
          The global Storybook decorator in <code>.storybook/preview.tsx</code> wraps every
          story with <code>data-theme</code> and <code>data-accent</code> attributes — never
          add these manually in story files.
        </NoteBlock>
      </section>

      <Divider />

      {/* ROADMAP IDs */}
      <section>
        <SectionHeading>ROADMAP IDs</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Every task in <code>.claude/ROADMAP.md</code> has a short, stable ID used as a
          cross-reference between the roadmap and <code>CODE_COMPONENTS.md</code>.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'ID format',
              convention: 'kebab-case',
              example: 'accordion-fix, hero-section',
            },
            {
              concern: 'Length',
              convention: 'short and descriptive',
              example: '2–4 words max',
            },
            {
              concern: 'Reference in CODE_COMPONENTS.md',
              convention: '**ROADMAP ID:** `id`',
              example: '**ROADMAP ID:** `accordion-fix`',
            },
            {
              concern: 'Completed tasks',
              convention: '*(done — no open task)*',
              example: "**ROADMAP ID:** *(done — no open task)*",
            },
          ]}
        />
      </section>

      <Divider />

      {/* Atomic Layer Placement */}
      <section>
        <SectionHeading>Atomic Layer Placement</SectionHeading>
        <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
          Every component belongs to exactly one atomic layer. When in doubt, count imports
          from <code>src/Atoms/</code> — more than one usually means Molecule or higher.
        </p>
        <ConventionTable
          rows={[
            {
              concern: 'Atom',
              convention: 'single-purpose primitive',
              example: 'Button, Input, Tag, Icon',
            },
            {
              concern: 'Molecule',
              convention: 'combines 2–3 atoms',
              example: 'AccordionItem, VerticalSelector, HeroSearchBar',
            },
            {
              concern: 'Organism',
              convention: 'self-contained section with real content',
              example: 'MurfyNavbar, FaqSection, Hero',
            },
            {
              concern: 'Template',
              convention: 'full page scaffold — no real content, no data',
              example: 'HomeTemplate',
            },
          ]}
        />
        <NoteBlock>
          Templates wire organisms together but contain no real copy or data. Pages (actual
          routes with fetched content) are out of scope for this Storybook.
        </NoteBlock>
      </section>

    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Naming Conventions',
  component: NamingConventionsDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Page: Story = {}
