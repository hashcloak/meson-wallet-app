/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import TxModal from '~/components/molecules/Modal/TxModal';
import RowBodyShort from '../RowBody/RowBodyShort';
import { ExtendedTransactionResponse } from '~/features/historicalTxs';
import { useConvertTx } from '~/hooks/useConvertTx';

type Props = {
  tx: ExtendedTransactionResponse;
};

// TODO: TableRowShort and TableLongRow needs to receive props to display info.
const TableRowShort: React.FC<Props> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const convertedTx = useConvertTx(tx);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className='flex items-center rounded-2xl px-4 h-16  whitespace-nowrap mb-2 bg-bgDarkLight hover:bg-dark"'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <RowBodyShort tx={convertedTx} />
      </div>
      <TxModal isOpen={isOpen} onClose={onClose} tx={convertedTx} />
    </>
  );
};

export default TableRowShort;
