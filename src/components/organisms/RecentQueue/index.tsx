import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { mockTransactions } from '~/utils/Mock';
import { TableRowShort } from '../TableRow';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getPendingTxs } from '~/service/getPendingTxs';

const RecentQueues: React.FC = () => {
  const [queuedTxs, setQueuedTxs] = useState([]);
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  useEffect(() => {
    const pendingTxs = getPendingTxs(network);
    setQueuedTxs(pendingTxs);
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
        Queue - Latest {mockTransactions.length} out of{' '}
        {mockTransactions.length > 5 ? mockTransactions.length : '5'} Txs
      </span>

      <div className='rounded-2xl text-textWhite bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6 w-full h-full'>
        {queuedTxs.length ? (
          queuedTxs.map((tx, index) => <TableRowShort tx={tx} key={index} />)
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
