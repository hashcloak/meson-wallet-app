import { BasicTabs } from '~/components/molecules/Tabs';
import { mockTransactions } from '~/utils/Mock';
import { TableRowShort } from '../TableRow';

export const RecentQueue: React.FC = () => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {mockTransactions.length ? (
          mockTransactions.map((tx) => (
            <TableRowShort tx={tx} key={tx.timestamp} />
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RecentHistory: React.FC = () => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {mockTransactions.length ? (
          mockTransactions.map((tx) => (
            <TableRowShort tx={tx} key={tx.timestamp} />
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  );
};

const RecentTxs: React.FC = () => {
  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { Queue: <RecentQueue /> },
    { History: <RecentHistory /> },
  ];

  return (
    <div className='flex flex-col w-full min-w-[46rem]'>
      <div className='flex flex-row justify-between'>
        <span className='text-textWhite text-2xl font-bold'>
          Recent Transactions
        </span>
        <a href='https://google.com' className='text-textLink text-sm'>
          more
        </a>
      </div>

      <div className='rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
        <BasicTabs tabList={tabList} />
      </div>
    </div>
  );
};

export default RecentTxs;
