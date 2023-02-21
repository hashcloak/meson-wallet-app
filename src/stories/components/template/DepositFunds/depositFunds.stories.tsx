import DepositFund from './DepositFund'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/DepositFund',
  component: DepositFund,
}

export const DepositFunds = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <DepositFund />
    </div>
  )
}
