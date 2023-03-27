import React from 'react'

import CopyToClipboardBtn from '.'

export default {
  title: 'Utils/CopyToClipboardBtn',
  component: CopyToClipboardBtn,
  parameters: {
    componentSubtitle: 'Copy text to clipboard.',
  },
}

export const Default = (): React.ReactElement => <CopyToClipboardBtn textToCopy='some value' />
