import { TrustedByTeams } from '../components/trusted-by'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TrustedByTeams',
  component: TrustedByTeams,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  args: {},
}
