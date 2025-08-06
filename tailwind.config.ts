import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other directories if you have them, e.g., './src/layouts/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4527A0', // Your main purple
        secondary: '#FF4081', // Your pink accent
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      // Fonts will be added back in the next step
    },
  },
  plugins: [],
}

export default config 