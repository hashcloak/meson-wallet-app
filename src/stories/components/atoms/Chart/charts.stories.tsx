import { useState } from 'react'

import Chart from './Chart'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Charts',
  component: 'AssetChart',
}

export const Charts = (): React.ReactElement => {
  const data = [
    { name: '22 Mar', Amount: 100 },
    { name: '22 Apr', Amount: 2400 },
    { name: '22 May', Amount: 500 },
    { name: '22 Jun', Amount: 100 },
    { name: '22 Jul', Amount: 500 },
    { name: '22 Aug', Amount: 2400 },
    { name: '22 Sep', Amount: 1600 },
    { name: '22 Oct', Amount: 500 },
    { name: '22 Nov', Amount: 2400 },
    { name: '22 Dec', Amount: 1600 },
    { name: '22 Jan', Amount: 100 },
    { name: '22 Feb', Amount: 100 },
  ]

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Charts'}>
        <Chart data={data} />
      </DisplayBox>
    </div>
  )
}
