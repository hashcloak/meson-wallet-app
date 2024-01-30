import RecentQueues from '~/components/organisms/RecentQueue';
import Timeline from '~/components/organisms/Timeline';
// eslint-disable-next-line import/extensions
import TransactionAmount from '~/components/organisms/TransactionAmount';
import Spacer from '~/utils/Spacer';

const TxsOverview: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-full box-border'>
      <div className='flex xl:flex-row gap-4 xl:gap-0 flex-col w-full h-full box-border xl:justify-between min-w-[46rem]'>
        <RecentQueues />
        <Spacer size={16} axis={'horizontal'} />
        <TransactionAmount />
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='flex xl:flex-row gap-4 xl:gap-0 flex-col w-full h-full box-border xl:justify-between min-w-[46rem]'>
        <Timeline />
      </div>
    </div>
  );
};

export default TxsOverview;
