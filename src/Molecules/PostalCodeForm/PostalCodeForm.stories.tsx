import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PostalCodeForm } from './PostalCodeForm'

const meta: Meta<typeof PostalCodeForm> = {
  title: 'Molecules/PostalCodeForm',
  component: PostalCodeForm,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PostalCodeForm>

export const Default: Story = {}

export const CustomHeading: Story = {
  args: {
    heading: 'Intervention dans votre ville ?',
    subheading: 'Vérifiez en quelques secondes si nous couvrons votre zone.',
  },
}

export const WithCallback: Story = {
  render: () => (
    <PostalCodeForm
      onSubmit={code => alert(`Code postal soumis : ${code}`)}
    />
  ),
}
