import SelectMesonWallet from './SelectMesonWallet'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/SelectMesonWallet',
  component: SelectMesonWallet,
}

export const SelectMesonWallets = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <SelectMesonWallet />
    </div>
  )
}
