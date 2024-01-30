import WalletReview from '.';

export default {
  title: 'Components/Templates/WalletReview',
  component: WalletReview,
};

export const WalletReviews: React.FC = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <WalletReview />
    </div>
  );
};
