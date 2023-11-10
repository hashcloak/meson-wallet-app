/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import TxModal from '~/components/molecules/Modal/TxModal';
import RowBodyLong from '../RowBody/RowBodyLong';
import { HistoricalTxType } from '~/features/historicalTxs';
import { useConvertTx } from '~/hooks/useConvertTx';

type Props = {
  tx: HistoricalTxType;
};

const TableRowLong: React.FC<Props> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const convertedTx = useConvertTx(tx);

  return (
    <>
      <div
        className='flex items-center justify-between rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap mb-2 w-full min-w-[86.5rem]'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <RowBodyLong tx={convertedTx} />
      </div>
      <TxModal isOpen={isOpen} onClose={onClose} tx={convertedTx} />
    </>
  );
};

export default TableRowLong;
