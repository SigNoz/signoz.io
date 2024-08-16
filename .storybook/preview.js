import '../css/tailwind.css'
import '../css/global.css'

import { themes } from '@storybook/theming'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0b0c0e',
        },
        {
          name: 'light',
          value: '#f4f4f4',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
