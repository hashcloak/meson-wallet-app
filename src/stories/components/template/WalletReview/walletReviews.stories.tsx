import WalletReview from './WalletReview'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/WalletReview',
  component: WalletReview,
}

export const WalletReviews = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <WalletReview />
    </div>
  )
}
