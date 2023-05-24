import RecentQueues from '.';

export default {
  title: 'Components/Organisms/RecentQueues',
  component: RecentQueues,
};

export const Default: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <RecentQueues />
      </div>
    </div>
  );
};
