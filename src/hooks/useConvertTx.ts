import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { StatusTypes } from '~/components/molecules/IconText/TxStatus';
import { ExtendedTransactionResponse } from '~/features/historicalTxs';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

export interface TxType
  extends Omit<
  ExtendedTransactionResponse,
    'value' | 'gas' | 'gasPrice' | 'gasUsed' | 'isError'
  > {
  status: StatusTypes;
  token: string;
  numOfConfirmation: number;
  value: string | number | BigNumber;
  gasPrice: string | number;
}

export const useConvertTx = (tx: ExtendedTransactionResponse): TxType => {
  const [convertedTx, setConvertedTx] = useState<TxType>({
    ...tx,
    status,
    token: '',
    numOfConfirmation: 0,
    gasPrice: 0,
  });
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  useEffect(() => {
    const clonedTx = JSON.parse(JSON.stringify(tx)) as ExtendedTransactionResponse;

    let status: StatusTypes = 'Send';
    if (clonedTx.to === undefined || clonedTx.to === null ||clonedTx.to === '') {
      status = 'AccountCreated';
    } else if (mesonWallet && mesonWallet.mesonWalletAddress === clonedTx.to) {
      status = 'Received';
    } else if (mesonWallet && mesonWallet.mesonWalletAddress !== clonedTx.to) {
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
      gasPrice:
        clonedTx.gasPrice !== ''
          ? ethers.utils.formatUnits(clonedTx.gasPrice, 'wei')
          : 'n/a',
    };

    setConvertedTx(newTx);
  }, [tx]);

  return convertedTx;
};
