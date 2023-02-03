import React from 'react'

import { Footer } from './Footer'

export default {
  title: 'Components/Molecules/Footer',
  component: Footer,
}

export const Footers = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {/* <DisplayBox title={'Sidebar'}> */}
      <div className='flex flex-col justify-evenly'>
        <Footer />
      </div>
      {/* </DisplayBox> */}
    </div>
  )
}
