import Card from '~/components/molecules/Card';
import { IconTypes, StatusTypes } from '../../molecules/IconText/TxStatus';

export type TransactionType = {
  id: number;
  token: 'ethereum' | string;
  amount: number;
  ethAddress: string;
  status: StatusTypes | IconTypes;
  isSuccess: boolean;
  timestamp: number;
};

type Props = {
  txs: TransactionType[];
};

const Timeline: React.FC<Props> = ({ txs }) => {
  const sortedTx = txs.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <div className='flex flex-col w-full h-full'>
      <span className='text-textWhite text-2xl font-bold'>
        History - Latest {sortedTx.length} out of{' '}
        {sortedTx.length > 5 ? sortedTx.length : '10'} Txs
      </span>
      <div className='flex flex-row rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-[22.5rem] box-border snap-x overflow-x-scroll '>
        {sortedTx.length ? (
          sortedTx.map((tx) => <Card tx={tx} key={tx.id} />)
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
