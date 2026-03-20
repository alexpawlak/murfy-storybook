import type { Meta, StoryObj } from '@storybook/react'
import { RecruitmentSection } from './RecruitmentSection'

const meta: Meta<typeof RecruitmentSection> = {
  title: 'Organisms/RecruitmentSection',
  component: RecruitmentSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    headline: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
    imageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RecruitmentSection>

export const Default: Story = {
  args: {
    imageUrl: 'https://cdn.prod.website-files.com/66a7929afe102548a244c1d2/66cd7d3bb0f0a821c6c07bcf_formation_visual.avif',
  },
}
