/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    colors: {
      main: '#38C6F4',
      dark: '#1F5B92',
      light: '#FF9169',
      warning: '#DC2626',

      textBlack: '#212121',
      textGray: '#606060',
      textGrayLight: '#b2bbc0',
      textLink: '#38C6F4',
      textWhite: '#FFFFFF',

      bgWhite: '#FFFFFF',
      bgGray: '#E5E5E5',
      bgGrayMid: '#F2F2F2',
      bgGrayLight: '#F9F9F9',
      bgDark: '#1D1D1D',
      bgDarkMid: '#2C2C2C',
      bgDarkLight: '#373737',

      borderGray: '#E5E5E5',
    },
    extend: {},
  },
  safelist: [
    {
      pattern: /^(.*?)/,
    },
  ],
  plugins: [require('daisyui')],
}
