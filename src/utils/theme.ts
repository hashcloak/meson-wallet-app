export const theme = {
  buttons: {
    variants: {
      primary:
        'transition bg-main text-textWhite hover:bg-dark hover:border-none focus:outline-none hover:outline-none active:outline-none',
      alert:
        'transition bg-alert text-textWhite hover:opacity-70 hover:border-none  focus:outline-none hover:outline-none active:outline-none',
      text: 'transition text-textLink hover:text-dark hover:border-none focus:outline-none hover:outline-none active:outline-none',
      border:
        'transition border border-bgDark dark:border-bgWhite text-textGray dark:text-textWhite hover:border-none hover:bg-bgWhite hover:text-textBlack focus:outline-none hover:outline-none active:outline-none',
      special:
        'max-w-[25rem] w-full py-4 text-center bg-bgGrayMid dark:bg-bgDarkMid hover:bg-dark hover:text-textWhite group',
      disable:
        'bg-bgGray text-textGray focus:outline-none hover:outline-none active:outline-none',
    },
    sizes: {
      sm: 'w-[5rem] h-[1.5rem] text-xs',
      md: 'px-6 min-w-[8rem] h-[2rem] text-sm',
      lg: 'w-[12.5rem] h-[2.5rem] text-base',
      sp: 'w-[25rem] h-[4.5rem] text-2xl font-bold',
    },
  },
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
  fonts: {
    fontFamily: `'Averta', 'Roboto', 'Helvetica Neue', 'Arial', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '-apple-system', 'BlinkMacSystemFont', sans-serif`,
    fontFamilyCode: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  icons: {
    sizes: {
      sm: '16',
      md: '20',
      lg: '24',
      xl: '32',
      xxl: '40',
      '5xl': '80',
      'w-40': '160',
    },
    colors: {
      main: '#38C6F4',
      dark: '#1F5B92',
      light: '#FF9169',
      alert: '#DC2626',
      black: '#212121',
      white: '#FFFFFF',
      gray: '#b2bbc0',
      none: 'none',
    },
  },
  identicon: {
    size: {
      xs: '10px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '48px',
    },
  },
};
