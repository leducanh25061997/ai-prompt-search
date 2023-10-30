/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-100': '#0C0534',
        'neutral-5': '#F3F3F5',
        'violet-3': '#F4EEF6',
        'primary-blue': '#95A2F',
      },
      width: {
        'unset': 'unset'
      },
      fontSize: {
        xs: ['10px', '16px']
      },
      screens: {
        'xs': {'min': '390px', 'max': '640px'},
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [],
}
