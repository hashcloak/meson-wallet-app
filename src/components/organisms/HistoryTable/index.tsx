import { useSelector } from 'react-redux';
import { TableRowLong } from '../TableRow';
import { HistoricalTxsState } from '~/features/historicalTxs';
import { RootState } from '~/features/reducers';

const HistoryTable: React.FC = () => {
  const { historicalTxs } = useSelector<RootState, HistoricalTxsState>(
    (state) => state.historicalTxs
  );

  return (
    <div className='flex flex-col w-full h-full'>
      <span className='text-textWhite text-2xl font-bold'>History</span>
      <div className='rounded-2xl bg-bgDarkMid p-8 w-full h-full overflow-scroll  box-border'>
        <div className='box-border grid grid-cols-1 gap-2'>
          {historicalTxs.length ? (
            historicalTxs.map((tx) => <TableRowLong tx={tx} key={tx.hash} />)
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <span className='text-textGrayLight'>
                No historied transaction
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
