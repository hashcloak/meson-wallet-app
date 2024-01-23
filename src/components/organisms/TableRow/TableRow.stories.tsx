import { mockTransactions } from '~/utils/Mock';
import { TableRowLong, TableRowShort } from '.';

export default {
  title: 'Components/Organisms/TableRow',
  component: { TableRowLong, TableRowShort },
};

export const Default: React.FC = (): React.ReactElement => (
  <div className='overflow-x-auto w-full bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-4 px-8'>
    {/* <TableHeader /> */}
    <div className='flex flex-row justify-between'>
      <span className='text-textGray dark:text-textWhite text-lg'>Queue</span>
      <a href='https://google.com' className='text-textLink text-sm'>
        more
      </a>
    </div>
    <div className='grid grid-rows-3 gap-2'>
      {mockTransactions.map((tx) => (
        <TableRowLong tx={tx} key={tx.timestamp} />
      ))}
    </div>
    <div className='grid grid-flow-row gap-2'>
      {mockTransactions.map((tx) => (
        <TableRowShort tx={tx} key={tx.timestamp} />
      ))}
    </div>
  </div>
);
