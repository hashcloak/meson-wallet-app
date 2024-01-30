/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      main: '#38C6F4',
      dark: '#1F5B92',
      light: '#FF9169',
      alert: '#DC2626',

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
      bgDarkLight: '#383838',

      borderGray: '#E5E5E5',
    },
    extend: {
      animation: {
        'slide-in-right':
          'slide-in-fwd-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'slide-out-right':
          'slide-out-fwd-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both',
      },
      keyframes: {
        'slide-in-fwd-right': {
          '0%': {
            transform: 'translateZ(-1400px) translateX(1000px)',
            opacity: '0',
          },
          to: {
            transform: 'translateZ(0) translateX(0)',
            opacity: '1',
          },
        },
        'slide-out-fwd-right': {
          '0%': {
            transform: 'translateZ(0) translateX(0)',
            opacity: '1',
          },
          to: {
            transform: 'translateZ(600px) translateX(400px)',
            opacity: '0',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
};
