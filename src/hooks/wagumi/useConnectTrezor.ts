import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EthereumAddress } from 'trezor-connect';
import { NewTrezorAccountType } from '~/components/organisms/SelectSignerModal copy/SelectSignerDetail';
import { RootState } from '~/features/reducers';
// import { signerWalletSlice } from '~/features/signerWallet';
import { ITrezorState, trezorActions } from '~/features/tezorWallet';
import { getAccounts, getBalance, getCustomAccount } from '~/service';

type ReturnValue = {
  trezorAccounts: EthereumAddress[];
  getFullAccounts: () => Promise<NewTrezorAccountType[]>;
  getAccount: (arg0: string) => Promise<NewTrezorAccountType[]>;
  isLoading: boolean;
};

export const useConnectTrezor = (): ReturnValue => {
  // const currentSignerAddress = useSelector<RootState, string>(
  //   (state) => state.signerWallet.signerWalletAddress
  // );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [signerAddress, setSignerAddress] = useState(
  //   currentSignerAddress || ''
  // );
  // const [errorMessage, setErrorMessage] = useState('');
  // const { setSignerWallet } = signerWalletSlice.actions;

  const trezorAccounts = useSelector<RootState, ITrezorState>(
    (state) => state.trezorWallet
  ) as unknown as EthereumAddress[];

  const getFullAccounts = useCallback(async () => {
    setIsLoading(true);

    const trezorGetAccountResponse: EthereumAddress[] = await getAccounts();
    dispatch(trezorActions.setTrezorAccounts(trezorGetAccountResponse));
    const fullAccounts = await getBalance(trezorGetAccountResponse);

    setIsLoading(false);

    return fullAccounts;
  }, [dispatch, trezorAccounts]);

  const getAccount = useCallback(
    async (customPath: string) => {
      setIsLoading(true);

      const trezorGetAccountResponse: EthereumAddress = await getCustomAccount(
        customPath
      );

      dispatch(trezorActions.setTrezorAccounts([trezorGetAccountResponse]));
      const fullAccount: NewTrezorAccountType[] = await getBalance([
        trezorGetAccountResponse,
      ]);

      setIsLoading(false);

      return fullAccount;
    },
    [dispatch, trezorAccounts]
  );

  return {
    getFullAccounts,
    getAccount,
    trezorAccounts,
    isLoading,
    // errorMessage,
  };
};
