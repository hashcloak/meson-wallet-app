import { mockTransactions } from '~/utils/Mock';
import { TableRowLong } from '../TableRow';

const HistoryTable: React.FC = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <span className='text-textWhite text-2xl font-bold'>History</span>
      <div className='rounded-2xl bg-bgDarkMid px-8 py-4 w-full h-full overflow-scroll  box-border'>
        <div className='grid grid-cols-2 gap-32 box-border text-textGrayLight w-full px-4 mb-2'>
          <div className='grid grid-cols-2 '>
            <span className='col-span-1'>Action</span>
            <span className='col-span-1'>Amount</span>
          </div>
          <div className='grid grid-cols-3 '>
            <span className='col-span-1'>Date</span>
            <span className='col-span-1' />
            <span className='col-span-1'>Status</span>
          </div>
        </div>
        <div className='box-border grid grid-cols-1 gap-2'>
          {mockTransactions.length ? (
            mockTransactions.map((tx) => (
              <TableRowLong tx={tx} key={tx.timestamp} />
            ))
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
