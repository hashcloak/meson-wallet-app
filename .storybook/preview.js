/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import '../src/styles/globals.css'
import * as nextImage from 'next/image'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
})
