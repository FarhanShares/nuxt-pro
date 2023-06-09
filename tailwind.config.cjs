const DefaultTheme = require('tailwindcss/defaultTheme')
const AppColors = require('./app/theme.config').AppColors

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './features/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...DefaultTheme.fontFamily.sans],
        atma: [
          'Atma',
          'cursive',
          '"Noto Sans Bengali"',
          ...DefaultTheme.fontFamily.sans,
        ],
        bengali: ['"Noto Sans Bengali"', ...DefaultTheme.fontFamily.sans],
      },
      colors: { ...AppColors },
      boxShadow: {
        light: '0px 0px 10px rgba(218, 218, 218, 0.25)',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      screens: {
        sm: '320px',
        md: '667px',
        lg: '768px',
        xl: '1024px',
        '2xl': '1340px',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
