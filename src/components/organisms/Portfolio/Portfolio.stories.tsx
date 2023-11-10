import Portfolio from '.';

export default {
  title: 'Components/Organisms/Portfolio',
  component: Portfolio,
};

export const Default: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Portfolio />
      </div>
    </div>
  );
};
