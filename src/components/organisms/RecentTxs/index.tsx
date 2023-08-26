import { useSelector } from 'react-redux';
import { BasicTabs } from '~/components/molecules/Tabs';
import { mockTransactions } from '~/utils/Mock';
import { TableRowShort } from '../TableRow';
import { HistoricalTxType, HistoricalTxsState } from '~/features/historicalTxs';
import { RootState } from '~/features/reducers';

type HistoryProps = {
  txs: HistoricalTxType[];
};

export const RecentQueue: React.FC<HistoryProps> = ({ txs }) => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {mockTransactions.length ? (
          txs.map((tx) => <TableRowShort tx={tx} key={tx.blockHash} />)
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RecentHistory: React.FC<HistoryProps> = ({ txs }) => {
  return (
    <div className='rounded-2xl bg-bgDarkMid py-4 w-full h-full overflow-scroll box-border'>
      <div className='box-border grid grid-cols-1 gap-2'>
        {txs.length ? (
          txs.map((tx) => <TableRowShort tx={tx} key={tx.blockHash} />)
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
  const { historicalTxs } = useSelector<RootState, HistoricalTxsState>(
    (state) => state.historicalTxs
  );
  // const { network } = useSelector<RootState, NetworkState>(
  //   (state) => state.network
  // );

  const recent5Txs = historicalTxs.slice(0, 5);
  // const pendingTxs = getPendingTxs(network)

  const tabList: Array<{ [key: string]: JSX.Element }> = [
    // { Queue: <RecentQueue /> },
    { History: <RecentHistory txs={recent5Txs} key='recentHistory' /> },
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
