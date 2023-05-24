import { mockTransactions } from '~/utils/Mock';
import { TableRowShort } from '../TableRow';

const RecentQueues: React.FC = () => {
  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>
        Queue - Latest {mockTransactions.length} out of{' '}
        {mockTransactions.length > 5 ? mockTransactions.length : '5'} Txs
      </span>

      <div className='max-w-[50rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
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

export default RecentQueues;
