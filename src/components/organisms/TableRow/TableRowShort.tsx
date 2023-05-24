/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import TxModal from '~/components/molecules/Modal/TxModal';
import RowBodyShort from '../RowBody/RowBodyShort';
import { TableRowType } from '.';

// TODO: TableRowShort and TableLongRow needs to receive props to display info.
const TableRowShort: React.FC<TableRowType> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className='flex items-center rounded-2xl px-4 h-16 bg-bgDarkLight hover:bg-dark whitespace-nowrap mb-2 w-full'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <RowBodyShort
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

export default TableRowShort;
