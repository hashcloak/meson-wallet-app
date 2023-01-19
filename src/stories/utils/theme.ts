export const theme = {
  buttons: {
    variants: {
      primary:
        'transition bg-main text-textWhite hover:bg-dark hover:border-none ',
      warning:
        'transition bg-warning text-textWhite hover:opacity-70 hover:border-none ',
      text: 'transition text-textLink hover:text-dark hover:border-none ',
      disable: 'bg-bgGray text-textGray',
    },
    sizes: {
      sm: 'w-[80px] h-[24px] text-xs',
      md: 'w-[160px] h-[32px] text-sm',
      lg: 'w-[200px] h-[40px] text-base',
    },
  },
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
    bgDark: '#202020',
    bgDarkMid: '#0F0F0F',
    bgDarkLight: '#181818',

    borderGray: '#E5E5E5',
  },
  fonts: {
    fontFamily: `'Averta', 'Roboto', 'Helvetica Neue', 'Arial', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '-apple-system', 'BlinkMacSystemFont', sans-serif`,
    fontFamilyCode: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  icons: {
    size: {
      sm: '16',
      md: '24',
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
}
