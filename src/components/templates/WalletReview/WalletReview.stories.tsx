import WalletReview from '.'

export default {
  title: 'Components/Templates/WalletReview',
  component: WalletReview,
}

export const WalletReviews = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <WalletReview />
    </div>
  )
}
