import { useSelector } from 'react-redux';
import Card from '~/components/molecules/Card';
import { HistoricalTxsState } from '~/features/historicalTxs';
import { RootState } from '~/features/reducers';

const Timeline: React.FC = () => {
  const { historicalTxs } = useSelector<RootState, HistoricalTxsState>(
    (state) => state.historicalTxs
  );

  const recent10Txs = historicalTxs.slice(0, 10);

  return (
    <div className='flex flex-col w-full h-full'>
      <span className='text-textWhite text-2xl font-bold'>
        History - Latest {recent10Txs.length} out of{' '}
        {historicalTxs.length > 5 ? historicalTxs.length : '10'} Txs
      </span>
      <div className='flex flex-row-reverse justify-end rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-[22.5rem] box-border snap-x overflow-x-scroll '>
        {recent10Txs.length ? (
          recent10Txs.map((tx) => <Card tx={tx} key={tx.hash} />)
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <span className='text-textGrayLight'>No queued transaction</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
