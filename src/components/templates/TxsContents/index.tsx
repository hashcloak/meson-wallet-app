import { BasicTabs } from '~/components/molecules/Tabs';
import TxsOverview from '../TxsOverview';

const TxsContents: React.FC = () => {
  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { Overview: <TxsOverview key='overview' /> },
    // { Queue: <QueueTable /> },
    // { History: <HistoryTable /> },
  ];

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <BasicTabs tabList={tabList} />
    </div>
  );
};

export default TxsContents;
