import Option from './Option'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Options',
  component: Option,
}

const mock = [
  {
    value: 'ethreaum',
    label: 'Ethereum',
    bg: 'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack',
  },
  {
    value: 'polygon',
    label: 'Polygon',
    bg: 'bg-[#8249E4] text-textWhite',
  },
  {
    value: 'goerli',
    label: 'Goerli',
    bg: 'bg-[#4C98EB] text-textWhite',
  },
  {
    value: 'bnb_smart_chain',
    label: 'BNB Smart Chain',
    bg: 'bg-[#F1B80B] text-textBlack',
  },
]

export const OptionSamples = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Option'}>
        <div className='flex flex-row flex-wrap w-full'>
          <div className='m-4'>
            <Option options={mock} />
          </div>
        </div>
      </DisplayBox>
    </div>
  )
}
