import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { StatusTypes } from '~/components/molecules/IconText/TxStatus';
import { HistoricalTxType } from '~/features/historicalTxs';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

export interface TxType
  extends Omit<
    HistoricalTxType,
    'value' | 'gas' | 'gasPrice' | 'gasUsed' | 'isError'
  > {
  status: StatusTypes;
  token: string;
  numOfConfirmation: number;
  value: string | number;
  gas: string | number;
  gasPrice: string | number;
  gasUsed: string | number;
  isError: boolean;
}

export const useConvertTx = (tx: HistoricalTxType): TxType => {
  const [convertedTx, setConvertedTx] = useState<TxType>({
    ...tx,
    status,
    token: '',
    numOfConfirmation: 0,
    gas: 0,
    gasPrice: 0,
    gasUsed: 0,
    isError: false,
  });
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  useEffect(() => {
    const clonedTx = JSON.parse(JSON.stringify(tx)) as HistoricalTxType;

    let status: StatusTypes = 'Send';
    if (clonedTx.contractAddress !== '') {
      status = 'AccountCreated';
    } else if (mesonWallet && mesonWallet.address === clonedTx.to) {
      status = 'Received';
    } else if (mesonWallet && mesonWallet.address !== clonedTx.to) {
      status = 'Sent';
    }

    const wei = BigNumber.from(clonedTx.value);
    const convertedValue = ethers.utils.formatUnits(wei);
    clonedTx.value = convertedValue;

    const newTx = {
      ...clonedTx,
      status,
      token: status === 'Received' || status === 'Sent' ? 'Eth' : '',
      numOfConfirmation: 0,
      gas:
        clonedTx.gas !== ''
          ? ethers.utils.formatUnits(clonedTx.gas, 'wei')
          : 'n/a',
      gasPrice:
        clonedTx.gasPrice !== ''
          ? ethers.utils.formatUnits(clonedTx.gasPrice, 'wei')
          : 'n/a',
      gasUsed:
        clonedTx.gasUsed !== ''
          ? ethers.utils.formatUnits(clonedTx.gasUsed, 'wei')
          : 'n/a',
      isError: !!tx.isError,
    };

    setConvertedTx(newTx);
  }, [tx]);

  return convertedTx;
};
