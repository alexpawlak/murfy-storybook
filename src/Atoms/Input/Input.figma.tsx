import figma from '@figma/code-connect/react'

import { Input } from './Input'

const figmaNodeUrl =
  'https://www.figma.com/design/mAUdca2csMWlBqyQI0fIVl/Design-system-26?node-id=110-11011'

figma.connect(Input, figmaNodeUrl, {
  variant: {
    'Property 1': 'Default',
  },
  props: {
    placeholder: figma.textContent('Input text'),
  },
  example: ({ placeholder }) => (
    <Input
      aria-label={placeholder}
      placeholder={placeholder}
      type="text"
    />
  ),
})

figma.connect(Input, figmaNodeUrl, {
  variant: {
    'Property 1': 'Selected',
  },
  props: {
    placeholder: figma.textContent('Input text'),
  },
  example: ({ placeholder }) => (
    <Input
      aria-label={placeholder}
      autoFocus
      placeholder={placeholder}
      type="text"
    />
  ),
})
