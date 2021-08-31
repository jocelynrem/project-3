const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      'orange': '#ffa600',
      'lt-green': '#51b847',
      'md-green': '#3c8e42',
      'dk-green': '#005757',
      'lt-gray': '#aab3b8',
      'dk-gray': '#5a6d76',
      'dark': '#0e2e3a'
    },
    fontFamily: {
      custom: ['Besley', 'serif']
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}