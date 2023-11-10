import HistoryTable from '.';

export default {
  title: 'Components/Organisms/HistoryTable',
  component: HistoryTable,
};

export const Default: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <HistoryTable />
      </div>
    </div>
  );
};
