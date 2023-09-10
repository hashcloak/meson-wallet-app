import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { StatusTypes } from '~/components/molecules/IconText/TxStatus';
import { HistoricalTxType } from '~/features/historicalTxs';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

export interface TxType extends Omit<HistoricalTxType, 'value'> {
  status: StatusTypes;
  token: string;
  numOfConfirmation: number;
  value: string | number;
}

export const useConvertTx = (tx: HistoricalTxType): TxType => {
  const [convertedTx, setConvertedTx] = useState<TxType>({
    ...tx,
    status: 'Send',
    token: '',
    numOfConfirmation: 0,
  });
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  useEffect(() => {
    const clonedTx = JSON.parse(JSON.stringify(tx)) as HistoricalTxType;

    const status: StatusTypes =
      mesonWallet && mesonWallet.address === clonedTx.to ? 'Received' : 'Sent';

    const wei = BigNumber.from(clonedTx.value);
    const convertedValue = ethers.utils.formatUnits(wei);
    clonedTx.value = convertedValue;

    const newTx = {
      ...clonedTx,
      status,
      token: 'Eth',
      numOfConfirmation: 0,
    };
    setConvertedTx(newTx);
  }, [tx]);

  return convertedTx;
};
