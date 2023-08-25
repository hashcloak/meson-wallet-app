/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import TxModal from '~/components/molecules/Modal/TxModal';
import RowBodyShort from '../RowBody/RowBodyShort';
// import { TableRowType } from '.';
import { HistoricalTxType } from '~/features/historicalTxs';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

type Props = {
  tx: HistoricalTxType;
};

// TODO: TableRowShort and TableLongRow needs to receive props to display info.
const TableRowShort: React.FC<Props> = ({ tx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    timestamp: 0,
    status: 'Sent' as 'Sent' | 'Received',
    to: '',
    from: '',
    token: '',
    amount: 0,
    isSuccess: true,
    // TODO: Need to change
    numOfConfirmation: 0,
  });
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const wei = BigNumber.from(tx.value);
    const value = Number(ethers.utils.formatUnits(wei));
    // const gasUsed = Number(ethers.utils.formatUnits(tx.gasUsed, 'gwei'));
    // const gasPrice = Number(ethers.utils.formatUnits(tx.gasPrice, 'gwei'));

    const status: 'Sent' | 'Received' =
      mesonWallet && mesonWallet.address === tx.to ? 'Received' : 'Sent';

    const convertedTx = {
      timestamp: Number(tx.timeStamp),
      status,
      to: tx.to,
      from: tx.from,
      token: 'Eth',
      amount: value,
      isSuccess: true,
      // TODO: Need to change
      numOfConfirmation: 1,
    };
    setNewTx(convertedTx);
  }, []);

  return (
    <>
      <div
        className='flex items-center rounded-2xl px-4 h-16  whitespace-nowrap mb-2 bg-bgDarkLight hover:bg-dark"'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        tabIndex={0}
      >
        <RowBodyShort
          timestamp={newTx.timestamp}
          status={newTx.status}
          to={newTx.to}
          from={newTx.from}
          token={newTx.token}
          amount={newTx.amount}
          isSuccess={newTx.isSuccess}
          numOfConfirmation={newTx.numOfConfirmation}
        />
      </div>
      <TxModal isOpen={isOpen} onClose={onClose} tx={newTx} rowTx={tx} />
    </>
  );
};

export default TableRowShort;
