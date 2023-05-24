/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import TxModal from '~/components/molecules/Modal/TxModal';
import RowBodyLong from '../RowBody/RowBodyLong';
import { TableRowType } from '.';

const TableRowLong: React.FC<TableRowType> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className='flex items-center justify-between rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap mb-2 w-full'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <RowBodyLong
          timestamp={tx.timestamp}
          status={tx.status}
          to={tx.to}
          from={tx.from}
          token={tx.token}
          amount={tx.amount}
          isSuccess={tx.isSuccess}
          numOfConfirmation={tx.numOfConfirmation}
        />
      </div>
      <TxModal isOpen={isOpen} onClose={onClose} tx={tx} />
    </>
  );
};

export default TableRowLong;
